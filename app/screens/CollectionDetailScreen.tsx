// import { Collection, Quote } from '@/lib/supabase';
// import { Ionicons as Icon } from '@expo/vector-icons';
// import { RouteProp } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import React, { useEffect, useState } from 'react';
// import {
//     Alert,
//     FlatList,
//     RefreshControl,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';
// import { useAuth } from '../contexts/AuthContext';
// import { collectionsService } from '../services/database';

// type CollectionDetailScreenNavigationProp = StackNavigationProp<any>;
// type CollectionDetailScreenRouteProp = RouteProp<any, 'CollectionDetail'>;

// interface Props {
//   navigation: CollectionDetailScreenNavigationProp;
//   route: CollectionDetailScreenRouteProp;
// }

// const CollectionDetailScreen: React.FC<Props> = ({ navigation, route }) => {
//   const { user } = useAuth();
//   const { collectionId, collectionName } = route.params ?? {};

  
//   const [collection, setCollection] = useState<Collection | null>(null);
//   const [quotes, setQuotes] = useState<Quote[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     fetchCollectionDetails();
//   }, [collectionId]);

//   const fetchCollectionDetails = async () => {
//     setLoading(true);
//     try {
//       const { data } = await collectionsService.getCollectionWithQuotes(collectionId);
//       if (data) {
//         setCollection(data);
//         setQuotes(data.quotes || []);
//       }
//     } catch (error) {
//       console.error('Error fetching collection:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await fetchCollectionDetails();
//     setRefreshing(false);
//   };

//   const handleRemoveQuote = (quoteId: string, quoteText: string) => {
//     Alert.alert(
//       'Remove Quote',
//       `Remove "${quoteText.substring(0, 50)}..." from collection?`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Remove',
//           style: 'destructive',
//           onPress: () => removeQuote(quoteId),
//         },
//       ]
//     );
//   };

//   const removeQuote = async (quoteId: string) => {
//     try {
//       await collectionsService.removeQuoteFromCollection(collectionId, quoteId);
//       setQuotes(quotes.filter(q => q.id !== quoteId));
//     } catch (error) {
//       console.error('Error removing quote:', error);
//       Alert.alert('Error', 'Failed to remove quote from collection');
//     }
//   };

//   const renderQuoteItem = ({ item }: { item: Quote }) => (
//     <TouchableOpacity
//       style={styles.quoteCard}
//       onPress={() => navigation.navigate('QuoteDetail', { quote: item })}
//       onLongPress={() => handleRemoveQuote(item.id, item.text)}
//     >
//      <Text style={styles.quoteText}>
//   &ldquo;{item.text}&rdquo;
// </Text>

//       <View style={styles.quoteFooter}>
//         <Text style={styles.quoteAuthor}>— {item.author}</Text>
//         <View style={styles.quoteActions}>
//           <TouchableOpacity
//             style={styles.actionIcon}
//             onPress={() => handleRemoveQuote(item.id, item.text)}
//           >
//             <Icon name="trash-outline" size={18} color="#FF3B30" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Icon name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <View style={styles.headerInfo}>
//           <Text style={styles.title} numberOfLines={1}>
//             {collectionName || collection?.name}
//           </Text>
//           <Text style={styles.subtitle}>
//             {quotes.length} {quotes.length === 1 ? 'quote' : 'quotes'}
//           </Text>
//         </View>
//         <View style={styles.headerRight} />
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
//             <Icon name="document-outline" size={60} color="#ccc" />
//             <Text style={styles.emptyStateText}>No quotes in this collection</Text>
//             <Text style={styles.emptyStateSubtext}>
//               Add quotes from the quotes library
//             </Text>
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
//     alignItems: 'center',
//     paddingTop: 60,
//     paddingBottom: 20,
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//   },
//   backButton: {
//     padding: 8,
//   },
//   headerInfo: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 4,
//   },
//   headerRight: {
//     width: 40,
//   },
//   quotesList: {
//     padding: 20,
//   },
//   quoteCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   quoteText: {
//     fontSize: 14,
//     color: '#333',
//     lineHeight: 22,
//     marginBottom: 10,
//     fontStyle: 'italic',
//   },
//   quoteFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   quoteAuthor: {
//     fontSize: 13,
//     color: '#666',
//     fontWeight: '500',
//   },
//   quoteActions: {
//     flexDirection: 'row',
//   },
//   actionIcon: {
//     padding: 4,
//   },
//   emptyState: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: 100,
//   },
//   emptyStateText: {
//     fontSize: 16,
//     color: '#333',
//     fontWeight: '600',
//     marginTop: 20,
//   },
//   emptyStateSubtext: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//     marginTop: 8,
//   },
// });

