'use client';

import React from 'react';

export default function Home() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());

    const res = await fetch('/api/lead', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    console.log('API_RESPONSE:', json);

    if (!res.ok) {
      alert('Error: ' + (json.errorMessage || json.error || 'unknown'));
      return;
    }

    form.reset();
    alert('Thanks! We will get back to you soon.');
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Top nav */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400" />
            <span className="font-semibold tracking-tight">FlowOps AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#how-it-works" className="hover:text-white">How it works</a>
            <a href="#audit" className="hover:text-white">Free audit</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="/login" className="hidden md:inline text-sm text-slate-300 hover:text-white">
              Log in
            </a>
            <a
              href="/signup"
              className="text-sm px-3 py-1.5 rounded-md bg-slate-100 text-slate-900 font-medium hover:bg-white transition"
            >
              Get started
            </a>
          </div>
        </div>
      </header>

      {/* Hero + form */}
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-14 md:pt-16 md:pb-20">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* Hero copy */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Automations for serious B2B teams
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
              Automate your leads, onboarding & support with AI agents.
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              FlowOps AI builds custom agents and workflows that plug into your stack
              (CRM, calendar, helpdesk) so your team can save 10–20 hours per month
              and respond to customers in seconds, not hours.
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Lead intake & qualification → CRM + calendar booking</li>
              <li>• Client onboarding workflows across tools & teams</li>
              <li>• Support & FAQ agents that triage and escalate tickets</li>
            </ul>
            <p className="text-xs text-slate-500">
              We're currently onboarding a small number of B2B agencies & SaaS teams.
              Tell us about your setup and we'll send back a 30-day automation plan.
            </p>
          </div>

          {/* Lead form card */}
          <div id="audit" className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 md:p-6 shadow-xl shadow-black/40">
            <h2 className="text-lg md:text-xl font-semibold text-white mb-1">
              Get your free 20-minute AI Ops audit
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Share a few details and we'll review your funnels and suggest 1–2 high-ROI automations.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  name="name"
                  placeholder="Name"
                  className="border border-slate-700 bg-slate-950 rounded-md px-2.5 py-2 w-full text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Work email"
                  className="border border-slate-700 bg-slate-950 rounded-md px-2.5 py-2 w-full text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  required
                />
              </div>
              <input
                name="company"
                placeholder="Company"
                className="border border-slate-700 bg-slate-950 rounded-md px-2.5 py-2 w-full text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <input
                name="role"
                placeholder="Role"
                className="border border-slate-700 bg-slate-950 rounded-md px-2.5 py-2 w-full text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <textarea
                name="goal"
                placeholder="What do you want to automate first?"
                className="border border-slate-700 bg-slate-950 rounded-md px-2.5 py-2 w-full text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                rows={3}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  name="budget"
                  placeholder="Approx. budget (optional)"
                  className="border border-slate-700 bg-slate-950 rounded-md px-2.5 py-2 w-full text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
                <input
                  name="timeline"
                  placeholder="Timeline (e.g. 30–60 days)"
                  className="border border-slate-700 bg-slate-950 rounded-md px-2.5 py-2 w-full text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-medium py-2 rounded-md text-sm transition"
              >
                Submit request
              </button>
              <p className="text-[11px] text-slate-500 mt-1">
                No spam. We'll email you only to schedule the audit or share your 30-day plan.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-12 space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            Built for B2B teams that want real ROI, not just chatbots.
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-slate-900/70 border border-slate-800 rounded-lg p-4">
              <h3 className="font-semibold text-slate-50 mb-1 text-sm">Lead workflows</h3>
              <p className="text-xs text-slate-400">
                Capture, qualify, and route leads into your CRM and calendar automatically, with zero manual copy-paste.
              </p>
            </div>
            <div className="bg-slate-900/70 border border-slate-800 rounded-lg p-4">
              <h3 className="font-semibold text-slate-50 mb-1 text-sm">Onboarding flows</h3>
              <p className="text-xs text-slate-400">
                Standardize client onboarding across tools, forms, and teams, with clear triggers and notifications.
              </p>
            </div>
            <div className="bg-slate-900/70 border border-slate-800 rounded-lg p-4">
              <h3 className="font-semibold text-slate-50 mb-1 text-sm">Support agents</h3>
              <p className="text-xs text-slate-400">
                AI agents that answer FAQs, create tickets, and escalate edge cases to humans with full context.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
