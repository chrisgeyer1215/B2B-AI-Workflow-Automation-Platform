const { createClient } = require('@supabase/supabase-js');

// Read from .env.local manually
const fs = require('fs');
const envContent = fs.readFileSync('.env.local', 'utf8');
const envLines = envContent.split('\n');

const supabaseUrl = envLines.find(line => line.startsWith('NEXT_PUBLIC_SUPABASE_URL='))?.split('=')[1];
const supabaseKey = envLines.find(line => line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY='))?.split('=')[1];

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  try {
    console.log('Checking database contents...');
    
    // Check if we can read leads at all
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .limit(10);
    
    if (error) {
      console.error('❌ Error reading leads:', error);
      return;
    }
    
    console.log(`✅ Found ${data?.length || 0} leads in database`);
    
    if (data && data.length > 0) {
      console.log('Sample lead:', data[0]);
    } else {
      console.log('📝 No leads found. Let me check if the table exists...');
      
      // Try to insert a test lead directly
      const { data: insertData, error: insertError } = await supabase
        .from('leads')
        .insert({
          name: 'Direct Test Lead',
          email: `direct.test.${Date.now()}@example.com`,
          company: 'Direct Test Corp',
          status: 'new'
        })
        .select();
      
      if (insertError) {
        console.error('❌ Error inserting test lead:', insertError);
      } else {
        console.log('✅ Direct test lead created:', insertData);
      }
    }
    
  } catch (error) {
    console.error('❌ Database check failed:', error);
  }
}

checkDatabase();
