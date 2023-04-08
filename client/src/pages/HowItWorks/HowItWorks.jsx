import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HowDoesSection from '../../components/HowItWorks/HowDoesSection/HowDoesSection';
import HowServiceSection from '../../components/HowItWorks/HowServiceSection/HowServiceSection';
import HowFeaturesSection from '../../components/HowItWorks/HowFeaturesSection/HowFeaturesSection';
import HowFaqSection from '../../components/HowItWorks/HowFaqSection/HowFaqSection';
import HowCtaSection from '../../components/HowItWorks/HowCtaSection/HowCtaSection';
import HowStatsSection from '../../components/HowItWorks/HowStatsSection/HowStatsSection';
import HowPricingSection from '../../components/HowItWorks/HowPricingSection/HowPricingSection';
import HowClientSection from '../../components/HowItWorks/HowClientSection/HowClientSection';

const HowItWorks = () => {
  return (
    <>
      <Header />
      <main>
        <HowDoesSection />
        <HowServiceSection />
        <HowFeaturesSection />
        <HowFaqSection />
        <HowCtaSection />
        <HowStatsSection />
        <HowPricingSection />
        <HowClientSection />
      </main>
      <Footer />
    </>
  );
};

export default HowItWorks;
