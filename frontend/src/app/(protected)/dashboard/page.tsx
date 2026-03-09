'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { getDashboardStats, getRecentLeads, formatDate, getStatusColorClasses, getLeadSource, type Lead, type DashboardStats } from '@/lib/dashboard-utils';

type Profile = {
  full_name: string | null;
  company: string | null;
  role: string | null;
};

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    leadsThisWeek: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    async function loadDashboard() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      // Load profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('full_name, company, role')
        .eq('id', user.id)
        .maybeSingle();

      setProfile(profileData || null);

      // Load dashboard data in parallel
      const [statsData, leadsData] = await Promise.all([
        getDashboardStats(),
        getRecentLeads(10),
      ]);

      setStats(statsData);
      setLeads(leadsData);
      setLoading(false);
    }

    loadDashboard();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  async function handleAddLead(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const leadData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      status: formData.get('status') as string,
    };

    const { data, error } = await supabase
      .from('leads')
      .insert(leadData)
      .select()
      .single();

    if (error) {
      alert('Error adding lead: ' + error.message);
      return;
    }

    // Refresh leads and stats
    const [newStats, newLeads] = await Promise.all([
      getDashboardStats(),
      getRecentLeads(10),
    ]);
    
    setStats(newStats);
    setLeads(newLeads);
    setShowAddLeadModal(false);
    form.reset();
  }

  async function handleStatusChange(leadId: string, newStatus: string) {
    setUpdatingLeadId(leadId);
    
    const { error } = await supabase
      .from('leads')
      .update({ status: newStatus })
      .eq('id', leadId);

    if (error) {
      alert('Error updating status: ' + error.message);
      setUpdatingLeadId(null);
      return;
    }

    // Update local state
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
    
    setUpdatingLeadId(null);
  }

  // Filter leads based on search query and status filter
  const filteredLeads = leads.filter(lead => {
    // Status filter
    if (statusFilter !== 'all' && lead.status !== statusFilter) {
      return false;
    }
    
    // Search filter (case-insensitive)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const nameMatch = lead.name.toLowerCase().includes(query);
      const emailMatch = lead.email.toLowerCase().includes(query);
      return nameMatch || emailMatch;
    }
    
    return true;
  });

  // Calculate pipeline summary counts
  const pipelineCounts = leads.reduce((acc, lead) => {
    const status = lead.status || 'new';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const newCount = pipelineCounts['new'] || 0;
  const inProgressCount = pipelineCounts['in_progress'] || 0;
  const closedCount = pipelineCounts['closed'] || 0;

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Loading dashboard...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400" />
            <div>
              <h1 className="font-semibold tracking-tight">FlowOps AI</h1>
              <p className="text-xs text-slate-400">Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-300">
              {profile?.full_name || 'User'}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-slate-400 hover:text-slate-300 transition"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Dashboard Header */}
        <section className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Lead pipeline overview</h1>
          
          {/* What you can do here banner */}
          <div className="bg-sky-500/10 border border-sky-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-sky-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-white">What you can do here</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  This dashboard centralizes every lead captured from your forms. You can review new leads, update their status (New / In progress / Closed), and soon sync them to CRMs and automations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="grid gap-6 md:grid-cols-3">
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-400">Total leads</span>
              <div className="w-8 h-8 bg-sky-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-white">{stats.totalLeads}</div>
            <p className="text-sm text-slate-400 mt-1">All time leads captured</p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-400">Leads this week</span>
              <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-white">{stats.leadsThisWeek}</div>
            <p className="text-sm text-slate-400 mt-1">Last 7 days</p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-400">Avg. response time</span>
              <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-white">{stats.avgResponseTime}</div>
            <p className="text-sm text-slate-400 mt-1">
              <span className="text-amber-400">Coming soon</span>
            </p>
          </div>
        </section>

        {/* Pipeline Summary */}
        <section className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-center">
            <p className="text-sm text-slate-300">
              Pipeline summary:{' '}
              <span className="text-emerald-400 font-medium">New: {newCount}</span>{' '}
              •{' '}
              <span className="text-sky-400 font-medium">In progress: {inProgressCount}</span>{' '}
              •{' '}
              <span className="text-slate-400 font-medium">Closed: {closedCount}</span>
            </p>
          </div>
        </section>

        {/* Leads Table */}
        <section className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-white">Latest leads in your pipeline</h2>
              <button
                onClick={() => setShowAddLeadModal(true)}
                className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-medium px-4 py-2 rounded-lg text-sm transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add test lead
              </button>
            </div>
            <p className="text-sm text-slate-400">
              Every lead captured from your forms appears here. From here, we can sync them to CRMs and trigger automations.
            </p>
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search leads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-slate-700 bg-slate-950 rounded-lg pl-10 pr-4 py-2 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
              
              {/* Status Filter Buttons */}
              <div className="flex gap-2">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'new', label: 'New' },
                  { value: 'in_progress', label: 'In progress' },
                  { value: 'closed', label: 'Closed' }
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setStatusFilter(filter.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      statusFilter === filter.value
                        ? 'bg-sky-500 text-slate-950'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredLeads.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                {leads.length === 0 ? 'No leads yet' : 'No leads found'}
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                {leads.length === 0 
                  ? 'No leads yet. Go to the landing page, submit the form, then come back here to see your first lead appear in real time.'
                  : 'Try adjusting your search or filters to find the leads you\'re looking for.'
                }
              </p>
              <div className="flex items-center justify-center gap-4">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open lead form
                </a>
                <button
                  onClick={() => setShowAddLeadModal(true)}
                  className="inline-flex items-center gap-2 text-sm bg-sky-500 hover:bg-sky-400 text-slate-950 px-4 py-2 rounded-lg transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add test lead
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Source</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-white">{lead.name}</div>
                          {lead.company && (
                            <div className="text-sm text-slate-400">{lead.company}</div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-slate-300">{lead.email}</div>
                        {lead.role && (
                          <div className="text-xs text-slate-500">{lead.role}</div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-300">{getLeadSource(lead)}</span>
                      </td>
                      <td className="py-3 px-4">
                        {updatingLeadId === lead.id ? (
                          <div className="w-16 h-6 bg-slate-700 rounded-full animate-pulse"></div>
                        ) : (
                          <select
                            value={lead.status || 'new'}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border cursor-pointer transition-colors ${getStatusColorClasses(lead.status || 'new')}`}
                          >
                            <option value="new">New</option>
                            <option value="in_progress">In progress</option>
                            <option value="closed">Closed</option>
                          </select>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-slate-300">
                          {formatDate(lead.created_at)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* Add Lead Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">Add test lead</h3>
            <form onSubmit={handleAddLead} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full border border-slate-700 bg-slate-950 rounded-lg px-3 py-2 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full border border-slate-700 bg-slate-950 rounded-lg px-3 py-2 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Company (optional)</label>
                <input
                  name="company"
                  type="text"
                  className="w-full border border-slate-700 bg-slate-950 rounded-lg px-3 py-2 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Status</label>
                <select
                  name="status"
                  className="w-full border border-slate-700 bg-slate-950 rounded-lg px-3 py-2 text-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="new">New</option>
                  <option value="in_progress">In progress</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-medium py-2 rounded-lg transition"
                >
                  Add lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
