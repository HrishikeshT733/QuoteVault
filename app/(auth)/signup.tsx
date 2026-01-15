// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { Link, router } from 'expo-router';
// import { useAuth } from '../contexts/AuthContext';

// export default function SignupScreen() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { signUp } = useAuth();

//   const handleSignup = async () => {
//     if (!email || !password || !confirmPassword || !username) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     if (password.length < 6) {
//       Alert.alert('Error', 'Password must be at least 6 characters');
//       return;
//     }

//     setLoading(true);
//     const { error } = await signUp(email, password, username);
//     setLoading(false);

//     if (error) {
//       Alert.alert('Signup Failed', error);
//     } else {
//       Alert.alert(
//         'Success',
//         'Account created! Please check your email to confirm your account.',
//         [{ text: 'OK', onPress: () => router.push('/(auth)/login') }]
//       );
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create Account</Text>

//       <View style={styles.form}>
//         <TextInput
//           style={styles.input}
//           placeholder="Username"
//           value={username}
//           onChangeText={setUsername}
//           autoCapitalize="none"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//           autoCapitalize="none"
//           keyboardType="email-address"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//           secureTextEntry
//         />

//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleSignup}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>Sign Up</Text>
//           )}
//         </TouchableOpacity>

//         <View style={styles.footer}>
//           <Text style={styles.footerText}>Already have an account? </Text>
//           <Link href="/(auth)/login" asChild>
//             <TouchableOpacity>
//               <Text style={styles.link}>Sign In</Text>
//             </TouchableOpacity>
//           </Link>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 30,
//     color: '#3b82f6',
//   },
//   form: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: '#3b82f6',
//     height: 50,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   link: {
//     color: '#3b82f6',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//     paddingTop: 20,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//   },
//   footerText: {
//     color: '#666',
//     fontSize: 16,
//   },
// });






// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Alert,
// //   ActivityIndicator,
// // } from 'react-native';
// // import { Link, router } from 'expo-router';
// // import { useAuth } from '../contexts/AuthContext';

// // export default function SignupScreen() {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [username, setUsername] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
// //   const { signUp } = useAuth();

// //   const validateForm = () => {
    
// //     if (!email || !password || !confirmPassword || !username) {
// //       Alert.alert('Error', 'Please fill in all fields');
// //       return false;
// //     }

// //     if (!email.includes('@')) {
// //       Alert.alert('Error', 'Please enter a valid email address');
// //       return false;
// //     }

// //     if (password !== confirmPassword) {
// //       Alert.alert('Error', 'Passwords do not match');
// //       return false;
// //     }

// //     if (password.length < 6) {
// //       Alert.alert('Error', 'Password must be at least 6 characters');
// //       return false;
// //     }

// //     return true;
// //   };

// //   const handleSignup = async () => {
// //     console.log('Button clicked'); 
// //     if (!validateForm()) return;
    
// //     if (isButtonDisabled) {
// //       Alert.alert('Please wait', 'You can only attempt signup once every 30 seconds');
// //       return;
// //     }

// //     setLoading(true);
// //     setIsButtonDisabled(true);
    
// //     try {
// //       const { error } = await signUp(email, password, username);
      
// //       if (error) {
// //         // Check for rate limit error
// //         if (error.includes('429') || error.includes('Too Many Requests') || error.includes('rate limit')) {
// //           Alert.alert(
// //             'Rate Limit Exceeded',
// //             'Too many signup attempts. Please wait 5 minutes and try again.',
// //             [{ text: 'OK' }]
// //           );
// //           // Disable button for 5 minutes
// //           setTimeout(() => setIsButtonDisabled(false), 300000);
// //         } else if (error.includes('User already registered')) {
// //           Alert.alert('Error', 'An account with this email already exists. Please login instead.');
// //           router.push('/(auth)/login');
// //         } else {
// //           Alert.alert('Signup Failed', error);
// //           setIsButtonDisabled(false);
// //         }
// //       } else {
// //         Alert.alert(
// //           'Success',
// //           'Account created! Please check your email to confirm your account.',
// //           [{ text: 'OK', onPress: () => router.push('/(auth)/login') }]
// //         );
// //         // Reset form
// //         setEmail('');
// //         setPassword('');
// //         setConfirmPassword('');
// //         setUsername('');
// //       }
// //     } catch (error) {
// //       Alert.alert('Error', 'Something went wrong. Please try again.');
// //       setIsButtonDisabled(false);
// //     } finally {
// //       setLoading(false);
// //       // Re-enable button after 30 seconds (unless rate limited)
// //       if (!isButtonDisabled) {
// //         setTimeout(() => setIsButtonDisabled(false), 30000);
// //       }
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Create Account</Text>

