
import { GoogleGenAI, Type } from "@google/genai";
import { InfographicData, SourceAnalysis, PresentationData, Slide, FlashcardData, QuizData } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const generateSlideImage = async (title: string, content: string[]): Promise<string> => {
  const ai = getAI();
  const contentText = content.join(", ");
  const masterPrompt = `Professional high-quality educational slide about "${title}". 
  Subject matter: ${contentText}. 
  Style: Minimalist, clean corporate/educational presentation style, 16:9 aspect ratio, vibrant and modern colors, 3D elements, no messy text, clear visual hierarchy. 
  The image should look like a complete, standalone presentation slide for a premium EdTech app called StudyMate.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: masterPrompt }] },
    config: {
      imageConfig: {
        aspectRatio: "16:9"
      }
    },
  });

  let base64Image = "";
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      base64Image = `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return base64Image;
};

export const analyzeSource = async (source: { data: string, mimeType: string }): Promise<SourceAnalysis> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: source },
        { text: `Siz "StudyMate" AI platformasining professional o'quv tahlilchisisiz. Vazifangiz: murakkab akademik matnlarni tushunarli va estetik jihatdan mukammal vizual reja (infografika poster blueprint)ga aylantirish.
        
        TIL: FAQAT O'zbek tilida (Lotin alifbosi).
        
        JSON Format:
        {
          "title": "Mavzu nomi",
          "visualPrompt": "Detailed English image generation prompt for an educational poster",
          "summary": "Mavzu bo'yicha batafsil tahliliy xulosa",
          "keyConcepts": [{"term": "Termin", "definition": "Izoh"}]
        }` }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          visualPrompt: { type: Type.STRING },
          summary: { type: Type.STRING },
          keyConcepts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                term: { type: Type.STRING },
                definition: { type: Type.STRING }
              },
              required: ["term", "definition"]
            }
          }
        },
        required: ["title", "visualPrompt", "summary", "keyConcepts"]
      }
    }
  });

  return JSON.parse(response.text) as SourceAnalysis;
};

export const generateFlashcards = async (source: { data: string, mimeType: string }): Promise<FlashcardData> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: source },
        { text: `Ushbu material asosida StudyMate uchun 8-10 ta o'quv kartochkalarini (Flashcards) yarating.
        - "front": Termin yoki savol.
        - "back": Ta'rif yoki javob.
        - Til: O'zbek (Lotin).` }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          cards: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                front: { type: Type.STRING },
                back: { type: Type.STRING }
              },
              required: ["id", "front", "back"]
            }
          }
        },
        required: ["title", "cards"]
      }
    }
  });

  const data = JSON.parse(response.text);
  return { ...data, id: Math.random().toString(36).substr(2, 9), createdAt: Date.now() };
};

export const generateQuiz = async (source: { data: string, mimeType: string }): Promise<QuizData> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: source },
        { text: `Ushbu material asosida StudyMate platformasi uchun test savollarini yarating. 
        TIL: O'zbek (Lotin).
        
        DIQQAT: "explanation" bo'limida to'g'ri va noto'g'ri javoblarni tahlil qilib bering.` }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctAnswer: { type: Type.INTEGER },
                explanation: { type: Type.STRING }
              },
              required: ["id", "question", "options", "correctAnswer", "explanation"]
            }
          }
        },
        required: ["title", "questions"]
      }
    }
  });

  const data = JSON.parse(response.text);
  return { ...data, id: Math.random().toString(36).substr(2, 9), createdAt: Date.now() };
};

export const generatePresentation = async (source: { data: string, mimeType: string }): Promise<PresentationData> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: {
      parts: [
        { inlineData: source },
        { text: `Siz StudyMate platformasining bosh pedagogisiz. Materialni chuqur va ilmiy asoslangan prezentatsiyaga aylantiring. 
        TIL: O'zbek (Lotin).` }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          topicOverview: { type: Type.STRING },
          slides: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                content: { type: Type.ARRAY, items: { type: Type.STRING } },
                detailedExplanation: { type: Type.STRING },
                didacticMethod: { type: Type.STRING },
                visualPrompt: { type: Type.STRING },
                speakerNotes: { type: Type.STRING }
              },
              required: ["title", "content", "detailedExplanation", "didacticMethod", "visualPrompt", "speakerNotes"]
            }
          }
        },
        required: ["title", "topicOverview", "slides"]
      }
    }
  });

  const rawData = JSON.parse(response.text);
  const slidesWithImages: Slide[] = await Promise.all(
    rawData.slides.map(async (slide: any) => {
      try {
        const img = await generateSlideImage(slide.title, slide.content);
        return { ...slide, imageUrl: img };
      } catch (e) {
        return slide;
      }
    })
  );

  return {
    id: Math.random().toString(36).substr(2, 9),
    title: rawData.title,
    topicOverview: rawData.topicOverview,
    slides: slidesWithImages,
    createdAt: Date.now()
  };
};

export const automatePdfToPoster = async (source: { 
  file: { data: string, mimeType: string },
  preAnalysis?: SourceAnalysis
}): Promise<InfographicData> => {
  const meta = source.preAnalysis || await analyzeSource(source.file);
  const ai = getAI();
  const masterPrompt = `ULTRA-HIGH DETAIL EDUCATIONAL POSTER FOR STUDYMATE: "${meta.title}". Technical Layout: ${meta.visualPrompt}. Professional infographic style. No clutter.`;

  const imageResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: masterPrompt }] },
    config: { imageConfig: { aspectRatio: "3:4" } },
  });

  let base64Image = "";
  for (const part of imageResponse.candidates[0].content.parts) {
    if (part.inlineData) base64Image = `data:image/png;base64,${part.inlineData.data}`;
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    title: meta.title,
    imageUrl: base64Image,
    summary: meta.summary,
    keyConcepts: meta.keyConcepts,
    promptUsed: meta.visualPrompt,
    createdAt: Date.now()
  };
};

export const querySources = async (prompt: string, sources: any[]) => {
  const ai = getAI();
  const parts = sources.map(s => s.type === 'pdf' ? { inlineData: { data: s.data, mimeType: 'application/pdf' } } : { text: s.data });
  parts.push({ text: prompt });
  const res = await ai.models.generateContent({ 
    model: "gemini-3-flash-preview", 
    contents: { parts },
    config: { systemInstruction: "Siz StudyMate AI yordamchisiz. FAQAT taqdim etilgan manba asosida, O'zbek tilida (Lotin) javob bering. Javobingiz akademik va tushunarli bo'lsin." }
  });
  return res.text;
};

export const generateInfographic = async (source: any) => {
    if (source.file) return automatePdfToPoster(source);
    return automatePdfToPoster({ file: { data: btoa(source.text), mimeType: 'text/plain' } as any });
};

export const editImage = async (base64Image: string, prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ inlineData: { data: base64Image.split(',')[1], mimeType: 'image/png' } }, { text: prompt }] }
  });
  const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
  return imagePart?.inlineData?.data ? `data:image/png;base64,${imagePart.inlineData.data}` : null;
};
