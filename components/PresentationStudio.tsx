
import React, { useEffect, useState } from 'react';
import { PresentationData } from '../types';
import { 
  Play, Layout, Monitor, Sparkles, ImageIcon
} from 'lucide-react';

export const PresentationStudio: React.FC<{ presentations: PresentationData[], selectedId?: string | null, hideHeader?: boolean }> = ({ presentations, selectedId, hideHeader }) => {
  const [selectedDeckIndex, setSelectedDeckIndex] = useState(0);

  useEffect(() => {
    if (selectedId) {
      const idx = presentations.findIndex(p => p.id === selectedId);
      if (idx !== -1) setSelectedDeckIndex(idx);
    }
  }, [selectedId, presentations]);

  if (presentations.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-20 text-center bg-white">
        <div className="w-24 h-24 bg-indigo-50 rounded-[2rem] flex items-center justify-center mb-10 border border-indigo-100">
          <Layout size={40} className="text-indigo-200" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Prezentatsiyalar mavjud emas</h3>
        <p className="max-w-md text-sm text-slate-400 font-medium">
          PDF hujjat yuklang va "Prezentatsiya Yaratish" tugmasini bosing. AI yaxlit 16:9 o'quv slaydlarini tayyorlaydi.
        </p>
      </div>
    );
  }

  const currentDeck = presentations[selectedDeckIndex];

  return (
    <div className="h-full w-full flex flex-col bg-white overflow-hidden">
      {/* Header Toolbar (Optional) */}
      {!hideHeader && (
        <div className="h-16 border-b border-slate-100 flex items-center justify-between px-8 shrink-0 bg-white shadow-sm z-20">
          <div className="flex items-center gap-4">
            <h3 className="text-xs font-bold text-slate-900 truncate max-w-[400px]">{currentDeck.title}</h3>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-lg flex items-center gap-1">
              <Sparkles size={10} /> {currentDeck.slides.length} Slaydlar
            </span>
          </div>
          <button className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-600 transition-all">
            <Play size={14} /> Namoyish
          </button>
        </div>
      )}

      {/* Main Content Area - Continuous Scrolling List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-100/30 p-6 lg:p-12">
        <div className="max-w-5xl mx-auto space-y-12 pb-20">
          {currentDeck.slides.map((slide, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              {/* Slide Container 16:9 */}
              <div className="w-full aspect-video relative group">
                <div className="w-full h-full bg-white rounded-[2rem] shadow-xl border border-slate-200/50 overflow-hidden relative">
                  {slide.imageUrl ? (
                    <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-slate-200">
                      <ImageIcon size={64} className="animate-pulse" />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em]">Slayd tayyorlanmoqda...</p>
                    </div>
                  )}
                  
                  {/* Slide Number Overlay */}
                  <div className="absolute top-6 left-6">
                    <div className="px-3 py-1.5 bg-black/10 backdrop-blur-md rounded-xl text-[9px] font-black text-white uppercase tracking-widest border border-white/10 shadow-sm">
                      Slide {idx + 1}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
