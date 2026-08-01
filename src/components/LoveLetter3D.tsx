import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Sparkles, X, Stamp, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LoveLetter3DProps {
  title: string;
  content: string[];
  recipientName: string;
  partnerName: string;
}

export const LoveLetter3D: React.FC<LoveLetter3DProps> = ({
  title,
  content,
  recipientName,
  partnerName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSealed, setIsSealed] = useState(true);

  const handleOpenEnvelope = () => {
    setIsSealed(false);
    setTimeout(() => {
      setIsOpen(true);
      // Burst confetti hearts on open
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#fb7185', '#f59e0b', '#ec4899'],
        });
      } catch {
        // Fallback
      }
    }, 500);
  };

  return (
    <section id="love-letter" className="relative py-24 px-4 max-w-5xl mx-auto z-20 text-center">
      {/* Section Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Sealed Birthday Wish</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-bold text-slate-100 mb-4"
      >
        A Birthday Message From the Heart
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="font-sans-clean text-slate-300 text-sm sm:text-base max-w-lg mx-auto mb-12"
      >
        Written with warmth and admiration. Tap the wax seal below to unseal your personalized birthday letter.
      </motion.p>

      {/* 3D Envelope Container */}
      <div className="flex justify-center items-center perspective-1000 my-8">
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            onClick={handleOpenEnvelope}
            className="relative w-full max-w-md bg-gradient-to-br from-rose-950 via-slate-900 to-rose-900 p-8 rounded-2xl border-2 border-rose-500/40 shadow-2xl shadow-rose-950/80 cursor-pointer group overflow-hidden"
          >
            {/* Envelope flap triangle geometry */}
            <div
              className={`absolute top-0 left-0 right-0 h-32 bg-rose-900/60 border-b border-rose-500/30 transition-transform duration-700 origin-top [clip-path:polygon(0_0,100%_0,50%_100%)] ${
                !isSealed ? '[transform:rotateX(180deg)]' : ''
              }`}
            />

            {/* Wax Seal Button */}
            <div className="relative z-20 flex flex-col items-center justify-center py-10">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-red-500 flex items-center justify-center text-amber-200 border-4 border-amber-300/40 shadow-2xl shadow-rose-600/60 hover:border-amber-300 transition-all"
              >
                <Stamp className="w-9 h-9 fill-rose-950/20 text-amber-200" />
              </motion.div>

              <span className="font-serif-luxury text-xl font-bold text-rose-100 mt-6 tracking-wide">
                {title}
              </span>
              <span className="font-sans-clean text-xs text-rose-300/80 mt-1 flex items-center gap-1">
                <Heart className="w-3 h-3 fill-rose-500 text-rose-500" /> Tap to Break Wax Seal & Read
              </span>
            </div>
          </motion.div>
        ) : (
          /* Opened Stationery Letter */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-2xl bg-[#fffbf2] text-slate-900 p-8 sm:p-12 rounded-2xl shadow-2xl shadow-rose-950/80 border-2 border-amber-200/80 text-left relative overflow-hidden"
          >
            {/* Vintage Paper Texture and Ribbon */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600" />

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-slate-700 transition-colors"
              title="Close Letter"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letter Header */}
            <div className="mb-8 border-b border-amber-200 pb-4">
              <span className="font-handwriting text-3xl text-rose-700 font-bold block">
                {recipientName},
              </span>
              <p className="font-serif-luxury text-2xl font-semibold text-slate-800 mt-2">
                {title}
              </p>
            </div>

            {/* Letter Content Paragraphs */}
            <div className="space-y-6 font-serif-luxury text-slate-800 text-lg sm:text-xl leading-relaxed font-normal">
              {content.map((paragraph, i) => (
                <p key={i} className="first-letter:text-3xl first-letter:font-bold first-letter:text-rose-700 font-serif-luxury">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Letter Footer Signature */}
            <div className="mt-10 pt-6 border-t border-amber-200 flex flex-col items-end">
              <span className="font-handwriting text-3xl text-rose-800 font-bold">
                With all my love,
              </span>
              <span className="font-script text-2xl text-slate-900 font-semibold mt-1">
                {partnerName} ❤️
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
