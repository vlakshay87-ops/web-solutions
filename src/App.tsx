import React, {useCallback, useRef, useState} from 'react';
import {ContactSection} from './components/ContactSection';
import {CtaBanner} from './components/CtaBanner';
import {Footer} from './components/Footer';
import {Hero} from './components/Hero';
import {MagneticCursor} from './components/MagneticCursor';
import {Navbar} from './components/Navbar';
import {ProcessSection} from './components/ProcessSection';
import {ScrollProgressBar} from './components/ScrollProgressBar';
import {ServicesSection} from './components/ServicesSection';
import {ShowcaseSection} from './components/ShowcaseSection';
import {
  ToastMessage,
  ToastVariant,
  ToastViewport,
} from './components/ToastViewport';
import {TrustStrip} from './components/TrustStrip';
import {WhatsAppFloat} from './components/WhatsAppFloat';
import {WhySection} from './components/WhySection';

export default function App() {
  const [preselectedNeed, setPreselectedNeed] = useState<string | undefined>(
    undefined
  );
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const nextToastId = useRef(1);

  const notify = useCallback(
    (variant: ToastVariant, title: string, description: string) => {
      const id = nextToastId.current++;
      setToasts((prev) => [...prev.slice(-2), {id, variant, title, description}]);
    },
    []
  );

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  const handleSelectNeedAndContact = (serviceOption: string) => {
    setPreselectedNeed(serviceOption);
    scrollToSection('contact');
  };

  return (
    <div className="relative min-h-screen bg-[#07080C] text-[#F2F4F8]">
      <MagneticCursor />
      <ScrollProgressBar />
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />

      {/* Subtle full-page studio grain overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-50 ws-noise-overlay opacity-75 pointer-events-none"
      />

      <Navbar onNavigateContact={() => scrollToSection('contact')} />

      <main>
        <Hero
          onStartProject={() => scrollToSection('contact')}
          onViewWork={() => scrollToSection('work')}
        />
        <TrustStrip />
        <ServicesSection onSelectService={handleSelectNeedAndContact} />
        <ShowcaseSection onBuildSimilar={handleSelectNeedAndContact} />
        <WhySection />
        <ProcessSection />
        <CtaBanner onStartProject={() => scrollToSection('contact')} />
        <ContactSection
          preselectedNeed={preselectedNeed}
          onNotify={notify}
        />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
