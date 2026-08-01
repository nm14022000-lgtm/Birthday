import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  UserPlus,
  Lock,
  Sparkles,
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Cake,
  Heart,
  Users,
  Image as ImageIcon,
  BookOpen,
  Mail,
  ShieldCheck,
  KeyRound,
  Trash2,
  Plus,
  PartyPopper,
  Gift,
} from 'lucide-react';
import { UserAccount, LoveStoryConfig, PhotoItem, TimelineEvent } from '../types';
import { defaultStory } from '../data/defaultStory';
import confetti from 'canvas-confetti';

interface AuthAndWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: UserAccount[];
  activeAccountId: string | null;
  onSelectAccount: (account: UserAccount) => void;
  onCreateAccount: (account: UserAccount) => void;
  onDeleteAccount: (accountId: string) => void;
}

export const AuthAndWizardModal: React.FC<AuthAndWizardModalProps> = ({
  isOpen,
  onClose,
  accounts,
  activeAccountId,
  onSelectAccount,
  onCreateAccount,
  onDeleteAccount,
}) => {
  const [viewMode, setViewMode] = useState<'login' | 'wizard'>('login');
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(activeAccountId);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  // Wizard Step State
  const [step, setStep] = useState<number>(1);
  const multiFileInputRef = useRef<HTMLInputElement | null>(null);

  // Wizard Draft Form
  const [recipientName, setRecipientName] = useState<string>('');
  const [relationship, setRelationship] = useState<string>('Best Friend');
  const [partnerName, setPartnerName] = useState<string>('');
  const [birthdayDate, setBirthdayDate] = useState<string>('');
  const [birthdayAge, setBirthdayAge] = useState<string>('');
  const [pinCode, setPinCode] = useState<string>('');

  const [birthdayTitle, setBirthdayTitle] = useState<string>('');
  const [heroMessage, setHeroMessage] = useState<string>('');
  const [loveLetterTitle, setLoveLetterTitle] = useState<string>('A Birthday Letter For You');
  const [letterParagraph1, setLetterParagraph1] = useState<string>('');
  const [letterParagraph2, setLetterParagraph2] = useState<string>('');

  const [uploadedPhotos, setUploadedPhotos] = useState<PhotoItem[]>([]);
  const [chapters, setChapters] = useState<TimelineEvent[]>([]);

  if (!isOpen) return null;

  // Convert File to Data URL
  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Handle Bulk Image Uploads
  const handlePhotoUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newItems: PhotoItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const url = await fileToDataUrl(file);
        newItems.push({
          id: 'up_' + Date.now() + '_' + i,
          url,
          caption: file.name.replace(/\.[^/.]+$/, ''),
          date: 'Special Memory',
          location: 'Celebration',
          rotation: (Math.random() - 0.5) * 8,
          note: 'A moment to treasure forever!',
          tag: relationship,
        });
      } catch (err) {
        console.error('Error reading image', err);
      }
    }
    setUploadedPhotos((prev) => [...newItems, ...prev]);
  };

  // Handle Account Selection / Login
  const handleLoginSubmit = (acc: UserAccount) => {
    if (acc.pinCode && acc.pinCode.trim() !== '') {
      if (pinInput !== acc.pinCode) {
        setPinError('Incorrect PIN. Please try again.');
        return;
      }
    }
    setPinError('');
    onSelectAccount(acc);
    try {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    } catch {}
    onClose();
  };

  // Complete Wizard & Build Config
  const handleFinishWizard = () => {
    const recName = recipientName.trim() || 'Birthday Star';
    const creator = partnerName.trim() || 'Your Family & Friends';

    // Merge uploaded photos with defaults if none uploaded
    const finalPhotos =
      uploadedPhotos.length > 0 ? uploadedPhotos : defaultStory.photos.slice(0, 4);

    const newConfig: LoveStoryConfig = {
      id: 'cfg_' + Date.now(),
      recipientName: recName,
      relationship,
      partnerName: creator,
      birthdayTitle:
        birthdayTitle.trim() || `Happy Birthday, ${recName}! 🎉`,
      relationshipStartDate: '2020-01-01',
      birthdayDate: birthdayDate || '2026-08-20',
      birthdayAge: parseInt(birthdayAge) || undefined,
      loveLetterTitle: loveLetterTitle.trim() || 'A Heartfelt Birthday Wish',
      loveLetterContent: [
        letterParagraph1.trim() ||
          `Dearest ${recName}, on this radiant day, I want to celebrate everything that makes you so remarkably special.`,
        letterParagraph2.trim() ||
          `May your new year be blessed with boundless joy, wonderful achievements, laughter, and magical moments!`,
      ],
      heroMessage:
        heroMessage.trim() ||
        `Celebrating the extraordinary life, bright spirit, and infectious joy of ${recName}.`,
      photos: finalPhotos,
      timeline: chapters.length > 0 ? chapters : defaultStory.timeline,
      reasons: defaultStory.reasons,
      grandFinaleTitle: `Wishing You The Most Magical Year Ahead! ✨`,
      grandFinaleMessage: `Thank you for bringing so much brightness and warmth into our world. Happy Birthday ${recName}!`,
      pinCode: pinCode.trim(),
      createdAt: new Date().toISOString(),
    };

    const newAcc: UserAccount = {
      id: 'acc_' + Date.now(),
      username: `${recName} (${relationship})`,
      relationship,
      recipientName: recName,
      pinCode: pinCode.trim(),
      config: newConfig,
    };

    onCreateAccount(newAcc);
    onSelectAccount(newAcc);
    try {
      confetti({ particleCount: 100, spread: 100, origin: { y: 0.6 } });
    } catch {}
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-950/94 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          className="relative max-w-3xl w-full bg-gradient-to-br from-slate-900 via-slate-950 to-[#1e0a18] border-2 border-amber-500/30 rounded-3xl p-5 sm:p-8 text-slate-100 shadow-[0_0_60px_rgba(245,158,11,0.2)] my-auto overflow-hidden"
        >
          {/* Top Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Mode Switcher Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                <Cake className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-slate-100">
                  {viewMode === 'login' ? 'Select Birthday Profile' : 'Create Birthday Experience'}
                </h2>
                <p className="text-xs text-slate-400 font-sans-clean">
                  {viewMode === 'login'
                    ? 'Log in to an existing profile or set up a new one for someone special.'
                    : `Step ${step} of 4: Setup personalized details, photos, and messages.`}
                </p>
              </div>
            </div>

            {/* Toggle Mode Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('login')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === 'login'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'glass-card text-slate-300 hover:text-amber-300'
                }`}
              >
                Profiles
              </button>
              <button
                onClick={() => setViewMode('wizard')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === 'wizard'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'glass-card text-slate-300 hover:text-amber-300'
                }`}
              >
                + New Setup
              </button>
            </div>
          </div>

          {/* VIEW 1: LOGIN / SELECT PROFILE */}
          {viewMode === 'login' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {accounts.map((acc) => {
                  const isSelected = selectedAccountId === acc.id;
                  const isActive = activeAccountId === acc.id;

                  return (
                    <motion.div
                      key={acc.id}
                      onClick={() => {
                        setSelectedAccountId(acc.id);
                        setPinInput('');
                        setPinError('');
                      }}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400 shadow-lg shadow-amber-950/40'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {/* Active Tag */}
                      {isActive && (
                        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                          Active Now
                        </span>
                      )}

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-slate-950 font-bold text-xs">
                            {acc.recipientName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-serif-luxury text-base font-bold text-white">
                              {acc.recipientName}'s Birthday
                            </h4>
                            <span className="text-[11px] text-amber-300 font-sans-clean flex items-center gap-1">
                              <Users className="w-3 h-3 text-amber-400" />
                              {acc.relationship || 'Friend'}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-400 font-sans-clean line-clamp-2">
                          By {acc.config.partnerName || 'Friends'} • {acc.config.photos.length} Photos
                        </p>
                      </div>

                      {/* Selected Profile Actions */}
                      {isSelected && (
                        <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
                          {acc.pinCode && (
                            <div>
                              <label className="block text-[11px] text-amber-300 mb-1">
                                Enter 4-Digit PIN to Access:
                              </label>
                              <input
                                type="password"
                                maxLength={4}
                                placeholder="PIN"
                                value={pinInput}
                                onChange={(e) => setPinInput(e.target.value)}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-center text-slate-100 text-xs focus:border-amber-400 focus:outline-none"
                              />
                            </div>
                          )}

                          {pinError && <p className="text-[11px] text-rose-400 font-semibold">{pinError}</p>}

                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLoginSubmit(acc);
                              }}
                              className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-bold text-xs shadow-md hover:scale-102 transition-all flex items-center justify-center gap-1.5"
                            >
                              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                              <span>View Birthday Page</span>
                            </button>

                            {accounts.length > 1 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (window.confirm(`Delete profile for ${acc.recipientName}?`)) {
                                    onDeleteAccount(acc.id);
                                  }
                                }}
                                className="p-2 rounded-xl bg-slate-950 hover:bg-rose-600 text-rose-400 hover:text-white transition-colors"
                                title="Delete Profile"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Create New Profile Box */}
              <div
                onClick={() => setViewMode('wizard')}
                className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border border-dashed border-amber-400/40 hover:border-amber-400 text-center cursor-pointer transition-all hover:scale-101 group"
              >
                <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <UserPlus className="w-5 h-5" />
                </div>
                <h4 className="font-serif-luxury text-base font-bold text-amber-200">
                  Setup a Birthday Account for Someone Else
                </h4>
                <p className="text-xs text-slate-400 font-sans-clean mt-0.5">
                  Click to launch the guided 4-step wizard: upload their name, relationship, photos, and messages.
                </p>
              </div>
            </div>
          )}

          {/* VIEW 2: GUIDED SETUP WIZARD */}
          {viewMode === 'wizard' && (
            <div className="space-y-6">
              {/* Wizard Step Indicator Bar */}
              <div className="flex items-center justify-between gap-2 px-2">
                {[
                  { num: 1, title: 'Basics & Name' },
                  { num: 2, title: 'Messages' },
                  { num: 3, title: 'Photo Gallery' },
                  { num: 4, title: 'Story Chapters' },
                ].map((st) => (
                  <div
                    key={st.num}
                    onClick={() => setStep(st.num)}
                    className={`flex-1 py-2 px-1 rounded-xl text-center cursor-pointer transition-all border ${
                      step === st.num
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : step > st.num
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30 font-medium'
                        : 'bg-slate-900 text-slate-500 border-slate-800'
                    }`}
                  >
                    <span className="block text-[10px] uppercase tracking-wider">Step 0{st.num}</span>
                    <span className="text-xs truncate hidden sm:block">{st.title}</span>
                  </div>
                ))}
              </div>

              {/* STEP 1: BASICS & NAMES */}
              {step === 1 && (
                <div className="space-y-4 text-xs font-sans-clean">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-amber-300 mb-1 font-semibold">
                        Birthday Person's Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sophia, Alex, Mom"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-amber-300 mb-1 font-semibold">
                        Relationship to Birthday Person *
                      </label>
                      <select
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-200 focus:border-amber-400 focus:outline-none"
                      >
                        <option value="Best Friend">Best Friend</option>
                        <option value="Partner">Partner / Soulmate</option>
                        <option value="Sister">Sister</option>
                        <option value="Brother">Brother</option>
                        <option value="Parent">Parent (Mom / Dad)</option>
                        <option value="Friend">Friend</option>
                        <option value="Colleague">Colleague / Teammate</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-amber-300 mb-1 font-semibold">
                        Your Name / Creator Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Julian, Friends & Family"
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-amber-300 mb-1 font-semibold">
                        Birthday Date
                      </label>
                      <input
                        type="date"
                        value={birthdayDate}
                        onChange={(e) => setBirthdayDate(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-amber-300 mb-1 font-semibold">
                        Turning Age (Optional)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 25"
                        value={birthdayAge}
                        onChange={(e) => setBirthdayAge(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-amber-300 mb-1 font-semibold">
                        Optional Security PIN (4 digits)
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="e.g. 1234"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-slate-100"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: MESSAGES & STORY */}
              {step === 2 && (
                <div className="space-y-4 text-xs font-sans-clean">
                  <div>
                    <label className="block text-amber-300 mb-1 font-semibold">
                      Main Birthday Headline Title
                    </label>
                    <input
                      type="text"
                      placeholder={`e.g. A Magical Birthday Celebration for ${recipientName || 'You'}`}
                      value={birthdayTitle}
                      onChange={(e) => setBirthdayTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-1 font-semibold">
                      Hero Subtitle / Description Message
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Celebrating your extraordinary light, boundless joy, and unforgettable moments."
                      value={heroMessage}
                      onChange={(e) => setHeroMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-1 font-semibold">
                      Personalized Birthday Letter Paragraph 1
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Write your heartfelt message or favorite memories..."
                      value={letterParagraph1}
                      onChange={(e) => setLetterParagraph1(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-1 font-semibold">
                      Personalized Birthday Letter Paragraph 2
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Write another sweet wish for their year ahead..."
                      value={letterParagraph2}
                      onChange={(e) => setLetterParagraph2(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-slate-100"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: PHOTO GALLERY UPLOADS */}
              {step === 3 && (
                <div className="space-y-4 text-xs font-sans-clean">
                  <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-3">
                    <ImageIcon className="w-8 h-8 text-amber-400 mx-auto" />
                    <div>
                      <h4 className="font-serif-luxury text-base font-bold text-amber-200">
                        Upload Birthday Person's Photos
                      </h4>
                      <p className="text-slate-300 text-xs mt-0.5">
                        Select multiple image files from your computer or phone. They will instantly appear in floating 3D polaroids!
                      </p>
                    </div>

                    <input
                      type="file"
                      ref={multiFileInputRef}
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handlePhotoUpload(e.target.files)}
                    />

                    <button
                      onClick={() => multiFileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-all cursor-pointer"
                    >
                      <Upload className="w-4 h-4" /> Choose Photos From Device
                    </button>
                  </div>

                  {/* Uploaded Thumbnails List */}
                  {uploadedPhotos.length > 0 && (
                    <div>
                      <h5 className="text-amber-300 font-bold mb-2">
                        Uploaded Photos ({uploadedPhotos.length})
                      </h5>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-48 overflow-y-auto pr-1">
                        {uploadedPhotos.map((photo, idx) => (
                          <div
                            key={photo.id}
                            className="aspect-square rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative group"
                          >
                            <img
                              src={photo.url}
                              alt={photo.caption}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() =>
                                setUploadedPhotos((prev) => prev.filter((_, i) => i !== idx))
                              }
                              className="absolute top-1 right-1 p-1 rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Delete photo"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4: STORY CHAPTERS & FINISH */}
              {step === 4 && (
                <div className="space-y-4 text-xs font-sans-clean">
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                    <h4 className="font-serif-luxury text-sm font-bold text-amber-300">
                      Summary & Grand Birthday Setup
                    </h4>
                    <p className="text-slate-300">
                      Review your customized setup below. Click "Create Birthday Page" to generate the website!
                    </p>
                    <ul className="list-disc list-inside text-amber-200 space-y-1 pt-1">
                      <li>Recipient: <strong>{recipientName || 'Birthday Star'}</strong> ({relationship})</li>
                      <li>Creator: <strong>{partnerName || 'Family & Friends'}</strong></li>
                      <li>Photos: <strong>{uploadedPhotos.length} custom photos uploaded</strong></li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Wizard Navigation Footer */}
              <div className="border-t border-slate-800/80 pt-4 flex justify-between items-center">
                <button
                  onClick={() => {
                    if (step > 1) setStep(step - 1);
                    else setViewMode('login');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>

                {step < 4 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="flex items-center gap-1.5 px-6 py-2 rounded-full bg-amber-500 text-slate-950 font-bold text-xs shadow-md hover:scale-105 transition-all"
                  >
                    <span>Next Step</span> <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinishWizard}
                    className="flex items-center gap-2 px-7 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-slate-950 font-bold text-xs shadow-xl hover:scale-105 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 fill-slate-950" /> Create Birthday Page Now!
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
