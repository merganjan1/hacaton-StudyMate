
import React from 'react';
import { BrandLogo } from './BrandLogo';

export const BrandIdentity: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4F6FA] text-[#1B1F3B] p-12 space-y-24">
      
      {/* 1) Main Brand Header */}
      <section className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">01. Brand Wordmark & Logo</h3>
        <div className="bg-[#1B1F3B] rounded-[3rem] p-24 flex flex-col items-center justify-center relative overflow-hidden h-[450px] shadow-2xl">
          <div className="relative z-10 flex flex-col items-center gap-12">
             <BrandLogo size={140} withBackground={false} />
             <h1 className="text-6xl font-bold text-white letter-spacing-wide tracking-[0.2em]">
               StudyMate
             </h1>
          </div>
          
          {/* Background decorative curve */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <svg viewBox="0 0 1000 1000" className="w-full h-full">
                <path d="M0 800Q250 750 500 600T1000 200" stroke="#4FD1C5" strokeWidth="2" fill="none" />
             </svg>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* 2) Avatar Design */}
        <section className="space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">02. Avatar Identity</h3>
          <div className="flex gap-12 items-center">
            <BrandLogo size={192} className="shadow-2xl border-8 border-white" />
            <div className="space-y-3">
              <p className="text-xs font-black text-[#1B1F3B] uppercase tracking-widest">Iconic Mark</p>
              <p className="text-sm text-slate-400 max-w-[200px] leading-relaxed font-medium">
                StudyMate logotipi ta'limdagi dinamik o'sish va aqlli tahlilni anglatuvchi uchta yorqin nuqta va progressiv chiziqdan iborat.
              </p>
            </div>
          </div>
        </section>

        {/* 3) Brand Pattern */}
        <section className="space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">03. Study Pattern</h3>
          <div className="h-48 bg-[#1B1F3B] rounded-[2.5rem] relative overflow-hidden flex items-center justify-around px-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="opacity-20 scale-75">
                <BrandLogo size={80} withBackground={false} />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B1F3B] via-transparent to-transparent"></div>
          </div>
        </section>
      </div>

      {/* 4) Website Hero Section Mockup */}
      <section className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">04. Application: Web Interface</h3>
        <div className="bg-[#1B1F3B] rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/5 relative min-h-[600px] flex flex-col">
          {/* Navigation */}
          <nav className="p-12 flex items-center justify-between relative z-20">
            <div className="flex items-center gap-3">
              <BrandLogo size={32} />
              <div className="text-white font-bold tracking-[0.2em] text-sm uppercase">StudyMate</div>
            </div>
            <div className="flex gap-12 text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">
              <span className="text-white">Learn</span>
              <span>Tools</span>
              <span>Academy</span>
              <span>Contact</span>
            </div>
          </nav>

          <div className="px-24 py-20 relative z-10 flex flex-col items-start max-w-4xl flex-1 justify-center">
            <h2 className="text-7xl font-extrabold text-white leading-[1.05] mb-10 tracking-tighter">
              AI-POWERED<br />
              <span className="text-[#4FD1C5]">LEARNING.</span>
            </h2>
            <p className="text-white/50 text-xl font-medium mb-14 max-w-xl leading-relaxed">
              StudyMate orqali o'qish va tahlil qilish jarayonini 10 baravar tezlashtiring. Murakkab matnlardan vizual darsliklargacha.
            </p>
            <button className="px-12 py-6 bg-[#4FD1C5] text-[#1B1F3B] rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-2xl shadow-[#4FD1C5]/20">
              Start Your Journey
            </button>
          </div>

          {/* Large Background Logo Element */}
          <div className="absolute -bottom-20 -right-20 pointer-events-none opacity-20">
            <BrandLogo size={600} withBackground={false} />
          </div>
          
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
      </section>

      {/* Color Palette Footer */}
      <footer className="pt-24 border-t border-slate-200 flex flex-col items-center gap-12">
        <div className="flex gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-3xl bg-[#1B1F3B] shadow-xl"></div>
            <span className="text-[10px] font-black text-slate-400">#1B1F3B</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-3xl bg-[#4FD1C5] shadow-xl"></div>
            <span className="text-[10px] font-black text-slate-400">#4FD1C5</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-3xl bg-[#F4F6FA] border border-slate-200 shadow-xl"></div>
            <span className="text-[10px] font-black text-slate-400">#F4F6FA</span>
          </div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">STUDYMATE AI DESIGN SYSTEM v1.0</p>
      </footer>
    </div>
  );
};
