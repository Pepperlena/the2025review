import React, { useState } from 'react';
import { UITheme, ProfileData, ThemeId } from '../types';

interface ProfileInputProps {
  theme: UITheme;
  onComplete: (data: ProfileData) => void;
}

const ProfileInput: React.FC<ProfileInputProps> = ({ theme, onComplete }) => {
  const [formData, setFormData] = useState<ProfileData>({
    nickname: '',
    gender: '',
    age: '',
    country: '',
    favoriteWork: '',
    shareConsent: false
  });
  
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof ProfileData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate text fields
    const textFields = { ...formData, shareConsent: 'true' }; // ignore boolean for this check
    if (Object.values(textFields).every((val) => (val as string).trim().length > 0)) {
        onComplete(formData);
    } else {
        setError("Please fill in all fields to reveal your year.");
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-6 transition-colors duration-1000 ${theme.bgClass}`}>
       <div className={`max-w-xl w-full ${theme.cardClass} p-8 md:p-12 animate-pop-in`}>
          <h2 className={`text-3xl md:text-4xl text-center mb-2 ${theme.fontDisplay} ${theme.textClass}`}>
             One Last Thing...
          </h2>
          <p className={`text-center mb-8 opacity-70 ${theme.fontBody} ${theme.textClass}`}>
             To personalize your 2025 card.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
             <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 opacity-60 ${theme.textClass}`}>Nickname</label>
                <input 
                    type="text" 
                    value={formData.nickname} 
                    onChange={e => handleChange('nickname', e.target.value)}
                    className={`w-full p-4 rounded-xl outline-none transition-all ${theme.inputClass}`}
                    placeholder="What do we call you?"
                />
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2 opacity-60 ${theme.textClass}`}>Age</label>
                    <input 
                        type="text" 
                        value={formData.age} 
                        onChange={e => handleChange('age', e.target.value)}
                        className={`w-full p-4 rounded-xl outline-none transition-all ${theme.inputClass}`}
                        placeholder="25"
                    />
                 </div>
                 <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2 opacity-60 ${theme.textClass}`}>Gender</label>
                    <select 
                        value={formData.gender}
                        onChange={e => handleChange('gender', e.target.value)}
                        className={`w-full p-4 rounded-xl outline-none appearance-none transition-all ${theme.inputClass}`}
                    >
                        <option value="">Select...</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                 </div>
             </div>

             <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 opacity-60 ${theme.textClass}`}>Country</label>
                <input 
                    type="text" 
                    value={formData.country} 
                    onChange={e => handleChange('country', e.target.value)}
                    className={`w-full p-4 rounded-xl outline-none transition-all ${theme.inputClass}`}
                    placeholder="Where are you based?"
                />
             </div>

             <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 opacity-60 ${theme.textClass}`}>Favorite Book / Movie / Song / Creator</label>
                <input 
                    type="text" 
                    value={formData.favoriteWork} 
                    onChange={e => handleChange('favoriteWork', e.target.value)}
                    className={`w-full p-4 rounded-xl outline-none transition-all ${theme.inputClass}`}
                    placeholder="e.g. 'Everything Everywhere All At Once' or 'Taylor Swift'"
                />
             </div>

             {/* Share Consent */}
             <div className="pt-2 flex items-start gap-3">
                 <input 
                    type="checkbox"
                    id="shareConsent"
                    checked={formData.shareConsent}
                    onChange={e => handleChange('shareConsent', e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                 />
                 <label htmlFor="shareConsent" className={`text-sm opacity-80 leading-snug cursor-pointer ${theme.textClass}`}>
                     I'm okay with sharing this reflection (anonymously) to inspire others in the community report.
                 </label>
             </div>
             
             {error && (
                 <div className="text-red-500 text-sm font-bold text-center animate-shake bg-red-100 p-2 rounded">
                     {error}
                 </div>
             )}

             <div className="pt-4">
                <button
                    type="submit"
                    className={`w-full py-4 text-lg font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 ${theme.buttonClass} ${theme.id === ThemeId.JOURNAL ? 'rounded-md' : 'rounded-full'}`}
                >
                    Reveal My Year
                </button>
             </div>
          </form>
       </div>
    </div>
  );
};

export default ProfileInput;