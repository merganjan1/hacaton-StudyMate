
import React, { useRef } from 'react';
import { 
  Plus, Database, Loader2, FileText, 
  Search, CheckCircle2, Square, CheckSquare, Layers
} from 'lucide-react';
import { Source } from '../types';

interface Props {
  sources: Source[];
  onAddSource: (s: { name: string, data?: string, type: 'pdf' | 'text' }) => void;
  onSelectItem: (id: string) => void;
  selectedId: string | null;
  selectedSourceIds: string[];
  onToggleSource: (id: string) => void;
}

export const ProjectSidebar: React.FC<Props> = ({ 
  sources, onAddSource, onSelectItem, selectedId,
  selectedSourceIds, onToggleSource
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onloadend = () => {
        onAddSource({ 
          name: file.name, 
          data: (reader.result as string).split(',')[1], 
          type: 'pdf' 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <aside className="w-[320px] bg-[#F4F6FA] flex flex-col shrink-0 overflow-hidden">
      <div className="p-8">
        <button 
          onClick={() => fileRef.current?.click()}
          className="w-full flex items-center justify-center gap-3 py-4.5 bg-[#1B1F3B] text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] transition-all shadow-2xl shadow-indigo-100"
        >
          <Plus size={18} className="text-[#4FD1C5]" /> Yangi Manba
        </button>
        <input type="file" ref={fileRef} className="hidden" accept="application/pdf" onChange={handleFile} />
      </div>

      <div className="px-8 pb-6 flex items-center gap-3 text-slate-300">
         <Search size={16} />
         <input type="text" placeholder="Manbalarni qidirish..." className="bg-transparent border-none outline-none text-xs font-bold w-full text-[#1B1F3B] placeholder:text-slate-300 uppercase tracking-widest" />
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2 custom-scrollbar">
        <div className="flex items-center gap-2 px-3 mb-6">
           <Layers size={14} className="text-slate-400" />
           <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Library</h3>
        </div>
        
        {sources.length === 0 ? (
          <div className="py-24 text-center flex flex-col items-center opacity-40">
            <Database className="text-[#1B1F3B] mb-6" size={48} strokeWidth={1} />
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] px-8 leading-loose">Hozircha manbalar yuklanmagan</p>
          </div>
        ) : (
          sources.map((item) => {
            const isActive = selectedId === item.id;
            const isSelected = selectedSourceIds.includes(item.id);
            
            return (
              <div 
                key={item.id} 
                className={`group flex items-center gap-4 p-4 rounded-3xl cursor-pointer transition-all border ${isActive ? 'bg-white border-slate-200 shadow-xl shadow-indigo-50/50' : 'hover:bg-white/50 border-transparent'}`}
              >
                <button 
                  onClick={(e) => { e.stopPropagation(); onToggleSource(item.id); }}
                  className={`shrink-0 transition-all ${isSelected ? 'text-[#4FD1C5]' : 'text-slate-200 hover:text-slate-300'}`}
                >
                  {isSelected ? <CheckSquare size={22} fill="currentColor" className="text-[#1B1F3B]" style={{ stroke: '#4FD1C5' }} /> : <Square size={22} />}
                </button>

                <div 
                  onClick={() => onSelectItem(item.id)}
                  className="flex flex-1 items-center gap-4 min-w-0"
                >
                  <div className={`w-11 h-11 shrink-0 rounded-2xl flex items-center justify-center ${isActive ? 'bg-[#1B1F3B] text-[#4FD1C5]' : 'bg-white text-slate-300'} border border-slate-100 shadow-sm transition-colors`}>
                    {item.isAnalyzing ? <Loader2 size={20} className="animate-spin" /> : <FileText size={20} />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-xs font-bold truncate tracking-tight ${isActive ? 'text-[#1B1F3B]' : 'text-slate-500'}`}>
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1">
                      {item.isAnalyzing ? (
                        <span className="text-[8px] font-black text-amber-500 uppercase flex items-center gap-1 tracking-widest">
                          Tahlil...
                        </span>
                      ) : (
                        <span className="text-[8px] font-black text-[#4FD1C5] uppercase flex items-center gap-1 tracking-widest">
                          <CheckCircle2 size={8} /> Tayyor
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      <div className="p-8 mt-auto border-t border-slate-100/50">
         <div className="relative h-20 w-full overflow-hidden rounded-2xl bg-[#1B1F3B]/5 p-4 flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#4FD1C5]/10 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
            <p className="text-[10px] font-black text-[#1B1F3B] uppercase tracking-widest">Xotira holati</p>
            <div className="h-1 w-full bg-[#1B1F3B]/10 rounded-full mt-3 overflow-hidden">
               <div className="h-full bg-[#4FD1C5] w-[15%]"></div>
            </div>
         </div>
      </div>
    </aside>
  );
};
