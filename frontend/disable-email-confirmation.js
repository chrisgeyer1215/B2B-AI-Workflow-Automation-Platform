const { createClient } = require('@supabase/supabase-js');

// Read from .env.local manually
const fs = require('fs');
const envContent = fs.readFileSync('.env.local', 'utf8');
const envLines = envContent.split('\n');

const supabaseUrl = envLines.find(line => line.startsWith('NEXT_PUBLIC_SUPABASE_URL='))?.split('=')[1];
const serviceRoleKey = envLines.find(line => line.startsWith('SUPABASE_SERVICE_ROLE_KEY='))?.split('=')[1];

if (!serviceRoleKey || serviceRoleKey === 'PASTE_YOUR_SERVICE_ROLE_KEY_HERE') {
  console.log('❌ Service role key not set. Please get it from Supabase dashboard > Settings > API');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

async function updateAuthSettings() {
  try {
    console.log('Updating auth settings to disable email confirmation...');
    
    // Update auth settings
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      '00000000-0000-0000-0000-000000000000', // This won't work for settings
      {
        email_confirm: false
      }
    );
    
    console.log('Note: Email confirmation settings need to be updated manually in Supabase dashboard:');
    console.log('1. Go to https://axnaulmdchyyvhcfjlhg.supabase.co');
    console.log('2. Navigate to Authentication > Settings');
    console.log('3. Under "Email Auth", disable "Enable email confirmations"');
    console.log('4. Save settings');
    
  } catch (err) {
    console.error('Error:', err);
  }
}

updateAuthSettings();
