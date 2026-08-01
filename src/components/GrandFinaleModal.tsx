import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, PartyPopper, Heart, X, Volume2, RotateCcw, ChevronLeft, ChevronRight, Gift, Award, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PhotoItem } from '../types';

interface GrandFinaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  customWish?: string;
  photos: PhotoItem[];
  grandFinaleTitle?: string;
  grandFinaleMessage?: string;
}

export const GrandFinaleModal: React.FC<GrandFinaleModalProps> = ({
  isOpen,
  onClose,
  recipientName,
  customWish,
  photos,
  grandFinaleTitle,
  grandFinaleMessage,
}) => {
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState<number>(0);
  const fireworksCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Auto-play photo montage slideshow
  useEffect(() => {
    if (!isOpen || photos.length === 0) return;
    const interval = setInterval(() => {
      setCurrentPhotoIdx((prev) => (prev + 1) % photos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isOpen, photos]);

  // Launch celebratory fireworks & continuous confetti
  useEffect(() => {
    if (!isOpen) return;

    // Trigger initial confetti explosion
    try {
      const end = Date.now() + 4 * 1000;
      const colors = ['#f43f5e', '#fbbf24', '#f59e0b', '#38bdf8', '#a855f7', '#ec4899'];

      const frame = () => {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 70,
          origin: { x: 0, y: 0.7 },
          colors,
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 70,
          origin: { x: 1, y: 0.7 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } catch {
      // Fallback
    }

    // Fireworks Canvas animation loop
    const canvas = fireworksCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    interface FireworkParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      size: number;
      decay: number;
    }

    let particles: FireworkParticle[] = [];

    const spawnFirework = (x: number, y: number) => {
      const colors = ['#f43f5e', '#fbbf24', '#f59e0b', '#38bdf8', '#f472b6', '#ffffff'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: Math.random() * 3 + 2,
          decay: Math.random() * 0.02 + 0.01,
        });
      }
    };

    // Auto-launch fireworks periodically
    const fireworkInterval = setInterval(() => {
      spawnFirework(
        Math.random() * width * 0.8 + width * 0.1,
        Math.random() * height * 0.5 + height * 0.1
      );
    }, 600);

    const render = () => {
      ctx.fillStyle = 'rgba(13, 2, 8, 0.25)';
      ctx.fillRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.alpha -= p.decay;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0, p.size), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(fireworkInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPhoto = photos[currentPhotoIdx];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Dark Wine Glass Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0d0208]/92 backdrop-blur-2xl z-0"
          onClick={onClose}
        />

        {/* Fireworks Animation Canvas */}
        <canvas
          ref={fireworksCanvasRef}
          className="fixed inset-0 pointer-events-none z-10"
        />

        {/* Main Grand Finale Celebration Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative z-20 max-w-4xl w-full bg-gradient-to-br from-[#2a0818] via-[#15030d] to-[#3a0d24] border-2 border-amber-400/50 rounded-3xl p-6 sm:p-10 text-center shadow-[0_0_80px_rgba(245,158,11,0.35)] overflow-hidden my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/10 hover:bg-rose-600 text-slate-200 hover:text-white transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Celebration Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <PartyPopper className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>Grand Birthday Finale</span>
            <Sparkles className="w-4 h-4 text-rose-400" />
          </motion.div>

          {/* Glowing Animated Birthday Title */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 to-amber-300 mb-2 text-glow-gold"
          >
            HAPPY BIRTHDAY, {recipientName.toUpperCase()}! 🎉
          </motion.h2>

          <p className="font-script text-2xl sm:text-4xl text-rose-300 font-semibold mb-6">
            {grandFinaleTitle || 'May All Your Wishes Come True! ✨'}
          </p>

          {/* Custom Wish Banner if present */}
          {customWish && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-200 text-sm font-sans-clean italic max-w-lg mx-auto"
            >
              "Your Secret Birthday Wish: {customWish}"
            </motion.div>
          )}

          {/* Photo Montage Memory Carousel */}
          {photos.length > 0 && currentPhoto && (
            <div className="relative max-w-2xl mx-auto mb-8 rounded-2xl overflow-hidden border-2 border-amber-400/30 bg-slate-950 shadow-2xl group">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentPhoto.id}
                    src={currentPhoto.url}
                    alt={currentPhoto.caption}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Overlay Caption & Tag */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex flex-col justify-end p-4 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-600/80 text-white text-[10px] font-bold uppercase tracking-wider">
                      {currentPhoto.tag || 'Memory'}
                    </span>
                    <span className="text-amber-300 text-xs font-sans-clean">
                      {currentPhoto.date}
                    </span>
                  </div>
                  <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
                    {currentPhoto.caption}
                  </h4>
                  {currentPhoto.note && (
                    <p className="font-handwriting text-lg text-rose-200 mt-0.5">
                      "{currentPhoto.note}"
                    </p>
                  )}
                </div>
              </div>

              {/* Prev / Next Carousel Controls */}
              <button
                onClick={() =>
                  setCurrentPhotoIdx((prev) => (prev - 1 + photos.length) % photos.length)
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 hover:bg-rose-600 text-white transition-colors"
                title="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCurrentPhotoIdx((prev) => (prev + 1) % photos.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 hover:bg-rose-600 text-white transition-colors"
                title="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Photo Indicator Dots */}
              <div className="absolute bottom-3 right-4 flex gap-1.5 z-10">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPhotoIdx(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentPhotoIdx ? 'w-5 bg-amber-400' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Grand Finale Heartfelt Toast Paragraph */}
          <p className="font-sans-clean text-slate-200 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8 font-light">
            {grandFinaleMessage ||
              'Thank you for bringing so much light, warmth, and laughter into our world. May your new year around the sun be overflowing with magical adventures, dreams coming true, and unforgettable moments!'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                try {
                  confetti({
                    particleCount: 100,
                    spread: 100,
                    origin: { y: 0.6 },
                  });
                } catch {}
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-slate-950 font-bold text-sm shadow-xl hover:scale-105 transition-all"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>More Fireworks & Confetti!</span>
            </button>

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full glass-card hover:bg-slate-800/80 text-slate-200 text-sm font-medium border border-slate-700 transition-all hover:scale-105"
            >
              Close & Keep Exploring
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
