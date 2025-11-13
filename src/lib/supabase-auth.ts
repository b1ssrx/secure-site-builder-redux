import { supabase } from "@/integrations/supabase/client";

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  full_name: string;
}

export const registerUser = async (
  email: string,
  password: string,
  username: string,
  fullName: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const redirectUrl = `${window.location.origin}/`;
    
    // Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          username,
          full_name: fullName,
        },
      },
    });

    if (authError) {
      return { success: false, error: authError.message };
    }

    if (!authData.user) {
      return { success: false, error: "Registration failed" };
    }

    // Ensure profile exists or create it
    try {
      const { error: profileUpsertError } = await supabase
        .from("profiles")
        .upsert(
          {
            id: authData.user.id,
            username,
            full_name: fullName,
          },
          { onConflict: "id" }
        );

      if (profileUpsertError) {
        const msg = profileUpsertError.message?.toLowerCase() || "";
        if (msg.includes("duplicate key") || msg.includes("unique")) {
          return { success: false, error: "Username is already taken. Please choose another." };
        }
        console.error("Profile upsert error during registration:", profileUpsertError);
        // Non-fatal, continue
      }
    } catch (e) {
      console.error("Unexpected error upserting profile during registration:", e);
      // Non-fatal, continue
    }

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: UserProfile }> => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return { success: false, error: authError.message };
    }

    if (!authData.user) {
      return { success: false, error: "Login failed" };
    }

    // Fetch or create user profile
    let { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (profileError || !profileData) {
      console.warn("Profile missing, attempting to create...", profileError);
      const meta: any = authData.user.user_metadata || {};
      const fallbackUsername =
        (meta.username ||
          authData.user.email?.split("@")[0] ||
          `user_${authData.user.id.slice(0, 8)}`).toLowerCase();
      const fallbackFullName = meta.full_name || meta.name || fallbackUsername;

      await supabase
        .from("profiles")
        .upsert(
          {
            id: authData.user.id,
            username: fallbackUsername,
            full_name: fallbackFullName,
          },
          { onConflict: "id" }
        );

      // Try fetching again (don't fail if still missing)
      const retry = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      profileData = retry.data ?? null;
    }

    const userProfile: UserProfile = {
      id: authData.user.id,
      email: authData.user.email!,
      username: profileData?.username ?? (authData.user.user_metadata?.username || authData.user.email?.split("@")[0] || "user"),
      full_name: profileData?.full_name ?? (authData.user.user_metadata?.full_name || authData.user.user_metadata?.name || authData.user.email || "User"),
    };

    return { success: true, user: userProfile };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};

export const logoutUser = async (): Promise<void> => {
  await supabase.auth.signOut();
};

export const getCurrentUser = async (): Promise<UserProfile | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      return null;
    }

    let { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (profileError || !profileData) {
      // Attempt to create a minimal profile from metadata
      const meta: any = session.user.user_metadata || {};
      const fallbackUsername =
        (meta.username ||
          session.user.email?.split("@")[0] ||
          `user_${session.user.id.slice(0, 8)}`).toLowerCase();
      const fallbackFullName = meta.full_name || meta.name || fallbackUsername;

      await supabase
        .from("profiles")
        .upsert(
          {
            id: session.user.id,
            username: fallbackUsername,
            full_name: fallbackFullName,
          },
          { onConflict: "id" }
        );

      const retry = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      profileData = retry.data ?? null;
    }

    return {
      id: session.user.id,
      email: session.user.email!,
      username:
        profileData?.username ??
        (session.user.user_metadata?.username ||
          session.user.email?.split("@")[0] ||
          "user"),
      full_name:
        profileData?.full_name ??
        (session.user.user_metadata?.full_name ||
          session.user.user_metadata?.name ||
          session.user.email ||
          "User"),
    };
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
};

export const isUserAuthenticated = async (): Promise<boolean> => {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
};
