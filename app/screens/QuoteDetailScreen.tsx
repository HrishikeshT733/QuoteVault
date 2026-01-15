import { Quote } from '@/lib/supabase';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { collectionsService, favoritesService } from '../services/database';

interface Props {
  quote: Quote;
}

const QuoteDetailScreen: React.FC<Props> = ({ quote }) => {
  const { user } = useAuth();
  const router = useRouter();

  const [isFavorited, setIsFavorited] = useState(false);
  const [userCollections, setUserCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (quote && user) {
      checkIfFavorited();
      fetchUserCollections();
    }
  }, [quote, user]);

  const checkIfFavorited = async () => {
    if (!user || !quote) return;

    try {
      const { data } = await favoritesService.isQuoteFavorited(user.id, quote.id);
      setIsFavorited(!!data);
    } catch (error) {
      console.error('Error checking favorite:', error);
    }
  };

  const fetchUserCollections = async () => {
    if (!user) return;

    try {
      const { data } = await collectionsService.getUserCollections(user.id);
      if (data) setUserCollections(data);
    } catch (error) {
      console.error('Error fetching collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      router.push('/auth' as any); // TS workaround
      return;
    }

    try {
      await favoritesService.toggleFavorite(user.id, quote.id);
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert('Error', 'Failed to update favorites');
    }
  };

  const shareQuote = async () => {
    try {
      await Share.share({
        message: `"${quote.text}" - ${quote.author}`,
      });
    } catch (error) {
      console.error('Error sharing quote:', error);
    }
  };

  const addToCollection = async (collectionId: string) => {
    if (!user) return;

    try {
      await collectionsService.addQuoteToCollection(collectionId, quote.id);
      Alert.alert('Success', 'Quote added to collection!');
    } catch (error) {
      console.error('Error adding to collection:', error);
      Alert.alert('Error', 'Failed to add quote to collection');
    }
  };

  const showAddToCollectionModal = () => {
    if (!user) {
      router.push('/auth' as any);
      return;
    }

    if (userCollections.length === 0) {
      Alert.alert(
        'No Collections',
        "You don't have any collections yet. Would you like to create one?",
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Create Collection',
            onPress: () => router.push(`/create-collection?quoteId=${quote.id}` as any),
          },
        ]
      );
      return;
    }

    Alert.alert(
      'Add to Collection',
      'Select a collection:',
      [
        ...userCollections.map((collection) => ({
          text: `${collection.name} (${collection.quotes_count?.[0]?.count || 0})`,
          onPress: () => addToCollection(collection.id),
        })),
        {
          text: 'Create New',
          onPress: () => router.push(`/create-collection?quoteId=${quote.id}` as any),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  if (!quote) {
    return (
      <View style={styles.container}>
        <Text>Quote not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.quoteContainer}>
        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>&ldquo;{quote.text}&rdquo;</Text>
          <Text style={styles.quoteAuthor}>— {quote.author}</Text>

          <View style={styles.categoryContainer}>
            <View style={styles.categoryBadge}>
              <Icon name="pricetag" size={14} color="#007AFF" />
              <Text style={styles.categoryText}>{quote.category}</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, isFavorited && styles.favoritedButton]}
            onPress={toggleFavorite}
          >
            <Icon
              name={isFavorited ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorited ? '#FF3B30' : '#333'}
            />
            <Text style={[styles.actionButtonText, isFavorited && styles.favoritedButtonText]}>
              {isFavorited ? 'Favorited' : 'Favorite'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={showAddToCollectionModal}>
            <Icon name="folder-outline" size={24} color="#333" />
            <Text style={styles.actionButtonText}>Add to Collection</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={shareQuote}>
            <Icon name="share-outline" size={24} color="#333" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  quoteContainer: { padding: 20 },
  quoteCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  quoteText: { fontSize: 20, color: '#333', lineHeight: 32, fontStyle: 'italic', marginBottom: 20 },
  quoteAuthor: { fontSize: 18, color: '#666', fontWeight: '600', textAlign: 'right', marginBottom: 20 },
  categoryContainer: { flexDirection: 'row', justifyContent: 'flex-start' },
  categoryBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f7ff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  categoryText: { fontSize: 14, color: '#007AFF', fontWeight: '500', marginLeft: 6 },
  actionsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 30, paddingHorizontal: 10 },
  actionButton: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 100,
  },
  favoritedButton: { backgroundColor: '#fff5f5' },
  actionButtonText: { marginTop: 8, fontSize: 12, color: '#666', fontWeight: '500' },
  favoritedButtonText: { color: '#FF3B30' },
});

export default QuoteDetailScreen;
