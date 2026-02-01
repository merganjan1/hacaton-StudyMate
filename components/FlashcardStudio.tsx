
import React, { useState } from 'react';
import { FlashcardData } from '../types';
import { ChevronLeft, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';

export const FlashcardStudio: React.FC<{ data: FlashcardData }> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const card = data.cards[currentIndex];

  return (
    <div className="h-full flex flex-col items-center justify-center p-10 bg-[#F4F6FA] relative overflow-hidden">
      {/* Background brand signature decorative element */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[1px] bg-[#4FD1C5] -rotate-12"></div>
         <div className="absolute top-1/2 left-[30%] -translate-y-[12px] w-4 h-4 rounded-full bg-[#4FD1C5]"></div>
         <div className="absolute top-1/2 left-[50%] -translate-y-[18px] w-4 h-4 rounded-full bg-[#4FD1C5]"></div>
         <div className="absolute top-1/2 left-[70%] -translate-y-[24px] w-4 h-4 rounded-full bg-[#4FD1C5]"></div>
      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className="mb-10 text-center">
           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2">{data.title}</h4>
           <div className="w-12 h-0.5 bg-[#4FD1C5] mx-auto opacity-40"></div>
        </div>

        {/* Flip Card Container */}
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative h-[420px] w-full cursor-pointer perspective-1000 group"
        >
          <div className={`relative w-full h-full transition-all duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            {/* Front */}
            <div className="absolute inset-0 backface-hidden bg-white rounded-[3rem] border border-slate-100 shadow-2xl flex flex-col items-center justify-center p-16 text-center">
              <div className="absolute top-10 flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#4FD1C5] animate-pulse"></div>
                 <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">Savol / Termin</span>
              </div>
              <h3 className="text-3xl font-bold text-[#1B1F3B] leading-tight tracking-tight">{card.front}</h3>
              <div className="absolute bottom-12 flex flex-col items-center">
                 <div className="w-8 h-[1px] bg-slate-100 mb-4"></div>
                 <p className="text-[#4FD1C5] text-[9px] font-black uppercase tracking-[0.3em] animate-pulse">Ag'daring</p>
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#1B1F3B] rounded-[3rem] shadow-2xl flex flex-col items-center justify-center p-16 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <div className="absolute w-[200%] h-[1px] bg-[#4FD1C5] top-1/2 left-0 -rotate-6"></div>
              </div>
              <div className="absolute top-10 flex items-center gap-2">
                 <Sparkles size={12} className="text-[#4FD1C5]" />
                 <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Javob / Ta'rif</span>
              </div>
              <p className="text-2xl font-medium leading-relaxed tracking-tight relative z-10">{card.back}</p>
              <RotateCcw className="absolute bottom-12 text-[#4FD1C5]/40" size={24} />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-16 flex items-center justify-between px-6">
          <button 
            disabled={currentIndex === 0}
            onClick={() => { setCurrentIndex(i => i - 1); setIsFlipped(false); }}
            className="w-14 h-14 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-x-1 transition-all disabled:opacity-20 flex items-center justify-center text-[#1B1F3B]"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
              {currentIndex + 1} / {data.cards.length}
            </p>
          </div>

          <button 
            disabled={currentIndex === data.cards.length - 1}
            onClick={() => { setCurrentIndex(i => i + 1); setIsFlipped(false); }}
            className="w-14 h-14 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:translate-x-1 transition-all disabled:opacity-20 flex items-center justify-center text-[#1B1F3B]"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};
