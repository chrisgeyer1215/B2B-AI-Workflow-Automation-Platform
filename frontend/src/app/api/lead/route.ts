import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { syncLeadToHubspot } from '@/lib/integrations/hubspot';

export async function POST(req: Request) {
  const body = await req.json();
  console.log('API_BODY:', body);

  // Store lead in Supabase
  const { data, error } = await supabase.from('leads').insert({
    name: body.name,
    email: body.email,
    company: body.company,
    role: body.role,
    goal: body.goal,
    budget: body.budget,
    timeline: body.timeline,
  });

  console.log('SUPABASE_DATA:', data);
  console.log('SUPABASE_ERROR:', error);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Sync to HubSpot (non-blocking)
  if (data) {
    const leadData = {
      name: body.name,
      email: body.email,
      company: body.company,
      role: body.role,
      goal: body.goal,
      budget: body.budget,
      timeline: body.timeline,
    };

    // Fire and forget HubSpot sync - don't block the response
    syncLeadToHubspot(leadData).catch(err => {
      console.error('Background HubSpot sync failed:', err);
    });
  }

  return NextResponse.json({ success: true, data }, { status: 200 });
}
