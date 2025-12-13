import React, { useState, useRef } from 'react';
import { UITheme, CharacterCardData, ThemeId, ProfileData, Answer } from '../types';
import ReactMarkdown from 'react-markdown';
import { BUY_ME_A_COFFEE_URL } from '../constants';
import { analytics } from '../utils/analytics';

interface ReportProps {
  data: CharacterCardData;
  profile: ProfileData;
  answers: Answer[];
  theme: UITheme;
  onRestart: () => void;
}

const Report: React.FC<ReportProps> = ({ data, profile, answers, theme, onRestart }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShare = () => {
    analytics.trackShare();
    navigator.clipboard.writeText(window.location.href).then(() => {
        showToast("Link Copied! Ready to share. 🔗");
    });
  };

  const handleSave = async () => {
    if (!cardRef.current) {
      showToast("Error: Could not save card. Please try again.");
      return;
    }

    try {
      // Dynamically import html2canvas
      const html2canvas = (await import('html2canvas')).default;
      
      showToast("Generating image... 📸");
      
      // Capture the card element
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight,
      });

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (!blob) {
          showToast("Error generating image. Please try again.");
          return;
        }
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `2025-Review-${profile.nickname}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        analytics.trackSave();
        showToast("Card saved! 💾");
      }, 'image/png');
    } catch (error) {
      console.error('Error saving card:', error);
      showToast("Error saving card. Please try again.");
    }
  };

  const handleExportPDF = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
        const htmlContent = `
            <html>
            <head>
                <title>The 2025 Review - ${profile.nickname}</title>
                <style>
                    body { font-family: sans-serif; padding: 40px; color: #333; line-height: 1.6; }
                    h1 { font-size: 24px; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
                    h2 { font-size: 18px; margin-top: 30px; color: #555; text-transform: uppercase; letter-spacing: 1px; }
                    .meta { margin-bottom: 40px; font-style: italic; color: #666; }
                    .qa-item { margin-bottom: 20px; page-break-inside: avoid; }
                    .question { font-weight: bold; margin-bottom: 5px; }
                    .answer { background: #f9f9f9; padding: 10px; border-left: 3px solid #ccc; }
                </style>
            </head>
            <body>
                <h1>The 2025 Review: ${profile.nickname}</h1>
                <div class="meta">
                    <p>Generated on ${new Date().toLocaleDateString()}</p>
                    <p>Archetype: ${data.archetype} (${data.rarity})</p>
                    <p>Power Word: ${data.powerWord}</p>
                </div>

                <h2>Your Narrative Arc</h2>
                <p>${data.narrativeArc}</p>

                <h2>2025 Inventory (Q&A)</h2>
                ${answers.map(a => `
                    <div class="qa-item">
                        <div class="question">${a.questionText}</div>
                        <div class="answer">${a.response || "Skipped"}</div>
                    </div>
                `).join('')}

                <h2>2026 Forecast</h2>
                <p>${data.futureForecast}</p>
                
                <div style="margin-top: 50px; text-align: center; font-size: 12px; color: #999;">
                    © 2025 The Review
                </div>
            </body>
            </html>
        `;
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.print();
    }
  };

  return (
    <div className={`min-h-screen py-10 px-4 flex flex-col items-center justify-center ${theme.bgClass} transition-colors duration-1000`}>
      
      {/* Title */}
      <h1 className={`text-xl md:text-2xl text-center mb-10 font-bold uppercase tracking-widest ${theme.fontDisplay} ${theme.textClass} opacity-80`}>
        YOUR 2025 CHARACTER CARD
      </h1>

      {/* THE CARD CONTAINER */}
      <div 
        ref={cardRef}
        className={`
        relative w-full max-w-lg p-8 flex flex-col overflow-visible
        transform transition-transform duration-500 mt-12
        ${theme.id === ThemeId.JOURNAL ? 'rounded-sm bg-white border border-stone-300' : ''}
        ${theme.id === ThemeId.POP_GLASS ? 'rounded-[2.5rem] bg-white/90 backdrop-blur-2xl border border-white shadow-2xl' : ''}
        ${theme.id === ThemeId.TURRELL ? 'rounded-[2.5rem] bg-black/60 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(168,85,247,0.2)]' : ''}
      `}>
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-16 relative z-10 border-b border-gray-500/20 pb-4">
            <div className="flex flex-col">
                <span className={`text-[10px] uppercase tracking-[0.3em] font-black opacity-60 ${theme.textSecondaryClass}`}>Analysis Complete</span>
                <span className={`text-2xl font-bold ${theme.id === ThemeId.TURRELL ? 'text-white' : 'text-slate-900'}`}>{profile.nickname}</span>
                <span className={`text-xs opacity-60 font-medium ${theme.textSecondaryClass}`}>{profile.country} • {profile.age}</span>
            </div>
            <div className="flex flex-col items-end">
                <span className={`text-[9px] uppercase tracking-wider font-bold mb-1 opacity-70 ${theme.textSecondaryClass}`}>Rarity Index</span>
                <div className={`
                    px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider
                    ${theme.id === ThemeId.TURRELL 
                        ? 'bg-fuchsia-500 text-black shadow-[0_0_15px_#d946ef]' 
                        : 'bg-blue-600 text-white shadow-lg'}
                `}>
                    {data.rarity}
                </div>
            </div>
        </div>

        {/* POP OUT IMAGE */}
        <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-48 h-48 md:w-56 md:h-56 z-20">
             {data.generatedImageUrl ? (
                <div className="w-full h-full relative group">
                    <img 
                        src={data.generatedImageUrl} 
                        alt="Character Avatar" 
                        className="w-full h-full object-cover drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                        style={{ maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }} 
                    />
                </div>
            ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                     🎁
                </div>
            )}
        </div>

        {/* ARCHETYPE */}
        <div className="flex flex-col items-center justify-center mb-8 relative z-10 w-full mt-4">
            <h2 className={`text-3xl md:text-4xl text-center leading-tight px-2 ${theme.fontDisplay} ${theme.id === ThemeId.TURRELL ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'text-slate-900'}`}>
                {data.archetype}
            </h2>
            <div className={`mt-2 text-sm italic opacity-70 ${theme.fontBody} ${theme.id === ThemeId.TURRELL ? 'text-white' : 'text-slate-700'}`}>"{data.quote}"</div>
        </div>

        {/* STATS (Moved Up) */}
        <div className="mb-8 relative z-10">
             <div className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-3 text-center text-current">Vital Statistics</div>
             <div className="space-y-3">
                {data.stats.map((stat, i) => (
                    <div key={i} className={`flex items-center gap-3 ${theme.id === ThemeId.TURRELL ? 'text-white' : 'text-slate-800'}`}>
                        {/* WIDENED LABEL: w-32 instead of w-24, removed truncate */}
                        <div className="w-32 text-[10px] font-bold text-right uppercase opacity-70 whitespace-nowrap overflow-hidden text-ellipsis">{stat.label}</div>
                        <div className={`flex-1 h-2 rounded-full overflow-hidden ${theme.progressBarBgClass}`}>
                            <div className={`h-full ${theme.progressBarClass}`} style={{ width: `${stat.value}%` }}></div>
                        </div>
                        <div className="w-6 text-[10px] font-bold opacity-70">{stat.value}</div>
                    </div>
                ))}
             </div>
        </div>

        {/* DEEP ANALYSIS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 relative z-10">
            <div className={`p-4 rounded-xl ${theme.id === ThemeId.JOURNAL ? 'bg-stone-100 text-stone-900' : (theme.id === ThemeId.TURRELL ? 'bg-white/10 text-white' : 'bg-blue-50/80 text-slate-900')}`}>
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1">Dominant Trait</div>
                <div className="font-bold text-sm leading-snug">{data.dominantTrait}</div>
            </div>
            <div className={`p-4 rounded-xl ${theme.id === ThemeId.JOURNAL ? 'bg-stone-100 text-stone-900' : (theme.id === ThemeId.TURRELL ? 'bg-white/10 text-white' : 'bg-purple-50/80 text-slate-900')}`}>
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1">Shadow Side</div>
                <div className="font-bold text-sm leading-snug opacity-90">{data.shadowSide}</div>
            </div>
             <div className={`p-4 rounded-xl md:col-span-2 ${theme.id === ThemeId.JOURNAL ? 'bg-stone-100 text-stone-900' : (theme.id === ThemeId.TURRELL ? 'bg-white/10 text-white' : 'bg-white/60 border border-white/50 text-slate-900')}`}>
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1">Narrative Arc</div>
                <div className="font-medium text-sm leading-relaxed">{data.narrativeArc}</div>
            </div>
        </div>

        {/* PHILOSOPHICAL SUMMARY */}
        <div className={`mb-8 p-6 rounded-xl text-sm leading-relaxed ${theme.fontBody} ${theme.id === ThemeId.JOURNAL ? 'bg-stone-50 border border-stone-100 text-stone-900' : (theme.id === ThemeId.TURRELL ? 'bg-white/5 border border-white/10 text-white' : 'bg-gradient-to-br from-white/80 to-white/40 border border-white/50 text-slate-800')}`}>
            <div className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-3 text-center">The Year in Review</div>
             <ReactMarkdown 
               components={{
                   ul: ({node, ...props}) => <ul className="flex flex-col gap-3" {...props} />,
                   li: ({node, ...props}) => (
                       <li className="flex gap-2 items-start" {...props}>
                           <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-50 shrink-0"></span>
                           <span>{props.children}</span>
                       </li>
                   ),
                   p: ({node, ...props}) => <span {...props} /> // remove p wrapping for li content if markdown parses weirdly
               }}
             >
               {data.philosophicalSummary}
             </ReactMarkdown>
        </div>

        {/* FOOTER METADATA */}
        <div className={`
            p-5 rounded-2xl flex flex-col gap-4 relative z-10
            ${theme.id === ThemeId.JOURNAL ? 'bg-stone-900 text-stone-100' : ''}
            ${theme.id === ThemeId.TURRELL ? 'bg-white/10 border border-white/20 text-white' : ''}
            ${theme.id === ThemeId.POP_GLASS ? 'bg-slate-900 text-white' : ''}
        `}>
             <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider opacity-60 font-bold">2026 Power Word</span>
                    <span className={`text-xl font-bold ${theme.fontDisplay}`}>{data.powerWord}</span>
                </div>
                <div className="h-8 w-[1px] bg-current opacity-20"></div>
                <div className="flex flex-col items-end">
                    <span className="text-[9px] uppercase tracking-wider opacity-60 font-bold">Lucky Color</span>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full border border-white/50" style={{backgroundColor: data.luckyColorHex}}></div>
                        <span className="text-sm font-bold">{data.luckyColor}</span>
                    </div>
                </div>
             </div>
             <div className="pt-4 border-t border-current border-opacity-20">
                <span className="text-[9px] uppercase tracking-wider opacity-60 font-bold block mb-1">2026 Forecast</span>
                <span className="text-xs font-medium italic opacity-90 leading-normal">
                    {data.futureForecast}
                </span>
             </div>
        </div>
        
        {/* Background Texture for Journal */}
        {theme.id === ThemeId.JOURNAL && (
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23000000' fill-rule='evenodd'/%3E%3C/svg%3E")` }}></div>
        )}
      </div>

      {/* FOOTER ACTIONS */}
      <div className={`mt-8 text-center text-sm font-bold uppercase tracking-widest ${theme.textClass} opacity-60`}>
         <span className="animate-pulse">Coming soon: 2026 Resolutions</span>
      </div>

      <div className="mt-8 flex flex-col gap-4 w-full max-w-lg px-4">
        <div className="flex gap-4">
             <button 
                className={`flex-1 py-4 font-bold uppercase tracking-wide rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 ${theme.buttonClass} ${theme.id === ThemeId.JOURNAL ? 'rounded-md' : 'rounded-full'}`}
                onClick={handleShare}
            >
                <span>Share 📤</span>
            </button>
            <button 
                className={`flex-1 py-4 font-bold uppercase tracking-wide rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 ${theme.id === ThemeId.TURRELL ? 'bg-white text-black' : 'bg-white text-black shadow-lg'} ${theme.id === ThemeId.JOURNAL ? 'rounded-md border border-black' : 'rounded-full'}`}
                onClick={handleSave}
            >
                <span>Save Card 💾</span>
            </button>
        </div>
        
        <button 
            onClick={handleExportPDF}
            className={`w-full py-3 bg-transparent border-2 border-current rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black/5 transition-colors ${theme.textClass} ${theme.id === ThemeId.JOURNAL ? 'rounded-md' : 'rounded-full'}`}
        >
            📄 Export Q&A to PDF
        </button>

        {/* Buy Me a Coffee Button */}
        <a
            href={BUY_ME_A_COFFEE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.trackSupportClick()}
            className={`
                w-full py-4 rounded-xl flex items-center justify-center gap-3
                font-bold text-sm uppercase tracking-wide
                transition-all hover:scale-105 active:scale-95
                ${theme.id === ThemeId.JOURNAL ? 'rounded-md' : 'rounded-full'}
                ${
                    theme.id === ThemeId.TURRELL
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50'
                        : theme.id === ThemeId.POP_GLASS
                        ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-lg shadow-amber-400/40 hover:shadow-amber-400/60'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 border-2 border-amber-600'
                }
            `}
        >
            <span className="text-xl">☕</span>
            <span>Support This Project</span>
            <span className="text-xs opacity-80">→</span>
        </a>

        <button 
            onClick={onRestart}
            className={`w-full py-3 text-xs font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity ${theme.textClass}`}
        >
            Start Over
        </button>
      </div>
      
      {toastMessage && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-2xl animate-pop-in z-50 flex items-center gap-2">
              <span className="text-xl">✨</span>
              <span className="font-bold text-sm">{toastMessage}</span>
          </div>
      )}

    </div>
  );
};

export default Report;