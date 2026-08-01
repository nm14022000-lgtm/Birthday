import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentMelody, setCurrentMelody] = useState<'lullaby' | 'romantic' | 'night'>('romantic');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  // Frequency charts for romantic pentatonic / major scale notes
  const noteFreqs: { [key: string]: number } = {
    C4: 261.63,
    D4: 293.66,
    E4: 329.63,
    G4: 392.00,
    A4: 440.00,
    C5: 523.25,
    D5: 587.33,
    E5: 659.25,
    G5: 783.99,
    A5: 880.00,
  };

  const romanticMelody = ['C4', 'E4', 'G4', 'B4', 'C5', 'G4', 'E5', 'D5', 'A4', 'C5'];
  const lullabyMelody = ['E4', 'G4', 'A4', 'B4', 'E5', 'D5', 'B4', 'A4', 'G4', 'E4'];

  const playNote = (freq: number, duration: number = 1.2) => {
    if (!audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft sine + gentle triangle warm timbre
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Envelope: gentle fade in, long soft decay
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio context errors
    }
  };

  const startMusic = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    setIsPlaying(true);

    let step = 0;
    const melody = currentMelody === 'romantic' ? romanticMelody : lullabyMelody;

    const playSequence = () => {
      const note = melody[step % melody.length];
      if (noteFreqs[note]) {
        playNote(noteFreqs[note], 2.2);
      }
      step++;
      timerRef.current = window.setTimeout(playSequence, 1200);
    };

    playSequence();
  };

  const stopMusic = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <button
        onClick={toggleMusic}
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full glass-card border shadow-lg transition-all duration-300 hover:scale-105 ${
          isPlaying
            ? 'border-rose-400/50 bg-rose-950/60 text-rose-200 shadow-rose-900/30'
            : 'border-slate-700/60 bg-slate-900/70 text-slate-300 hover:border-rose-500/40'
        }`}
        title={isPlaying ? 'Mute romantic ambient music' : 'Play romantic ambient music'}
      >
        <div className="relative">
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-rose-400 animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5 text-slate-400" />
          )}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
          )}
        </div>

        <span className="text-xs font-medium tracking-wide hidden sm:inline">
          {isPlaying ? 'Romantic Soundscape' : 'Enable Music'}
        </span>

        {/* Animated equalizer bars when playing */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3">
            <span className="w-0.5 bg-rose-400 rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
            <span className="w-0.5 bg-rose-400 rounded-full animate-[bounce_1s_infinite_300ms] h-2" />
            <span className="w-0.5 bg-rose-400 rounded-full animate-[bounce_1s_infinite_200ms] h-3" />
          </div>
        )}
      </button>

      {/* Melody preset selector menu if active */}
      {isPlaying && (
        <div className="hidden md:flex gap-1 bg-slate-900/80 backdrop-blur-md p-1 rounded-full border border-slate-800 text-xs">
          <button
            onClick={() => {
              setCurrentMelody('romantic');
              if (isPlaying) {
                stopMusic();
                setTimeout(startMusic, 100);
              }
            }}
            className={`px-3 py-1 rounded-full transition-colors ${
              currentMelody === 'romantic'
                ? 'bg-rose-500 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Romantic
          </button>
          <button
            onClick={() => {
              setCurrentMelody('lullaby');
              if (isPlaying) {
                stopMusic();
                setTimeout(startMusic, 100);
              }
            }}
            className={`px-3 py-1 rounded-full transition-colors ${
              currentMelody === 'lullaby'
                ? 'bg-rose-500 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Serenade
          </button>
        </div>
      )}
    </div>
  );
};
