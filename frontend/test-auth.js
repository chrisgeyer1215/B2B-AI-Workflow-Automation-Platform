const { createClient } = require('@supabase/supabase-js');

// Read from .env.local manually
const fs = require('fs');
const envContent = fs.readFileSync('.env.local', 'utf8');
const envLines = envContent.split('\n');

const supabaseUrl = envLines.find(line => line.startsWith('NEXT_PUBLIC_SUPABASE_URL='))?.split('=')[1];
const supabaseKey = envLines.find(line => line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY='))?.split('=')[1];

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAuth() {
  try {
    console.log('Testing Supabase authentication...');
    
    // Test signup
    const testEmail = `testuser${Date.now()}@gmail.com`;
    const testPassword = 'testpassword123';
    
    console.log('Testing signup with:', testEmail);
    
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    });
    
    if (error) {
      console.error('Signup error:', error);
      
      if (error.message.includes('Invalid API key')) {
        console.log('❌ API Key Issue - Check environment variables');
      } else if (error.message.includes('Email signups are disabled')) {
        console.log('❌ Email signups disabled - Enable in Supabase dashboard');
      } else {
        console.log('❌ Other error:', error.message);
      }
    } else {
      console.log('✅ Signup successful:', data);
      
      // Test login
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
      });
      
      if (loginError) {
        console.error('Login error:', loginError);
      } else {
        console.log('✅ Login successful:', loginData);
      }
    }
  } catch (err) {
    console.error('Test failed:', err);
  }
}

testAuth();