// //       <View style={styles.form}>
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Username"
// //           value={username}
// //           onChangeText={setUsername}
// //           autoCapitalize="none"
// //           editable={!loading && !isButtonDisabled}
// //         />
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Email"
// //           value={email}
// //           onChangeText={setEmail}
// //           autoCapitalize="none"
// //           keyboardType="email-address"
// //           editable={!loading && !isButtonDisabled}
// //         />
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Password"
// //           value={password}
// //           onChangeText={setPassword}
// //           secureTextEntry
// //           editable={!loading && !isButtonDisabled}
// //         />
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Confirm Password"
// //           value={confirmPassword}
// //           onChangeText={setConfirmPassword}
// //           secureTextEntry
// //           editable={!loading && !isButtonDisabled}
// //         />

// //         <TouchableOpacity
// //           style={[
// //             styles.button,
// //             (loading || isButtonDisabled) && styles.buttonDisabled
// //           ]}
// //           onPress={handleSignup}
// //           disabled={loading || isButtonDisabled}
// //         >
// //           {loading ? (
// //             <ActivityIndicator color="#fff" />
// //           ) : (
// //             <Text style={styles.buttonText}>
// //               {isButtonDisabled ? 'Please Wait...' : 'Sign Up'}
// //             </Text>
// //           )}
// //         </TouchableOpacity>

// //         {isButtonDisabled && (
// //           <Text style={styles.cooldownText}>
// //             Signup is temporarily disabled to prevent rate limiting.
// //             Please wait a moment before trying again.
// //           </Text>
// //         )}

// //         <View style={styles.footer}>
// //           <Text style={styles.footerText}>Already have an account? </Text>
// //           <Link href="/(auth)/login" asChild>
// //             <TouchableOpacity disabled={loading}>
// //               <Text style={styles.link}>Sign In</Text>
// //             </TouchableOpacity>
// //           </Link>
// //         </View>
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     paddingHorizontal: 20,
// //     backgroundColor: '#f5f5f5',
// //   },
// //   title: {
// //     fontSize: 28,
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //     marginBottom: 30,
// //     color: '#3b82f6',
// //   },
// //   form: {
// //     backgroundColor: '#fff',
// //     padding: 20,
// //     borderRadius: 10,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 3,
// //   },
// //   input: {
// //     height: 50,
// //     borderWidth: 1,
// //     borderColor: '#ddd',
// //     borderRadius: 8,
// //     paddingHorizontal: 15,
// //     marginBottom: 15,
// //     fontSize: 16,
// //   },
// //   button: {
// //     backgroundColor: '#3b82f6',
// //     height: 50,
// //     borderRadius: 8,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginTop: 10,
// //   },
// //   buttonDisabled: {
// //     backgroundColor: '#9ca3af',
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontSize: 18,
// //     fontWeight: '600',
// //   },
// //   link: {
// //     color: '#3b82f6',
// //     fontSize: 16,
// //     fontWeight: '600',
// //   },
// //   footer: {
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     marginTop: 20,
// //     paddingTop: 20,
// //     borderTopWidth: 1,
// //     borderTopColor: '#eee',
// //   },
// //   footerText: {
// //     color: '#666',
// //     fontSize: 16,
// //   },
// //   cooldownText: {
// //     marginTop: 10,
// //     textAlign: 'center',
// //     color: '#ef4444',
// //     fontSize: 12,
// //     fontStyle: 'italic',
// //   },
// // });

