import { GoogleGenAI } from "@google/genai";

async function generateLogo() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key is missing. Logo generation will be skipped.");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: "A professional and modern gaming logo featuring the number '67'. The design should be sleek, high-tech, and bold, with a vibrant blue and neon accent color scheme. It should look like a high-quality esports or gaming platform icon. Minimalist, clean lines, vector style.",
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
  } catch (error) {
    console.error("Error generating logo:", error);
    return null;
  }
}

export { generateLogo };
