// import { Ionicons } from '@expo/vector-icons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import React from 'react';

// // Screens
// import CollectionDetailScreen from '../screens/CollectionDetailScreen';
// import CollectionsScreen from '../screens/CollectionsScreen';
// import CreateCollectionScreen from '../screens/CreateCollectionScreen';
// import FavoritesScreen from '../screens/FavoritesScreen';
// import HomeScreen from '../screens/HomeScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import QuoteDetailScreen from '../screens/QuoteDetailScreen';
// import QuotesScreen from '../screens/QuotesScreen';

// const Tab = createBottomTabNavigator();
// const HomeStack = createStackNavigator();
// const QuotesStack = createStackNavigator();
// const CollectionsStack = createStackNavigator();
// const ProfileStack = createStackNavigator();

// // Home Stack
// const HomeStackNavigator = () => {
//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen 
//         name="HomeMain" 
//         component={HomeScreen}
//         options={{ 
//           headerShown: false,
//           title: 'Home'
//         }}
//       />
//       <HomeStack.Screen 
//         name="QuoteDetail" 
//         component={QuoteDetailScreen}
//         options={{ 
//           title: 'Quote Details',
//           headerBackTitle: 'Back'
//         }}
//       />
//       <HomeStack.Screen 
//         name="Favorites" 
//         component={FavoritesScreen}
//         options={{ 
//           title: 'My Favorites',
//           headerBackTitle: 'Back'
//         }}
//       />
//     </HomeStack.Navigator>
//   );
// };

// // Quotes Stack
// const QuotesStackNavigator = () => {
//   return (
//     <QuotesStack.Navigator>
//       <QuotesStack.Screen 
//         name="QuotesMain" 
//         component={QuotesScreen}
//         options={{ 
//           headerShown: false,
//           title: 'Quotes'
//         }}
//       />
//       <QuotesStack.Screen 
//         name="QuoteDetail" 
//         component={QuoteDetailScreen}
//         options={{ 
//           title: 'Quote Details',
//           headerBackTitle: 'Back'
//         }}
//       />
//     </QuotesStack.Navigator>
//   );
// };

// // Collections Stack
// const CollectionsStackNavigator = () => {
//   return (
//     <CollectionsStack.Navigator>
//       <CollectionsStack.Screen 
//         name="CollectionsMain" 
//         component={CollectionsScreen}
//         options={{ 
//           headerShown: false,
//           title: 'Collections'
//         }}
//       />
//       <CollectionsStack.Screen 
//         name="CollectionDetail" 
//         component={CollectionDetailScreen}
//         options={({ route }: any) => ({ 
//           title: route.params?.collectionName || 'Collection',
//           headerBackTitle: 'Back'
//         })}
//       />
//       <CollectionsStack.Screen 
//         name="CreateCollection" 
//         component={CreateCollectionScreen}
//         options={{ 
//           title: 'New Collection',
//           headerBackTitle: 'Back'
//         }}
//       />
//       <CollectionsStack.Screen 
//         name="QuoteDetail" 
//         component={QuoteDetailScreen}
//         options={{ 
//           title: 'Quote Details',
//           headerBackTitle: 'Back'
//         }}
//       />
//     </CollectionsStack.Navigator>
//   );
// };

// // Profile Stack
// const ProfileStackNavigator = () => {
//   return (
//     <ProfileStack.Navigator>
//       <ProfileStack.Screen 
//         name="ProfileMain" 
//         component={ProfileScreen}
//         options={{ 
//           headerShown: false,
//           title: 'Profile'
//         }}
//       />
//     </ProfileStack.Navigator>
//   );
// };

// // Main Tab Navigator
// const MainNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           // Type-safe icon name
//           let iconName: keyof typeof Ionicons.glyphMap;

//           if (route.name === 'Home') {
//             iconName = focused ? 'home' : 'home-outline';
//           } else if (route.name === 'Quotes') {
//             iconName = focused ? 'book' : 'book-outline';
//           } else if (route.name === 'Collections') {
//             iconName = focused ? 'folder' : 'folder-outline';
//           } else if (route.name === 'Profile') {
//             iconName = focused ? 'person' : 'person-outline';
//           } else {
//             iconName = 'help'; // fallback
//           }

