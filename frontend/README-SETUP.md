# Lead Capture Setup Instructions

## 🚀 Quick Setup Guide

### 1. Supabase Setup
1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your project dashboard, go to SQL Editor
3. Copy and paste the contents of `database-schema.sql`
4. Run the SQL to create the leads table
5. Go to Settings > API
6. Copy the Project URL and anon public key

### 2. Environment Variables
1. Open `.env.local` file in the project root
2. Replace the placeholder values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
   ```

### 3. Test the Application
1. The dev server is running on: http://localhost:3001
2. Open the URL in your browser
3. Fill out the Arabic form with test data
4. Submit the form
5. Check your Supabase dashboard > Table Editor > leads
6. You should see a new row with the submitted data

## 📋 Form Fields

The form captures the following fields:
- **name** (required) - الاسم
- **email** (required) - الإيميل  
- **company** (optional) - الشركة
- **role** (optional) - المنصب
- **goal** (optional) - وش حاب تأتمت في البزنس تاعك؟
- **budget** (optional) - الميزانية التقريبية
- **timeline** (optional) - التوقيت

## 🔧 Technical Implementation

### Files Created/Modified:
- `src/lib/supabaseClient.ts` - Supabase client configuration
- `src/app/api/lead/route.ts` - API endpoint for form submission
- `src/app/page.tsx` - Arabic lead capture form
- `.env.local` - Environment variables (needs your Supabase credentials)
- `database-schema.sql` - SQL schema for leads table

### API Endpoint:
- **POST** `/api/lead` - Accepts JSON data and inserts into Supabase

### Security Features:
- Row Level Security (RLS) enabled
- Environment variables for credentials
- Input validation on required fields
- Error handling and logging

## 🧪 Testing

### Manual Testing:
1. Fill out the form with valid data
2. Submit and check for success alert
3. Verify data appears in Supabase dashboard
4. Test with invalid email (should fail validation)

### API Testing:
```bash
curl -X POST http://localhost:3001/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "role": "CEO",
    "goal": "Automate lead handling",
    "budget": "$5000",
    "timeline": "30 days"
  }'
```

## 🎯 Next Steps

1. **Set up your Supabase project** with the provided schema
2. **Update environment variables** with your credentials
3. **Test the form submission** end-to-end
4. **Customize the form** styling and validation as needed
5. **Add email notifications** for new lead submissions
6. **Implement lead scoring** logic in the API
7. **Connect to CRM** using webhooks or API integrations

## 📞 Support

If you encounter any issues:
1. Check the browser console for JavaScript errors
2. Verify Supabase credentials in `.env.local`
3. Ensure the leads table exists in your Supabase project
4. Check the Next.js dev server logs for API errors

The form is now ready to capture leads for your B2B automation agency!
