import React, {useState} from 'react';
import {ContactSection} from './components/ContactSection';
import {CtaBanner} from './components/CtaBanner';
import {Footer} from './components/Footer';
import {Hero} from './components/Hero';
import {Navbar} from './components/Navbar';
import {ProcessSection} from './components/ProcessSection';
import {ServicesSection} from './components/ServicesSection';
import {ShowcaseSection} from './components/ShowcaseSection';
import {TrustStrip} from './components/TrustStrip';
import {WhatsAppFloat} from './components/WhatsAppFloat';
import {WhySection} from './components/WhySection';

export default function App() {
  const [preselectedNeed, setPreselectedNeed] = useState<string | undefined>(
    undefined
  );

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
        <ContactSection preselectedNeed={preselectedNeed} />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
