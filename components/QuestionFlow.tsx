import React, { useState, useRef, useEffect } from 'react';
import { Question, Answer, UITheme, ThemeId, Language } from '../types';
import { QUESTIONS_DB, TRANSLATIONS } from '../constants';

interface QuestionFlowProps {
  theme: UITheme;
  language: Language;
  onComplete: (answers: Answer[]) => void;
  onExit: () => void;
}

const MILESTONE_MESSAGES = {
    0.25: { text: "Warming up nicely!", emoji: "🐹", type: "cute" },
    0.50: { text: "Halfway! Don't stop now.", emoji: "🦊", type: "encourage" },
    0.75: { text: "Almost there, legend.", emoji: "🦁", type: "bold" },
    1.00: { text: "YOU DID IT!", emoji: "🦄", type: "celebrate" }
};

const MAX_SKIPS = 10;

const QuestionFlow: React.FC<QuestionFlowProps> = ({ theme, language, onComplete, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [animating, setAnimating] = useState(false);
  
  // Track specific skipped question IDs to correctly count/uncount them
  const [skippedQuestionIds, setSkippedQuestionIds] = useState<Set<number>>(new Set());
  
  const [showMaxSkipsAlert, setShowMaxSkipsAlert] = useState(false); // Hard limit alert

  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [milestone, setMilestone] = useState<{text: string, emoji: string} | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const t = TRANSLATIONS[language];
  
  // Get questions for current language
  const questions = QUESTIONS_DB[language];
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  useEffect(() => {
    if (textareaRef.current && !currentQuestion.options) {
      textareaRef.current.focus();
    }
  }, [currentIndex, currentQuestion.options]);

  // Milestone Trigger Logic
  useEffect(() => {
    const fraction = (currentIndex + 1) / questions.length;
    let hit = null;
    // Use a small epsilon for float comparison
    if (Math.abs(fraction - 0.25) < 0.01) hit = MILESTONE_MESSAGES[0.25];
    if (Math.abs(fraction - 0.50) < 0.01) hit = MILESTONE_MESSAGES[0.50];
    if (Math.abs(fraction - 0.75) < 0.01) hit = MILESTONE_MESSAGES[0.75];
    if (Math.abs(fraction - 1.0) < 0.01) hit = MILESTONE_MESSAGES[1.00];

    if (hit) {
        setMilestone(hit);
        triggerConfetti();
    }
  }, [currentIndex, questions.length]);

  // Milestone Clearing Logic
  useEffect(() => {
    if (milestone) {
        const timer = setTimeout(() => {
            setMilestone(null);
        }, 3000);
        return () => clearTimeout(timer);
    }
  }, [milestone]);

  const triggerConfetti = () => {
    for (let i = 0; i < 50; i++) {
        const el = document.createElement('div');
        el.className = 'confetti';
        el.style.left = Math.random() * 100 + 'vw';
        el.style.backgroundColor = ['#ff0', '#f00', '#0f0', '#00f', '#f0f'][Math.floor(Math.random() * 5)];
        el.style.animationDuration = (Math.random() * 2 + 1) + 's';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3000);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
        setAnimating(true);
        setTimeout(() => {
            setCurrentIndex(prev => prev - 1);
            setAnimating(false);
        }, 300);
    }
  };

  const updateSkippedStatus = (id: number, isSkipped: boolean) => {
      setSkippedQuestionIds(prev => {
          const next = new Set(prev);
          if (isSkipped) {
              next.add(id);
          } else {
              next.delete(id);
          }
          return next;
      });
  };

  const handleNext = (explicitSkip: boolean = false) => {
    if (animating) return;

    const currentAnswer = answers[currentQuestion.id];
    const hasAnswer = currentAnswer && currentAnswer.trim().length > 0;

    // Determine if this move counts as a skip
    if (explicitSkip || !hasAnswer) {
        // Check limit ONLY if we are skipping a NEW question (not one already skipped)
        if (!skippedQuestionIds.has(currentQuestion.id) && skippedQuestionIds.size >= MAX_SKIPS) {
            setShowMaxSkipsAlert(true);
            return;
        }
        // Mark as skipped
        updateSkippedStatus(currentQuestion.id, true);
        
        // Ensure answer is cleared if explicit skip
        if (explicitSkip) {
             setAnswers(prev => ({ ...prev, [currentQuestion.id]: "" }));
        }
    } else {
        // Has answer, remove from skip set if it was there
        updateSkippedStatus(currentQuestion.id, false);
    }

    setAnimating(true);
    setTimeout(() => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setAnimating(false);
        } else {
            finish();
        }
    }, 400);
  };

  const finish = () => {
    const compiledAnswers: Answer[] = questions.map(q => ({
      questionId: q.id,
      questionText: q.text,
      response: answers[q.id] || ""
    }));
    onComplete(compiledAnswers);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: e.target.value
    }));
  };

  const handleChipSelect = (option: string) => {
    const current = answers[currentQuestion.id] ? answers[currentQuestion.id].split('; ') : [];
    
    // Toggle Logic
    let updated: string[];
    if (current.includes(option)) {
        updated = current.filter(item => item !== option);
    } else {
        updated = [...current, option];
    }
    
    // Clean up empty strings
    updated = updated.filter(s => s.trim() !== "");

    setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: updated.join('; ')
    }));
  };

  const currentSelectionArray = answers[currentQuestion.id] ? answers[currentQuestion.id].split('; ') : [];

  return (
    <div className={`flex flex-col min-h-screen ${theme.bgClass} transition-colors duration-1000 overflow-hidden relative`}>
      
      {/* Background Ambience Persistence */}
      {theme.id === ThemeId.TURRELL && <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent shadow-[0_0_20px_#d946ef]"></div>}

      {/* Header */}
      <div className="pt-8 px-6 flex items-center justify-between max-w-4xl mx-auto w-full z-10">
         <button 
            onClick={() => setShowExitConfirm(true)}
            className={`opacity-50 hover:opacity-100 text-sm font-bold uppercase tracking-widest ${theme.textClass}`}
         >
            ✕ {t.exit}
         </button>
         <div className={`${theme.fontDisplay} text-lg md:text-xl tracking-tighter ${theme.textSecondaryClass} font-bold opacity-70`}>
            2025 REVIEW
         </div>
         <div className={`${theme.fontBody} text-sm font-bold ${theme.id === ThemeId.TURRELL ? 'bg-white/10 border-white/20' : 'bg-black/5'} px-4 py-1.5 rounded-full border ${theme.textClass}`}>
            {currentIndex + 1} / {questions.length}
         </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-4xl mx-auto px-6 mt-8 z-10">
        <div className={`h-3 w-full rounded-full overflow-hidden ${theme.progressBarBgClass}`}>
            <div 
                className={`h-full transition-all duration-500 ease-out ${theme.progressBarClass}`}
                style={{ width: `${progress}%` }}
            ></div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 max-w-4xl mx-auto w-full relative z-10">
        <div 
          key={currentIndex}
          className={`w-full transition-all duration-400 ease-out flex flex-col items-center
            ${animating 
                ? 'opacity-0 translate-y-4' 
                : 'opacity-100 translate-y-0 animate-slide-up'
            }`}
        >
          {/* Category Label */}
          <div className={`mb-6 ${theme.fontBody} text-sm font-black uppercase tracking-[0.25em] ${theme.accentColorClass}`}>
            {currentQuestion.category}
          </div>

          {/* Question Text */}
          <h2 className={`text-3xl md:text-5xl mb-12 text-center leading-tight ${theme.fontDisplay} ${theme.textClass}`}>
            {currentQuestion.text}
          </h2>

          {/* Interaction Area */}
          <div className="w-full max-w-4xl">
            {currentQuestion.options ? (
                <div className="flex flex-wrap justify-center gap-4">
                    {currentQuestion.options.map((opt) => {
                        const isSelected = currentSelectionArray.includes(opt);
                        return (
                        <button
                            key={opt}
                            onClick={() => handleChipSelect(opt)}
                            className={`
                                px-6 py-4 rounded-xl text-lg md:text-xl font-medium transition-all transform duration-200
                                ${isSelected 
                                    ? 'scale-105 z-10 font-bold' 
                                    : 'hover:-translate-y-1'
                                }
                                ${theme.chipClass}
                                ${isSelected && theme.id === ThemeId.POP_GLASS ? 'bg-blue-600 text-white shadow-lg border-transparent ring-2 ring-blue-300' : ''}
                                ${isSelected && theme.id === ThemeId.TURRELL ? 'border-fuchsia-400 bg-fuchsia-600 text-white shadow-[0_0_20px_rgba(217,70,239,0.8)]' : ''}
                                ${isSelected && theme.id === ThemeId.JOURNAL ? 'bg-white text-stone-900 border-stone-900 ring-2 ring-stone-900 shadow-md font-extrabold' : ''}
                            `}
                        >
                            {opt}
                        </button>
                    )})}
                </div>
            ) : (
                <div className="relative w-full max-w-2xl mx-auto">
                    <textarea
                    ref={textareaRef}
                    value={answers[currentQuestion.id] || ''}
                    onChange={handleTextChange}
                    placeholder={currentQuestion.placeholder || "Type here..."}
                    className={`
                        w-full p-8 text-2xl outline-none resize-none min-h-[250px] transition-all rounded-2xl
                        ${theme.inputClass}
                        ${theme.fontBody}
                    `}
                    />
                </div>
            )}
            
            {/* Custom Input for Option Questions */}
            {currentQuestion.options && (
                 <div className="mt-8 flex flex-col items-center justify-center relative">
                    <input 
                        type="text"
                        value={answers[currentQuestion.id] && !currentQuestion.options.some(opt => answers[currentQuestion.id].includes(opt)) ? answers[currentQuestion.id] : ''}
                        onChange={handleTextChange}
                        placeholder="Or write your own..."
                        className={`
                            bg-transparent border-b-2 border-current p-3 text-center w-full max-w-sm outline-none ${theme.textClass} focus:border-opacity-100 border-opacity-30 transition-all font-medium text-lg placeholder:opacity-50
                        `}
                    />
                 </div>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-16 flex items-center justify-between w-full max-w-sm gap-4 md:gap-8">
               <button 
                  onClick={handleBack}
                  disabled={currentIndex === 0}
                  className={`px-4 py-2 text-xs uppercase tracking-widest font-bold opacity-50 hover:opacity-100 transition-opacity ${theme.textClass} disabled:opacity-0`}
               >
                 {t.back}
               </button>
               
               <div className="flex gap-4">
                 <button 
                    onClick={() => handleNext(true)}
                    className={`px-4 py-2 text-xs uppercase tracking-widest font-bold opacity-50 hover:opacity-100 transition-opacity ${theme.textClass}`}
                 >
                   {t.skip} ({MAX_SKIPS - skippedQuestionIds.size})
                 </button>
                 <button
                   onClick={() => handleNext(false)}
                   className={`px-10 py-4 font-bold uppercase tracking-widest text-sm transition-all transform hover:scale-105 active:scale-95 ${theme.buttonClass} ${theme.id === ThemeId.JOURNAL ? 'rounded-md' : 'rounded-full'}`}
                 >
                   {currentIndex === questions.length - 1 ? t.finish : t.next}
                 </button>
               </div>
          </div>
        </div>
      </div>

      {/* MILESTONE POPUP */}
      {milestone && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-end justify-center pb-20 md:pb-32">
              <div className="animate-pop-up-animal flex flex-col items-center">
                  <div className="text-[100px] md:text-[150px] drop-shadow-2xl animate-shake">{milestone.emoji}</div>
                  <div className="bg-white text-black px-6 py-3 rounded-full font-black uppercase tracking-widest shadow-xl text-sm md:text-lg animate-bounce">
                      {milestone.text}
                  </div>
              </div>
          </div>
      )}

      {/* EXIT DIALOG */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-pop-in">
             <div className="bg-white p-8 rounded-2xl max-w-sm w-full text-center shadow-2xl">
                <div className="text-4xl mb-4">👀</div>
                <h3 className="text-xl font-black mb-2 text-slate-900">Wait, don't go!</h3>
                <p className="text-slate-600 mb-8">If you leave now, your story vanishes into the void. Are you sure?</p>
                <div className="flex gap-4 justify-center">
                    <button onClick={() => setShowExitConfirm(false)} className="px-6 py-3 rounded-xl bg-slate-100 font-bold text-slate-700 hover:bg-slate-200">Stay</button>
                    <button onClick={onExit} className="px-6 py-3 rounded-xl bg-red-100 font-bold text-red-600 hover:bg-red-200">{t.exit}</button>
                </div>
             </div>
        </div>
      )}

      {/* MAX SKIPS WARNING DIALOG */}
      {showMaxSkipsAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-pop-in">
             <div className="bg-white p-8 rounded-2xl max-w-sm w-full text-center shadow-2xl">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-xl font-black mb-2 text-slate-900">Blank Page Syndrome?</h3>
                <p className="text-slate-600 mb-8">You've reached the limit of 10 skipped questions. We need a bit more detail to generate your card!</p>
                <button onClick={() => setShowMaxSkipsAlert(false)} className="w-full px-6 py-3 rounded-xl bg-blue-600 font-bold text-white hover:bg-blue-700">Okay, I'll answer</button>
             </div>
        </div>
      )}

    </div>
  );
};

export default QuestionFlow;