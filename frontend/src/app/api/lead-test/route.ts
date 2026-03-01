import { NextResponse } from 'next/server';

// Simple test endpoint that logs data instead of using Supabase
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('=== LEAD SUBMISSION ===');
    console.log('Name:', body.name);
    console.log('Email:', body.email);
    console.log('Company:', body.company);
    console.log('Role:', body.role);
    console.log('Goal:', body.goal);
    console.log('Budget:', body.budget);
    console.log('Timeline:', body.timeline);
    console.log('========================');

    // Simulate successful save
    return NextResponse.json({ 
      success: true, 
      message: 'Lead received successfully (test mode)',
      data: body 
    });
  } catch (err) {
    console.error('Test endpoint error:', err);
    return NextResponse.json({ error: 'Test endpoint failed' }, { status: 500 });
  }
}
