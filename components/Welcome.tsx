import React from 'react';
import { UITheme, ThemeId, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface WelcomeProps {
  onStart: () => void;
  theme: UITheme;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart, theme, language, onLanguageChange }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-6 text-center relative overflow-hidden transition-colors duration-1000 ${theme.bgClass} ${theme.textClass}`}>
      
      {/* Background Decor Elements based on Theme */}
      {theme.id === ThemeId.POP_GLASS && (
        <>
            <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-indigo-300 rounded-full blur-[100px] opacity-40 animate-float"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60vh] h-[60vh] bg-pink-300 rounded-full blur-[120px] opacity-40 animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-[40%] left-[60%] w-[30vh] h-[30vh] bg-purple-300 rounded-full blur-[80px] opacity-30 animate-pulse-slow"></div>
        </>
      )}

      {theme.id === ThemeId.TURRELL && (
        <>
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-fuchsia-600 to-transparent shadow-[0_0_50px_#d946ef]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-fuchsia-800 rounded-full blur-[180px] opacity-20"></div>
        </>
      )}

      {theme.id === ThemeId.JOURNAL && (
        <>
            {/* Subtle paper grain */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        </>
      )}
      
      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-50 flex gap-2">
         {Object.values(Language).map((lang) => (
             <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`text-xs font-bold px-2 py-1 rounded transition-colors ${language === lang ? 'bg-black text-white' : `bg-transparent ${theme.textClass} opacity-60 hover:opacity-100`} ${theme.id === ThemeId.TURRELL && language === lang ? 'bg-fuchsia-500' : ''}`}
             >
                 {lang}
             </button>
         ))}
      </div>

      <div className={`relative z-10 max-w-xl w-full ${theme.cardClass} p-8 md:p-12 animate-pop-in flex flex-col items-center`}>
        
        {theme.id === ThemeId.POP_GLASS && (
            <div className="inline-block px-4 py-1 mb-6 bg-white rounded-full font-extrabold text-xs uppercase tracking-widest text-blue-600 shadow-sm border border-blue-100">
                Reflection Engine
            </div>
        )}
        
        {theme.id === ThemeId.TURRELL && (
            <div className="mb-8 w-20 h-[2px] bg-fuchsia-500 shadow-[0_0_15px_#d946ef]"></div>
        )}

        {theme.id === ThemeId.JOURNAL && (
            <div className="mb-6 text-stone-400 font-serif italic text-xl">
                Vol. II
            </div>
        )}

        <h1 className={`text-5xl md:text-7xl mb-6 leading-tight ${theme.fontDisplay} ${theme.textClass}`}>
          The 2025 <br/> 
          <span className={theme.id === ThemeId.TURRELL ? 'text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-white' : ''}>
             Review
          </span>
        </h1>
        
        <p className={`text-lg md:text-xl mb-6 leading-relaxed max-w-md font-medium ${theme.fontBody} ${theme.textSecondaryClass}`}>
          {t.subtitle}
        </p>

        {/* Social Proof */}
        <div className={`mb-10 flex items-center gap-2 text-xs font-bold uppercase tracking-wide opacity-70 ${theme.textSecondaryClass}`}>
            <span className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-blue-400 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-pink-400 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-purple-400 border-2 border-white"></div>
            </span>
            <span>{t.joined}</span>
        </div>

        <button
            onClick={onStart}
            className={`px-12 py-4 text-lg font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${theme.buttonClass} ${theme.id === ThemeId.JOURNAL ? 'rounded-md' : 'rounded-full'}`}
        >
            {t.start}
        </button>
        
        {/* Footer Removed */}

      </div>
      
    </div>
  );
};

export default Welcome;