import { Answer, CharacterCardData, ProfileData, Language } from "../types";

const processAnswers = async (answers: Answer[], profile: ProfileData, language: Language): Promise<CharacterCardData> => {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answers,
        profile,
        language,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to process your year.");
    }

    const data = await response.json() as CharacterCardData;
    return data;

  } catch (error) {
    console.error("API Error:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to process your year.");
  }
};

export const geminiService = {
  processAnswers,
};