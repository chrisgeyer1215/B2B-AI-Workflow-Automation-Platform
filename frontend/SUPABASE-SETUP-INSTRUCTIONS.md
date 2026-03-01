# Supabase Setup Instructions

## 🚨 IMPORTANT: Create Leads Table First

Before testing the form, you MUST create the leads table in your Supabase project:

### Step 1: Go to Supabase Dashboard
1. Open https://supabase.com/dashboard
2. Select your project: `axnaulmdchyyvhcfjlhg`

### Step 2: Create Leads Table
1. Go to **SQL Editor** in the left sidebar
2. Copy and paste this SQL code:

```sql
CREATE TABLE leads (
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

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can insert leads" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can read leads" ON leads
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create indexes for performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at);
```

3. Click **RUN** to execute the SQL
4. Verify the table was created by going to **Table Editor** → you should see `leads` table

### Step 3: Test the Application
1. Open http://localhost:3000 in your browser
2. Fill out the Arabic form with test data
3. Click "احجز Free AI Ops Audit" button
4. You should see success alert: "شكراً! رح نتواصل معك قريباً."
5. Go back to Supabase Dashboard → Table Editor → leads table
6. You should see a new row with your submitted data

## 🔧 Current Status

✅ **Environment Variables**: Configured correctly
✅ **Supabase Connection**: Working
✅ **API Endpoint**: Created at `/api/lead`
✅ **Frontend Form**: Arabic interface ready
❌ **Database Table**: Needs to be created manually

## 🧪 Testing Commands

After creating the table, you can test with:

```bash
# Test API directly
node test-form-submission.js

# Or test via browser
# Open http://localhost:3000 and submit form
```

## 📋 Form Fields Mapping

| Form Field | Database Column | Required |
|------------|----------------|----------|
| الاسم | name | ✅ |
| الإيميل | email | ✅ |
| الشركة | company | ❌ |
| المنصب | role | ❌ |
| وش حاب تأتمت | goal | ❌ |
| الميزانية | budget | ❌ |
| التوقيت | timeline | ❌ |

## 🚨 Troubleshooting

If form submission fails:

1. **Check Supabase Dashboard**: Make sure `leads` table exists
2. **Check Browser Console**: Look for JavaScript errors
3. **Check Network Tab**: See if `/api/lead` request is successful
4. **Check Server Logs**: Look for error messages in terminal

## ✅ Success Indicators

- Form submits without errors
- Success alert appears in Arabic
- New row appears in Supabase leads table
- All form data is correctly saved

Once the table is created, your lead capture system will be fully functional!
