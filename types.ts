
export enum AppTab {
  INFOGRAPHIC = 'INFOGRAPHIC',
  IMAGE_EDITOR = 'IMAGE_EDITOR',
  PRESENTATION = 'PRESENTATION'
}

export interface Slide {
  title: string;
  content: string[];
  detailedExplanation: string;
  visualPrompt: string;
  speakerNotes: string;
  didacticMethod?: string;
  imageUrl?: string;
}

export interface PresentationData {
  id: string;
  title: string;
  slides: Slide[];
  topicOverview: string;
  createdAt: number;
}

export interface InfographicData {
  id: string;
  title: string;
  imageUrl: string; 
  summary: string;
  keyConcepts: { term: string, definition: string }[];
  promptUsed: string;
  createdAt: number;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface FlashcardData {
  id: string;
  title: string;
  cards: Flashcard[];
  createdAt: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizData {
  id: string;
  title: string;
  questions: QuizQuestion[];
  createdAt: number;
}

export interface SourceAnalysis {
  title: string;
  visualPrompt: string;
  summary: string;
  keyConcepts: { term: string, definition: string }[];
}

export interface Source {
  id: string;
  name: string;
  data?: string;
  type: 'pdf' | 'text';
  isAnalyzing: boolean;
  analysis?: SourceAnalysis;
  createdAt: number;
}

export interface ImageEditRequest {
  image: string;
  prompt: string;
}
