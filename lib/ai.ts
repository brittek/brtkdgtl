
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeProjectEnquiry = async (name: string, subject: string, message: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `User: ${name} sent a request regarding "${subject}". Message: ${message}`,
      config: {
        systemInstruction: `You are the Lead Technical Architect at Brittek Digital, a Sydney-based high-end engineering studio. 
        Analyze the incoming enquiry and return a JSON object with:
        1. "triage": A 1-sentence assessment of the project's technical complexity.
        2. "strategy": A list of 3-4 specialized engineering steps or technologies (e.g., "Edge-first architecture", "Custom GSAP orchestration").
        3. "tone": A personalized, professional thank you sentence in a restrained, premium tone.
        
        Keep it minimal, technical, and confident.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            triage: { type: Type.STRING },
            strategy: { type: Type.ARRAY, items: { type: Type.STRING } },
            tone: { type: Type.STRING }
          },
          required: ["triage", "strategy", "tone"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Triage failed:", error);
    return null;
  }
};

export const generateSystemAudit = async (input: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this system concept: ${input}`,
      config: {
        systemInstruction: "Generate a high-level technical audit for a digital system. Focus on performance, scalability, and aesthetic precision. Return 3 bullet points. Keep it strictly professional and engineering-focused.",
      }
    });
    return response.text;
  } catch (error) {
    return "Analysis unavailable. System offline.";
  }
};
