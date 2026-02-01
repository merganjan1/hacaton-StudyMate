
import React, { useState } from 'react';
import { 
  X, Share2, Plus, Minus, 
  ThumbsUp, ThumbsDown, MoreHorizontal, FileDown 
} from 'lucide-react';
import { InfographicStudio } from './InfographicStudio';
import { PresentationStudio } from './PresentationStudio';
import { FlashcardStudio } from './FlashcardStudio';
import { QuizStudio } from './QuizStudio';
import { InfographicData, PresentationData, FlashcardData, QuizData } from '../types';

interface Props {
  itemId: string;
  infographics: InfographicData[];
  presentations: PresentationData[];
  flashcards: FlashcardData[];
  quizzes: QuizData[];
  onClose: () => void;
}

export const ProjectModal: React.FC<Props> = ({ 
  itemId, infographics, presentations, flashcards, quizzes, onClose 
}) => {
  const [zoom, setZoom] = useState(1);
  
  const poster = infographics.find(i => i.id === itemId);
  const presentation = presentations.find(p => p.id === itemId);
  const flashcardSet = flashcards.find(f => f.id === itemId);
  const quiz = quizzes.find(q => q.id === itemId);

  if (!poster && !presentation && !flashcardSet && !quiz) return null;

  const title = poster?.title || presentation?.title || flashcardSet?.title || quiz?.title;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 lg:p-8 animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-white w-full h-full max-w-[90vw] max-h-[90vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border border-slate-200/50">
        
        <header className="h-20 shrink-0 border-b border-slate-100 bg-white flex items-center justify-between px-8">
          <div className="flex flex-col min-w-0">
            <h2 className="text-sm font-bold text-slate-900 truncate tracking-tight">{title}</h2>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              {poster ? 'Infografika' : presentation ? 'Slaydlar' : flashcardSet ? 'Kartochkalar' : 'Test'} Asset
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
               <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-2 hover:bg-white rounded-lg transition-all text-slate-500"><Minus size={14}/></button>
               <span className="text-[10px] font-bold text-slate-400 w-12 text-center">{Math.round(zoom * 100)}%</span>
               <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="p-2 hover:bg-white rounded-lg transition-all text-slate-500"><Plus size={14}/></button>
            </div>
            
            <div className="h-6 w-px bg-slate-100 mx-1"></div>

            <div className="flex items-center gap-1">
              <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"><Share2 size={18}/></button>
              <button className="p-2.5 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><FileDown size={18}/></button>
              <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"><MoreHorizontal size={18}/></button>
              <button onClick={onClose} className="ml-2 p-2.5 bg-slate-50 text-slate-900 hover:bg-slate-900 hover:text-white rounded-xl transition-all"><X size={18} /></button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative bg-slate-50/30">
          <div 
            className="h-full w-full transition-transform duration-200 origin-top overflow-y-auto"
            style={{ transform: `scale(${zoom})` }}
          >
            {poster && <InfographicStudio infographics={[poster]} selectedId={poster.id} hideHeader={true} />}
            {presentation && <PresentationStudio presentations={[presentation]} selectedId={presentation.id} hideHeader={true} />}
            {flashcardSet && <FlashcardStudio data={flashcardSet} />}
            {quiz && <QuizStudio data={quiz} />}
          </div>
        </div>

        <footer className="h-12 shrink-0 border-t border-slate-50 bg-white flex items-center justify-between px-10">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[9px] font-black text-slate-300 uppercase tracking-widest cursor-pointer">
                 <ThumbsUp size={12} /> <span>Foydali</span>
              </div>
              <div className="flex items-center gap-2 text-[9px] font-black text-slate-300 uppercase tracking-widest cursor-pointer">
                 <ThumbsDown size={12} /> <span>Sifatsiz</span>
              </div>
           </div>
           <div className="text-[8px] font-bold text-slate-400 italic">BilimGrafik Workspace</div>
        </footer>
      </div>
    </div>
  );
};
