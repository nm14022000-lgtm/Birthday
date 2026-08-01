import React, { useState } from 'react';
import { Heart, Sparkles, Stars, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FooterProps {
  recipientName: string;
  partnerName: string;
}

export const Footer: React.FC<FooterProps> = ({ recipientName, partnerName }) => {
  const [heartCount, setHeartCount] = useState<number>(100);

  const triggerHeartExplosion = () => {
    setHeartCount((prev) => prev + 1);
    try {
      confetti({
        particleCount: 40,
        spread: 80,
        origin: { y: 0.85 },
        colors: ['#f43f5e', '#fb7185', '#ec4899', '#f59e0b'],
      });
    } catch {
      // Fallback
    }
  };

  return (
    <footer className="relative py-20 px-4 z-20 border-t border-rose-500/20 text-center bg-slate-950/80 backdrop-blur-xl overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Heart Icon */}
        <button
          onClick={triggerHeartExplosion}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center text-white shadow-2xl shadow-rose-950/80 hover:scale-110 transition-transform mb-6 group cursor-pointer"
          title="Send a heart burst!"
        >
          <Heart className="w-8 h-8 fill-white text-white group-hover:animate-ping" />
        </button>

        <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-100 mb-2">
          Wishing You The Happiest Birthday, {recipientName}! ✨
        </h3>

        <p className="font-script text-2xl text-rose-300 mb-6">
          "May your year ahead be filled with laughter, unbounded joy, and magic around every corner."
        </p>

        {/* Counter of birthday wishes */}
        <button
          onClick={triggerHeartExplosion}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-200 text-xs font-semibold shadow-lg hover:border-amber-500/60 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{heartCount} Birthday Wishes Sent To You</span>
          <Gift className="w-3.5 h-3.5 text-rose-400" />
        </button>

        <div className="mt-12 text-xs font-sans-clean text-slate-500">
          Created with warmth & admiration by <span className="text-amber-300 font-semibold">{partnerName}</span> for <span className="text-amber-300 font-semibold">{recipientName}</span> ✨
        </div>
      </div>
    </footer>
  );
};
