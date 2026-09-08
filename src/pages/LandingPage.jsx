import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Features from '../components/Features';
import Comparison from '../components/Comparison';
import Protocol from '../components/Protocol';
import PortfolioSection from '../components/PortfolioSection';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';
import ScheduleModal from '../components/ScheduleModal';

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => { ScrollTrigger.refresh(); }, 100);
    const motion = gsap.matchMedia();
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      ['.service-card', '.process-card', '.contact-panel'].forEach(selector => {
        gsap.utils.toArray(selector).forEach((element, index) => {
          gsap.from(element, { y: 28, opacity: 0, duration: .7, delay: (index % 3) * .08,
            ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 94%', once: true } });
        });
      });
    });
    return () => { clearTimeout(timer); motion.revert(); };
  }, []);

  return (
    <>
      <Navbar openModal={() => setIsModalOpen(true)} />
      <main id="conteudo">
      <Hero openModal={() => setIsModalOpen(true)} />
      <Stats />
      <Features openModal={() => setIsModalOpen(true)} />
      <Comparison />
      <Protocol />
      <PortfolioSection />
      <Pricing openModal={() => setIsModalOpen(true)} />
      </main>
      <Footer />
      <ScheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
