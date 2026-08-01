import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { defaultStory } from './data/defaultStory';
import { LoveStoryConfig, UserAccount } from './types';

// Components
import { AuroraCanvas } from './components/AuroraCanvas';
import { ParticleCanvas } from './components/ParticleCanvas';
import { AudioPlayer } from './components/AudioPlayer';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FloatingPolaroids3D } from './components/FloatingPolaroids3D';
import { InteractiveTimeline } from './components/InteractiveTimeline';
import { LoveLetter3D } from './components/LoveLetter3D';
import { InteractiveCake } from './components/InteractiveCake';
import { Reasons100Grid } from './components/Reasons100Grid';
import { Footer } from './components/Footer';
import { CustomizerModal } from './components/CustomizerModal';
import { AuthAndWizardModal } from './components/AuthAndWizardModal';

const DEFAULT_ACCOUNT: UserAccount = {
  id: 'default_sophia',
  username: 'Sophia (Special Someone)',
  relationship: 'Special Someone',
  recipientName: defaultStory.recipientName,
  config: defaultStory,
};

export default function App() {
  // Accounts List Persistence
  const [accounts, setAccounts] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem('birthday_user_accounts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return [DEFAULT_ACCOUNT];
  });

  // Active Account ID
  const [activeAccountId, setActiveAccountId] = useState<string>(() => {
    const savedId = localStorage.getItem('birthday_active_account_id');
    return savedId || DEFAULT_ACCOUNT.id;
  });

  // Active Config
  const activeAccount = accounts.find((a) => a.id === activeAccountId) || accounts[0] || DEFAULT_ACCOUNT;
  const [config, setConfig] = useState<LoveStoryConfig>(activeAccount.config);

  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Sync config when active account changes
  useEffect(() => {
    if (activeAccount) {
      setConfig(activeAccount.config);
      localStorage.setItem('birthday_active_account_id', activeAccount.id);
    }
  }, [activeAccountId, accounts]);

  // Save accounts array to localStorage whenever modified
  useEffect(() => {
    localStorage.setItem('birthday_user_accounts', JSON.stringify(accounts));
  }, [accounts]);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleSaveConfig = (newConfig: LoveStoryConfig) => {
    setConfig(newConfig);
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === activeAccount.id
          ? { ...acc, recipientName: newConfig.recipientName, config: newConfig }
          : acc
      )
    );
  };

  const handleSelectAccount = (acc: UserAccount) => {
    setActiveAccountId(acc.id);
    setConfig(acc.config);
  };

  const handleCreateAccount = (newAcc: UserAccount) => {
    setAccounts((prev) => [newAcc, ...prev]);
    setActiveAccountId(newAcc.id);
    setConfig(newAcc.config);
  };

  const handleDeleteAccount = (accId: string) => {
    setAccounts((prev) => {
      const filtered = prev.filter((a) => a.id !== accId);
      if (filtered.length > 0) {
        setActiveAccountId(filtered[0].id);
        setConfig(filtered[0].config);
      }
      return filtered;
    });
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-rose-500/30 selection:text-rose-200">
      {/* 60FPS Aurora Mesh Canvas Background */}
      <AuroraCanvas />

      {/* Floating Fireflies, Hearts, Petals & Touch Burst Particle Canvas */}
      <ParticleCanvas />

      {/* Background Soundscape & Music Player */}
      <AudioPlayer />

      {/* Hidden-on-scroll Navigation Bar */}
      <Navbar
        recipientName={config.recipientName}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Experience Flow */}
      <main className="relative z-20">
        <HeroSection
          config={config}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
        />

        <FloatingPolaroids3D photos={config.photos} />

        <InteractiveTimeline timeline={config.timeline} />

        <LoveLetter3D
          title={config.loveLetterTitle}
          content={config.loveLetterContent}
          recipientName={config.recipientName}
          partnerName={config.partnerName}
        />

        <InteractiveCake
          recipientName={config.recipientName}
          photos={config.photos}
          grandFinaleTitle={config.grandFinaleTitle}
          grandFinaleMessage={config.grandFinaleMessage}
        />

        <Reasons100Grid reasons={config.reasons} />
      </main>

      {/* Footer */}
      <Footer recipientName={config.recipientName} partnerName={config.partnerName} />

      {/* Customizer Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={config}
        onSave={handleSaveConfig}
      />

      {/* Account Profiles & Guided Setup Wizard Modal */}
      <AuthAndWizardModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        accounts={accounts}
        activeAccountId={activeAccountId}
        onSelectAccount={handleSelectAccount}
        onCreateAccount={handleCreateAccount}
        onDeleteAccount={handleDeleteAccount}
      />
    </div>
  );
}
