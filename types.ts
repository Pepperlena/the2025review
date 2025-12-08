
export enum AppPhase {
  WELCOME = 'WELCOME',
  THEME_SELECT = 'THEME_SELECT',
  ONBOARDING = 'ONBOARDING',
  QUESTIONS = 'QUESTIONS',
  PROFILE_INPUT = 'PROFILE_INPUT',
  PROCESSING = 'PROCESSING',
  REPORT = 'REPORT'
}

export enum ThemeId {
  POP_GLASS = 'POP_GLASS',
  TURRELL = 'TURRELL',
  JOURNAL = 'JOURNAL'
}

export enum Language {
  EN = 'EN',
  ES = 'ES',
  PT = 'PT',
  CN = 'CN',
  JP = 'JP'
}

export interface Question {
  id: number;
  text: string;
  category: string;
  options?: string[]; // "Chips" for easy selection
  placeholder?: string;
  allowMultiSelect?: boolean;
}

export interface Answer {
  questionId: number;
  questionText: string;
  response: string;
}

export interface ProfileData {
  nickname: string;
  gender: string;
  age: string;
  country: string;
  favoriteWork: string; // Book, Movie, Song, etc.
  shareConsent: boolean;
}

export interface UITheme {
  id: ThemeId;
  name: string;
  description: string;
  // Layout & Container
  bgClass: string;
  cardClass: string;
  containerClass?: string; // For inner wrapper alignment/styles
  
  // Typography
  fontDisplay: string;
  fontBody: string;
  textClass: string;
  textSecondaryClass: string;
  
  // Interactive Elements
  buttonClass: string;
  chipClass: string;
  inputClass: string;
  
  // Accents
  progressBarClass: string;
  progressBarBgClass: string;
  accentColorClass: string;
}

// Structured data for the final "Card"
export interface CharacterCardData {
  archetype: string; // e.g., "The Chaos Manager"
  rarity: string; // e.g., "SSR", "UR", "R"
  powerWord: string; // e.g., "Unstoppable"
  luckyColor: string; // Specific name e.g. "Cerulean Blue"
  luckyColorHex: string; // The hex code
  stats: {
    label: string;
    value: number; // 1-100
  }[];
  
  // Deep Analysis Fields
  narrativeArc: string; // A sentence describing the "plot" of their year
  dominantTrait: string; // Key psychological strength
  shadowSide: string; // What held them back (tenderly phrased)
  creativeInsight: string; // A specific insight derived from their taste
  
  philosophicalSummary: string; // The deep summary in style of favorite work
  futureForecast: string; // A prediction for 2026
  quote: string;
  generatedImageUrl?: string; // URL for the generated image
}
