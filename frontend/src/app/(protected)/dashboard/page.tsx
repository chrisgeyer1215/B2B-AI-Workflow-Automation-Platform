'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

type Profile = {
  full_name: string | null;
  company: string | null;
  role: string | null;
};

type WorkflowRequest = {
  id: string;
  type: string;
  status: string;
  created_at: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [requests, setRequests] = useState<WorkflowRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('full_name, company, role')
        .eq('id', user.id)
        .maybeSingle();

      setProfile(profileData || null);

      const { data: reqs } = await supabase
        .from('workflow_requests')
        .select('id, type, status, created_at')
        .order('created_at', { ascending: false });

      setRequests(reqs || []);
      setLoading(false);
    }

    load();
  }, [router]);

  async function createRequest(type: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    const { data, error } = await supabase.from('workflow_requests').insert({
      user_id: user.id,
      type,
      details: null,
    }).select('id, type, status, created_at').single();

    if (error) {
      alert('Error creating request: ' + error.message);
      return;
    }

    setRequests(prev => [data as WorkflowRequest, ...prev]);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  if (loading) {
    return <main className="min-h-screen flex items-center justify-center">Loading...</main>;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 text-sm">
              Welcome{profile?.full_name ? `, ${profile.full_name}` : ''}. Manage your AI automation requests here.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-slate-600 underline"
          >
            Log out
          </button>
        </header>

        <section className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => createRequest('lead_automation')}
            className="border border-slate-200 rounded-lg p-4 bg-white hover:border-slate-400 text-left"
          >
            <h2 className="font-semibold text-slate-900">Lead Automation</h2>
            <p className="text-sm text-slate-600 mt-1">
              Automate lead capture, qualification, and calendar booking.
            </p>
          </button>

          <button
            onClick={() => createRequest('onboarding_automation')}
            className="border border-slate-200 rounded-lg p-4 bg-white hover:border-slate-400 text-left"
          >
            <h2 className="font-semibold text-slate-900">Onboarding Automation</h2>
            <p className="text-sm text-slate-600 mt-1">
              Automate client onboarding workflows and internal setup.
            </p>
          </button>

          <button
            onClick={() => createRequest('support_automation')}
            className="border border-slate-200 rounded-lg p-4 bg-white hover:border-slate-400 text-left"
          >
            <h2 className="font-semibold text-slate-900">Support Automation</h2>
            <p className="text-sm text-slate-600 mt-1">
              Build AI agents to handle FAQs and route complex tickets.
            </p>
          </button>
        </section>

        <section className="bg-white border border-slate-200 rounded-lg p-4">
          <h2 className="font-semibold text-slate-900 mb-3">Your workflow requests</h2>
          {requests.length === 0 ? (
            <p className="text-sm text-slate-600">No requests yet. Start by creating one above.</p>
          ) : (
            <ul className="space-y-2">
              {requests.map((r) => (
                <li key={r.id} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-800">{r.type}</span>
                  <span className="text-slate-500">{r.status}</span>
                  <span className="text-slate-400">{new Date(r.created_at).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
