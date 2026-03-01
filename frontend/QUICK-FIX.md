# 🚨 Quick Fix for Lead Capture

## Current Issue
Row Level Security (RLS) is preventing form submissions. The table either doesn't exist or has restrictive policies.

## ⚡ Fastest Solution

### Step 1: Go to Supabase Dashboard
1. Open https://supabase.com/dashboard
2. Select project: `axnaulmdchyyvhcfjlhg`

### Step 2: Create Table Manually
1. Go to **Table Editor**
2. Click **Create a new table**
3. Table name: `leads`
4. Add these columns:
   - `id` (UUID, Default: gen_random_uuid(), Primary Key)
   - `name` (text, Required)
   - `email` (text, Required)
   - `company` (text)
   - `role` (text)
   - `goal` (text)
   - `budget` (text)
   - `timeline` (text)
   - `score` (text)
   - `status` (text, Default: 'new')
   - `created_at` (timestamp, Default: now())
   - `updated_at` (timestamp, Default: now())

### Step 3: Disable RLS (Temporary)
1. Go to **Authentication** → **Policies**
2. Find `leads` table policies
3. **Disable** all policies OR
4. Go to **SQL Editor** and run:
   ```sql
   ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
   ```

### Step 4: Test Application
1. Open http://localhost:3000
2. Fill out the Arabic form
3. Submit form
4. Check for success alert
5. Verify data in Supabase Table Editor

## 🎯 Expected Result
Form should submit successfully and you should see the new row in the leads table.

## 📋 Alternative: Use Service Role Key

If you have access to service role key in Supabase Settings → API:

1. Add to `.env.local`:
   ```
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

2. Update API to use service role for admin operations.

## ✅ Success Indicators
- ✅ Form submits without error
- ✅ Success alert appears
- ✅ New row in Supabase leads table
- ✅ All form data saved correctly

## 🚨 If Still Failing

The issue is definitely RLS. You have three options:

1. **Disable RLS completely** (quickest)
2. **Create proper policies** (most secure)
3. **Use service role key** (admin access)

Try option 1 first to get it working, then secure later.
