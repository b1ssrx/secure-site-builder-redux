import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { UserProfile } from "@/lib/supabase-auth";

interface UserProgress {
  roadmapId: string;
  completedTopics: string[];
  totalTopics: number;
  points: number;
}

interface UserData {
  user: UserProfile | null;
  selectedRoles: string[];
  progress: UserProgress[];
  totalPoints: number;
  registrationDate: string;
  toggleRole: (role: string) => void;
  updateProgress: (roadmapId: string, topicId: string, completed: boolean) => void;
}

const UserContext = createContext<UserData | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [registrationDate, setRegistrationDate] = useState("");

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        // Fetch user profile
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profileData) {
          const userProfile: UserProfile = {
            id: profileData.id,
            email: session.user.email!,
            username: profileData.username,
            full_name: profileData.full_name,
          };
          setUser(userProfile);
          
          // Load user data from localStorage
          const userData = localStorage.getItem(`user_data_${profileData.id}`);
          if (userData) {
            const data = JSON.parse(userData);
            setSelectedRoles(data.selectedRoles || []);
            setProgress(data.progress || []);
            setTotalPoints(data.totalPoints || 0);
            setRegistrationDate(data.registrationDate || profileData.created_at || new Date().toISOString());
          } else {
            setRegistrationDate(profileData.created_at || new Date().toISOString());
          }
        }
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user && event === 'SIGNED_IN') {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profileData) {
          const userProfile: UserProfile = {
            id: profileData.id,
            email: session.user.email!,
            username: profileData.username,
            full_name: profileData.full_name,
          };
          setUser(userProfile);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setSelectedRoles([]);
        setProgress([]);
        setTotalPoints(0);
        setRegistrationDate("");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`user_data_${user.id}`, JSON.stringify({
        selectedRoles,
        progress,
        totalPoints,
        registrationDate
      }));
    }
  }, [user, selectedRoles, progress, totalPoints, registrationDate]);

  const toggleRole = (role: string) => {
    setSelectedRoles(prev => 
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  const updateProgress = (roadmapId: string, topicId: string, completed: boolean) => {
    setProgress(prev => {
      const roadmapProgress = prev.find(p => p.roadmapId === roadmapId);
      if (!roadmapProgress) {
        return [...prev, {
          roadmapId,
          completedTopics: completed ? [topicId] : [],
          totalTopics: 10, // Default
          points: completed ? 50 : 0
        }];
      }

      return prev.map(p => {
        if (p.roadmapId === roadmapId) {
          const newCompleted = completed
            ? [...p.completedTopics, topicId].filter((v, i, a) => a.indexOf(v) === i)
            : p.completedTopics.filter(id => id !== topicId);
          
          return {
            ...p,
            completedTopics: newCompleted,
            points: newCompleted.length * 50
          };
        }
        return p;
      });
    });

    if (completed) {
      setTotalPoints(prev => prev + 50);
    } else {
      setTotalPoints(prev => Math.max(0, prev - 50));
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      selectedRoles,
      progress,
      totalPoints,
      registrationDate,
      toggleRole,
      updateProgress
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
