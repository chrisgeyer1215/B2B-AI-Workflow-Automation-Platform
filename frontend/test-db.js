const { createClient } = require('@supabase/supabase-js');

// Read from .env.local manually
const fs = require('fs');
const envContent = fs.readFileSync('.env.local', 'utf8');
const envLines = envContent.split('\n');

const supabaseUrl = envLines.find(line => line.startsWith('NEXT_PUBLIC_SUPABASE_URL='))?.split('=')[1];
const supabaseKey = envLines.find(line => line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY='))?.split('=')[1];

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Key exists:', !!supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Test basic connection
    const { data, error } = await supabase.from('leads').select('count');
    
    if (error) {
      console.error('Connection error:', error);
      
      // If table doesn't exist, create it
      if (error.code === 'PGRST116') {
        console.log('Table does not exist. Please run the database schema in Supabase SQL editor.');
      }
    } else {
      console.log('Connection successful!');
      console.log('Data:', data);
    }
  } catch (err) {
    console.error('Test failed:', err);
  }
}

testConnection();
