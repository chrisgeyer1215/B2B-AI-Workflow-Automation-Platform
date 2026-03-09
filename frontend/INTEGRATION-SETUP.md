# Integration Setup Guide

## HubSpot Integration

### Required Environment Variables

Add these to your Vercel environment variables:

```bash
HUBSPOT_API_KEY=your_hubspot_private_app_token
HUBSPOT_PORTAL_ID=your_portal_id (optional)
```

### Getting HubSpot API Key

1. Go to HubSpot Developer Portal: https://developers.hubspot.com/
2. Create a **Private App** (not Public App)
3. Under "Scopes", add:
   - `crm.objects.contacts.write`
   - `crm.objects.contacts.read`
   - `crm.lists.write`
   - `crm.lists.read`
4. Install the app in your HubSpot account
5. Copy the **Access Token** (starts with `pat-na1-...`)

### Current Implementation Status

✅ **Structure Complete**: `/src/lib/integrations/hubspot.ts`
✅ **API Integration**: Connected to lead submission flow
✅ **Type Safety**: Full TypeScript interfaces
✅ **Error Handling**: Comprehensive error catching
⏳ **Live API**: Needs HUBSPOT_API_KEY environment variable

### How It Works

1. **Lead Submission** → Stored in Supabase
2. **Background Sync** → Sent to HubSpot (non-blocking)
3. **Error Handling** → Logged but doesn't block user experience
4. **Data Mapping** → Lead fields mapped to HubSpot contact properties

### Future Integrations

Ready to add more CRM integrations:
- Salesforce (`/src/lib/integrations/salesforce.ts`)
- Klaviyo (`/src/lib/integrations/klaviyo.ts`)
- ActiveCampaign (`/src/lib/integrations/activecampaign.ts`)

### Testing Integration

```bash
# Test current implementation
node test-hubspot-integration.js

# Check Vercel logs for HubSpot sync status
vercel logs
```

### Production Deployment

1. Add `HUBSPOT_API_KEY` to Vercel environment variables
2. Redeploy: `vercel --prod`
3. Test lead submission on deployed site
4. Check HubSpot CRM for new contacts

### Data Flow

```
User Form → API Route → Supabase (primary)
                              ↓
                         HubSpot Sync (secondary)
```

**Primary Storage**: Supabase (always works)
**Secondary Sync**: HubSpot (requires API key)
