import React from 'react';
import { THEMES } from '../constants';
import { ThemeId, UITheme } from '../types';

interface ThemeSelectorProps {
  currentTheme: UITheme;
  onSelect: (themeId: ThemeId) => void;
  onConfirm: () => void;
  onBack: () => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onSelect, onConfirm, onBack }) => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-6 transition-colors duration-700 ${currentTheme.bgClass}`}>
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className={`absolute top-8 left-8 text-sm font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity ${currentTheme.textClass}`}
      >
        ← Back
      </button>

      <div className="max-w-5xl w-full z-10 pt-12 md:pt-0">
        <h2 className={`text-3xl md:text-5xl text-center mb-4 ${currentTheme.fontDisplay} ${currentTheme.textClass}`}>
            Visual Style
        </h2>
        <p className={`text-center mb-12 font-medium opacity-80 ${currentTheme.fontBody} ${currentTheme.textClass}`}>
            Choose the aesthetic for your report card.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {Object.values(THEMES).map((theme) => (
            <button
              key={theme.id}
              onClick={() => onSelect(theme.id)}
              className={`
                relative h-80 rounded-3xl transition-all duration-300 flex flex-col items-center justify-center group overflow-hidden border-2
                ${currentTheme.id === theme.id 
                  ? 'scale-105 shadow-2xl z-10 ring-4 ring-offset-4 ring-offset-transparent ring-opacity-50' 
                  : 'scale-95 opacity-80 hover:opacity-100 hover:scale-100'
                }
                ${theme.id === ThemeId.POP_GLASS ? 'border-white bg-white/60 backdrop-blur-xl ring-blue-400' : ''}
                ${theme.id === ThemeId.TURRELL ? 'border-fuchsia-500/50 bg-black/80 backdrop-blur-xl ring-fuchsia-500' : ''}
                ${theme.id === ThemeId.JOURNAL ? 'border-stone-300 bg-[#FDFBF7] ring-stone-400' : ''}
              `}
            >
              {/* Preview Icon */}
              <div className={`
                 w-20 h-20 rounded-full mb-6 flex items-center justify-center text-3xl shadow-lg transition-transform group-hover:scale-110
                 ${theme.id === ThemeId.POP_GLASS ? 'bg-gradient-to-tr from-blue-500 to-purple-500 text-white' : ''}
                 ${theme.id === ThemeId.TURRELL ? 'bg-black border border-fuchsia-500 text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.5)]' : ''}
                 ${theme.id === ThemeId.JOURNAL ? 'bg-white border border-stone-200 text-stone-900 font-serif italic' : ''}
              `}>
                 {theme.id === ThemeId.POP_GLASS ? '✨' : theme.id === ThemeId.TURRELL ? '⚛' : 'Aa'}
              </div>
              
              <span className={`text-xl mb-2 font-bold ${theme.fontDisplay} ${theme.id === ThemeId.TURRELL ? 'text-white' : 'text-slate-900'}`}>
                {theme.name}
              </span>
              <span className={`text-sm max-w-[200px] text-center font-medium ${theme.fontBody} ${theme.id === ThemeId.TURRELL ? 'text-white/60' : 'text-slate-500'}`}>
                {theme.description}
              </span>

              {/* Checkmark */}
              {currentTheme.id === theme.id && (
                <div className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center shadow-md animate-pop-in
                    ${theme.id === ThemeId.TURRELL ? 'bg-fuchsia-500 text-black' : 'bg-black text-white'}
                `}>
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="text-center">
            <button
                onClick={onConfirm}
                className={`px-16 py-4 text-lg font-bold uppercase tracking-wider transition-all transform hover:-translate-y-1 ${currentTheme.buttonClass} ${currentTheme.id === ThemeId.JOURNAL ? 'rounded-md' : 'rounded-full'}`}
            >
                Confirm Style
            </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;