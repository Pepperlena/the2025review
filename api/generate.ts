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

    // 2. Generate Image - Pixar Style
    const imagePrompt = `
      Create a Pixar-style 3D animated character design.
      Subject: A ${profile.gender === 'Female' ? 'girl' : profile.gender === 'Male' ? 'boy' : 'kid'} character representing the archetype "${data.archetype}".
      
      Style Requirements:
      - Pixar Animation Studios style, 3D rendered character
      - Smooth, polished 3D animation quality like Toy Story, Inside Out, or Monsters Inc.
      - Round, friendly features with expressive large eyes
      - Bright, vibrant colors with Pixar's signature color palette
      - Soft, smooth textures with subtle subsurface scattering
      - Character should be full-body or 3/4 view, standing pose
      
      Character Details:
      - Age-appropriate design for a ${profile.age}-year-old
      - Expression: Warm, friendly, slightly confident smile
      - Clothing: Modern, casual outfit that reflects the archetype "${data.archetype}"
      - Dominant color: ${data.luckyColor} (${data.luckyColorHex}) - use this as the primary color in their outfit or accessories
      
      Technical:
      - 3D rendered, Pixar animation quality
      - Clean, professional lighting with soft shadows
      - SOLID WHITE BACKGROUND (Hex #FFFFFF)
      - No background elements, props, or environment
      - High resolution, detailed character design
      - Character should be centered and well-lit
    `;

    // Try generating an image using Gemini's image generation capabilities
    // Note: Gemini models may have limited image generation support
    // We'll try multiple approaches to generate the Pixar-style image
    try {
      console.log("Attempting to generate Pixar-style image...");
      
      // Method 1: Try with explicit image generation request
      const imageResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are an expert 3D character designer. Generate a detailed description for a Pixar-style 3D character that can be used to create an image. 

${imagePrompt}

Now, please generate this character as an image.`
              }
            ]
          }
        ],
        config: {
          // Some Gemini models support image generation via specific config
        }
      });
      
      // Check response for image data
      let imageUrl = undefined;
      const response = imageResponse.candidates?.[0]?.content;
      
      if (response?.parts) {
        for (const part of response.parts) {
          // Check for inline image data
          if (part.inlineData && part.inlineData.data) {
            imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
            console.log("Image found in inlineData");
            break;
          }
          
          // Check if text contains image data URI
          if (part.text) {
            const imageMatch = part.text.match(/data:image\/[^;]+;base64,[A-Za-z0-9+/=]+/);
            if (imageMatch) {
              imageUrl = imageMatch[0];
              console.log("Image found in text response");
              break;
            }
          }
        }
      }
      
      // If no image found, log the response for debugging
      if (!imageUrl) {
        console.warn("No image data found in response. Response structure:", {
          hasCandidates: !!imageResponse.candidates,
          candidateCount: imageResponse.candidates?.length,
          hasContent: !!imageResponse.candidates?.[0]?.content,
          hasParts: !!imageResponse.candidates?.[0]?.content?.parts,
          partsCount: imageResponse.candidates?.[0]?.content?.parts?.length,
          firstPartType: imageResponse.candidates?.[0]?.content?.parts?.[0] ? 
            Object.keys(imageResponse.candidates[0].content.parts[0]) : null
        });
        
        // Try to extract image URL from text if model returns a description
        const textResponse = imageResponse.text || imageResponse.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textResponse) {
          console.log("Text response received:", textResponse.substring(0, 200));
        }
      } else {
        data.generatedImageUrl = imageUrl;
        console.log("✅ Pixar-style image generated successfully!");
      }

    } catch (imgError: any) {
      console.warn("⚠️ Image generation failed, proceeding with text only");
      console.error("Error details:", {
        message: imgError?.message,
        code: imgError?.code || imgError?.status,
        name: imgError?.name
      });
      
      // Note: Gemini may not support direct image generation
      // Consider using Google's Imagen API or another image generation service
      // For now, we'll continue without the image
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: "Failed to process your year." });
  }
}

