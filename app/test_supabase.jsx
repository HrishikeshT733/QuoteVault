import { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { supabase } from '@/lib/supabase';

export default function TestSupabase() {
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async () => {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .limit(5);
    
    if (error) {
      console.error('Error fetching quotes:', error);
    } else {
      setQuotes(data);
      console.log('Fetched quotes:', data);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Supabase Test</Text>
      {quotes.map((quote) => (
        <Text key={quote.id} style={{ marginBottom: 10 }}>
          {quote.text} - {quote.author}
        </Text>
      ))}
      <Button title="Refresh Quotes" onPress={fetchQuotes} />
    </View>
  );
}