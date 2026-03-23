import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import PainSection from './components/PainSection';
import Features from './components/Features';
import Comparison from './components/Comparison';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <div className="bg-background min-h-screen font-body text-textDefault relative overflow-hidden">
      <svg className="noise-overlay" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      <Navbar />
      <Hero />
      <Stats />
      <PainSection />
      <Features />
      <Philosophy />
      <Comparison />
      <Protocol />
      <Pricing />
      <Footer />
    </div>
  );
}

export default App;