//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: '#007AFF',
//         tabBarInactiveTintColor: 'gray',
//         headerShown: false,
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeStackNavigator} />
//       <Tab.Screen name="Quotes" component={QuotesStackNavigator} />
//       <Tab.Screen name="Collections" component={CollectionsStackNavigator} />
//       <Tab.Screen name="Profile" component={ProfileStackNavigator} />
//     </Tab.Navigator>
//   );
// };

// export default MainNavigator;


import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

// Screens
import CollectionDetailScreen from '../screens/CollectionDetailScreen';
import CollectionsScreen from '../screens/CollectionsScreen';
import CreateCollectionScreen from '../screens/CreateCollectionScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import QuoteDetailScreen from '../screens/QuoteDetailScreen';
import QuotesScreen from '../screens/QuotesScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const QuotesStack = createStackNavigator();
const CollectionsStack = createStackNavigator();
const ProfileStack = createStackNavigator();

// Helper to disable TS prop check for screens that expect params
const withNoProps = (Screen: React.FC<any>) => {
  const Wrapped: React.FC<any> = (props) => <Screen {...props} />;
  Wrapped.displayName = `withNoProps(${Screen.displayName || Screen.name || 'Component'})`;
  return Wrapped;
};

// ----------------- Home Stack -----------------
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="HomeMain" 
        component={HomeScreen}
        options={{ headerShown: false, title: 'Home' }}
      />
      <HomeStack.Screen 
        name="QuoteDetail" 
        component={withNoProps(QuoteDetailScreen)} // <-- wrap to avoid TS error
        options={{ title: 'Quote Details', headerBackTitle: 'Back' }}
      />
      <HomeStack.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{ title: 'My Favorites', headerBackTitle: 'Back' }}
      />
    </HomeStack.Navigator>
  );
};

// ----------------- Quotes Stack -----------------
const QuotesStackNavigator = () => {
  return (
    <QuotesStack.Navigator>
      <QuotesStack.Screen 
        name="QuotesMain" 
        component={QuotesScreen}
        options={{ headerShown: false, title: 'Quotes' }}
      />
      <QuotesStack.Screen 
        name="QuoteDetail" 
        component={withNoProps(QuoteDetailScreen)}
        options={{ title: 'Quote Details', headerBackTitle: 'Back' }}
      />
    </QuotesStack.Navigator>
  );
};

// ----------------- Collections Stack -----------------
const CollectionsStackNavigator = () => {
  return (
    <CollectionsStack.Navigator>
      <CollectionsStack.Screen 
        name="CollectionsMain" 
        component={CollectionsScreen}
        options={{ headerShown: false, title: 'Collections' }}
      />
      <CollectionsStack.Screen 
        name="CollectionDetail" 
        component={CollectionDetailScreen}
        options={({ route }: any) => ({ 
          title: route.params?.collectionName || 'Collection',
          headerBackTitle: 'Back'
        })}
      />
      <CollectionsStack.Screen 
        name="CreateCollection" 
        component={CreateCollectionScreen}
        options={{ title: 'New Collection', headerBackTitle: 'Back' }}
      />
      <CollectionsStack.Screen 
        name="QuoteDetail" 
        component={withNoProps(QuoteDetailScreen)}
        options={{ title: 'Quote Details', headerBackTitle: 'Back' }}
      />
    </CollectionsStack.Navigator>
  );
};

// ----------------- Profile Stack -----------------
const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen 
        name="ProfileMain" 
        component={ProfileScreen}
        options={{ headerShown: false, title: 'Profile' }}
      />
    </ProfileStack.Navigator>
  );
};

// ----------------- Main Tab Navigator -----------------
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Quotes') iconName = focused ? 'book' : 'book-outline';
          else if (route.name === 'Collections') iconName = focused ? 'folder' : 'folder-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          else iconName = 'help';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Quotes" component={QuotesStackNavigator} />
      <Tab.Screen name="Collections" component={CollectionsStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
