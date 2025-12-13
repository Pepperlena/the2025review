// Google Analytics utility functions
import { GA_MEASUREMENT_ID } from '../constants';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics (gtag is already loaded in index.html)
// This function just ensures gtag is available
export const initGA = (measurementId: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    // gtag is already initialized in index.html with send_page_view: false
    // No need to re-initialize
    console.log('Google Analytics initialized:', measurementId);
  }
};

// Track page view manually (since auto page_view is disabled)
export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.origin + path,
    });
  }
};

// Track custom events
export const trackEvent = (
  eventName: string,
  eventParams?: {
    [key: string]: any;
  }
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Get GA Measurement ID from constants
const getGAId = (): string => {
  return GA_MEASUREMENT_ID;
};

// Track specific app events
export const analytics = {
  // Track when user starts the review
  trackStart: () => trackEvent('start_review'),
  
  // Track theme selection
  trackThemeSelect: (theme: string) => trackEvent('select_theme', { theme }),
  
  // Track when user completes onboarding
  trackOnboardingComplete: () => trackEvent('complete_onboarding'),
  
  // Track question completion
  trackQuestionComplete: (questionCount: number) => 
    trackEvent('complete_questions', { question_count: questionCount }),
  
  // Track when report is generated
  trackReportGenerated: (archetype: string, rarity: string) => 
    trackEvent('generate_report', { archetype, rarity }),
  
  // Track share action
  trackShare: () => trackEvent('share_card'),
  
  // Track save action
  trackSave: () => trackEvent('save_card'),
  
  // Track language change
  trackLanguageChange: (language: string) => 
    trackEvent('change_language', { language }),
  
  // Track Buy Me a Coffee click
  trackSupportClick: () => trackEvent('click_support_button'),
};

