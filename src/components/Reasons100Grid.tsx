import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Shuffle, CheckCircle, Gift } from 'lucide-react';
import { ReasonItem } from '../types';

interface Reasons100GridProps {
  reasons: ReasonItem[];
}

export const Reasons100Grid: React.FC<Reasons100GridProps> = ({ reasons }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [revealedIds, setRevealedIds] = useState<number[]>([]);
  const [randomModalReason, setRandomModalReason] = useState<ReasonItem | null>(null);

  const filteredReasons = reasons.filter(
    (r) => selectedCategory === 'all' || r.category === selectedCategory
  );

  const toggleReveal = (id: number) => {
    if (revealedIds.includes(id)) {
      setRevealedIds(revealedIds.filter((i) => i !== id));
    } else {
      setRevealedIds([...revealedIds, id]);
    }
  };

  const pickRandom = () => {
    const random = reasons[Math.floor(Math.random() * reasons.length)];
    setRandomModalReason(random);
    if (!revealedIds.includes(random.id)) {
      setRevealedIds([...revealedIds, random.id]);
    }
  };

  return (
    <section className="relative py-24 px-4 max-w-6xl mx-auto z-20">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Interactive Wish Cards</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-bold text-slate-100 mb-4"
        >
          What Makes You So Extraordinary
        </motion.h2>

        <p className="font-sans-clean text-slate-300 text-sm sm:text-base max-w-lg mx-auto mb-8">
          Tap any golden card to flip it over and unlock a reason why you make the world so much brighter.
        </p>

        {/* Categories & Random Button */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {['all', 'joy', 'sparkle', 'kindness', 'dreams', 'moments'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-950/60'
                  : 'glass-card text-slate-300 hover:text-amber-300 hover:border-amber-500/30'
              }`}
            >
              {cat === 'all' ? 'All Cards' : cat}
            </button>
          ))}

          <button
            onClick={pickRandom}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600 text-white font-semibold text-xs shadow-lg hover:scale-105 transition-all"
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-200" />
            <span>Surprise Wish!</span>
          </button>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 perspective-1000">
        {filteredReasons.map((item, idx) => {
          const isRevealed = revealedIds.includes(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => toggleReveal(item.id)}
              className="cursor-pointer group h-44"
            >
              <div
                className={`relative w-full h-full rounded-2xl transition-all duration-700 preserve-3d glass-card p-5 flex flex-col justify-between border ${
                  isRevealed
                    ? 'border-rose-500/60 bg-gradient-to-br from-rose-950/80 via-slate-900 to-rose-900/80 shadow-xl shadow-rose-950/40'
                    : 'border-slate-800 hover:border-rose-500/40 hover:scale-102'
                }`}
              >
                {!isRevealed ? (
                  <div className="flex flex-col items-center justify-center h-full text-center my-auto">
                    <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-110 group-hover:bg-rose-500/20 transition-all mb-2">
                      <Heart className="w-6 h-6 fill-rose-500/40 text-rose-500" />
                    </div>
                    <span className="font-serif-luxury text-lg font-bold text-slate-200">
                      Reason #{item.id}
                    </span>
                    <span className="text-[11px] font-sans-clean text-slate-400 mt-1">
                      Tap to unlock ❤️
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between text-xs font-semibold text-rose-400 uppercase tracking-wider font-sans-clean">
                      <span>Reason #{item.id}</span>
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    </div>

                    <p className="font-serif-luxury text-slate-100 text-base sm:text-lg leading-snug my-auto italic">
                      "{item.text}"
                    </p>

                    <div className="text-[10px] text-right font-sans-clean text-rose-300/70 capitalize">
                      Tag: {item.category}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Random Reason Modal */}
      <AnimatePresence>
        {randomModalReason && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setRandomModalReason(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-lg w-full bg-gradient-to-br from-rose-950 via-slate-900 to-rose-900 border-2 border-rose-500/50 rounded-3xl p-8 text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mx-auto mb-4">
                <Heart className="w-8 h-8 fill-rose-500 text-rose-500 animate-bounce" />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 font-sans-clean">
                Reason #{randomModalReason.id}
              </span>

              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-slate-100 font-bold leading-relaxed my-4">
                "{randomModalReason.text}"
              </h3>

              <button
                onClick={() => setRandomModalReason(null)}
                className="mt-4 px-8 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm shadow-xl transition-all"
              >
                Close & Keep Exploring
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
