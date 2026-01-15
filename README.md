QuoteFault - Quote Management App 📚
A modern, full-featured React Native mobile application for collecting, organizing, and managing inspirational quotes. Built with Expo, Supabase, and TypeScript.

https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white
https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white
https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white

🌟 Features
🔐 Secure Authentication - Email/password auth with Supabase

💖 Favorite Quotes - Save your favorite quotes for quick access

📁 Collections - Create custom collections to organize quotes

🔍 Search & Filter - Find quotes by category or search term

👤 User Profiles - Customizable profiles with stats

📱 Cross-Platform - Works on iOS, Android, and web

🎨 Beautiful UI - Modern, clean interface with smooth animations

🔄 Real-time Updates - Instant sync with Supabase backend

📱 Screens
Login	Sign Up	Home	Collections
https://via.placeholder.com/150x300/007AFF/FFFFFF?text=Login	https://via.placeholder.com/150x300/34C759/FFFFFF?text=Sign+Up	https://via.placeholder.com/150x300/5856D6/FFFFFF?text=Home	https://via.placeholder.com/150x300/FF9500/FFFFFF?text=Collections
Profile	Quote Details	Favorites	Create Collection
https://via.placeholder.com/150x300/FF2D55/FFFFFF?text=Profile	https://via.placeholder.com/150x300/5AC8FA/FFFFFF?text=Quote	https://via.placeholder.com/150x300/FF3B30/FFFFFF?text=Favs	https://via.placeholder.com/150x300/4CD964/FFFFFF?text=Create
🚀 Quick Start
Prerequisites
Node.js 16+ and npm/yarn

Expo CLI (npm install -g expo-cli)

iOS Simulator (Mac) or Android Studio (Android)

Supabase account (free)

Installation
Clone the repository

bash
git clone https://github.com/yourusername/quotefault.git
cd quotefault
Install dependencies

bash
npm install
# or
yarn install
Set up environment variables

bash
cp .env.example .env.local
Edit .env.local with your Supabase credentials:

env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
Set up Supabase database

Create a new project at Supabase

Run the SQL schema from database/schema.sql in the SQL editor

Enable Row Level Security (RLS) and configure policies

Note your project URL and anon key

Run the app

bash
# Start development server
npx expo start

# For iOS
npx expo start --ios

# For Android
npx expo start --android

# For web
npx expo start --web
🏗️ Project Structure
text
quotefault/
├── app/                    # Expo Router file-based routing
│   ├── (auth)/            # Authentication screens (login, signup, reset)
│   ├── (tabs)/            # Main tab navigation
│   │   ├── index.tsx      # Home screen
│   │   ├── explore.tsx    # Explore/Quotes screen
│   │   ├── collections.tsx # Collections screen
│   │   ├── favorites.tsx  # Favorites screen
│   │   ├── profile.tsx    # Profile screen
│   │   └── _layout.tsx    # Tab layout configuration
│   ├── collection/        # Collection routes
│   │   └── [id].tsx       # Collection detail (dynamic)
│   ├── quote/             # Quote routes
│   │   └── [id].tsx       # Quote detail (dynamic)
│   ├── create-collection.tsx # Create collection modal
│   └── _layout.tsx        # Root layout with AuthProvider
├── components/            # Reusable UI components
├── contexts/              # React Context providers
│   └── AuthContext.tsx    # Authentication state
├── lib/                   # Configuration and utilities
│   └── supabase.ts        # Supabase client configuration
├── screens/               # Screen components (not routes)
│   ├── HomeScreen.tsx
│   ├── QuotesScreen.tsx
│   ├── CollectionsScreen.tsx
│   ├── CollectionDetailScreen.tsx
│   ├── CreateCollectionScreen.tsx
│   ├── FavoritesScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── QuoteDetailScreen.tsx
│   └── LoadingScreen.tsx
├── services/              # Business logic and API calls
│   └── database.ts        # Database service layer
├── assets/                # Images, fonts, icons
├── constants/             # App constants and themes
├── hooks/                 # Custom React hooks
└── database/              # Database schema and migrations
    └── schema.sql         # Supabase SQL schema
📊 Database Schema
The app uses Supabase with the following tables:

Tables
profiles - User profiles

