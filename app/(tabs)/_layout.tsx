// import { useEffect, useState } from 'react';
// import { Stack } from 'expo-router';
// import { AuthProvider } from '../contexts/AuthContext';
// import { supabase } from '@/lib/supabase';

// export default function RootLayout() {
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check active sessions
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//       setLoading(false);
//     });

//     // Listen for auth changes
//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   if (loading) {
//     return null; // Or a loading screen
//   }

//   return (
//     <AuthProvider>
//       <Stack screenOptions={{ headerShown: false }}>
//         {!session ? (
//           <>
//             <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//             <Stack.Screen name="index" options={{ headerShown: false }} />
//           </>
//         ) : (
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         )}
//       </Stack>
//     </AuthProvider>
//   );
// }




// import { useEffect, useState } from 'react';
// import { Stack } from 'expo-router';
// import { AuthProvider } from '../contexts/AuthContext';
// import { supabase } from '@/lib/supabase';
// import { Session } from '@supabase/supabase-js';

// export default function RootLayout() {
//   const [session, setSession] = useState<Session | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check active sessions
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//       setLoading(false);
//     });

//     // Listen for auth changes
//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   if (loading) {
//     return null; // Or a loading screen
//   }

//   return (
//     <AuthProvider>
//       <Stack screenOptions={{ headerShown: false }}>
//         {!session ? (
//           <>
//             <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//             <Stack.Screen name="index" options={{ headerShown: false }} />
//           </>
//         ) : (
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         )}
//       </Stack>
//     </AuthProvider>
//   );
// }


import { Tabs } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator, View } from 'react-native';

export default function TabLayout() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="collections"
        options={{
          title: 'Collections',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="folder" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}