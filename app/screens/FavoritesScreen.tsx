import { Quote } from '@/lib/supabase';
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
import { favoritesService } from '../services/database';

const FavoritesScreen: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [favorites, setFavorites] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user) fetchFavorites();
  }, [user]);

  const fetchFavorites = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data } = await favoritesService.getUserFavorites(user.id);
      if (data) setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchFavorites();
    setRefreshing(false);
  };

  const removeFromFavorites = async (quoteId: string) => {
    if (!user) return;

    try {
      await favoritesService.removeFavorite(user.id, quoteId);
      setFavorites(favorites.filter(q => q.id !== quoteId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const renderFavoriteItem = ({ item }: { item: Quote }) => (
    <TouchableOpacity
      style={styles.quoteCard}
      onPress={() =>
        // TS workaround to allow dynamic quote navigation
        router.push(`/quote/${item.id}` as any)
      }
      onLongPress={() => removeFromFavorites(item.id)}
    >
      <Text style={styles.quoteText}>&ldquo;{item.text}&rdquo;</Text>
      <View style={styles.quoteFooter}>
        <Text style={styles.quoteAuthor}>— {item.author}</Text>
        <TouchableOpacity onPress={() => removeFromFavorites(item.id)}>
          <Icon name="heart" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.authPrompt}>
          <Icon name="heart-outline" size={60} color="#ccc" />
          <Text style={styles.authPromptText}>Sign in to save favorite quotes</Text>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => router.push('/auth' as any)} // TS workaround
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>My Favorites</Text>
        <View style={styles.headerRight} />
      </View>

      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={item => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        contentContainerStyle={styles.favoritesList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="heart-outline" size={60} color="#ccc" />
            <Text style={styles.emptyStateText}>No favorites yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Tap the heart icon on quotes to add them here
            </Text>
          </View>
        }
      />
    </View>
  );
};

// --- Styles (unchanged) ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  authPrompt: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  authPromptText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 20, marginBottom: 30 },
  signInButton: { backgroundColor: '#007AFF', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 8 },
  signInButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20, backgroundColor: '#fff' },
  backButton: { padding: 8 },
  title: { flex: 1, fontSize: 24, fontWeight: 'bold', color: '#333', marginLeft: 10 },
  headerRight: { width: 40 },
  favoritesList: { padding: 20 },
  quoteCard: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  quoteText: { fontSize: 14, color: '#333', lineHeight: 22, marginBottom: 10, fontStyle: 'italic' },
  quoteFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  quoteAuthor: { fontSize: 13, color: '#666', fontWeight: '500' },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingTop: 100 },
  emptyStateText: { fontSize: 18, color: '#333', fontWeight: '600', marginTop: 20 },
  emptyStateSubtext: { fontSize: 14, color: '#666', textAlign: 'center', marginTop: 8 },
});

export default FavoritesScreen;
