
import React, { useState, useRef, useEffect } from 'react';
import { automatePdfToPoster, querySources } from '../services/geminiService';
import { Loader2, Send, Sparkles, MessageSquare, Image as ImageIcon, Info, Cpu } from 'lucide-react';
import { Source } from '../types';

interface Props {
  sources: Source[];
  onNewInfographic: (data: any) => void;
}

export const ChatWorkspace: React.FC<Props> = ({ sources, onNewInfographic }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string, type?: 'text' | 'action' }[]>([
    { role: 'ai', text: "StudyMate platformasiga xush kelibsiz! Men sizning shaxsiy AI o'qituvchingizman. Manbalaringiz asosida posterlar yaratishim, savollarga javob berishim yoki o'quv materiallarini tayyorlashim mumkin. Bugun nima ustida ishlaymiz?", type: 'text' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.toLowerCase();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: input, type: 'text' }]);
    setLoading(true);

    try {
      const isInfographicRequest = 
        userMsg.includes('poster') || 
        userMsg.includes('infografika') || 
        userMsg.includes('yarat') || 
        userMsg.includes('chiz');

      if (isInfographicRequest && sources.length > 0) {
        const latestSource = sources[sources.length - 1];
        
        if (latestSource.isAnalyzing) {
          setMessages(prev => [...prev, { 
            role: 'ai', 
            text: "Hujjat hali tahlil qilinmoqda. Iltimos, biroz kutib turing.", 
            type: 'text' 
          }]);
          setLoading(false);
          return;
        }

        const result = await automatePdfToPoster({
          file: { data: latestSource.data!, mimeType: 'application/pdf' },
          preAnalysis: latestSource.analysis
        });
        
        onNewInfographic(result);
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: "Ajoyib! StudyMate sizning so'rovingizga binoan yangi infografika tayyorladi. Uni loyihalar ro'yxatida ko'rishingiz mumkin.",
          type: 'action'
        }]);
      } else {
        if (sources.length === 0) {
          setMessages(prev => [...prev, { 
            role: 'ai', 
            text: "Manba topilmadi. Avval chap paneldan PDF yuklang va uni belgilang.", 
            type: 'text' 
          }]);
        } else {
          const answer = await querySources(input, sources);
          setMessages(prev => [...prev, { role: 'ai', text: answer, type: 'text' }]);
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.", type: 'text' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-6 duration-500`}>
            <div className={`max-w-3xl flex gap-6 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center mt-1 shadow-sm ${
                m.role === 'user' ? 'bg-[#1B1F3B] text-[#4FD1C5]' : 'bg-[#F4F6FA] text-[#1B1F3B]'
              }`}>
                {m.role === 'user' ? <MessageSquare size={18} /> : <Cpu size={18} />}
              </div>
              <div className={`p-8 rounded-[2.5rem] text-[13px] leading-relaxed shadow-sm border ${
                m.role === 'user' 
                ? 'bg-[#1B1F3B] text-white border-transparent rounded-tr-none' 
                : m.type === 'action' 
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-100 rounded-tl-none'
                  : 'bg-[#F4F6FA] text-[#1B1F3B] border-[#1B1F3B]/5 rounded-tl-none'
              }`}>
                <div className="whitespace-pre-wrap font-semibold tracking-tight">
                  {m.text}
                </div>
                {m.type === 'action' && (
                  <div className="mt-5 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#4FD1C5]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4FD1C5] animate-brand-glow"></div>
                     StudyMate Asset Tayyor
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-6 animate-pulse">
              <div className="w-10 h-10 rounded-2xl bg-[#F4F6FA] flex items-center justify-center">
                <Loader2 className="animate-spin text-[#4FD1C5]" size={18} />
              </div>
              <div className="bg-[#F4F6FA] px-8 py-5 rounded-[2rem] border border-[#1B1F3B]/5">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">StudyMate processing...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-10 border-t border-slate-50 bg-white">
        <div className="max-w-5xl mx-auto relative group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="StudyMate'dan so'rang yoki material yarating..."
            className="w-full h-28 p-8 pr-40 bg-[#F4F6FA] border-2 border-transparent focus:border-[#4FD1C5]/30 focus:bg-white rounded-[2.5rem] outline-none resize-none text-sm font-bold placeholder:text-slate-300 transition-all shadow-inner"
          />
          <div className="absolute right-6 bottom-6">
            <button 
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="px-8 py-4 bg-[#1B1F3B] text-[#4FD1C5] rounded-2xl hover:scale-105 transition-all disabled:opacity-20 shadow-2xl shadow-indigo-200 flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.2em]"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              Jo'natish
            </button>
          </div>
        </div>
        <div className="flex justify-center gap-8 mt-6">
           <div className="flex items-center gap-2 text-[8px] font-black text-slate-300 uppercase tracking-[0.3em]">
             <div className="w-1 h-1 rounded-full bg-slate-200"></div> StudyMate AI Engine
           </div>
           <div className="flex items-center gap-2 text-[8px] font-black text-slate-300 uppercase tracking-[0.3em]">
             <div className="w-1 h-1 rounded-full bg-slate-200"></div> Premium EdTech OS
           </div>
        </div>
      </div>
    </div>
  );
};
