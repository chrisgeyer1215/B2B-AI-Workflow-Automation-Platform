const { createClient } = require('@supabase/supabase-js');

// Read from .env.local manually
const fs = require('fs');
const envContent = fs.readFileSync('.env.local', 'utf8');
const envLines = envContent.split('\n');

const supabaseUrl = envLines.find(line => line.startsWith('NEXT_PUBLIC_SUPABASE_URL='))?.split('=')[1];
const supabaseKey = envLines.find(line => line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY='))?.split('=')[1];

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTestUser() {
  try {
    console.log('Creating test user for demo...');
    
    const { data, error } = await supabase.auth.signUp({
      email: 'demo@automation.com',
      password: 'demo123456',
    });
    
    if (error) {
      if (error.message.includes('already registered')) {
        console.log('✅ Demo user already exists');
      } else {
        console.error('Error:', error);
      }
    } else {
      console.log('✅ Demo user created. Please confirm email in Supabase dashboard.');
      console.log('Email: demo@automation.com');
      console.log('Password: demo123456');
    }
  } catch (err) {
    console.error('Test failed:', err);
  }
}

createTestUser();
