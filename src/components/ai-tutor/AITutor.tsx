import React from 'react';
import { Volume2, Lightbulb, MessageCircle } from 'lucide-react';
import { speech } from '../../lib/speech';
import { sound } from '../../lib/audio';

interface AITutorProps {
  message: string;
  mood: 'HAPPY' | 'THINKING' | 'CHEERING' | 'OOPS';
  hint: string;
  onAskHint: () => void;
}

export const AITutor: React.FC<AITutorProps> = ({
  message,
  mood,
  hint,
  onAskHint,
}) => {
  const handleSpeak = () => {
    sound.playClick();
    speech.speak(message);
  };

  const getMoodEmoji = () => {
    switch (mood) {
      case 'HAPPY':
        return '😊';
      case 'THINKING':
        return '🤔';
      case 'CHEERING':
        return '🎉';
      case 'OOPS':
        return '😅';
    }
  };

  return (
    <div className="bg-gradient-to-r from-sky-50 to-indigo-50/80 rounded-3xl p-4 border-2 border-sky-200 shadow-md flex items-start gap-3.5 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-sky-300/20 rounded-full blur-xl pointer-events-none" />

      {/* Robot Mascot Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-400 flex items-center justify-center text-3xl shadow-md border-2 border-sky-300 animate-float">
          🤖
        </div>
        <span className="absolute -bottom-1 -right-1 text-base bg-white rounded-full shadow-xs px-1">
          {getMoodEmoji()}
        </span>
      </div>

      {/* Speech Bubble Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="font-fun font-bold text-sky-900 text-sm sm:text-base">
              Kiko AI — Sahabat Koding
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-200 text-sky-800">
              AI Tutor
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleSpeak}
              className="p-1.5 text-sky-700 hover:text-sky-900 hover:bg-sky-200/60 rounded-xl transition-colors"
              title="Dengarkan Suara Kiko"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onAskHint();
              }}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition-colors shadow-xs"
              title={`Petunjuk: ${hint}`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>Petunjuk</span>
            </button>
          </div>
        </div>

        {/* Dynamic AI Message text */}
        <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed bg-white/80 p-2.5 rounded-2xl border border-sky-200 shadow-xs">
          "{message}"
        </p>

        {/* Fun Motivational Tip */}
        <div className="mt-2 flex items-center gap-1 text-[11px] text-sky-700 font-medium">
          <MessageCircle className="w-3 h-3 text-sky-500" />
          <span>Tip: Ingat, programmer hebat belajar dari mencoba dan memperbaiki kesalahan!</span>
        </div>
      </div>
    </div>
  );
};
