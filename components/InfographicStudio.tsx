
import React, { useState, useEffect } from 'react';
import { 
  Download, ChevronLeft, ChevronRight, Sparkles
} from 'lucide-react';

export const InfographicStudio: React.FC<{ infographics: any[], selectedId?: string | null, hideHeader?: boolean }> = ({ infographics, selectedId, hideHeader }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  useEffect(() => {
    if (selectedId) {
      const idx = infographics.findIndex(i => i.id === selectedId);
      if (idx !== -1) setSelectedIndex(idx);
    }
  }, [selectedId, infographics]);

  const current = infographics[selectedIndex];

  const download = () => {
    if (!current?.imageUrl) return;
    const link = document.createElement('a');
    link.download = `BilimGrafik-${current.title.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = current.imageUrl;
    link.click();
  };

  if (infographics.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-20 text-center bg-white">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-10 border border-slate-100 animate-pulse">
          <Sparkles size={40} className="text-slate-200" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Hali posterlar yaratilmagan</h3>
        <p className="max-w-md text-sm text-slate-400 font-medium leading-relaxed">
          PDF hujjat yuklang va "Poster Yaratish" tugmasini bosing. AI professional infografika tayyorlaydi.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden animate-in fade-in duration-500">
      {/* Header (Optional) */}
      {!hideHeader && (
        <div className="h-20 border-b border-slate-100 flex items-center justify-between px-10 shrink-0 bg-white/80 backdrop-blur-xl z-10 sticky top-0">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
              <button 
                disabled={selectedIndex === 0}
                onClick={() => setSelectedIndex(prev => prev - 1)}
                className="p-2.5 rounded-xl hover:bg-white hover:shadow-sm disabled:opacity-20 transition-all text-slate-600"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-[11px] font-bold tracking-widest text-slate-400 min-w-[50px] text-center">
                {selectedIndex + 1} / {infographics.length}
              </span>
              <button 
                disabled={selectedIndex === infographics.length - 1}
                onClick={() => setSelectedIndex(prev => prev + 1)}
                className="p-2.5 rounded-xl hover:bg-white hover:shadow-sm disabled:opacity-20 transition-all text-slate-600"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">{current.title}</h3>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Educational Poster Asset</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={download}
              className="relative group flex items-center gap-3 px-8 py-3 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl"
            >
              <Download size={16} /> PNG Yuklash
            </button>
          </div>
        </div>
      )}

      {/* Main Viewport - Simplified to show only the poster */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-slate-50/20 flex items-center justify-center">
        <div className="max-w-4xl w-full mx-auto">
          <div className="bg-white p-4 rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden">
             <img src={current.imageUrl} alt={current.title} className="w-full h-auto rounded-[2rem]" />
          </div>
        </div>
      </div>
    </div>
  );
};
