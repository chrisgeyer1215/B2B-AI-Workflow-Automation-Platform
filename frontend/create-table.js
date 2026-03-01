// Script to create leads table in Supabase
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://axnaulmdchyyvhcfjlhg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4bmF1bG1kY2h5eXZoY2ZqbGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyNzExNDYsImV4cCI6MjA4Nzg0NzE0Nn0.pleK11vSPY9ay0IR4ZMkuHiHUG2J6el1Htryz78e_I4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createLeadsTable() {
  try {
    console.log('Creating leads table...');
    
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS leads (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          company TEXT,
          role TEXT,
          goal TEXT,
          budget TEXT,
          timeline TEXT,
          score TEXT,
          status TEXT DEFAULT 'new',
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
        
        ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY IF NOT EXISTS "Anyone can insert leads" ON leads
          FOR INSERT WITH CHECK (true);
          
        CREATE POLICY IF NOT EXISTS "Authenticated users can read leads" ON leads
          FOR SELECT USING (auth.role() = 'authenticated');
          
        CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
        CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
        CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
      `
    });
    
    if (error) {
      console.error('Table creation failed:', error);
      return false;
    }
    
    console.log('✅ Leads table created successfully!');
    return true;
  } catch (err) {
    console.error('Table creation error:', err);
    return false;
  }
}

createLeadsTable();