import { supabase } from '@/lib/supabase';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { profilesService } from '../services/database';

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const errors: string[] = [];

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.push('Email is required');
    } else if (!emailRegex.test(email)) {
      errors.push('Please enter a valid email address');
    }

    // Username validation
    if (username.trim()) {
      if (username.length < 3) {
        errors.push('Username must be at least 3 characters');
      }
      if (username.length > 30) {
        errors.push('Username must be less than 30 characters');
      }
      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      if (!usernameRegex.test(username)) {
        errors.push('Username can only contain letters, numbers, and underscores');
      }
    }

    // Password validation
    if (!password) {
      errors.push('Password is required');
    } else if (password.length < 6) {
      errors.push('Password must be at least 6 characters');
    } else if (password !== confirmPassword) {
      errors.push('Passwords do not match');
    }

    return errors;
  };

  const checkUsernameAvailability = async (username: string) => {
    if (!username.trim()) return true;
    
    try {
      const { data } = await profilesService.isUsernameAvailable(username.trim());
      return data;
    } catch (error) {
      console.error('Error checking username:', error);
      return false;
    }
  };

  const handleSignUp = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      Alert.alert('Validation Error', errors.join('\n'));
      return;
    }

    // Check username availability
    if (username.trim()) {
      const isAvailable = await checkUsernameAvailability(username);
      if (!isAvailable) {
        Alert.alert('Username Taken', 'This username is already taken. Please choose another one.');
        return;
      }
    }

    setLoading(true);
    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            username: username.trim() || null,
          },
        },
      });

      if (authError) {
        if (authError.message.includes('User already registered')) {
          Alert.alert(
            'Account Exists',
            'An account with this email already exists. Please log in instead.',
            [
              { text: 'Cancel', style: 'cancel' },
              { 
                text: 'Log In', 
                onPress: () => router.push('/(auth)/login')
              },
            ]
          );
        } else {
          Alert.alert('Sign Up Error', authError.message);
        }
        return;
      }

      // If user is created and has username, update profile
      if (authData.user && username.trim()) {
        await profilesService.updateUsername(authData.user.id, username.trim());
      }

      // Show success message
      Alert.alert(
        'Success!',
        'Your account has been created successfully! Please check your email to verify your account.',
        [
          {
            text: 'Continue to Login',
            onPress: () => router.push('/(auth)/login'),
          },
        ]
      );

      // Clear form
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUsername('');
      
    } catch (error: any) {
      console.error('Sign up error:', error);
      Alert.alert('Error', error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join QuoteFault today</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                editable={!loading}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Username (Optional)</Text>
            <Text style={styles.inputHint}>Choose a unique username for your profile</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoComplete="username"
                maxLength={30}
                editable={!loading}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password *</Text>
            <Text style={styles.inputHint}>At least 6 characters</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="new-password"
                editable={!loading}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Confirm Password *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoComplete="new-password"
                editable={!loading}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.signUpButton, loading && styles.signUpButtonDisabled]}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.signUpButtonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By creating an account, you agree to our{' '}
            </Text>
            <TouchableOpacity onPress={() => Alert.alert('Terms', 'Coming soon!')}>
              <Text style={styles.termsLink}>Terms of Service</Text>
            </TouchableOpacity>
            <Text style={styles.termsText}>{' and '}</Text>
            <TouchableOpacity onPress={() => Alert.alert('Privacy', 'Coming soon!')}>
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </TouchableOpacity>
            <Text style={styles.termsText}>.</Text>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text style={styles.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Why Join QuoteFault?</Text>
          <View style={styles.featureItem}>
            <Ionicons name="bookmark-outline" size={20} color="#007AFF" />
            <Text style={styles.featureText}>Save your favorite quotes</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="folder-outline" size={20} color="#007AFF" />
            <Text style={styles.featureText}>Create custom collections</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="person-outline" size={20} color="#007AFF" />
            <Text style={styles.featureText}>Personalized profile</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    width: '100%',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  inputHint: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  inputIcon: {
    padding: 15,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 15,
  },
  signUpButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  signUpButtonDisabled: {
    backgroundColor: '#999',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  termsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
  },
  termsLink: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  features: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
});
