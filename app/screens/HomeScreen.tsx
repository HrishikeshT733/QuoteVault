// import { Quote, QuoteCategory } from '@/lib/supabase';
// import { Ionicons as Icon } from '@expo/vector-icons';
// import { StackNavigationProp } from '@react-navigation/stack';
// import React, { useEffect, useState } from 'react';
// import {
//     FlatList,
//     RefreshControl,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View
// } from 'react-native';
// import { useAuth } from '../contexts/AuthContext';
// import { favoritesService, quotesService } from '../services/database';

// type HomeScreenNavigationProp = StackNavigationProp<any>;

// interface Props {
//   navigation: HomeScreenNavigationProp;
// }

// const CATEGORIES: { label: string; value: QuoteCategory | 'all' }[] = [
//   { label: 'All', value: 'all' },
//   { label: 'Motivation', value: 'Motivation' },
//   { label: 'Love', value: 'Love' },
//   { label: 'Success', value: 'Success' },
//   { label: 'Wisdom', value: 'Wisdom' },
//   { label: 'Humor', value: 'Humor' },
// ];

// const HomeScreen: React.FC<Props> = ({ navigation }) => {
//   const { user } = useAuth();
//   const [quotes, setQuotes] = useState<Quote[]>([]);
//   const [favorites, setFavorites] = useState<string[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<QuoteCategory | 'all'>('all');
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     fetchQuotes();
//     if (user) {
//       fetchFavorites();
//     }
//   }, [selectedCategory, user]);

//   const fetchQuotes = async () => {
//     setLoading(true);
//     try {
//       const category = selectedCategory === 'all' ? undefined : selectedCategory;
//       const { data } = await quotesService.getQuotes(category);
//       if (data) {
//         setQuotes(data);
//       }
//     } catch (error) {
//       console.error('Error fetching quotes:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchFavorites = async () => {
//     if (!user) return;
    
//     try {
//       const { data } = await favoritesService.getUserFavorites(user.id);
//       if (data) {
//         const favoriteIds = data.map(quote => quote.id);
//         setFavorites(favoriteIds);
//       }
//     } catch (error) {
//       console.error('Error fetching favorites:', error);
//     }
//   };

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await Promise.all([fetchQuotes(), fetchFavorites()]);
//     setRefreshing(false);
//   };

//   const toggleFavorite = async (quoteId: string) => {
//     if (!user) {
//       navigation.navigate('Auth');
//       return;
//     }

//     try {
//       await favoritesService.toggleFavorite(user.id, quoteId);
//       setFavorites(prev => {
//         if (prev.includes(quoteId)) {
//           return prev.filter(id => id !== quoteId);
//         } else {
//           return [...prev, quoteId];
//         }
//       });
//     } catch (error) {
//       console.error('Error toggling favorite:', error);
//     }
//   };

//   const renderQuoteItem = ({ item }: { item: Quote }) => (
//     <TouchableOpacity
//       style={styles.quoteCard}
//       onPress={() => navigation.navigate('QuoteDetail', { quote: item })}
//     >
//     <Text style={styles.quoteText}>
//   &ldquo;{item.text}&rdquo;
// </Text>

//       <View style={styles.quoteFooter}>
//         <Text style={styles.quoteAuthor}>— {item.author}</Text>
//         <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
//           <Icon
//             name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
//             size={20}
//             color={favorites.includes(item.id) ? '#FF3B30' : '#999'}
//           />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.categoryBadge}>
//         <Text style={styles.categoryText}>{item.category}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderCategoryItem = ({ item }: { item: typeof CATEGORIES[0] }) => (
//     <TouchableOpacity
//       style={[
//         styles.categoryChip,
//         selectedCategory === item.value && styles.categoryChipSelected,
//       ]}
//       onPress={() => setSelectedCategory(item.value)}
//     >
//       <Text
//         style={[
//           styles.categoryChipText,
//           selectedCategory === item.value && styles.categoryChipTextSelected,
//         ]}
//       >
//         {item.label}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Daily Inspiration</Text>
//         <TouchableOpacity
//           style={styles.favoritesButton}
//           onPress={() => navigation.navigate('Favorites')}
//         >
//           <Icon name="heart" size={24} color="#FF3B30" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.categoriesContainer}>
//         <FlatList
//           data={CATEGORIES}
//           renderItem={renderCategoryItem}
//           keyExtractor={(item) => item.value}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.categoriesList}
//         />
//       </View>

