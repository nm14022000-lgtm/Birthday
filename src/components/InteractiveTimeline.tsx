import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, MapPin, Heart, Quote, ChevronRight } from 'lucide-react';
import { TimelineEvent } from '../types';

interface InteractiveTimelineProps {
  timeline: TimelineEvent[];
}

export const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({ timeline }) => {
  const [expandedId, setExpandedId] = useState<string | null>(timeline[0]?.id || null);

  return (
    <section id="timeline" className="relative py-24 px-4 max-w-6xl mx-auto z-20">
      {/* Section Header */}
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Interactive Storytelling</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-bold text-slate-100 mb-4"
        >
          Chapters of Your Birthday Journey
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-sans-clean text-slate-300 text-sm sm:text-base max-w-xl mx-auto"
        >
          A timeline of milestones, unforgettable achievements, and radiant moments that define your extraordinary path.
        </motion.p>
      </div>

      {/* Timeline Tree Line */}
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-500/80 via-pink-500/50 to-amber-500/80 -translate-x-1/2 shadow-[0_0_15px_rgba(244,63,94,0.6)]" />

        <div className="space-y-16">
          {timeline.map((event, idx) => {
            const isEven = idx % 2 === 0;
            const isExpanded = expandedId === event.id;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Center Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center shadow-lg shadow-amber-950/60 text-amber-400">
                    <Sparkles className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
                  </div>
                </div>

                {/* Content Card Side */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : event.id)}
                    className="glass-card-rose rounded-2xl p-6 border border-rose-500/30 hover:border-rose-500/60 shadow-2xl transition-all cursor-pointer group"
                  >
                    {/* Header meta */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-200 text-xs font-semibold font-sans-clean">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400 text-xs font-sans-clean">
                        <MapPin className="w-3 h-3 text-rose-400" />
                        {event.location}
                      </span>
                    </div>

                    <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-slate-100 group-hover:text-rose-300 transition-colors">
                      {event.title}
                    </h3>
                    <p className="font-script text-xl text-rose-300 font-semibold mb-3">
                      {event.subtitle}
                    </p>

                    {/* Image Preview with soft focus */}
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 bg-slate-900 border border-slate-800 soft-depth-blur">
                      <img
                        src={event.photoUrl}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    </div>

                    <p className="font-sans-clean text-slate-300 text-sm leading-relaxed mb-4">
                      {event.description}
                    </p>

                    {/* Quote Box */}
                    {event.quote && (
                      <div className="bg-rose-950/30 border-l-2 border-rose-500 p-3 rounded-r-lg text-xs italic font-serif-luxury text-rose-200 flex items-start gap-2">
                        <Quote className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{event.quote}</span>
                      </div>
                    )}

                    <div className="mt-4 pt-3 border-t border-rose-500/20 flex justify-end items-center text-xs text-rose-400 font-medium">
                      <span>{isExpanded ? 'Collapse story' : 'Read memory'}</span>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Empty Half for Grid Balance on Desktop */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
