import React, { useState, useEffect } from 'react';
import { UITheme, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface OnboardingProps {
  theme: UITheme;
  language: Language;
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ theme, language, onComplete }) => {
  const [step, setStep] = useState(0);
  const t = TRANSLATIONS[language];

  // Cards content based on user instructions
  const steps = [
      { id: 1, text: t.onboarding1, highlight: false },
      { id: 2, text: t.onboarding2, highlight: true },
      { id: 3, text: t.onboarding3, highlight: false },
      { id: 4, text: t.onboarding4, highlight: true },
  ];

  const handleNext = () => {
      if (step < steps.length - 1) {
          setStep(step + 1);
      } else {
          onComplete();
      }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden transition-colors duration-1000 ${theme.bgClass}`}>
        <div className="max-w-md w-full relative h-[420px] flex items-center justify-center">
            
            {/* Header */}
            <h2 className={`absolute top-0 text-center w-full text-xs font-bold uppercase tracking-widest opacity-60 mb-8 z-20 ${theme.textClass}`}>
                {t.onboardingTitle}
            </h2>

            {/* Stacked Cards Animation */}
            {steps.map((s, index) => {
                // Determine styling based on position relative to current step
                let style = {};
                const isActive = index === step;
                const isPast = index < step;
                const isNext = index > step;

                // Animation calculation
                // Only render if it's the current card, next card, or just passed
                if (index > step + 1) return null; 

                if (isActive) {
                    // Current Card: Center stage, full opacity
                    style = { 
                        '--rotate-to': `${(Math.random() - 0.5) * 4}deg`,
                        animation: 'dealCard 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
                        zIndex: 20
                    } as React.CSSProperties;
                } else if (isPast) {
                    // Past Card: Fly away
                    style = { 
                        transform: 'translateY(-100vh) rotate(-20deg)', 
                        opacity: 0, 
                        zIndex: 0, 
                        transition: 'all 0.5s ease-in'
                    };
                } else if (isNext) {
                     // Next Card: Waiting in the deck below
                     style = { 
                         transform: 'translateY(100vh) scale(0.9)', 
                         opacity: 0, 
                         zIndex: 10 
                     };
                }

                return (
                    <div 
                        key={s.id}
                        className={`
                            absolute top-12 w-full aspect-[4/5] p-8 flex flex-col items-center justify-center text-center
                            shadow-2xl rounded-3xl cursor-pointer border border-white/20
                            ${theme.cardClass}
                            ${theme.bgClass === 'bg-black' ? 'bg-gray-900' : 'bg-white'}
                        `}
                        style={style}
                        onClick={handleNext}
                    >
                        {/* Card Content */}
                        <div className="flex-1 flex items-center justify-center">
                            <p className={`text-xl md:text-2xl font-medium leading-relaxed ${theme.fontDisplay} ${theme.textClass}`}>
                                {s.text}
                            </p>
                        </div>
                        
                        {/* Step Indicator */}
                        <div className="mt-auto pt-6 flex gap-1 justify-center w-full">
                            {steps.map((_, i) => (
                                <div 
                                    key={i} 
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-current opacity-100' : 'w-2 bg-current opacity-20'}`}
                                />
                            ))}
                        </div>
                        
                        <div className="absolute bottom-6 right-6 text-[10px] opacity-40 font-bold uppercase tracking-widest">
                            {index + 1} / {steps.length}
                        </div>
                    </div>
                );
            })}
        </div>
        
        {/* Pulsing Guide Text */}
        <div className={`mt-8 text-sm font-bold uppercase tracking-widest animate-fade-up-guide opacity-60 ${theme.textClass}`}>
            {step < steps.length - 1 ? (t as any).onboardingTap || "Tap to continue" : ""}
        </div>

        {/* Action Button - Only appears on last step */}
        {step === steps.length - 1 && (
            <button
                onClick={handleNext}
                className={`mt-4 px-12 py-4 text-lg font-bold uppercase tracking-widest transition-all animate-pop-in ${theme.buttonClass} rounded-full shadow-2xl z-30`}
            >
                {t.onboardingBtn}
            </button>
        )}

    </div>
  );
};

export default Onboarding;