'use client';

import React from 'react';

export default function Home() {
  async function handleLeadSubmit(e: React.FormEvent<HTMLFormElement>) {
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

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());

    // Store contact in Supabase
    const res = await fetch('/api/lead', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      alert('Error sending message. Please try again.');
      return;
    }

    form.reset();
    alert('Message sent! We\'ll get back to you within 24 hours.');
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Top nav */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400" />
            <span className="font-semibold tracking-tight">FlowOps AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#who" className="hover:text-white transition">Who it's for</a>
            <a href="#what" className="hover:text-white transition">What I build</a>
            <a href="#how" className="hover:text-white transition">How it works</a>
            <a href="#demo" className="hover:text-white transition">Live demo</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="/login" className="hidden md:inline text-sm text-slate-300 hover:text-white transition">
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

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>AI automations for serious B2B teams</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            AI automations that turn your traffic into paying customers
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            I build custom automation systems for ecommerce brands and marketing agencies: 
            lead capture, follow‑ups, and dashboards that reduce manual work.
          </p>
          
          <button 
            onClick={scrollToContact}
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold px-8 py-4 rounded-lg text-lg transition transform hover:scale-105"
          >
            Book a 15-min demo
          </button>
        </div>
      </section>

      {/* Who this is for Section */}
      <section id="who" className="border-t border-slate-800 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Who this is for</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              I work with ecommerce brands and marketing agencies that:
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-sky-500/20 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white">Lose leads in spreadsheets or inboxes</h3>
              <p className="text-sm text-slate-400">Manual data entry causing lost opportunities and inconsistent follow-up</p>
            </div>
            
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white">Spend hours on manual follow-ups</h3>
              <p className="text-sm text-slate-400">Team spending valuable time copying, pasting, and sending repetitive emails</p>
            </div>
            
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-semibold text-white">Have traffic, but not enough conversions</h3>
              <p className="text-sm text-slate-400">Visitors coming to the site but not converting into paying customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* What I build Section */}
      <section id="what" className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">What I build</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Custom automation solutions that integrate with your existing tools
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-8 space-y-4">
              <div className="w-14 h-14 bg-sky-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Lead capture & light CRM</h3>
              <p className="text-slate-300 leading-relaxed">
                Automated lead qualification, scoring, and routing into your existing CRM. 
                No more manual data entry or lost leads.
              </p>
            </div>
            
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-8 space-y-4">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Automated follow‑ups</h3>
              <p className="text-slate-300 leading-relaxed">
                Smart email sequences and notifications that engage leads automatically. 
                Personalized outreach based on lead behavior and data.
              </p>
            </div>
            
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-8 space-y-4">
              <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Client & task dashboards</h3>
              <p className="text-slate-300 leading-relaxed">
                Real-time dashboards showing leads, conversions, and team performance. 
                Track ROI and make data-driven decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how" className="border-t border-slate-800 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">How it works</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Simple 3-step process to get your custom automation system
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-sky-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sky-400">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white">15‑min discovery call</h3>
              <p className="text-slate-300 leading-relaxed">
                We understand your current process, tools, and pain points. 
                You get a clear automation roadmap.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-400">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Design & build</h3>
              <p className="text-slate-300 leading-relaxed">
                I design and build a small automation tailored to your business. 
                First version delivered in 7-14 days.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-400">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Integrate & improve</h3>
              <p className="text-slate-300 leading-relaxed">
                We plug it into your existing stack and improve it over time. 
                Ongoing support and optimizations included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live demo Section */}
      <section id="demo" className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Live demo</h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              This app itself is a live demo of my automation capabilities:
            </p>
            
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-8 text-left space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    Authentication System
                  </h4>
                  <p className="text-sm text-slate-300">Secure signup/login with Supabase auth</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    Real-time Dashboard
                  </h4>
                  <p className="text-sm text-slate-300">Live lead tracking and management</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    Supabase Database
                  </h4>
                  <p className="text-sm text-slate-300">Scalable backend with instant sync</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    Lead Capture Flows
                  </h4>
                  <p className="text-sm text-slate-300">Automated lead qualification & routing</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-700">
                <p className="text-sm text-slate-400">
                  <strong>Try it yourself:</strong> Sign up for an account, submit a test lead, and see how it flows through the system in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section id="contact" className="border-t border-slate-800 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to automate your growth?</h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Ecommerce brands and marketing agencies: let's discuss how custom automations can 
                save you 10-20 hours per week and increase your conversion rates.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              {/* Contact Form */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 md:p-8">
                <h3 className="text-xl font-semibold text-white mb-6">Send a message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <input
                    name="name"
                    placeholder="Your name"
                    className="w-full border border-slate-700 bg-slate-950 rounded-lg px-4 py-3 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Work email"
                    className="w-full border border-slate-700 bg-slate-950 rounded-lg px-4 py-3 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                  <select
                    name="business_type"
                    className="w-full border border-slate-700 bg-slate-950 rounded-lg px-4 py-3 text-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  >
                    <option value="">Select business type</option>
                    <option value="ecommerce">Ecommerce Brand</option>
                    <option value="agency">Marketing Agency</option>
                    <option value="other">Other</option>
                  </select>
                  <textarea
                    name="message"
                    placeholder="Tell me about your automation needs..."
                    rows={4}
                    className="w-full border border-slate-700 bg-slate-950 rounded-lg px-4 py-3 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold py-3 rounded-lg transition"
                  >
                    Send message
                  </button>
                </form>
              </div>
              
              {/* Quick Actions */}
              <div className="space-y-6">
                <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 md:p-8">
                  <h3 className="text-xl font-semibold text-white mb-6">Quick actions</h3>
                  <div className="space-y-4">
                    <a
                      href="https://linkedin.com/in/yourprofile"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 border border-slate-700 rounded-lg hover:bg-slate-800/50 transition group"
                    >
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0 0 0 0 0 1.853v3.553H12.5V12h4.541l.632-4.5h-5.173V5.562c0-1.231.626-1.965 1.65-1.965h3.438V0H15.85c-3.355 0-4.423 2.247-4.423 5.317v2.183H8v4.5h3.427v10.452z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-white group-hover:text-sky-400 transition">Connect on LinkedIn</p>
                        <p className="text-sm text-slate-400">Discuss your automation needs directly</p>
                      </div>
                    </a>
                    
                    <button
                      onClick={scrollToContact}
                      className="w-full flex items-center gap-3 p-4 border border-slate-700 rounded-lg hover:bg-slate-800/50 transition text-left"
                    >
                      <div className="w-10 h-10 bg-sky-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-white">Book a 15-min demo</p>
                        <p className="text-sm text-slate-400">See how automation can help your business</p>
                      </div>
                    </button>
                  </div>
                </div>
                
                <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
                  <h4 className="font-semibold text-white mb-3">Why work with me?</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Custom solutions, not one-size-fits-all templates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Integrates with your existing tools and workflows</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Ongoing support and continuous improvements</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
