import { Ionicons as Icon } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { collectionsService } from '../services/database';

const CreateCollectionScreen: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { quoteId } = useLocalSearchParams<{ quoteId?: string }>();

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateCollection = async () => {
    if (!user) {
      Alert.alert('Error', 'Please sign in to create collections');
      router.push('/auth' as any); // TS workaround
      return;
    }

    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a collection name');
      return;
    }

    setLoading(true);
    try {
      const { data: collection, error } = await collectionsService.createCollection(
        name.trim(),
        user.id
      );

      if (error) throw error;

      // If a quoteId is passed, add it to the new collection
      if (quoteId && collection) {
        await collectionsService.addQuoteToCollection(collection.id, quoteId);
      }

      Alert.alert('Success', `Collection "${name}" created successfully!`, [
        {
          text: 'OK',
          onPress: () => {
            if (quoteId) {
              // Go back twice if coming from a quote
              router.back(); // back from create screen
              router.back(); // back from quote detail
            } else {
              router.back();
            }
          },
        },
      ]);
    } catch (error: any) {
      console.error('Error creating collection:', error);
      Alert.alert('Error', error.message || 'Failed to create collection');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>New Collection</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Icon name="folder-outline" size={24} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Collection name"
              value={name}
              onChangeText={setName}
              autoFocus
              maxLength={50}
              editable={!loading}
            />
          </View>

          <Text style={styles.hint}>
            {quoteId
              ? 'This quote will be added to your new collection'
              : 'You can add quotes to this collection later'}
          </Text>

          <TouchableOpacity
            style={[styles.createButton, (!name.trim() || loading) && styles.createButtonDisabled]}
            onPress={handleCreateCollection}
            disabled={!name.trim() || loading}
          >
            <Text style={styles.createButtonText}>
              {loading ? 'Creating...' : 'Create Collection'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

// --- Styles (unchanged) ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 40 },
  backButton: { padding: 8 },
  title: { flex: 1, fontSize: 24, fontWeight: 'bold', color: '#333', marginLeft: 10 },
  headerRight: { width: 40 },
  form: { flex: 1 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 12, backgroundColor: '#f9f9f9', marginBottom: 20 },
  inputIcon: { padding: 15 },
  input: { flex: 1, padding: 15, fontSize: 16 },
  hint: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 30 },
  createButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 12, alignItems: 'center' },
  createButtonDisabled: { backgroundColor: '#ccc' },
  createButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default CreateCollectionScreen;
