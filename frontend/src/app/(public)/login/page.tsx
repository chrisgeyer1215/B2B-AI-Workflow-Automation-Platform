'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('Login error: ' + error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push('/dashboard');
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Log in</h1>
        <form onSubmit={handleLogin} className="space-y-3">
          <input name="email" type="email" placeholder="Work email" required className="border border-slate-300 rounded-md p-2 w-full text-black" />
          <input name="password" type="password" placeholder="Password" required className="border border-slate-300 rounded-md p-2 w-full text-black" />
          <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white py-2 rounded-md font-medium hover:bg-slate-800 transition">
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
        <p className="text-sm text-slate-600">
          No account yet? <a href="/signup" className="text-slate-900 underline">Sign up</a>
        </p>
      </div>
    </main>
  );
}
