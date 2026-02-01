
import React from 'react';
import { 
  Sparkles, MessageSquare, FileText, CheckCircle2, 
  ArrowRight, BrainCircuit, Monitor, Library, 
  HelpCircle, PieChart, Zap, ShieldCheck, ChevronRight,
  BookOpen, Users, Clock, Target, Rocket
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface IntroPageProps {
  onStart: () => void;
}

export const IntroPage: React.FC<IntroPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#F4F6FA] flex flex-col items-center relative overflow-x-hidden scroll-smooth selection:bg-[#4FD1C5]/30">
      {/* Dynamic Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-15%] right-[-5%] w-[60%] h-[60%] bg-[#4FD1C5]/10 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1B1F3B]/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-[30%] left-[10%] w-[40%] h-[40%] bg-[#4FD1C5]/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Navbar */}
      <nav className="w-full max-w-7xl px-8 h-24 flex items-center justify-between relative z-50 shrink-0">
        <div className="flex items-center gap-3 group cursor-pointer">
          <BrandLogo size={42} className="shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col">
            <span className="studymate-wordmark text-[#1B1F3B] text-xl tracking-[0.1em]">StudyMate</span>
            <span className="text-[8px] font-black text-[#4FD1C5] uppercase tracking-[0.3em] -mt-1">AI Teacher</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-12 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <a href="#features" className="hover:text-[#1B1F3B] transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[#1B1F3B] transition-colors">How it works</a>
          <button 
            onClick={onStart}
            className="px-8 py-3 bg-[#1B1F3B] text-white rounded-xl hover:bg-[#1B1F3B]/90 transition-all shadow-xl shadow-indigo-100/50"
          >
            Sign In
          </button>
        </div>
      </nav>

      <div className="max-w-6xl w-full relative z-10 px-6 py-12 lg:py-32 space-y-40">
        
        {/* Hero Section */}
        <section className="text-center space-y-10 animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-slate-100 shadow-sm text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
            <Sparkles size={14} className="text-[#4FD1C5]" /> 
            Powered by Gemini AI 3.0 Pro
          </div>
          
          <div className="space-y-8 max-w-5xl mx-auto">
            <h1 className="text-6xl lg:text-8xl font-extrabold text-[#1B1F3B] tracking-tight leading-[1.05] animate-in fade-in zoom-in-95 duration-700">
              StudyMate – Your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B1F3B] to-[#4FD1C5]">AI Teacher</span>
            </h1>
            <p className="text-slate-500 text-xl lg:text-2xl font-medium leading-relaxed max-w-3xl mx-auto">
              Learn faster, smarter and easier with your 24/7 AI study companion. The ultimate tool for students and educators.
            </p>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={onStart}
              className="group relative px-16 py-7 bg-[#1B1F3B] text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] overflow-hidden shadow-2xl shadow-indigo-200 transition-all hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B1F3B] via-[#4FD1C5]/30 to-[#1B1F3B] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative z-10 flex items-center gap-4">
                Start Learning <ArrowRight size={20} className="text-[#4FD1C5]" />
              </span>
            </button>
            <button className="px-12 py-7 bg-white text-[#1B1F3B] rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] border border-slate-100 shadow-xl hover:bg-slate-50 transition-all flex items-center gap-3">
              Explore Tools <ChevronRight size={18} />
            </button>
          </div>
        </section>

        {/* Detailed Mission / About Section */}
        <section className="bg-white p-12 lg:p-24 rounded-[4rem] border border-slate-100 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4FD1C5]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className="space-y-8">
               <h2 className="text-4xl lg:text-5xl font-black text-[#1B1F3B] tracking-tight leading-tight">The Future of <br/><span className="text-[#4FD1C5]">Individual Learning</span></h2>
               <p className="text-slate-500 text-lg lg:text-xl font-medium leading-relaxed">
                 StudyMate is an AI-powered learning assistant designed to help students understand lessons, prepare for exams, and study independently. It can answer questions, explain topics, generate tests automatically, and create summaries from uploaded PDF materials. It works like a personal tutor available anytime.
               </p>
               <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-[#1B1F3B] shrink-0">
                      <Users size={20} />
                    </div>
                    <div>
                      <h5 className="font-black text-[#1B1F3B] text-xs uppercase tracking-wider mb-1">For Students</h5>
                      <p className="text-sm text-slate-400 font-medium">Simplify complex textbooks into visual summaries and interactive quizzes.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-[#1B1F3B] shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h5 className="font-black text-[#1B1F3B] text-xs uppercase tracking-wider mb-1">Save Hours of Work</h5>
                      <p className="text-sm text-slate-400 font-medium">Automate note-taking and presentation building so you can focus on understanding.</p>
                    </div>
                  </div>
               </div>
            </div>
            <div className="aspect-square bg-[#F4F6FA] rounded-[3.5rem] relative flex items-center justify-center p-12 overflow-hidden border border-slate-100 group">
               <div className="absolute inset-0 bg-gradient-to-br from-[#1B1F3B] to-[#4FD1C5] opacity-0 group-hover:opacity-5 transition-opacity duration-700"></div>
               <BrandLogo size={240} className="animate-brand-glow opacity-80" withBackground={false} />
               <div className="absolute bottom-12 left-12 right-12 p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-xl flex items-center justify-between">
                  <div className="space-y-2">
                     <div className="h-2 w-32 bg-slate-200 rounded-full"></div>
                     <div className="h-2 w-20 bg-slate-100 rounded-full"></div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-[#1B1F3B] flex items-center justify-center text-[#4FD1C5] shadow-lg">
                     <Sparkles size={20} />
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Features Section - 4 Key Tools */}
        <section id="features" className="space-y-32">
          <div className="text-center space-y-6">
            <h3 className="text-[12px] font-black text-[#4FD1C5] uppercase tracking-[0.6em]">Core Intelligence</h3>
            <h2 className="text-5xl lg:text-7xl font-black text-[#1B1F3B] tracking-tight">Your 360° Study Toolkit</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tool 1: AI Chat */}
            <div className="bg-white p-12 rounded-[4rem] shadow-xl shadow-indigo-50/50 border border-slate-100 flex flex-col group hover:-translate-y-4 transition-all duration-500 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                <MessageSquare size={120} />
              </div>
              <div className="w-20 h-20 bg-[#1B1F3B] text-[#4FD1C5] rounded-[2rem] flex items-center justify-center mb-10 shadow-lg group-hover:scale-110 transition-transform">
                <MessageSquare size={36} />
              </div>
              <h4 className="text-2xl font-black text-[#1B1F3B] uppercase tracking-wider mb-4">Ask AI Questions</h4>
              <p className="text-slate-500 font-semibold leading-relaxed mb-10 text-lg">
                Upload your books and chat directly with them. Get clear, instant explanations for any complex topic. It's like having a teacher who has read every word of your material.
              </p>
              <ul className="space-y-3 mt-auto mb-10">
                <li className="flex items-center gap-3 text-sm font-bold text-slate-400">
                  <CheckCircle2 size={16} className="text-[#4FD1C5]" /> Context-aware answers
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-400">
                  <CheckCircle2 size={16} className="text-[#4FD1C5]" /> Multi-language support
                </li>
              </ul>
            </div>

            {/* Tool 2: Infographics */}
            <div className="bg-white p-12 rounded-[4rem] shadow-xl shadow-indigo-50/50 border border-slate-100 flex flex-col group hover:-translate-y-4 transition-all duration-500 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                <PieChart size={120} />
              </div>
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-[2rem] flex items-center justify-center mb-10 shadow-lg group-hover:scale-110 transition-transform">
                <PieChart size={36} />
              </div>
              <h4 className="text-2xl font-black text-[#1B1F3B] uppercase tracking-wider mb-4">Visual Infographics</h4>
              <p className="text-slate-500 font-semibold leading-relaxed mb-10 text-lg">
                Transform dry paragraphs into stunning visual posters. Our AI identifies key concepts and relationships to create a roadmap of your lesson, perfect for visual learners.
              </p>
              <ul className="space-y-3 mt-auto mb-10">
                <li className="flex items-center gap-3 text-sm font-bold text-slate-400">
                  <CheckCircle2 size={16} className="text-emerald-500" /> Auto-generated visual prompts
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-400">
                  <CheckCircle2 size={16} className="text-emerald-500" /> High-definition exports
                </li>
              </ul>
            </div>

            {/* Tool 3: Presentations */}
            <div className="bg-white p-12 rounded-[4rem] shadow-xl shadow-indigo-50/50 border border-slate-100 flex flex-col group hover:-translate-y-4 transition-all duration-500 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                <Monitor size={120} />
              </div>
              <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-[2rem] flex items-center justify-center mb-10 shadow-lg group-hover:scale-110 transition-transform">
                <Monitor size={36} />
              </div>
              <h4 className="text-2xl font-black text-[#1B1F3B] uppercase tracking-wider mb-4">AI Presentations</h4>
              <p className="text-slate-500 font-semibold leading-relaxed mb-10 text-lg">
                Need to present your findings? StudyMate builds full slide decks from your PDFs. Each slide includes speaker notes and AI-generated imagery to make your presentation professional.
              </p>
              <ul className="space-y-3 mt-auto mb-10">
                <li className="flex items-center gap-3 text-sm font-bold text-slate-400">
                  <CheckCircle2 size={16} className="text-amber-500" /> 16:9 Academic layouts
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-400">
                  <CheckCircle2 size={16} className="text-amber-500" /> Professional speaker notes
                </li>
              </ul>
            </div>

            {/* Tool 4: Flashcards & Quizzes */}
            <div className="bg-white p-12 rounded-[4rem] shadow-xl shadow-indigo-50/50 border border-slate-100 flex flex-col group hover:-translate-y-4 transition-all duration-500 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                <BrainCircuit size={120} />
              </div>
              <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-[2rem] flex items-center justify-center mb-10 shadow-lg group-hover:scale-110 transition-transform">
                <HelpCircle size={36} />
              </div>
              <h4 className="text-2xl font-black text-[#1B1F3B] uppercase tracking-wider mb-4">Exam Mastery</h4>
              <p className="text-slate-500 font-semibold leading-relaxed mb-10 text-lg">
                Active recall is the key to memory. Generate interactive flashcards and randomized quizzes from your notes. StudyMate tracks your progress and helps you master the hardest parts.
              </p>
              <ul className="space-y-3 mt-auto mb-10">
                <li className="flex items-center gap-3 text-sm font-bold text-slate-400">
                  <CheckCircle2 size={16} className="text-rose-500" /> Randomized quiz logic
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-400">
                  <CheckCircle2 size={16} className="text-rose-500" /> Beautiful flip-card interface
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* How it Works / Workflow */}
        <section id="how-it-works" className="space-y-20">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 px-4">
             <div className="space-y-4">
                <h3 className="text-[10px] font-black text-[#4FD1C5] uppercase tracking-[0.5em]">The Process</h3>
                <h2 className="text-4xl lg:text-5xl font-black text-[#1B1F3B]">Simple Steps to Mastery</h2>
             </div>
             <p className="text-slate-400 font-medium max-w-sm">Our AI engine handles the heavy lifting so you can focus on the learning journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
             <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-slate-100 -z-10"></div>
             
             <div className="space-y-8 bg-white md:bg-transparent p-10 md:p-0 rounded-3xl border md:border-none border-slate-50 shadow-xl md:shadow-none">
                <div className="w-16 h-16 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-xl font-black text-[#1B1F3B] mx-auto">1</div>
                <div className="text-center space-y-4">
                   <h5 className="font-black text-[#1B1F3B] text-sm uppercase tracking-widest">Upload Sources</h5>
                   <p className="text-slate-400 text-sm leading-relaxed">Simply upload your PDF notes, textbooks, or paste any lecture text into the app.</p>
                </div>
             </div>

             <div className="space-y-8 bg-white md:bg-transparent p-10 md:p-0 rounded-3xl border md:border-none border-slate-50 shadow-xl md:shadow-none">
                <div className="w-16 h-16 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-xl font-black text-[#4FD1C5] mx-auto">2</div>
                <div className="text-center space-y-4">
                   <h5 className="font-black text-[#1B1F3B] text-sm uppercase tracking-widest">AI Brainstorm</h5>
                   <p className="text-slate-400 text-sm leading-relaxed">Gemini AI analyzes the deep relationships in your material to plan infographics and slides.</p>
                </div>
             </div>

             <div className="space-y-8 bg-white md:bg-transparent p-10 md:p-0 rounded-3xl border md:border-none border-slate-50 shadow-xl md:shadow-none">
                <div className="w-16 h-16 rounded-full bg-[#1B1F3B] shadow-xl flex items-center justify-center text-xl font-black text-[#4FD1C5] mx-auto">3</div>
                <div className="text-center space-y-4">
                   <h5 className="font-black text-[#1B1F3B] text-sm uppercase tracking-widest">Create & Study</h5>
                   <p className="text-slate-400 text-sm leading-relaxed">Generate your assets with one click. Use the AI Chat to clarify any doubts in real-time.</p>
                </div>
             </div>
          </div>
        </section>

        {/* Final CTA / Social Proof */}
        <section className="bg-[#1B1F3B] rounded-[5rem] p-16 lg:p-32 text-center space-y-12 relative overflow-hidden shadow-[0_60px_100px_-20px_rgba(27,31,59,0.4)]">
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#4FD1C5] fill-none stroke-[0.1]">
                 <circle cx="50" cy="50" r="40" />
                 <circle cx="50" cy="50" r="30" />
                 <circle cx="50" cy="50" r="20" />
              </svg>
           </div>
           
           <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map(i => <Target key={i} size={16} className="text-[#4FD1C5]" />)}
              </div>
              <h2 className="text-4xl lg:text-7xl font-black text-white leading-tight tracking-tighter">
                Ready to transform the <br/><span className="text-[#4FD1C5]">way you learn?</span>
              </h2>
              <p className="text-white/40 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                Join thousands of students and teachers who are saving time and achieving better results with StudyMate. Your future self will thank you.
              </p>
           </div>
           
           <div className="relative z-10 pt-8 flex flex-col items-center gap-6">
              <button 
                onClick={onStart}
                className="group px-20 py-8 bg-[#4FD1C5] text-[#1B1F3B] rounded-[2.5rem] font-black text-sm uppercase tracking-[0.5em] shadow-2xl shadow-cyan-400/20 hover:scale-105 transition-all flex items-center gap-4"
              >
                Launch App Now <Rocket size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <div className="flex items-center gap-12 text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">
                 <span>Free Tier Available</span>
                 <span>No Credit Card Needed</span>
                 <span>Instant Access</span>
              </div>
           </div>
        </section>

        {/* Footer */}
        <footer className="pt-24 pb-32 flex flex-col items-center gap-16 border-t border-slate-200">
           <div className="flex flex-wrap items-center justify-center gap-16 text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">
              <div className="flex items-center gap-3">
                <ShieldCheck size={16} className="text-[#4FD1C5]" /> END-TO-END ENCRYPTED
              </div>
              <div className="flex items-center gap-3">
                <BrainCircuit size={16} className="text-[#4FD1C5]" /> GEMINI 3.0 ARCHITECTURE
              </div>
              <div className="flex items-center gap-3">
                <Library size={16} className="text-[#4FD1C5]" /> SCHOLARLY STANDARDS
              </div>
           </div>
           
           <div className="flex flex-col items-center gap-10">
              <div className="flex items-center gap-4">
                <BrandLogo size={40} withBackground={false} />
                <span className="studymate-wordmark text-[#1B1F3B] text-2xl tracking-[0.2em]">StudyMate</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase max-w-xs text-center leading-loose">
                &copy; 2026 StudyMate AI. Empowering the next generation of thinkers through visual and interactive education.
              </p>
           </div>
        </footer>
      </div>
    </div>
  );
};
