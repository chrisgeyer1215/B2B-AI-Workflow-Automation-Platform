// Test script to verify Supabase connection
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://axnaulmdchyyvhcfjlhg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4bmF1bG1kY2h5eXZoY2ZqbGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyNzExNDYsImV4cCI6MjA4Nzg0NzE0Nn0.pleK11vSPY9ay0IR4ZMkuHiHUG2J6el1Htryz78e_I4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test by checking if leads table exists
    const { data, error } = await supabase.from('leads').select('count').single();
    
    if (error) {
      console.error('Connection test failed:', error);
      return false;
    }
    
    console.log('✅ Supabase connection successful!');
    return true;
  } catch (err) {
    console.error('Connection test error:', err);
    return false;
  }
}

testConnection();