// export default CollectionDetailScreen;

import { Collection, Quote } from '@/lib/supabase';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { collectionsService } from '../services/database';

const CollectionDetailScreen: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { id: collectionId, name: collectionName } = useLocalSearchParams<{ id: string; name?: string }>();

  const [collection, setCollection] = useState<Collection | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (collectionId) fetchCollectionDetails();
  }, [collectionId]);

  const fetchCollectionDetails = async () => {
    setLoading(true);
    try {
      const { data } = await collectionsService.getCollectionWithQuotes(collectionId!);
      if (data) {
        setCollection(data);
        setQuotes(data.quotes || []);
      }
    } catch (error) {
      console.error('Error fetching collection:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchCollectionDetails();
    setRefreshing(false);
  };

  const handleRemoveQuote = (quoteId: string, quoteText: string) => {
    Alert.alert(
      'Remove Quote',
      `Remove "${quoteText.substring(0, 50)}..." from collection?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => removeQuote(quoteId) },
      ]
    );
  };

  const removeQuote = async (quoteId: string) => {
    try {
      await collectionsService.removeQuoteFromCollection(collectionId!, quoteId);
      setQuotes(quotes.filter(q => q.id !== quoteId));
    } catch (error) {
      console.error('Error removing quote:', error);
      Alert.alert('Error', 'Failed to remove quote from collection');
    }
  };

  const renderQuoteItem = ({ item }: { item: Quote }) => (
    <TouchableOpacity
      style={styles.quoteCard}
      onPress={() => router.push(`/quote/${item.id}` as any)} // Expo Router
      onLongPress={() => handleRemoveQuote(item.id, item.text)}
    >
      <Text style={styles.quoteText}>&ldquo;{item.text}&rdquo;</Text>

      <View style={styles.quoteFooter}>
        <Text style={styles.quoteAuthor}>— {item.author}</Text>
        <View style={styles.quoteActions}>
          <TouchableOpacity style={styles.actionIcon} onPress={() => handleRemoveQuote(item.id, item.text)}>
            <Icon name="trash-outline" size={18} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <Text style={styles.title} numberOfLines={1}>
            {collectionName || collection?.name}
          </Text>
          <Text style={styles.subtitle}>
            {quotes.length} {quotes.length === 1 ? 'quote' : 'quotes'}
          </Text>
        </View>

        <View style={styles.headerRight} />
      </View>

      <FlatList
        data={quotes}
        renderItem={renderQuoteItem}
        keyExtractor={item => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        contentContainerStyle={styles.quotesList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="document-outline" size={60} color="#ccc" />
            <Text style={styles.emptyStateText}>No quotes in this collection</Text>
            <Text style={styles.emptyStateSubtext}>Add quotes from the quotes library</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20, backgroundColor: '#fff' },
  backButton: { padding: 8 },
  headerInfo: { flex: 1, marginLeft: 10 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  headerRight: { width: 40 },
  quotesList: { padding: 20 },
  quoteCard: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  quoteText: { fontSize: 14, color: '#333', lineHeight: 22, marginBottom: 10, fontStyle: 'italic' },
  quoteFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  quoteAuthor: { fontSize: 13, color: '#666', fontWeight: '500' },
  quoteActions: { flexDirection: 'row' },
  actionIcon: { padding: 4 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingTop: 100 },
  emptyStateText: { fontSize: 16, color: '#333', fontWeight: '600', marginTop: 20 },
  emptyStateSubtext: { fontSize: 14, color: '#666', textAlign: 'center', marginTop: 8 },
});

export default CollectionDetailScreen;
