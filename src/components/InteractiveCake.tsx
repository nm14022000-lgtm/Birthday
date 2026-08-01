import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cake, Sparkles, Flame, Gift, RefreshCw, PartyPopper, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GrandFinaleModal } from './GrandFinaleModal';
import { PhotoItem } from '../types';

interface InteractiveCakeProps {
  recipientName: string;
  photos?: PhotoItem[];
  grandFinaleTitle?: string;
  grandFinaleMessage?: string;
}

export const InteractiveCake: React.FC<InteractiveCakeProps> = ({
  recipientName,
  photos = [],
  grandFinaleTitle,
  grandFinaleMessage,
}) => {
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true, true, true]);
  const [wishMade, setWishMade] = useState<boolean>(false);
  const [customWish, setCustomWish] = useState<string>('');
  const [isFinaleModalOpen, setIsFinaleModalOpen] = useState<boolean>(false);

  const extinguishCandle = (index: number) => {
    const updated = [...candlesLit];
    updated[index] = false;
    setCandlesLit(updated);

    // If all candles blown out
    if (updated.every((lit) => !lit) && !wishMade) {
      setWishMade(true);
      triggerCelebration();
    }
  };

  const relightCandles = () => {
    setCandlesLit([true, true, true, true, true]);
    setWishMade(false);
  };

  const triggerCelebration = () => {
    // Open Grand Finale Modal after 600ms delay for dramatic effect
    setTimeout(() => {
      setIsFinaleModalOpen(true);
    }, 600);

    try {
      const duration = 3.5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 7,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ['#f43f5e', '#fbbf24', '#f59e0b', '#38bdf8', '#a855f7'],
        });
        confetti({
          particleCount: 7,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ['#f43f5e', '#fbbf24', '#f59e0b', '#38bdf8', '#a855f7'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } catch {
      // Fallback
    }
  };

  return (
    <section id="cake-wish" className="relative py-24 px-4 max-w-4xl mx-auto z-20 text-center">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3"
      >
        <Cake className="w-3.5 h-3.5 text-amber-400" />
        <span>Make a Birthday Wish</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-bold text-slate-100 mb-4"
      >
        Blow Out Your Birthday Candles
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="font-sans-clean text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-12"
      >
        {candlesLit.some((l) => l)
          ? 'Tap each candle flame to blow it out and unlock your Grand Birthday Celebration!'
          : 'Your wish has been launched into the stars! Happy Birthday!'}
      </motion.p>

      {/* Birthday Cake Container */}
      <div className="relative max-w-md mx-auto p-8 rounded-3xl glass-card-gold border border-amber-500/30 shadow-2xl flex flex-col items-center">
        {/* Candles Row */}
        <div className="flex items-end justify-center gap-6 mb-2 z-10">
          {candlesLit.map((isLit, idx) => (
            <div
              key={idx}
              onClick={() => isLit && extinguishCandle(idx)}
              className="flex flex-col items-center cursor-pointer group"
              title={isLit ? 'Tap flame to blow out' : 'Extinguished'}
            >
              {/* Flame */}
              <AnimatePresence>
                {isLit ? (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [1, 1.25, 0.9, 1.15] }}
                    exit={{ opacity: 0, y: -12, scale: 0 }}
                    transition={{ repeat: Infinity, duration: 0.7 }}
                    className="relative w-5 h-8 flex items-center justify-center mb-1"
                  >
                    <Flame className="w-6 h-8 text-amber-400 fill-amber-300 filter drop-shadow-[0_0_14px_rgba(245,158,11,0.95)] group-hover:scale-125 transition-transform" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0], y: [-2, -14] }}
                    transition={{ duration: 1 }}
                    className="w-2 h-4 bg-slate-400/40 rounded-full blur-xs mb-1"
                  />
                )}
              </AnimatePresence>

              {/* Candle Stick */}
              <div className="w-3 h-14 bg-gradient-to-b from-amber-200 via-amber-300 to-rose-400 rounded-t-sm shadow-md border border-amber-200/40" />
            </div>
          ))}
        </div>

        {/* Cake Tiers */}
        <div className="w-full flex flex-col items-center">
          {/* Top Tier */}
          <div className="w-48 h-12 bg-gradient-to-r from-amber-300 via-rose-400 to-amber-300 rounded-t-2xl shadow-md border-b-4 border-amber-600/30 flex items-center justify-center relative">
            <div className="absolute -top-1 inset-x-2 h-3 bg-white/70 rounded-full blur-xs" />
            <span className="font-script text-rose-950 font-bold text-xl">
              Happy Birthday {recipientName}
            </span>
          </div>

          {/* Middle Tier */}
          <div className="w-64 h-16 bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600 shadow-lg border-b-4 border-rose-800/40 flex items-center justify-center relative">
            <div className="flex gap-4">
              <Stars className="w-4 h-4 text-amber-200 fill-amber-200" />
              <Sparkles className="w-4 h-4 text-white" />
              <Stars className="w-4 h-4 text-amber-200 fill-amber-200" />
            </div>
          </div>

          {/* Bottom Stand */}
          <div className="w-80 h-7 bg-slate-200 rounded-b-2xl shadow-2xl border-t border-slate-300 flex items-center justify-center">
            <span className="text-[10px] uppercase font-bold text-slate-600 tracking-widest font-sans-clean flex items-center gap-1">
              <PartyPopper className="w-3 h-3 text-rose-600" /> Celebrated With Love & Joy
            </span>
          </div>
        </div>

        {/* Wish Banner Input or Result */}
        <div className="mt-8 w-full">
          {!wishMade ? (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a secret birthday wish..."
                value={customWish}
                onChange={(e) => setCustomWish(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
              />
              <button
                onClick={() => {
                  setCandlesLit([false, false, false, false, false]);
                  setWishMade(true);
                  triggerCelebration();
                }}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 hover:scale-105 text-slate-950 font-bold text-xs shrink-0 transition-all shadow-lg shadow-amber-950/50"
              >
                Blow All Candles
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-amber-950/60 border border-amber-400/40 p-4 rounded-2xl text-amber-200 text-sm font-sans-clean flex flex-col items-center gap-2"
            >
              <div className="flex items-center gap-2 font-serif-luxury text-xl font-bold text-amber-300">
                <Gift className="w-5 h-5 text-amber-400" /> Wish Granted!
              </div>
              {customWish && <p className="italic text-xs text-amber-300">"{customWish}"</p>}
              
              <div className="flex items-center gap-3 mt-1">
                <button
                  onClick={() => setIsFinaleModalOpen(true)}
                  className="px-4 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
                >
                  View Grand Finale
                </button>
                <button
                  onClick={relightCandles}
                  className="text-xs text-amber-300 hover:text-white flex items-center gap-1 font-medium underline"
                >
                  <RefreshCw className="w-3 h-3" /> Relight
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Grand Finale Celebration Overlay Modal */}
      <GrandFinaleModal
        isOpen={isFinaleModalOpen}
        onClose={() => setIsFinaleModalOpen(false)}
        recipientName={recipientName}
        customWish={customWish}
        photos={photos}
        grandFinaleTitle={grandFinaleTitle}
        grandFinaleMessage={grandFinaleMessage}
      />
    </section>
  );
};
