import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, MapPin, Calendar, X, RotateCw, ZoomIn } from 'lucide-react';
import { PhotoItem } from '../types';

interface FloatingPolaroids3DProps {
  photos: PhotoItem[];
}

export const FloatingPolaroids3D: React.FC<FloatingPolaroids3DProps> = ({ photos }) => {
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [flippedMap, setFlippedMap] = useState<{ [id: string]: boolean }>({});

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="polaroids" className="relative py-24 px-4 max-w-7xl mx-auto z-20">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Birthday Gallery & Memory Vault</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-bold text-slate-100 mb-4"
        >
          Golden Birthday Memories
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans-clean text-slate-300 text-sm sm:text-base max-w-xl mx-auto"
        >
          Tap any Polaroid to inspect or flip it over to reveal a secret birthday note written just for you.
        </motion.p>
      </div>

      {/* 3D Floating Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 perspective-1000">
        {photos.map((photo, idx) => {
          const isFlipped = !!flippedMap[photo.id];
          const rotationClass = photo.rotation
            ? `rotate-[${photo.rotation}deg]`
            : idx % 2 === 0
            ? 'rotate-2'
            : '-rotate-2';

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
              whileHover={{ y: -12, scale: 1.04, rotate: 0 }}
              className={`relative cursor-pointer group preserve-3d transition-all duration-500 ${rotationClass}`}
              onClick={() => setActivePhoto(photo)}
            >
              {/* Polaroid Frame */}
              <div
                className={`relative w-full bg-slate-100/95 text-slate-900 p-4 pt-4 pb-6 rounded-sm shadow-2xl shadow-black/80 border border-slate-200/50 transition-transform duration-700 preserve-3d soft-depth-blur ${
                  isFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* FRONT FACE */}
                <div className="backface-hidden">
                  {/* Tape decoration on top */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-100/40 backdrop-blur-sm border border-amber-200/30 rotate-1 shadow-sm rounded-xs z-10 pointer-events-none" />

                  {/* Photo Image container with soft focus depth effect */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-800 rounded-xs mb-4 group-hover:shadow-inner">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 filter brightness-[0.98] contrast-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                      <span className="text-white text-xs font-sans-clean flex items-center gap-1 bg-slate-950/70 px-2 py-1 rounded-full backdrop-blur-md">
                        <ZoomIn className="w-3 h-3 text-rose-400" /> Expand
                      </span>
                      <button
                        onClick={(e) => toggleFlip(photo.id, e)}
                        className="text-white text-xs font-sans-clean flex items-center gap-1 bg-rose-600/80 hover:bg-rose-600 px-2.5 py-1 rounded-full backdrop-blur-md transition-colors"
                      >
                        <RotateCw className="w-3 h-3" /> Read Note
                      </button>
                    </div>
                  </div>

                  {/* Handwritten Caption & Metadata */}
                  <div className="text-center px-2">
                    <h3 className="font-script text-2xl sm:text-3xl text-slate-800 font-bold leading-tight truncate">
                      {photo.caption}
                    </h3>

                    <div className="flex items-center justify-center gap-3 text-slate-500 text-xs mt-1 font-sans-clean">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-rose-500" />
                        {photo.date}
                      </span>
                      {photo.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-rose-500" />
                          {photo.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* BACK FACE (Secret Note) */}
                <div className="absolute inset-0 bg-amber-50/98 p-6 text-slate-800 rounded-sm shadow-2xl flex flex-col justify-between [transform:rotateY(180deg)] backface-hidden border border-amber-200/60">
                  <div className="flex justify-between items-center border-b border-amber-200 pb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 font-sans-clean flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-rose-600 text-rose-600" /> Secret Love Note
                    </span>
                    <button
                      onClick={(e) => toggleFlip(photo.id, e)}
                      className="p-1 rounded-full hover:bg-amber-200/50 text-slate-600 transition-colors"
                      title="Flip back to photo"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="font-handwriting text-2xl sm:text-3xl text-slate-800 leading-relaxed text-center my-auto px-2">
                    "{photo.note || 'You make every moment unforgettable.'}"
                  </p>

                  <div className="text-right border-t border-amber-200 pt-2 text-xs font-script text-rose-700 font-bold text-lg">
                    Forever Yours ❤️
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setActivePhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="relative max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950 mb-4 border border-slate-800">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-slate-100">
                    {activePhoto.caption}
                  </h3>
                  <p className="font-handwriting text-2xl text-rose-300 mt-1">
                    "{activePhoto.note}"
                  </p>
                </div>

                <div className="flex items-center gap-3 text-slate-400 text-xs font-sans-clean shrink-0">
                  <span className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-full">
                    <Calendar className="w-3.5 h-3.5 text-rose-400" />
                    {activePhoto.date}
                  </span>
                  {activePhoto.location && (
                    <span className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-full">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      {activePhoto.location}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
