'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');
    const fullName = String(formData.get('full_name') || '');
    const company = String(formData.get('company') || '');
    const role = String(formData.get('role') || '');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert('Signup error: ' + error.message);
      setLoading(false);
      return;
    }

    const user = data.user;
    if (user) {
      await supabase.from('profiles').insert({
        id: user.id,
        full_name: fullName,
        company,
        role,
      });
    }

    setLoading(false);
    alert('Account created. Check your email if confirmation is required.');
    router.push('/login');
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
        <form onSubmit={handleSignup} className="space-y-3">
          <input name="full_name" placeholder="Full name" className="border border-slate-300 rounded-md p-2 w-full text-black" />
          <input name="company" placeholder="Company" className="border border-slate-300 rounded-md p-2 w-full text-black" />
          <input name="role" placeholder="Role" className="border border-slate-300 rounded-md p-2 w-full text-black" />
          <input name="email" type="email" placeholder="Work email" required className="border border-slate-300 rounded-md p-2 w-full text-black" />
          <input name="password" type="password" placeholder="Password" required className="border border-slate-300 rounded-md p-2 w-full text-black" />
          <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white py-2 rounded-md font-medium hover:bg-slate-800 transition">
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>
        <p className="text-sm text-slate-600">
          Already have an account? <a href="/login" className="text-slate-900 underline">Log in</a>
        </p>
      </div>
    </main>
  );
}
