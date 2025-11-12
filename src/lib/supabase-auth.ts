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

    // Fetch user profile
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
      return { success: false, error: "Failed to fetch user profile" };
    }

    const userProfile: UserProfile = {
      id: profileData.id,
      email: authData.user.email!,
      username: profileData.username,
      full_name: profileData.full_name,
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

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (profileError || !profileData) {
      return null;
    }

    return {
      id: profileData.id,
      email: session.user.email!,
      username: profileData.username,
      full_name: profileData.full_name,
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
