import { Collection } from '@/lib/supabase';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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

const CollectionsScreen: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user) fetchCollections();
  }, [user]);

  const fetchCollections = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data } = await collectionsService.getUserCollections(user.id);
      if (data) setCollections(data);
    } catch (error) {
      console.error('Error fetching collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchCollections();
    setRefreshing(false);
  };

  const handleDeleteCollection = (collectionId: string, collectionName: string) => {
    Alert.alert(
      'Delete Collection',
      `Are you sure you want to delete "${collectionName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteCollection(collectionId) },
      ]
    );
  };

  const deleteCollection = async (collectionId: string) => {
    try {
      await collectionsService.deleteCollection(collectionId);
      setCollections(collections.filter(c => c.id !== collectionId));
    } catch (error) {
      console.error('Error deleting collection:', error);
      Alert.alert('Error', 'Failed to delete collection');
    }
  };

  const renderCollectionItem = ({ item }: { item: Collection }) => (
    <TouchableOpacity
      style={styles.collectionCard}
      onPress={() =>
        router.push({
          pathname: '/collection/[id]',
          params: { id: item.id, name: item.name }, // send collectionName if needed
        } as any) // TS workaround
      }
      onLongPress={() => handleDeleteCollection(item.id, item.name)}
    >
      <View style={styles.collectionIcon}>
        <Icon name="folder" size={30} color="#007AFF" />
      </View>
      <View style={styles.collectionInfo}>
        <Text style={styles.collectionName}>{item.name}</Text>
        <Text style={styles.collectionCount}>{item.quotes_count ?? 0} quotes</Text>
      </View>
      <Icon name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.authPrompt}>
          <Icon name="log-in-outline" size={60} color="#ccc" />
          <Text style={styles.authPromptText}>Please sign in to view your collections</Text>
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
        <Text style={styles.title}>My Collections</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/create-collection' as any)} // TS workaround
        >
          <Icon name="add" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={collections}
        renderItem={renderCollectionItem}
        keyExtractor={item => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        contentContainerStyle={styles.collectionsList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="folder-outline" size={60} color="#ccc" />
            <Text style={styles.emptyStateText}>No collections yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Create your first collection to organize quotes
            </Text>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => router.push('/create-collection' as any)} // TS workaround
            >
              <Text style={styles.createButtonText}>Create Collection</Text>
            </TouchableOpacity>
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  addButton: { padding: 8 },
  collectionsList: { padding: 20 },
  collectionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  collectionIcon: { width: 50, height: 50, borderRadius: 10, backgroundColor: '#f0f7ff', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  collectionInfo: { flex: 1 },
  collectionName: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 },
  collectionCount: { fontSize: 14, color: '#666' },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingTop: 100 },
  emptyStateText: { fontSize: 18, color: '#333', fontWeight: '600', marginTop: 20 },
  emptyStateSubtext: { fontSize: 14, color: '#666', textAlign: 'center', marginTop: 8, marginBottom: 30 },
  createButton: { backgroundColor: '#007AFF', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 8 },
  createButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default CollectionsScreen;
