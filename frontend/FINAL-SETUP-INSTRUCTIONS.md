# 🚀 Final Setup Instructions

## ✅ Current Status
- ✅ Environment variables configured
- ✅ Supabase connection working
- ✅ API endpoint created
- ✅ Frontend form ready
- ✅ Dev server running on http://localhost:3000

## 🔧 FINAL STEP: Fix RLS Policy

The form submission is failing due to Row Level Security (RLS) policy. You have two options:

### Option 1: Update RLS Policy (Recommended)
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `axnaulmdchyyvhcfjlhg`
3. Go to **SQL Editor**
4. Copy and paste this SQL:

```sql
-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can insert leads" ON leads;
DROP POLICY IF EXISTS "Authenticated users can read leads" ON leads;

-- Create new policies that allow anonymous inserts
CREATE POLICY "Enable insert for all users" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read for authenticated users" ON leads
  FOR SELECT USING (auth.role() = 'authenticated');
```

5. Click **RUN**
6. Test the form again

### Option 2: Disable RLS (Quick Fix)
If you want to disable RLS temporarily:

```sql
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
```

## 🧪 Test the Application

After fixing RLS policy:

1. **Open browser**: http://localhost:3000
2. **Fill out form** with test data:
   - الاسم: Test User
   - الإيميل: test@example.com
   - الشركة: Test Company
   - المنصب: CEO
   - وش حاب تأتمت: Automate processes
   - الميزانية: $5000
   - التوقيت: 30 days

3. **Submit form**
4. **Check for success alert**: "شكراً! رح نتواصل معك قريباً."
5. **Verify in Supabase**: Dashboard → Table Editor → leads table

## 📊 Expected Results

✅ **Success Indicators:**
- Form submits without errors
- Success alert appears
- New row appears in Supabase leads table
- All form data correctly saved

❌ **Error Indicators:**
- "Insert failed" error
- RLS policy violation
- No new row in database

## 🛠 Troubleshooting

If still failing after RLS fix:

1. **Check browser console** for JavaScript errors
2. **Check network tab** for API response
3. **Check server logs** for detailed error messages
4. **Verify table exists** in Supabase dashboard

## 🎯 Next Steps After Success

1. **Add email notifications** for new leads
2. **Implement lead scoring** logic
3. **Connect to CRM** integration
4. **Add form validation** and better UX
5. **Deploy to production** on Vercel

## 📞 Quick Commands

```bash
# Test API directly
node test-form-submission.js

# Restart dev server
npm run dev

# Check server logs
# Look for console output in terminal
```

Your lead capture system is 99% complete - just need to fix the RLS policy!
