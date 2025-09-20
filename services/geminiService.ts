import { GoogleGenAI, Type } from "@google/genai";
import type { CourtDesignPartial } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    courtColor: {
      type: Type.STRING,
      description: "A hex color code for the main playing surface, e.g., '#005A9C'."
    },
    linesColor: {
        type: Type.STRING,
        description: "A hex color code for the court lines, e.g., '#FFFFFF'."
    },
    outOfPlayColor: {
      type: Type.STRING,
      description: "A hex color code for the area outside the court lines, e.g., '#003D6B'."
    },
    frameColor: {
      type: Type.STRING,
      description: "A hex color code for the metal structure, e.g., '#333333'."
    },
    glassOpacity: {
      type: Type.NUMBER,
      description: "A number between 0.05 and 0.5 for the glass wall opacity."
    },
    netColor: {
        type: Type.STRING,
        description: "A hex color code for the net, e.g., '#111111'."
    },
    logoColor: {
        type: Type.STRING,
        description: "A hex color code for the logo on the net, e.g., '#FFFFFF'."
    }
  },
};

const systemInstructions = {
  en: `You are a world-class Padel court designer. Your task is to generate creative and aesthetically pleasing designs based on user prompts. You MUST respond ONLY with a valid JSON object that conforms to the provided schema. Ensure colors have good contrast and the design is cohesive. Glass opacity should be a low number for transparency.`,
  id: `Anda adalah desainer lapangan Padel kelas dunia. Tugas Anda adalah menghasilkan desain yang kreatif dan estetis berdasarkan permintaan pengguna. Anda HARUS merespons HANYA dengan objek JSON yang valid yang sesuai dengan skema yang disediakan. Pastikan warna memiliki kontras yang baik dan desainnya kohesif. Opasitas kaca harus berupa angka rendah untuk transparansi.`
};

const errorMessages = {
    en: "Failed to generate AI design. Please check your prompt or API key.",
    id: "Gagal membuat desain AI. Harap periksa perintah atau kunci API Anda."
};

const promptPrefixes = {
    en: "Design a padel court with the following theme: ",
    id: "Rancang lapangan padel dengan tema berikut: "
};


export const generateCourtDesign = async (prompt: string, lang: 'en' | 'id' = 'id'): Promise<CourtDesignPartial> => {
  try {
    const systemInstruction = systemInstructions[lang];
    const fullPrompt = `${promptPrefixes[lang]}${prompt}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const design = JSON.parse(jsonText);
    
    if (design.glassOpacity) {
      design.glassOpacity = Math.max(0.05, Math.min(0.5, design.glassOpacity));
    }

    return design as CourtDesignPartial;
  } catch (error) {
    console.error("Error generating court design with Gemini:", error);
    throw new Error(errorMessages[lang]);
  }
};
