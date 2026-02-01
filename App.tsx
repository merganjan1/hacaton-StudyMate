
import React, { useState } from 'react';
import { Source, InfographicData, PresentationData, FlashcardData, QuizData } from './types';
import { ProjectSidebar } from './components/ProjectSidebar';
import { StudioSidebar } from './components/StudioSidebar';
import { ChatWorkspace } from './components/ChatWorkspace';
import { ImageEditor } from './components/ImageEditor';
import { ProjectModal } from './components/ProjectModal';
import { BrandIdentity } from './components/BrandIdentity';
import { BrandLogo } from './components/BrandLogo';
import { IntroPage } from './components/IntroPage';
import { Settings, Sparkles, Layers, Palette, Terminal } from 'lucide-react';
import { analyzeSource } from './services/geminiService';

const App: React.FC = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [infographics, setInfographics] = useState<InfographicData[]>([]);
  const [presentations, setPresentations] = useState<PresentationData[]>([]);
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [quizzes, setQuizzes] = useState<QuizData[]>([]);
  
  const [activeTab, setActiveTab] = useState<'chat' | 'editor' | 'branding'>('chat');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSourceIds, setSelectedSourceIds] = useState<string[]>([]);
  const [showIntro, setShowIntro] = useState(true);

  const addSource = async (newSource: { name: string, data?: string, type: 'pdf' | 'text' }) => {
    const id = Math.random().toString(36).substr(2, 9);
    const sourceObj: Source = { 
      ...newSource, 
      id, 
      isAnalyzing: true, 
      createdAt: Date.now() 
    };
    setSources(prev => [...prev, sourceObj]);
    setSelectedSourceIds(prev => [...prev, id]);

    if (newSource.type === 'pdf' && newSource.data) {
      try {
        const analysis = await analyzeSource({ data: newSource.data, mimeType: 'application/pdf' });
        setSources(prev => prev.map(s => s.id === id ? { ...s, analysis, isAnalyzing: false } : s));
      } catch (err) {
        console.error("Tahlilda xatolik:", err);
        setSources(prev => prev.map(s => s.id === id ? { ...s, isAnalyzing: false } : s));
      }
    } else {
      setSources(prev => prev.map(s => s.id === id ? { ...s, isAnalyzing: false } : s));
    }
  };

  const toggleSourceSelection = (id: string) => {
    setSelectedSourceIds(prev => 
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const handleNewPoster = (data: InfographicData) => {
    setInfographics([data, ...infographics]);
    setSelectedItemId(data.id);
    setIsModalOpen(true);
  };

  const handleNewPresentation = (data: PresentationData) => {
    setPresentations([data, ...presentations]);
    setSelectedItemId(data.id);
    setIsModalOpen(true);
  };

  const handleNewFlashcards = (data: FlashcardData) => {
    setFlashcards([data, ...flashcards]);
    setSelectedItemId(data.id);
    setIsModalOpen(true);
  };

  const handleNewQuiz = (data: QuizData) => {
    setQuizzes([data, ...quizzes]);
    setSelectedItemId(data.id);
    setIsModalOpen(true);
  };

  const handleSelectItem = (id: string, type: string) => {
    if (type === 'chat') {
       setActiveTab('chat');
       setSelectedItemId(null);
    } else {
       setSelectedItemId(id);
       setIsModalOpen(true);
    }
  };

  if (showIntro) {
    return <IntroPage onStart={() => setShowIntro(false)} />;
  }

  if (activeTab === 'branding') {
    return (
      <div className="h-screen overflow-y-auto bg-[#F4F6FA]">
        <header className="h-20 border-b border-slate-100 bg-white flex items-center justify-between px-12 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <BrandLogo size={40} />
            <h1 className="studymate-wordmark text-[#1B1F3B] text-2xl tracking-[0.2em]">StudyMate</h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowIntro(true)}
              className="px-6 py-3 bg-slate-100 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-200 transition-all"
            >
              Asosiy Sahifa
            </button>
            <button 
              onClick={() => setActiveTab('chat')}
              className="px-8 py-3 bg-[#1B1F3B] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#1B1F3B]/90 transition-all shadow-xl shadow-indigo-100"
            >
              Workspacega qaytish
            </button>
          </div>
        </header>
        <BrandIdentity />
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-[#F4F6FA] text-[#1B1F3B] overflow-hidden font-sans">
      <ProjectSidebar 
        sources={sources}
        onAddSource={addSource}
        onSelectItem={(id) => handleSelectItem(id, 'source')}
        selectedId={selectedItemId}
        selectedSourceIds={selectedSourceIds}
        onToggleSource={toggleSourceSelection}
      />

      <main className="flex-1 flex flex-col relative overflow-hidden bg-white border-x border-slate-100/50">
        <header className="h-20 border-b border-slate-100 bg-white flex items-center justify-between px-10 shrink-0 z-30">
          <div className="flex items-center gap-4">
            <BrandLogo size={42} />
            <div className="flex flex-col">
              <h1 className="studymate-wordmark text-[#1B1F3B] text-xl tracking-[0.2em]">StudyMate</h1>
              <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em]">AI EdTech Platform</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('branding')}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-[9px] font-black text-slate-400 hover:text-[#1B1F3B] hover:border-[#4FD1C5]/30 transition-all uppercase tracking-widest"
            >
              <Palette size={14} /> Brand
            </button>
            <div className="h-6 w-px bg-slate-100 mx-1"></div>
            <button 
              onClick={() => setShowIntro(true)}
              className="p-3 text-slate-300 hover:text-[#1B1F3B] rounded-2xl hover:bg-slate-50 transition-all"
              title="Home"
            >
              <Settings size={20} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden">
          {activeTab === 'chat' && (
            <ChatWorkspace 
              sources={sources.filter(s => selectedSourceIds.includes(s.id))} 
              onNewInfographic={handleNewPoster} 
            />
          )}
          {activeTab === 'editor' && <div className="p-12"><ImageEditor /></div>}
        </div>
      </main>

      <StudioSidebar 
        sources={sources}
        infographics={infographics}
        presentations={presentations}
        flashcards={flashcards}
        quizzes={quizzes}
        selectedSourceIds={selectedSourceIds}
        activeTab={activeTab as any}
        onSelectItem={handleSelectItem}
        onGeneratePoster={handleNewPoster}
        onGeneratePresentation={handleNewPresentation}
        onGenerateFlashcards={handleNewFlashcards}
        onGenerateQuiz={handleNewQuiz}
      />

      {isModalOpen && selectedItemId && (
        <ProjectModal 
          itemId={selectedItemId}
          infographics={infographics}
          presentations={presentations}
          flashcards={flashcards}
          quizzes={quizzes}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
