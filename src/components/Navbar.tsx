import React, { useState, useEffect } from 'react';
import { Heart, BookOpen, Image, Mail, Cake, Sparkles, Settings } from 'lucide-react';

interface NavbarProps {
  recipientName: string;
  onOpenCustomizer: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ recipientName, onOpenCustomizer, onOpenAuth }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hidden until scrolled down past 120px
      if (window.scrollY > 120) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 max-w-4xl w-[92%] sm:w-auto ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-8 pointer-events-none'
      }`}
    >
      <div className="flex items-center justify-between gap-2 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full glass-card-rose shadow-2xl border border-rose-500/20 backdrop-blur-xl">
        {/* Brand / Name badge */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group text-left"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-slate-950 shadow-md shadow-amber-950/40 group-hover:scale-110 transition-transform font-bold">
            <Cake className="w-4 h-4 text-slate-950" />
          </div>
          <span className="font-serif-luxury text-sm font-semibold text-amber-200 hidden md:inline tracking-wide truncate max-w-[140px]">
            {recipientName}'s Birthday
          </span>
        </button>

        {/* Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => scrollToSection('polaroids')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-200 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
          >
            <Image className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Memories</span>
          </button>

          <button
            onClick={() => scrollToSection('timeline')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-200 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Journey</span>
          </button>

          <button
            onClick={() => scrollToSection('love-letter')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-200 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Birthday Letter</span>
          </button>

          <button
            onClick={() => scrollToSection('cake-wish')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-200 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
          >
            <Cake className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Make a Wish</span>
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-semibold border border-amber-500/30 transition-all hover:scale-105"
            title="Log In or Switch Birthday Profile"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Profiles</span>
          </button>

          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-medium border border-rose-500/30 transition-all hover:scale-105"
            title="Personalize recipient name, story & letter"
          >
            <Settings className="w-3.5 h-3.5 text-rose-300" />
            <span className="hidden lg:inline">Customize</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