//       <FlatList
//         data={quotes}
//         renderItem={renderQuoteItem}
//         keyExtractor={(item) => item.id}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
//         }
//         contentContainerStyle={styles.quotesList}
//         ListEmptyComponent={
//           <View style={styles.emptyState}>
//             <Icon name="book-outline" size={60} color="#ccc" />
//             <Text style={styles.emptyStateText}>No quotes found</Text>
//           </View>
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 60,
//     paddingBottom: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   favoritesButton: {
//     padding: 8,
//   },
//   categoriesContainer: {
//     backgroundColor: '#fff',
//     paddingVertical: 10,
//   },
//   categoriesList: {
//     paddingHorizontal: 20,
//   },
//   categoryChip: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: '#f0f0f0',
//     marginRight: 10,
//   },
//   categoryChipSelected: {
//     backgroundColor: '#007AFF',
//   },
//   categoryChipText: {
//     color: '#666',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   categoryChipTextSelected: {
//     color: '#fff',
//   },
//   quotesList: {
//     padding: 20,
//   },
//   quoteCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 20,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   quoteText: {
//     fontSize: 16,
//     color: '#333',
//     lineHeight: 24,
//     marginBottom: 12,
//     fontStyle: 'italic',
//   },
//   quoteFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   quoteAuthor: {
//     fontSize: 14,
//     color: '#666',
//     fontWeight: '500',
//   },
//   categoryBadge: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     backgroundColor: '#f0f7ff',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   categoryText: {
//     fontSize: 12,
//     color: '#007AFF',
//     fontWeight: '500',
//   },
//   emptyState: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: 100,
//   },
//   emptyStateText: {
//     fontSize: 16,
//     color: '#999',
//     marginTop: 10,
//   },
// });

// export default HomeScreen;

import { Quote, QuoteCategory } from '@/lib/supabase';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { favoritesService, quotesService } from '../services/database';

const CATEGORIES: { label: string; value: QuoteCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Motivation', value: 'Motivation' },
  { label: 'Love', value: 'Love' },
  { label: 'Success', value: 'Success' },
  { label: 'Wisdom', value: 'Wisdom' },
  { label: 'Humor', value: 'Humor' },
];

const HomeScreen: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<QuoteCategory | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchQuotes();
    if (user) fetchFavorites();
  }, [selectedCategory, user]);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const category = selectedCategory === 'all' ? undefined : selectedCategory;
      const { data } = await quotesService.getQuotes(category);
      if (data) setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    if (!user) return;
    try {
      const { data } = await favoritesService.getUserFavorites(user.id);
      if (data) setFavorites(data.map(q => q.id));
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchQuotes(), fetchFavorites()]);
    setRefreshing(false);
  };

  const toggleFavorite = async (quoteId: string) => {
    if (!user) {
      router.push({
  pathname: '/auth' as unknown as any,  // suppress strict TS
});// type-safe navigation
      return;
    }

    try {
      await favoritesService.toggleFavorite(user.id, quoteId);
      setFavorites(prev =>
        prev.includes(quoteId) ? prev.filter(id => id !== quoteId) : [...prev, quoteId]
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const renderQuoteItem = ({ item }: { item: Quote }) => (
    <TouchableOpacity
      style={styles.quoteCard}
      onPress={() =>
       router.push({
  pathname: '/quote/[id]' as unknown as any,
  params: { id: item.id },
})

      }
    >
      <Text style={styles.quoteText}>&ldquo;{item.text}&rdquo;</Text>

      <View style={styles.quoteFooter}>
        <Text style={styles.quoteAuthor}>— {item.author}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          <Icon
            name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
            size={20}
            color={favorites.includes(item.id) ? '#FF3B30' : '#999'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }: { item: typeof CATEGORIES[0] }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        selectedCategory === item.value && styles.categoryChipSelected,
      ]}
      onPress={() => setSelectedCategory(item.value)}
    >
      <Text
        style={[
          styles.categoryChipText,
          selectedCategory === item.value && styles.categoryChipTextSelected,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Inspiration</Text>
        <TouchableOpacity
          style={styles.favoritesButton}
          onPress={() =>
           router.push({
  pathname: '/favorites' as unknown as any,
})
 // type-safe favorites
          }
        >
          <Icon name="heart" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={CATEGORIES}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.value}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <FlatList
        data={quotes}
        renderItem={renderQuoteItem}
        keyExtractor={item => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        contentContainerStyle={styles.quotesList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="book-outline" size={60} color="#ccc" />
            <Text style={styles.emptyStateText}>No quotes found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  favoritesButton: { padding: 8 },
  categoriesContainer: { backgroundColor: '#fff', paddingVertical: 10 },
  categoriesList: { paddingHorizontal: 20 },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  categoryChipSelected: { backgroundColor: '#007AFF' },
  categoryChipText: { color: '#666', fontSize: 14, fontWeight: '500' },
  categoryChipTextSelected: { color: '#fff' },
  quotesList: { padding: 20 },
  quoteCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quoteText: { fontSize: 16, color: '#333', lineHeight: 24, marginBottom: 12, fontStyle: 'italic' },
  quoteFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  quoteAuthor: { fontSize: 14, color: '#666', fontWeight: '500' },
  categoryBadge: { position: 'absolute', top: 10, right: 10, backgroundColor: '#f0f7ff', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  categoryText: { fontSize: 12, color: '#007AFF', fontWeight: '500' },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingTop: 100 },
  emptyStateText: { fontSize: 16, color: '#999', marginTop: 10 },
});

export default HomeScreen;
