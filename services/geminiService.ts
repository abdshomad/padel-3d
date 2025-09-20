
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

export const generateCourtDesign = async (prompt: string): Promise<CourtDesignPartial> => {
  try {
    const systemInstruction = `Anda adalah desainer lapangan Padel kelas dunia. Tugas Anda adalah menghasilkan desain yang kreatif dan estetis berdasarkan permintaan pengguna. Anda HARUS merespons HANYA dengan objek JSON yang valid yang sesuai dengan skema yang disediakan. Pastikan warna memiliki kontras yang baik dan desainnya kohesif. Opasitas kaca harus berupa angka rendah untuk transparansi.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      // FIX: The `contents` field was using a chat-style array for a single prompt.
      // Switched to a simple string as recommended by the guidelines for single-turn text generation.
      contents: `Rancang lapangan padel dengan tema berikut: ${prompt}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const design = JSON.parse(jsonText);
    
    // Validate and clamp values
    if (design.glassOpacity) {
      design.glassOpacity = Math.max(0.05, Math.min(0.5, design.glassOpacity));
    }

    return design as CourtDesignPartial;
  } catch (error) {
    console.error("Error generating court design with Gemini:", error);
    throw new Error("Gagal membuat desain AI. Harap periksa perintah atau kunci API Anda.");
  }
};