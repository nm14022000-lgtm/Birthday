import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Save,
  Plus,
  Trash2,
  Image,
  Settings,
  Sparkles,
  Upload,
  Download,
  FileUp,
  RotateCcw,
  BookOpen,
  Mail,
  Cake,
  ListPlus,
  Gift,
} from 'lucide-react';
import { LoveStoryConfig, PhotoItem, TimelineEvent, ReasonItem } from '../types';
import { defaultStory } from '../data/defaultStory';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: LoveStoryConfig;
  onSave: (newConfig: LoveStoryConfig) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [formData, setFormData] = useState<LoveStoryConfig>(config);
  const [activeTab, setActiveTab] = useState<'general' | 'photos' | 'timeline' | 'letter' | 'wishes' | 'backup'>('general');
  const bulkFileInputRef = useRef<HTMLInputElement | null>(null);
  const jsonFileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleResetDefault = () => {
    if (window.confirm('Are you sure you want to reset all customized data back to default?')) {
      setFormData(defaultStory);
      onSave(defaultStory);
      onClose();
    }
  };

  // Convert File to Data URL
  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Single Photo Upload
  const handleSinglePhotoUpload = async (index: number, file: File) => {
    try {
      const dataUrl = await fileToDataUrl(file);
      const updated = [...formData.photos];
      updated[index] = { ...updated[index], url: dataUrl };
      setFormData({ ...formData, photos: updated });
    } catch (err) {
      console.error('Failed to read image file:', err);
    }
  };

  // Bulk Photos Upload
  const handleBulkPhotosUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    try {
      const newPhotos: PhotoItem[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const dataUrl = await fileToDataUrl(file);
        newPhotos.push({
          id: 'p_' + Date.now() + '_' + i,
          url: dataUrl,
          caption: file.name.replace(/\.[^/.]+$/, ''),
          date: 'Special Moment',
          location: 'With Love',
          rotation: (Math.random() - 0.5) * 10,
          note: 'A precious memory!',
          tag: 'Uploaded',
        });
      }
      setFormData({ ...formData, photos: [...newPhotos, ...formData.photos] });
    } catch (err) {
      console.error('Failed bulk file upload:', err);
    }
  };

  // Photo helpers
  const updatePhoto = (index: number, field: keyof PhotoItem, value: any) => {
    const updated = [...formData.photos];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, photos: updated });
  };

  const addPhoto = () => {
    const newP: PhotoItem = {
      id: 'p_' + Date.now(),
      url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80',
      caption: 'New Birthday Memory',
      date: 'Celebration Day',
      location: 'Our Favorite Spot',
      rotation: (Math.random() - 0.5) * 8,
      note: 'Wishing you endless happiness!',
      tag: 'Celebration',
    };
    setFormData({ ...formData, photos: [newP, ...formData.photos] });
  };

  const removePhoto = (index: number) => {
    const updated = formData.photos.filter((_, i) => i !== index);
    setFormData({ ...formData, photos: updated });
  };

  // Timeline Chapter Upload
  const handleTimelinePhotoUpload = async (index: number, file: File) => {
    try {
      const dataUrl = await fileToDataUrl(file);
      const updated = [...formData.timeline];
      updated[index] = { ...updated[index], photoUrl: dataUrl };
      setFormData({ ...formData, timeline: updated });
    } catch (err) {
      console.error('Failed timeline image upload:', err);
    }
  };

  // Timeline helpers
  const updateTimeline = (index: number, field: keyof TimelineEvent, value: any) => {
    const updated = [...formData.timeline];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, timeline: updated });
  };

  const addTimelineEvent = () => {
    const newEv: TimelineEvent = {
      id: 't_' + Date.now(),
      date: `Chapter 0${formData.timeline.length + 1}`,
      title: 'New Milestone Chapter',
      subtitle: 'A Beautiful Memory',
      description: 'Describe this memorable moment or achievement here...',
      photoUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1000&q=80',
      location: 'Special Place',
      quote: '"May your journey continue to shine!"',
      chapterNumber: formData.timeline.length + 1,
    };
    setFormData({ ...formData, timeline: [...formData.timeline, newEv] });
  };

  const removeTimelineEvent = (index: number) => {
    const updated = formData.timeline.filter((_, i) => i !== index);
    setFormData({ ...formData, timeline: updated });
  };

  // Wish helpers
  const addWish = () => {
    const newWish: ReasonItem = {
      id: Date.now(),
      text: 'A unique reason why you bring so much sunshine into our lives!',
      category: 'sparkle',
    };
    setFormData({ ...formData, reasons: [newWish, ...formData.reasons] });
  };

  const updateWish = (index: number, field: keyof ReasonItem, value: any) => {
    const updated = [...formData.reasons];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, reasons: updated });
  };

  const removeWish = (index: number) => {
    const updated = formData.reasons.filter((_, i) => i !== index);
    setFormData({ ...formData, reasons: updated });
  };

  // JSON Export & Import
  const exportJSON = () => {
    const jsonStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.recipientName.toLowerCase()}_birthday_config.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        if (parsed && parsed.recipientName) {
          setFormData(parsed);
          alert('Configuration imported successfully!');
        } else {
          alert('Invalid JSON file format.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-950/92 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 text-slate-100 shadow-2xl my-auto overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-slate-100">
                  Personalize Birthday Experience
                </h2>
                <p className="text-xs text-slate-400 font-sans-clean">
                  Upload custom photos, edit names, story chapters, wishes, and countdown details.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 border-b border-slate-800 pb-3 mb-5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('general')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
                activeTab === 'general'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'glass-card text-slate-300 hover:text-amber-300'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>General & Names</span>
            </button>

            <button
              onClick={() => setActiveTab('photos')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
                activeTab === 'photos'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'glass-card text-slate-300 hover:text-amber-300'
              }`}
            >
              <Image className="w-3.5 h-3.5" />
              <span>Photos ({formData.photos.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
                activeTab === 'timeline'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'glass-card text-slate-300 hover:text-amber-300'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Chapters ({formData.timeline.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('letter')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
                activeTab === 'letter'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'glass-card text-slate-300 hover:text-amber-300'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Birthday Letter</span>
            </button>

            <button
              onClick={() => setActiveTab('wishes')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
                activeTab === 'wishes'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'glass-card text-slate-300 hover:text-amber-300'
              }`}
            >
              <ListPlus className="w-3.5 h-3.5" />
              <span>Wish Cards ({formData.reasons.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('backup')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
                activeTab === 'backup'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'glass-card text-slate-300 hover:text-amber-300'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export / Import</span>
            </button>
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {/* TAB: GENERAL */}
            {activeTab === 'general' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans-clean">
                <div>
                  <label className="block text-amber-300 mb-1 font-semibold">
                    Birthday Person Name
                  </label>
                  <input
                    type="text"
                    value={formData.recipientName}
                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-amber-300 mb-1 font-semibold">
                    Sender / Partner / Family Name
                  </label>
                  <input
                    type="text"
                    value={formData.partnerName}
                    onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-slate-100"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-amber-300 mb-1 font-semibold">
                    Main Birthday Title Headline
                  </label>
                  <input
                    type="text"
                    value={formData.birthdayTitle}
                    onChange={(e) => setFormData({ ...formData, birthdayTitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-slate-100"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-amber-300 mb-1 font-semibold">
                    Hero Subtitle / Story Message
                  </label>
                  <textarea
                    rows={3}
                    value={formData.heroMessage}
                    onChange={(e) => setFormData({ ...formData, heroMessage: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-amber-300 mb-1 font-semibold">
                    Birthday Date (for Countdown)
                  </label>
                  <input
                    type="date"
                    value={formData.birthdayDate || ''}
                    onChange={(e) => setFormData({ ...formData, birthdayDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-amber-300 mb-1 font-semibold">
                    Birthday Turning Age (e.g., 25)
                  </label>
                  <input
                    type="number"
                    value={formData.birthdayAge || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, birthdayAge: parseInt(e.target.value) || undefined })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-slate-100"
                  />
                </div>

                <div className="sm:col-span-2 pt-2 border-t border-slate-800">
                  <label className="block text-amber-300 mb-1 font-semibold">
                    Grand Finale Title (Appears after blowing candles)
                  </label>
                  <input
                    type="text"
                    value={formData.grandFinaleTitle || ''}
                    onChange={(e) => setFormData({ ...formData, grandFinaleTitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-slate-100"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-amber-300 mb-1 font-semibold">
                    Grand Finale Celebration Message
                  </label>
                  <textarea
                    rows={3}
                    value={formData.grandFinaleMessage || ''}
                    onChange={(e) => setFormData({ ...formData, grandFinaleMessage: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-slate-100"
                  />
                </div>
              </div>
            )}

            {/* TAB: PHOTOS */}
            {activeTab === 'photos' && (
              <div className="space-y-6">
                {/* Top Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <div>
                    <h4 className="text-sm font-bold text-amber-300 font-serif-luxury">
                      Custom Polaroid Photo Gallery
                    </h4>
                    <p className="text-xs text-slate-400 font-sans-clean">
                      Upload photos directly from your computer or phone, or paste image URLs.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={bulkFileInputRef}
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleBulkPhotosUpload(e.target.files)}
                    />

                    <button
                      onClick={() => bulkFileInputRef.current?.click()}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-all cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload Multiple Photos</span>
                    </button>

                    <button
                      onClick={addPhoto}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                    >
                      <Plus className="w-4 h-4" /> Add Single
                    </button>
                  </div>
                </div>

                {/* Photo Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {formData.photos.map((photo, index) => (
                    <div
                      key={photo.id}
                      className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative text-xs"
                    >
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute top-3 right-3 p-1.5 text-rose-400 hover:text-white rounded-full bg-slate-900/80 hover:bg-rose-600 transition-colors z-10"
                        title="Delete photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {/* Preview Box */}
                      <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 relative group">
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                          <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer hover:scale-105 transition-all">
                            <Upload className="w-3.5 h-3.5" /> Replace Image File
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleSinglePhotoUpload(index, file);
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-slate-400 mb-0.5 text-[11px]">Caption Title</label>
                          <input
                            type="text"
                            value={photo.caption}
                            onChange={(e) => updatePhoto(index, 'caption', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-0.5 text-[11px]">Category Tag</label>
                          <input
                            type="text"
                            value={photo.tag || ''}
                            onChange={(e) => updatePhoto(index, 'tag', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100"
                            placeholder="e.g. Sparkles"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-slate-400 mb-0.5 text-[11px]">Date / Event</label>
                          <input
                            type="text"
                            value={photo.date || ''}
                            onChange={(e) => updatePhoto(index, 'date', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-0.5 text-[11px]">Location</label>
                          <input
                            type="text"
                            value={photo.location || ''}
                            onChange={(e) => updatePhoto(index, 'location', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-0.5 text-[11px]">
                          Secret Birthday Note (On flip side)
                        </label>
                        <input
                          type="text"
                          value={photo.note || ''}
                          onChange={(e) => updatePhoto(index, 'note', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-0.5 text-[11px]">Or Paste Image URL</label>
                        <input
                          type="text"
                          value={photo.url}
                          onChange={(e) => updatePhoto(index, 'url', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 text-[11px]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: TIMELINE */}
            {activeTab === 'timeline' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-bold text-amber-300 font-serif-luxury">
                      Story Chapters / Journey Timeline
                    </h4>
                    <p className="text-xs text-slate-400 font-sans-clean">
                      Customize chapters celebrating milestone moments and journeys.
                    </p>
                  </div>
                  <button
                    onClick={addTimelineEvent}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500 text-slate-950 font-bold text-xs shadow-md hover:scale-105 transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Chapter
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.timeline.map((event, index) => (
                    <div
                      key={event.id}
                      className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative text-xs"
                    >
                      <button
                        onClick={() => removeTimelineEvent(index)}
                        className="absolute top-3 right-3 p-1.5 text-rose-400 hover:text-white rounded-full bg-slate-900 hover:bg-rose-600 transition-colors"
                        title="Delete chapter"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Image Preview & File Upload */}
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-800 relative group">
                          <img
                            src={event.photoUrl}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                            <label className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[11px] cursor-pointer">
                              <Upload className="w-3 h-3" /> Upload Image
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleTimelinePhotoUpload(index, file);
                                }}
                              />
                            </label>
                          </div>
                        </div>

                        {/* Text Fields */}
                        <div className="md:col-span-2 space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-slate-400 mb-0.5">Chapter Tag (e.g. Chapter 01)</label>
                              <input
                                type="text"
                                value={event.date}
                                onChange={(e) => updateTimeline(index, 'date', e.target.value)}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-400 mb-0.5">Chapter Title</label>
                              <input
                                type="text"
                                value={event.title}
                                onChange={(e) => updateTimeline(index, 'title', e.target.value)}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-slate-400 mb-0.5">Subtitle</label>
                              <input
                                type="text"
                                value={event.subtitle || ''}
                                onChange={(e) => updateTimeline(index, 'subtitle', e.target.value)}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-400 mb-0.5">Location</label>
                              <input
                                type="text"
                                value={event.location || ''}
                                onChange={(e) => updateTimeline(index, 'location', e.target.value)}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-slate-400 mb-0.5">Description Story</label>
                            <textarea
                              rows={2}
                              value={event.description}
                              onChange={(e) => updateTimeline(index, 'description', e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-400 mb-0.5">Quote / Highlight</label>
                            <input
                              type="text"
                              value={event.quote || ''}
                              onChange={(e) => updateTimeline(index, 'quote', e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-200 italic"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: LETTER */}
            {activeTab === 'letter' && (
              <div className="space-y-4 text-xs font-sans-clean">
                <div>
                  <label className="block text-amber-300 mb-1 font-semibold">
                    Birthday Letter Title
                  </label>
                  <input
                    type="text"
                    value={formData.loveLetterTitle}
                    onChange={(e) => setFormData({ ...formData, loveLetterTitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-amber-300 mb-1 font-semibold">
                    Letter Body Paragraphs
                  </label>
                  {formData.loveLetterContent.map((paragraph, idx) => (
                    <div key={idx} className="flex gap-2 mb-3">
                      <textarea
                        rows={3}
                        value={paragraph}
                        onChange={(e) => {
                          const updated = [...formData.loveLetterContent];
                          updated[idx] = e.target.value;
                          setFormData({ ...formData, loveLetterContent: updated });
                        }}
                        className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-slate-100"
                      />
                      <button
                        onClick={() => {
                          const updated = formData.loveLetterContent.filter((_, i) => i !== idx);
                          setFormData({ ...formData, loveLetterContent: updated });
                        }}
                        className="p-2 text-rose-400 hover:text-white"
                        title="Delete paragraph"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      setFormData({
                        ...formData,
                        loveLetterContent: [
                          ...formData.loveLetterContent,
                          'Another heartfelt message for your special day...',
                        ],
                      })
                    }
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 mt-2"
                  >
                    <Plus className="w-4 h-4" /> Add Paragraph
                  </button>
                </div>
              </div>
            )}

            {/* TAB: WISHES / REASONS */}
            {activeTab === 'wishes' && (
              <div className="space-y-4 text-xs font-sans-clean">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-bold text-amber-300 font-serif-luxury">
                      Interactive Wish Cards
                    </h4>
                    <p className="text-xs text-slate-400">
                      Add sweet messages, reasons, and wishes that users flip over in the grid.
                    </p>
                  </div>

                  <button
                    onClick={addWish}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500 text-slate-950 font-bold text-xs shadow-md"
                  >
                    <Plus className="w-4 h-4" /> Add Wish Card
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.reasons.map((wish, index) => (
                    <div
                      key={wish.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800"
                    >
                      <select
                        value={wish.category}
                        onChange={(e) => updateWish(index, 'category', e.target.value)}
                        className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-amber-300 font-medium shrink-0"
                      >
                        <option value="joy">Joy</option>
                        <option value="sparkle">Sparkle</option>
                        <option value="kindness">Kindness</option>
                        <option value="dreams">Dreams</option>
                        <option value="moments">Moments</option>
                      </select>

                      <input
                        type="text"
                        value={wish.text}
                        onChange={(e) => updateWish(index, 'text', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-100"
                      />

                      <button
                        onClick={() => removeWish(index)}
                        className="p-2 text-rose-400 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: BACKUP / IMPORT / EXPORT */}
            {activeTab === 'backup' && (
              <div className="space-y-6 text-xs font-sans-clean">
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
                  <h4 className="text-sm font-bold text-amber-300 font-serif-luxury">
                    Save or Load Customization Data
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    You can export your complete birthday setup (photos, text, chapters, and wishes) as a JSON file to keep as a backup, or load a previously saved configuration file.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={exportJSON}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-bold hover:scale-105 transition-all shadow-md"
                    >
                      <Download className="w-4 h-4" /> Export Configuration (JSON)
                    </button>

                    <label className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold cursor-pointer transition-all">
                      <FileUp className="w-4 h-4 text-amber-400" /> Import Configuration (JSON)
                      <input
                        type="file"
                        ref={jsonFileInputRef}
                        accept=".json"
                        className="hidden"
                        onChange={importJSON}
                      />
                    </label>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-500/30 space-y-3">
                  <h4 className="text-sm font-bold text-rose-300 font-serif-luxury">
                    Reset Template Defaults
                  </h4>
                  <p className="text-slate-300">
                    If you want to clear your changes and revert to the default template:
                  </p>
                  <button
                    onClick={handleResetDefault}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold transition-all shadow-md"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset to Default Template
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Save Controls */}
          <div className="border-t border-slate-800 pt-4 mt-4 flex justify-between items-center">
            <button
              onClick={handleResetDefault}
              className="text-xs text-slate-400 hover:text-rose-300 underline flex items-center gap-1 font-sans-clean"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-7 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-slate-950 font-bold text-xs shadow-xl shadow-amber-950/60 hover:scale-105 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4 fill-slate-950" /> Save Birthday Experience
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
