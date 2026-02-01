
import React, { useState } from 'react';
import { 
  PieChart, Monitor, Library, HelpCircle, 
  Loader2, PanelRightClose, Sparkles, MessageSquare, CheckCircle2
} from 'lucide-react';
import { automatePdfToPoster, generatePresentation, generateFlashcards, generateQuiz } from '../services/geminiService';
import { Source, InfographicData, PresentationData, FlashcardData, QuizData } from '../types';

interface Props {
  sources: Source[];
  infographics: InfographicData[];
  presentations: PresentationData[];
  flashcards: FlashcardData[];
  quizzes: QuizData[];
  selectedSourceIds: string[];
  activeTab: 'chat' | 'studio' | 'editor' | 'presentation';
  onSelectItem: (id: string, type: 'poster' | 'presentation' | 'flashcard' | 'quiz' | 'chat') => void;
  onGeneratePoster: (data: any) => void;
  onGeneratePresentation: (data: any) => void;
  onGenerateFlashcards: (data: any) => void;
  onGenerateQuiz: (data: any) => void;
}

export const StudioSidebar: React.FC<Props> = ({ 
  sources, infographics, presentations, flashcards, quizzes, 
  selectedSourceIds, activeTab, onSelectItem, 
  onGeneratePoster, onGeneratePresentation, onGenerateFlashcards, onGenerateQuiz
}) => {
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  const tools = [
    { id: 'poster', label: 'Grafika', icon: PieChart, color: 'text-indigo-500' },
    { id: 'presentation', label: 'Slaydlar', icon: Monitor, color: 'text-yellow-600' },
    { id: 'flashcard', label: 'Kartochka', icon: Library, color: 'text-rose-500' },
    { id: 'quiz', label: 'Testlar', icon: HelpCircle, color: 'text-cyan-500' },
  ];

  const handleAction = async (id: string) => {
    const selectedSources = sources.filter(s => selectedSourceIds.includes(s.id) && !s.isAnalyzing);
    const latest = selectedSources[selectedSources.length - 1];

    if (!latest || !latest.data) {
      alert("Iltimos, avval chap paneldan kamida bitta 'TAYYOR' manbani belgilang.");
      return;
    }

    setGeneratingId(id);
    try {
      if (id === 'poster') {
        const res = await automatePdfToPoster({ file: { data: latest.data, mimeType: 'application/pdf' }, preAnalysis: latest.analysis });
        onGeneratePoster(res);
      } else if (id === 'presentation') {
        const res = await generatePresentation({ data: latest.data, mimeType: 'application/pdf' });
        onGeneratePresentation(res);
      } else if (id === 'flashcard') {
        const res = await generateFlashcards({ data: latest.data, mimeType: 'application/pdf' });
        onGenerateFlashcards(res);
      } else if (id === 'quiz') {
        const res = await generateQuiz({ data: latest.data, mimeType: 'application/pdf' });
        onGenerateQuiz(res);
      }
    } finally {
      setGeneratingId(null);
    }
  };

  const allProjects = [
    ...infographics.map(i => ({ ...i, name: i.title, viewType: 'poster' as const })),
    ...presentations.map(p => ({ ...p, name: p.title, viewType: 'presentation' as const })),
    ...flashcards.map(f => ({ ...f, name: f.title, viewType: 'flashcard' as const })),
    ...quizzes.map(q => ({ ...q, name: q.title, viewType: 'quiz' as const }))
  ].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <aside className="w-[280px] bg-white flex flex-col shrink-0 overflow-hidden border-l border-slate-100">
      <div className="p-6 flex-1 flex flex-col overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between mb-8 px-1">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">Studiya</h2>
          <PanelRightClose size={16} className="text-slate-300" />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-10">
          {tools.map((tool) => (
            <div 
              key={tool.id}
              onClick={() => !generatingId && handleAction(tool.id)}
              className="relative group cursor-pointer p-4 rounded-3xl border border-slate-50 hover:border-slate-200 hover:bg-slate-50 transition-all flex flex-col items-center gap-3 text-center aspect-square justify-center"
            >
              <div className={`p-3 rounded-2xl ${tool.color} bg-white shadow-sm border border-slate-50 group-hover:scale-110 transition-transform`}>
                {generatingId === tool.id ? <Loader2 size={20} className="animate-spin" /> : <tool.icon size={20} />}
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{tool.label}</span>
            </div>
          ))}
        </div>

        <div className="flex-1 space-y-1 mb-8">
           <div className="flex items-center justify-between mb-4 px-2">
             <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Mening Loyihalarim</h3>
             <button onClick={() => onSelectItem('chat', 'chat')} className="text-slate-300 hover:text-slate-900">
               <MessageSquare size={14} />
             </button>
           </div>
           
           {allProjects.length === 0 ? (
             <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest px-2 italic text-center py-4">Hali loyihalar yo'q</p>
           ) : (
             allProjects.map((item) => {
               let Icon = PieChart;
               let iconColor = "text-indigo-500 bg-indigo-50/50";
               if (item.viewType === 'presentation') { Icon = Monitor; iconColor = "text-yellow-600 bg-yellow-50/50"; }
               if (item.viewType === 'flashcard') { Icon = Library; iconColor = "text-rose-500 bg-rose-50/50"; }
               if (item.viewType === 'quiz') { Icon = HelpCircle; iconColor = "text-cyan-500 bg-cyan-50/50"; }

               return (
                 <div 
                   key={item.id} 
                   onClick={() => onSelectItem(item.id, item.viewType)}
                   className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all border border-transparent hover:bg-slate-50/50"
                 >
                   <div className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center ${iconColor} border border-slate-100/50`}>
                     <Icon size={14} />
                   </div>
                   <div className="flex-1 min-w-0">
                     <h4 className="text-[11px] font-bold truncate tracking-tight text-slate-600">{item.name}</h4>
                     <span className="text-[7px] font-black text-emerald-500 uppercase flex items-center gap-1">
                       <CheckCircle2 size={8} /> TAYYOR
                     </span>
                   </div>
                 </div>
               );
             })
           )}
        </div>
      </div>
    </aside>
  );
};
