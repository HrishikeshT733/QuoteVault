import {
    Profile,
    Quote,
    QuoteCategory,
    supabase
} from "@/lib/supabase";


// Quotes Service
export const quotesService = {
  // Get all quotes with optional filtering
  async getQuotes(category?: QuoteCategory, search?: string) {
    let query = supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.or(`text.ilike.%${search}%,author.ilike.%${search}%`);
    }

    const { data, error } = await query;
    return { data, error };
  },

  // Get single quote
  async getQuote(id: string) {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .eq('id', id)
      .single();

    return { data, error };
  },

  // Create a new quote
  async createQuote(quote: Omit<Quote, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('quotes')
      .insert([quote])
      .select()
      .single();

    return { data, error };
  },

  // Update a quote
  async updateQuote(id: string, updates: Partial<Quote>) {
    const { data, error } = await supabase
      .from('quotes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  // Delete a quote
  async deleteQuote(id: string) {
    const { error } = await supabase
      .from('quotes')
      .delete()
      .eq('id', id);

    return { error };
  },
};

// Collections Service
export const collectionsService = {
  // Get user's collections
  async getUserCollections(userId: string) {
    const { data, error } = await supabase
      .from('collections')
      .select('*, quotes_count:collection_quotes(count)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    return { data, error };
  },

  // Get collection with quotes
  async getCollectionWithQuotes(collectionId: string) {
    const { data: collection, error: collectionError } = await supabase
      .from('collections')
      .select('*')
      .eq('id', collectionId)
      .single();

    if (collectionError) return { data: null, error: collectionError };

    const { data: quotes, error: quotesError } = await supabase
      .from('collection_quotes')
      .select('quote:quotes(*)')
      .eq('collection_id', collectionId);

    if (quotesError) return { data: null, error: quotesError };

    return {
      data: {
        ...collection,
        quotes: quotes.map((item: any) => item.quote),
      },
      error: null,
    };
  },

  // Create collection
  async createCollection(name: string, userId: string) {
    const { data, error } = await supabase
      .from('collections')
      .insert([{ name, user_id: userId }])
      .select()
      .single();

    return { data, error };
  },

  // Update collection
  async updateCollection(id: string, name: string) {
    const { data, error } = await supabase
      .from('collections')
      .update({ name })
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  // Delete collection
  async deleteCollection(id: string) {
    const { error } = await supabase
      .from('collections')
      .delete()
      .eq('id', id);

    return { error };
  },

  // Add quote to collection
  async addQuoteToCollection(collectionId: string, quoteId: string) {
    const { data, error } = await supabase
      .from('collection_quotes')
      .insert([{ collection_id: collectionId, quote_id: quoteId }])
      .select()
      .single();

    return { data, error };
  },

  // Remove quote from collection
  async removeQuoteFromCollection(collectionId: string, quoteId: string) {
    const { error } = await supabase
      .from('collection_quotes')
      .delete()
      .eq('collection_id', collectionId)
      .eq('quote_id', quoteId);

    return { error };
  },
};

// Favorites Service
export const favoritesService = {
  // Get user's favorites with quote details
  async getUserFavorites(userId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .select('quote:quotes(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) return { data: null, error };

    return {
      data: data.map((item: any) => item.quote),
      error: null,
    };
  },

  // Check if quote is favorited
  async isQuoteFavorited(userId: string, quoteId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .eq('quote_id', quoteId)
      .single();

    // PGRST116 means no rows returned, which is expected when checking existence
    if (error && error.code === 'PGRST116') {
      return { data: false, error: null };
    }

    return { data: !!data, error };
  },

  // Add to favorites
  async addFavorite(userId: string, quoteId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .insert([{ user_id: userId, quote_id: quoteId }])
      .select()
      .single();

    return { data, error };
  },

  // Remove from favorites
  async removeFavorite(userId: string, quoteId: string) {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('quote_id', quoteId);

    return { error };
  },

  // Toggle favorite
  async toggleFavorite(userId: string, quoteId: string) {
    const { data: isFavorited, error: checkError } = await this.isQuoteFavorited(userId, quoteId);

    if (checkError) {
      return { data: null, error: checkError };
    }

    if (isFavorited) {
      const { error } = await this.removeFavorite(userId, quoteId);
      return { data: null, error };
    } else {
      return await this.addFavorite(userId, quoteId);
    }
  },
};

// Profiles Service
export const profilesService = {
  // Get user profile
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    return { data, error };
  },

  // Create or update profile
  async upsertProfile(profile: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .upsert([profile])
      .select()
      .single();

    return { data, error };
  },

  // Update username
  async updateUsername(userId: string, username: string) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ username })
      .eq('id', userId)
      .select()
      .single();

    return { data, error };
  },

  // Update avatar
  async updateAvatar(userId: string, avatarUrl: string) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ avatar_url: avatarUrl })
      .eq('id', userId)
      .select()
      .single();

    return { data, error };
  },

  // Check if username is available
  async isUsernameAvailable(username: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .single();

    return { data: !data, error: error?.code === 'PGRST116' ? null : error };
  },
};