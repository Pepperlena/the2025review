import { GoogleGenAI, Type } from "@google/genai";

// Vercel Serverless Function types
type VercelRequest = {
  method?: string;
  body?: any;
  query?: Record<string, string>;
  headers?: Record<string, string>;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (data: any) => VercelResponse;
};

const LANGUAGE_MAP: Record<string, string> = {
  EN: "English",
  ES: "Spanish",
  PT: "Portuguese",
  CN: "Simplified Chinese",
  JP: "Japanese"
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 只允许 POST 请求
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 检查 API Key
  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is missing");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const { answers, profile, language } = req.body;

    if (!answers || !profile || !language) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const formattedAnswers = answers.map((a: any) => 
      `Q: ${a.questionText} | A: ${a.response || "Skipped"}`
    ).join("\n");

    const targetLanguage = LANGUAGE_MAP[language] || "English";

    const prompt = `
    You are the "Viral Content Strategist & Narrative Psychologist" for The 2025 Review.
    Your goal is to analyze the user's year and generate a "Character Card" that is so accurate, slightly unhinged, or deeply resonant that they feel COMPELLED to share it on social media.

    Tone:
    - Wit: High. You can "roast" them gently but ultimately be uplifting.
    - Style: Internet-native, punchy, Gen Z friendly but accessible.
    - Insight: Deep psychological truths wrapped in cool terminology.
    
    IMPORTANT: The Output Language must be ${targetLanguage}.

    User Profile:
    Nickname: ${profile.nickname}
    Age: ${profile.age}
    Gender: ${profile.gender}
    Location: ${profile.country}
    Favorite Art/Media/Creator: ${profile.favoriteWork}
    
    User Answers for 2025:
    ${formattedAnswers}
    
    Instructions:
    1. Archetype: A sharp, definitive 2-4 word title that sounds like a rare RPG class or a movie trope (e.g., "The Chaos Manager", "Soft Era Protagonist", "The Digital Alchemist").
    2. Rarity: Use FULL WORDS only. Choose from: "Common", "Rare", "Super Rare", "Ultra Rare", or "Legendary". DO NOT use abbreviations like "SR" or "SSR".
    3. Stats: 4 creative, specific stats (0-100) based on their year (e.g., "Main Character Energy", "Emotional ROI", "Chaos Management", "Serendipity", "Plot Armor").
    
    4. Deep Analysis:
       - Narrative Arc: Use screenwriting terms. Describe the plot of their year (e.g., "A slow-burn redemption arc...", "A chaotic season finale...").
       - Dominant Trait: Their key superpower this year.
       - Shadow Side: Call them out gently on what held them back (e.g., "Doomscrolling", "People pleasing").
       - Creative Insight: Connect their taste (${profile.favoriteWork}) to their life choices in a surprising way.

    5. Philosophical Summary: 
       - Write this as a list of 3 bullet points.
       - Use the stylistic "vibe" of their Favorite Art/Media/Creator (${profile.favoriteWork}).
       - It should be touching, inspiring, and growth-oriented. Make them feel seen.

    6. Future Forecast: A specific, slightly mystical prediction for 2026.
    7. Quote: A short, punchy motto for their year.
    8. Power Word: One impactful word for 2026.
    9. Lucky Color: Provide a SPECIFIC color name and its Hex Code.
  `;

    // 1. Generate Text Content
    const textResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            archetype: { type: Type.STRING },
            rarity: { type: Type.STRING },
            powerWord: { type: Type.STRING },
            luckyColor: { type: Type.STRING, description: "Specific color name" },
            luckyColorHex: { type: Type.STRING, description: "Hex code for the color" },
            stats: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  value: { type: Type.INTEGER }
                }
              }
            },
            narrativeArc: { type: Type.STRING },
            dominantTrait: { type: Type.STRING },
            shadowSide: { type: Type.STRING },
            creativeInsight: { type: Type.STRING },
            philosophicalSummary: { type: Type.STRING },
            futureForecast: { type: Type.STRING },
            quote: { type: Type.STRING }
          }
        }
      }
    });

    const data = JSON.parse(textResponse.text || "{}");

    // 2. Generate Image
    const imagePrompt = `
      Design a premium 3D blind box toy figure.
      Subject: A ${profile.gender === 'Female' ? 'girl' : profile.gender === 'Male' ? 'boy' : 'kid'} version of the archetype "${data.archetype}".
      Style: Pop Mart style, C4D, Octane Render, 8k resolution, Masterpiece.
      Texture: Soft vinyl skin, matte finish with glossy eyes.
      Expression: Extremely cute, big expressive eyes, round face, innocent.
      Background: SOLID WHITE BACKGROUND (Hex #FFFFFF). COMPLETELY ISOLATED. No environment, no props in background.
      Color Palette: Dominant color ${data.luckyColor}.
      Lighting: Soft studio lighting, rim light.
    `;

    // Try generating an image. If it fails, we return data without image.
    try {
      const imageResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: {
          parts: [{ text: imagePrompt }]
        },
        config: {
          // Ensure we get image output
        }
      });
      
      // Find image part
      let imageUrl = undefined;
      if (imageResponse.candidates?.[0]?.content?.parts) {
        for (const part of imageResponse.candidates[0].content.parts) {
          if (part.inlineData) {
            imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            break;
          }
        }
      }
      
      if (imageUrl) {
        data.generatedImageUrl = imageUrl;
      }

    } catch (imgError) {
      console.warn("Image generation failed, proceeding with text only", imgError);
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: "Failed to process your year." });
  }
}

