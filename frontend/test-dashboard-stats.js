const { createClient } = require('@supabase/supabase-js');

// Read from .env.local manually
const fs = require('fs');
const envContent = fs.readFileSync('.env.local', 'utf8');
const envLines = envContent.split('\n');

const supabaseUrl = envLines.find(line => line.startsWith('NEXT_PUBLIC_SUPABASE_URL='))?.split('=')[1];
const supabaseKey = envLines.find(line => line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY='))?.split('=')[1];

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDashboardStats() {
  try {
    console.log('Testing dashboard stats functions...');
    
    // Test total leads
    const { count: totalLeads } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true });
    
    console.log(`✅ Total leads: ${totalLeads}`);
    
    // Test leads this week
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const { count: leadsThisWeek } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo.toISOString());
    
    console.log(`✅ Leads this week: ${leadsThisWeek}`);
    
    // Test recent leads
    const { data: recentLeads } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    
    console.log(`✅ Recent leads count: ${recentLeads?.length || 0}`);
    
    if (recentLeads && recentLeads.length > 0) {
      console.log('Latest lead:', {
        name: recentLeads[0].name,
        email: recentLeads[0].email,
        status: recentLeads[0].status,
        created_at: recentLeads[0].created_at
      });
    }
    
    console.log('🎉 Dashboard stats are working correctly!');
    
  } catch (error) {
    console.error('❌ Error testing dashboard stats:', error);
  }
}

testDashboardStats();
