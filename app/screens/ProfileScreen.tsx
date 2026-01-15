import { Ionicons as Icon } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { profilesService } from '../services/database';

const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const { user, profile, signOut, refreshProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) setUsername(profile.username || '');
  }, [profile]);

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: signOut },
    ]);
  };

  const handleSaveUsername = async () => {
    if (!user || !username.trim()) return;

    setLoading(true);
    try {
      const { data: isAvailable } = await profilesService.isUsernameAvailable(username);

      if (!isAvailable && username !== profile?.username) {
        Alert.alert('Error', 'Username is already taken');
        return;
      }

      await profilesService.updateUsername(user.id, username.trim());
      await refreshProfile();
      setIsEditing(false);
      Alert.alert('Success', 'Username updated successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update username');
    } finally {
      setLoading(false);
    }
  };

  const getInitials = () => {
    if (profile?.username) return profile.username[0].toUpperCase();
    if (user?.email) return user.email[0].toUpperCase();
    return 'U';
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.authPrompt}>
          <Icon name="person-outline" size={60} color="#ccc" />
          <Text style={styles.authPromptText}>Please sign in to view your profile</Text>
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            {profile?.avatar_url ? (
              <Image source={{ uri: profile.avatar_url }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>{getInitials()}</Text>
            )}
          </View>
        </View>

        {isEditing ? (
          <View style={styles.usernameEditContainer}>
            <TextInput
              style={styles.usernameInput}
              value={username}
              onChangeText={setUsername}
              autoFocus
              maxLength={30}
              placeholder="Enter username"
            />
            <View style={styles.editActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setIsEditing(false);
                  setUsername(profile?.username || '');
                }}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveUsername}
                disabled={loading || !username.trim()}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.saveButtonText}>Save</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>{profile?.username || 'Set Username'}</Text>
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Icon name="pencil" size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Icon name="log-out-outline" size={24} color="#FF3B30" />
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },

  authPrompt: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 100 },
  authPromptText: { fontSize: 16, color: '#666', marginVertical: 20 },
  signInButton: { backgroundColor: '#007AFF', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 8 },
  signInButtonText: { color: '#fff', fontWeight: '600' },

  header: { alignItems: 'center', padding: 40, backgroundColor: '#fff' },
  avatarContainer: { marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#007AFF', alignItems: 'center', justifyContent: 'center' },
  avatarImage: { width: '100%', height: '100%', borderRadius: 50 },
  avatarText: { fontSize: 40, color: '#fff', fontWeight: 'bold' },

  usernameContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  username: { fontSize: 24, fontWeight: 'bold' },

  usernameEditContainer: { width: '80%', marginBottom: 10 },
  usernameInput: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, textAlign: 'center', marginBottom: 10 },
  editActions: { flexDirection: 'row', justifyContent: 'center', gap: 12 },
  cancelButton: { padding: 10 },
  cancelButtonText: { color: '#666' },
  saveButton: { backgroundColor: '#007AFF', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 6 },
  saveButtonText: { color: '#fff', fontWeight: '600' },

  userEmail: { color: '#666', marginTop: 8 },

  signOutButton: { margin: 20, padding: 16, borderWidth: 1, borderColor: '#FF3B30', borderRadius: 10, flexDirection: 'row', justifyContent: 'center', gap: 10 },
  signOutButtonText: { color: '#FF3B30', fontWeight: '600' },
});

export default ProfileScreen;
