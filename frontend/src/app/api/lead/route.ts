import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  const body = await req.json();
  console.log('API_BODY:', body);

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

  return NextResponse.json({ success: true, data }, { status: 200 });
}
