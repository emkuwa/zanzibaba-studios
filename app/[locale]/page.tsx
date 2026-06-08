import { Hero } from '@/components/site/Hero';
import { LogoMarquee } from '@/components/site/LogoMarquee';
import { ClientLogos } from '@/components/site/ClientLogos';
import { Stats } from '@/components/site/Stats';
import { Services } from '@/components/site/Services';
import { FeaturedProjects } from '@/components/site/FeaturedProjects';
import { Showreel } from '@/components/site/Showreel';
import { Portfolio } from '@/components/site/Portfolio';
import { TourismFocus } from '@/components/site/TourismFocus';
import { ZanzibarLive } from '@/components/site/ZanzibarLive';
import { WhyChooseUs } from '@/components/site/WhyChooseUs';
import { Reviews } from '@/components/site/Reviews';
import { Pricing } from '@/components/site/Pricing';
import { Contact } from '@/components/site/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <ClientLogos />
      <Stats />
      <Services />
      <FeaturedProjects />
      <Showreel />
      <Portfolio />
      <TourismFocus />
      <ZanzibarLive />
      <WhyChooseUs />
      <Reviews />
      <Pricing />
      <Contact />
    </>
  );
}
