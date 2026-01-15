// import { Profile, supabase } from '@/lib/supabase';
// import { Session, User } from '@supabase/supabase-js';
// import React, { createContext, useContext, useEffect, useState } from 'react';

// import { profilesService } from '../services/database';

// interface AuthContextType {
//   session: Session | null;
//   user: User | null;
//   profile: Profile | null;
//   loading: boolean;
//   signOut: () => Promise<void>;
//   refreshProfile: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType>({
//   session: null,
//   user: null,
//   profile: null,
//   loading: true,
//   signOut: async () => {},
//   refreshProfile: async () => {},
// });

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [session, setSession] = useState<Session | null>(null);
//   const [user, setUser] = useState<User | null>(null);
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [loading, setLoading] = useState(true);

//   const fetchProfile = async (userId: string) => {
//     try {
//       const { data } = await profilesService.getProfile(userId);
//       setProfile(data);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     }
//   };

//   useEffect(() => {
//     // Check active sessions
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//       setUser(session?.user ?? null);
//       if (session?.user) {
//         fetchProfile(session.user.id);
//       }
//       setLoading(false);
//     });

//     // Listen for auth changes
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
//       setSession(session);
//       setUser(session?.user ?? null);
      
//       if (session?.user) {
//         await fetchProfile(session.user.id);
//       } else {
//         setProfile(null);
//       }
      
//       setLoading(false);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   const refreshProfile = async () => {
//     if (user) {
//       await fetchProfile(user.id);
//     }
//   };

//   const signOut = async () => {
//     try {
//       await supabase.auth.signOut();
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       session, 
//       user, 
//       profile, 
//       loading, 
//       signOut, 
//       refreshProfile 
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { Profile, supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { useRouter, useSegments } from 'expo-router';
import { profilesService } from '../services/database';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  const fetchProfile = async (userId: string) => {
    try {
      const { data } = await profilesService.getProfile(userId);
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    // Check active sessions
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Protect routes
  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';
    
    if (!session && !inAuthGroup) {
      // Redirect to login if not authenticated
      router.replace('/(auth)/login');
    } else if (session && inAuthGroup) {
      // Redirect to home if authenticated and trying to access auth pages
      router.replace('/(tabs)');
    }
  }, [session, segments, loading]);

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      profile, 
      loading, 
      signOut, 
      refreshProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};