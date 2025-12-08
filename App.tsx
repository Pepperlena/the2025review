import React, { useState, useEffect } from 'react';
import { AppPhase, ThemeId, UITheme, Answer, CharacterCardData, ProfileData, Language } from './types';
import { THEMES, FORTUNE_MESSAGES } from './constants';
import Welcome from './components/Welcome';
import ThemeSelector from './components/ThemeSelector';
import Onboarding from './components/Onboarding';
import QuestionFlow from './components/QuestionFlow';
import ProfileInput from './components/ProfileInput';
import Report from './components/Report';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>(AppPhase.WELCOME);
  const [themeId, setThemeId] = useState<ThemeId>(ThemeId.POP_GLASS);
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [cardData, setCardData] = useState<CharacterCardData | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  // Cookie Interaction State
  const [cookieCracked, setCookieCracked] = useState(false);
  const [fortuneMessage, setFortuneMessage] = useState("");

  const currentTheme: UITheme = THEMES[themeId];

  const handleStart = () => {
    setPhase(AppPhase.THEME_SELECT);
  };

  const handleBackToWelcome = () => {
    setPhase(AppPhase.WELCOME);
  };

  const handleThemeConfirm = () => {
    setPhase(AppPhase.ONBOARDING);
  };

  const handleOnboardingComplete = () => {
    setPhase(AppPhase.QUESTIONS);
  };

  const handleQuestionsComplete = (collectedAnswers: Answer[]) => {
    setAnswers(collectedAnswers);
    setPhase(AppPhase.PROFILE_INPUT);
  };

  const handleProfileComplete = async (profileData: ProfileData) => {
    setProfile(profileData);
    setPhase(AppPhase.PROCESSING);
    setError(null);
    setCookieCracked(false); // Reset cookie
    
    // Pick localized fortune
    const fortunes = FORTUNE_MESSAGES[language];
    setFortuneMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);

    try {
      const result = await geminiService.processAnswers(answers, profileData, language);
      setCardData(result);
    } catch (err) {
      console.error(err);
      setError("The engine stalled! Please try again.");
      setPhase(AppPhase.PROFILE_INPUT); 
    }
  };

  // Logic to transition from Processing to Report
  // We only move if data is ready AND cookie is cracked (interaction complete)
  useEffect(() => {
      if (phase === AppPhase.PROCESSING && cardData && cookieCracked) {
          const timer = setTimeout(() => {
              setPhase(AppPhase.REPORT);
          }, 2000); // Give them time to read the fortune
          return () => clearTimeout(timer);
      }
  }, [phase, cardData, cookieCracked]);

  const handleRestart = () => {
    setPhase(AppPhase.WELCOME);
    setCardData(null);
    setAnswers([]);
    setError(null);
    setCookieCracked(false);
  };

  const handleCrackCookie = () => {
      if (!cookieCracked) {
          setCookieCracked(true);
      }
  };

  // Fun Loading Screen with Interactive Fortune Cookie
  const ProcessingScreen = () => (
    <div className={`flex flex-col items-center justify-center min-h-screen ${currentTheme.bgClass} ${currentTheme.textClass} p-6 text-center`}>
       
       <h2 className={`text-xl md:text-2xl font-bold uppercase tracking-widest mb-12 ${currentTheme.fontDisplay} ${cookieCracked ? 'opacity-0 transition-opacity duration-1000' : 'animate-pulse'}`}>
           {cookieCracked ? "Reading the stars..." : "Crack open your 2025"}
       </h2>

       <div 
         className="relative w-64 h-64 flex items-center justify-center cursor-pointer group"
         onClick={handleCrackCookie}
       >
            {!cookieCracked ? (
                // Whole Cookie
                <div className="text-[150px] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 animate-float">
                    🥠
                </div>
            ) : (
                // Cracked Cookie
                <div className="relative w-full h-full">
                     {/* Left Half */}
                     <div className="absolute top-0 left-0 text-[150px] animate-crack-open" style={{ clipPath: 'polygon(0 0, 45% 0, 45% 100%, 0 100%)' }}>🥠</div>
                     {/* Right Half */}
                     <div className="absolute top-0 right-0 text-[150px] animate-crack-open" style={{ clipPath: 'polygon(55% 0, 100% 0, 100% 100%, 55% 100%)', animationDirection: 'reverse' }}>🥠</div>
                     
                     {/* The Fortune Slip */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-blue-900 p-4 shadow-xl border border-blue-100 max-w-[200px] text-xs font-serif italic font-bold rotate-[-2deg] animate-pop-in z-10">
                        "{fortuneMessage}"
                     </div>
                </div>
            )}
       </div>
       
       {!cookieCracked && (
           <p className="mt-8 text-sm opacity-60 animate-bounce">Tap the cookie!</p>
       )}
       
       {cookieCracked && !cardData && (
           <div className="mt-12 flex flex-col items-center">
               <div className="w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin opacity-50"></div>
               <p className="mt-4 text-xs font-bold uppercase tracking-widest opacity-50">Generating Report...</p>
           </div>
       )}

    </div>
  );

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-500 selection:bg-pink-300 selection:text-white`}>
      {phase === AppPhase.WELCOME && (
        <Welcome 
            onStart={handleStart} 
            theme={currentTheme} 
            language={language}
            onLanguageChange={setLanguage}
        />
      )}

      {phase === AppPhase.THEME_SELECT && (
        <ThemeSelector 
          currentTheme={currentTheme} 
          onSelect={setThemeId} 
          onConfirm={handleThemeConfirm}
          onBack={handleBackToWelcome}
        />
      )}

      {phase === AppPhase.ONBOARDING && (
        <Onboarding 
            theme={currentTheme} 
            language={language}
            onComplete={handleOnboardingComplete} 
        />
      )}

      {phase === AppPhase.QUESTIONS && (
        <QuestionFlow 
            theme={currentTheme} 
            language={language}
            onComplete={handleQuestionsComplete} 
            onExit={handleRestart}
        />
      )}

      {phase === AppPhase.PROFILE_INPUT && (
        <>
            {error && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-100 border-2 border-red-500 text-red-700 px-6 py-3 rounded-xl font-bold shadow-lg">
                    ⚠️ {error}
                </div>
            )}
            <ProfileInput theme={currentTheme} onComplete={handleProfileComplete} />
        </>
      )}

      {phase === AppPhase.PROCESSING && <ProcessingScreen />}

      {phase === AppPhase.REPORT && cardData && profile && (
        <Report 
            data={cardData} 
            profile={profile} 
            answers={answers}
            theme={currentTheme} 
            onRestart={handleRestart} 
        />
      )}
    </div>
  );
};

export default App;