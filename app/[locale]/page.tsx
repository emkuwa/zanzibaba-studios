import { Hero } from '@/components/site/Hero';
import { LogoMarquee } from '@/components/site/LogoMarquee';
import { LiveNowSection } from '@/components/site/LiveNowSection';
import { StockShowcase } from '@/components/site/StockShowcase';
import { OriginalsSection } from '@/components/site/OriginalsSection';
import { Services } from '@/components/site/Services';
import { IndustriesSection } from '@/components/site/IndustriesSection';
import { WorkWithUs } from '@/components/site/WorkWithUs';
import { FeaturedProjects } from '@/components/site/FeaturedProjects';
import { WhyChooseUs } from '@/components/site/WhyChooseUs';
import { PlatformCta } from '@/components/site/PlatformCta';
import { Contact } from '@/components/site/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <LiveNowSection />
      <StockShowcase />
      <OriginalsSection />
      <Services />
      <IndustriesSection />
      <WorkWithUs />
      <FeaturedProjects />
      <WhyChooseUs />
      <PlatformCta />
      <Contact />
    </>
  );
}
