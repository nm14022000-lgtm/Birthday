import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Gift, ChevronDown, Stars, PartyPopper, Cake, Heart, Award } from 'lucide-react';
import { LoveStoryConfig } from '../types';

interface HeroSectionProps {
  config: LoveStoryConfig;
  onOpenCustomizer: () => void;
  onOpenAuth: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config, onOpenCustomizer, onOpenAuth }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);

  // Calculate live countdown timer
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const target = new Date(config.birthdayDate || `${now.getFullYear()}-08-15`);
      
      // If birthday has passed this year, set for target year
      if (now.getTime() > target.getTime()) {
        target.setFullYear(now.getFullYear() + 1);
      }

      const diff = target.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, [config.birthdayDate]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center overflow-hidden">
      {/* Background Wine & Gold Ambient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[650px] h-[380px] sm:h-[650px] bg-gradient-to-tr from-rose-900/30 via-pink-600/15 to-amber-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[250px] h-[250px] bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Top Birthday Welcome Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-card-gold text-amber-200 text-xs sm:text-sm font-medium border border-amber-500/30 mb-6 shadow-2xl"
      >
        <PartyPopper className="w-4 h-4 text-amber-400 animate-bounce" />
        <span className="tracking-wide">A Magical Celebration for {config.recipientName}</span>
        <Sparkles className="w-4 h-4 text-rose-400" />
      </motion.div>

      {/* Main Luxury Birthday Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-100 max-w-5xl leading-[1.1] mb-4 text-glow-gold"
      >
        {config.birthdayTitle}
      </motion.h1>

      {/* Animated Script Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className="font-script text-3xl sm:text-5xl text-rose-300 mb-6 font-semibold tracking-wide"
      >
        Happy Birthday, {config.recipientName}! ✨
      </motion.p>

      {/* Hero Description Paragraph */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="font-sans-clean text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-light"
      >
        {config.heroMessage}
      </motion.p>

      {/* Birthday Countdown Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mb-10 max-w-xl w-full mx-auto"
      >
        <div className="text-xs uppercase tracking-widest font-semibold text-amber-300/80 mb-3 flex items-center justify-center gap-2">
          <Stars className="w-4 h-4 text-amber-400" /> Birthday Countdown Clock <Stars className="w-4 h-4 text-amber-400" />
        </div>
        
        <div className="grid grid-cols-4 gap-2 sm:gap-4 p-4 rounded-3xl glass-card border border-rose-500/20 shadow-2xl">
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-rose-500/15 text-center">
            <span className="block text-2xl sm:text-4xl font-bold text-amber-300 font-serif-luxury">
              {timeLeft.days}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-sans-clean">Days</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-rose-500/15 text-center">
            <span className="block text-2xl sm:text-4xl font-bold text-rose-300 font-serif-luxury">
              {timeLeft.hours}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-sans-clean">Hours</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-rose-500/15 text-center">
            <span className="block text-2xl sm:text-4xl font-bold text-pink-300 font-serif-luxury">
              {timeLeft.minutes}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-sans-clean">Mins</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-rose-500/15 text-center">
            <span className="block text-2xl sm:text-4xl font-bold text-amber-200 font-serif-luxury">
              {timeLeft.seconds}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-sans-clean">Secs</span>
          </div>
        </div>
      </motion.div>

      {/* Surprise Gift Reveal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="mb-10"
      >
        {!isSurpriseOpen ? (
          <button
            onClick={() => setIsSurpriseOpen(true)}
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-slate-950 font-bold text-sm shadow-xl shadow-amber-950/40 hover:scale-105 transition-all cursor-pointer"
          >
            <Gift className="w-5 h-5 fill-slate-950 group-hover:rotate-12 transition-transform" />
            <span>Click to Unwrap Your Surprise Birthday Note!</span>
            <Sparkles className="w-4 h-4 text-slate-950" />
          </button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-md mx-auto p-6 rounded-2xl glass-card-gold border border-amber-400/40 text-amber-100 shadow-2xl relative"
            >
              <button
                onClick={() => setIsSurpriseOpen(false)}
                className="absolute top-3 right-3 text-xs text-amber-300 hover:text-white"
              >
                ✕ Close
              </button>
              <Award className="w-8 h-8 text-amber-400 mx-auto mb-2 animate-bounce" />
              <h3 className="font-serif-luxury text-xl font-bold text-amber-200 mb-1">
                A Birthday Surprise Wish
              </h3>
              <p className="font-sans-clean text-xs text-slate-200 leading-relaxed italic">
                "May your day be filled with endless laughter, sweet treats, golden memories, and the warmest warm hugs from everyone who adores you!"
              </p>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>

      {/* Action CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="flex flex-wrap items-center justify-center gap-4 z-20"
      >
        <button
          onClick={() => scrollToSection('polaroids')}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600 text-white font-semibold text-sm sm:text-base shadow-xl shadow-rose-950/60 hover:shadow-rose-600/40 transition-all duration-300 hover:scale-105"
        >
          <Cake className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
          <span>Begin Birthday Journey</span>
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </button>

        <button
          onClick={onOpenAuth}
          className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-sm font-semibold border border-amber-400/30 transition-all hover:scale-105"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Select or Create Profile</span>
        </button>

        <button
          onClick={onOpenCustomizer}
          className="inline-flex items-center gap-2 px-6 py-4 rounded-full glass-card hover:bg-slate-800/80 text-slate-200 text-sm font-medium border border-slate-700/60 transition-all hover:scale-105"
        >
          <span>Personalize Celebration</span>
        </button>
      </motion.div>

      {/* Down Scroll Indicator */}
      <motion.button
        onClick={() => scrollToSection('polaroids')}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="mt-16 text-slate-400 hover:text-rose-300 transition-colors flex flex-col items-center gap-1 cursor-pointer"
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase font-sans-clean text-amber-300/80">
          Scroll For Memory Gallery
        </span>
        <ChevronDown className="w-5 h-5 text-amber-400" />
      </motion.button>
    </section>
  );
};
