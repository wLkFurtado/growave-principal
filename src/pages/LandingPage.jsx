import { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Features from '../components/Features';
import Comparison from '../components/Comparison';
import Protocol from '../components/Protocol';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';
import ScheduleModal from '../components/ScheduleModal';

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => { ScrollTrigger.refresh(); }, 100);
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar openModal={() => setIsModalOpen(true)} />
      <Hero openModal={() => setIsModalOpen(true)} />
      <Stats />
      <Features />
      <Comparison />
      <Protocol />
      <Pricing openModal={() => setIsModalOpen(true)} />
      <Footer />
      <ScheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