quotes - Quote data (text, author, category)

collections - User collections

favorites - User favorite quotes

collection_quotes - Junction table for collections and quotes

Schema SQL
sql
-- Full schema available in database/schema.sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Motivation', 'Love', 'Success', 'Wisdom', 'Humor')),
  created_at TIMESTAMP DEFAULT NOW()
);
-- ... see full schema in database/schema.sql
🔧 Configuration
Supabase Setup
Create a new project at supabase.com

Run the SQL schema from database/schema.sql

Enable Email Authentication in Auth settings

Configure RLS policies for security

Get your credentials from Settings → API

Environment Variables
Variable	Description	Required
EXPO_PUBLIC_SUPABASE_URL	Your Supabase project URL	Yes
EXPO_PUBLIC_SUPABASE_ANON_KEY	Your Supabase anonymous key	Yes
EXPO_PUBLIC_DEEP_LINK_SCHEME	Custom URL scheme for deep linking	No
App Configuration
Update these files for customization:

app.json - App name, slug, schemes

constants/Colors.ts - App color scheme

constants/Theme.ts - Design tokens

🎨 Styling & Theming
The app uses a consistent design system:

Colors: Defined in constants/Colors.ts

Typography: Consistent font scales

Spacing: 8px base unit system

Components: Reusable with props for customization

Customizing Theme
typescript
// constants/Colors.ts
export const Colors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  background: '#FFFFFF',
  text: '#333333',
  // ... add your colors
};
🚀 Deployment
Building for Production
bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android

# Build for web
expo build:web
OTA Updates (EAS)
bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure
eas build:configure

# Build
eas build --platform ios
eas build --platform android
📱 Platform Specific Notes
iOS
Uses SafeAreaView for notch handling

Supports Face ID/Touch ID (future)

Requires proper entitlements for deep links

Android
Material Design components

Back button handling

Requires proper intent filters for deep links

Web
Responsive design

PWA support

Different storage implementation

🔒 Security
Row Level Security (RLS): All tables have RLS enabled

Authentication: Supabase Auth with email/password

Password Reset: Secure password reset flow

Session Management: Automatic token refresh

Input Validation: Client-side validation for all forms

📚 API Documentation
Services
The app uses these service functions:

typescript
// Quotes
quotesService.getQuotes(category?, search?)
quotesService.getQuote(id)

// Collections
collectionsService.getUserCollections(userId)
collectionsService.createCollection(name, userId)

// Favorites
favoritesService.getUserFavorites(userId)
favoritesService.toggleFavorite(userId, quoteId)

// Profiles
profilesService.getProfile(userId)
profilesService.updateUsername(userId, username)
Hooks
typescript
// Authentication
const { user, session, signOut } = useAuth()

// Navigation
const router = useRouter()
const { id } = useLocalSearchParams()
🐛 Troubleshooting
Common Issues
"window is not defined" error

bash
# Clear cache and reinstall
rm -rf node_modules/.cache
npm install
npx expo start --clear
Supabase connection errors

Check environment variables

Verify Supabase project is running

Check network connectivity

Build errors

bash
# Clean install
rm -rf node_modules package-lock.json
npm install
Database permissions

Ensure RLS policies are correctly set

Check if user is authenticated

Verify table relationships

Debugging
bash
# Enable debug logging
EXPO_DEBUG=true npx expo start

# Check logs
npx expo logs

# Run tests
npm test
🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository

Create a feature branch

bash
git checkout -b feature/amazing-feature
Commit your changes

bash
git commit -m 'Add amazing feature'
Push to the branch

bash
git push origin feature/amazing-feature
Open a Pull Request

Development Guidelines
Write TypeScript with strict mode

Follow existing code style

Add tests for new features

Update documentation

Use meaningful commit messages

Code Style
typescript
// Use functional components
const MyComponent: React.FC<Props> = () => {
  // Hooks at the top
  const [state, setState] = useState()
  
  // Effects next
  useEffect(() => { }, [])
  
  // Handler functions
  const handlePress = () => { }
  
  // Return JSX
  return <View />
}
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Expo for the amazing React Native framework

Supabase for the backend and auth

React Native Community

Expo Router for file-based routing

Ionicons for beautiful icons
