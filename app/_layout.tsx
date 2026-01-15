// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/use-color-scheme';

// export const unstable_settings = {
//   anchor: '(tabs)',
// };

// export default function RootLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }



// import { Stack } from 'expo-router';
// import { AuthProvider } from './contexts/AuthContext';

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="index" options={{ headerShown: false }} />
//       </Stack>
//     </AuthProvider>
//   );
// }



import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen 
          name="collection/[id]" 
          options={{ 
            presentation: 'modal',
            headerShown: true,
            title: 'Collection'
          }} 
        />
        <Stack.Screen 
          name="quote/[id]" 
          options={{ 
            presentation: 'modal',
            headerShown: true,
            title: 'Quote Details'
          }} 
        />
        <Stack.Screen 
          name="create-collection" 
          options={{ 
            presentation: 'modal',
            headerShown: true,
            title: 'Create Collection'
          }} 
        />
      </Stack>
      <StatusBar style="dark" />
    </AuthProvider>
  );
}