import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LandingPage from './pages/LandingPage';
import SeccoEmCasaGallery from './pages/SeccoEmCasaGallery';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/secco-em-casa" element={<SeccoEmCasaGallery />} />
      </Routes>
    </Router>
  );
}

export default App;
