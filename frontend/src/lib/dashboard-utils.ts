import { supabase } from './supabaseClient';

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  role?: string;
  goal?: string;
  budget?: string;
  timeline?: string;
  score?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  totalLeads: number;
  leadsThisWeek: number;
  avgResponseTime?: string;
  crmSyncedLeads?: number;
}

/**
 * Get dashboard statistics from Supabase
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    // Get total leads
    const { count: totalLeads, error: totalError } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true });

    if (totalError) {
      console.error('Error getting total leads:', totalError);
    }

    // Get leads from the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const { count: leadsThisWeek, error: weekError } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo.toISOString());

    if (weekError) {
      console.error('Error getting weekly leads:', weekError);
    }

    return {
      totalLeads: totalLeads || 0,
      leadsThisWeek: leadsThisWeek || 0,
      avgResponseTime: '—', // Placeholder
      crmSyncedLeads: undefined, // Placeholder
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalLeads: 0,
      leadsThisWeek: 0,
    };
  }
}

/**
 * Get recent leads with pagination
 */
export async function getRecentLeads(limit: number = 10): Promise<Lead[]> {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent leads:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching recent leads:', error);
    return [];
  }
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Get status badge color classes
 */
export function getStatusColorClasses(status: string): string {
  switch (status?.toLowerCase()) {
    case 'new':
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'in_progress':
      return 'bg-sky-500/20 text-sky-400 border-sky-500/30';
    case 'closed':
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    case 'contacted':
      return 'bg-sky-500/20 text-sky-400 border-sky-500/30';
    case 'qualified':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    case 'converted':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'lost':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
}

/**
 * Determine lead source based on available data
 */
export function getLeadSource(lead: Lead): string {
  // This is a placeholder - in real implementation, you might have a source field
  // or determine based on other data
  if (lead.goal?.toLowerCase().includes('demo') || lead.goal?.toLowerCase().includes('automation')) {
    return 'Website Form';
  }
  return 'Direct';
}
