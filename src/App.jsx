import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LandingPage from './pages/LandingPage';
import SeccoEmCasaGallery from './pages/SeccoEmCasaGallery';
import Crm from './pages/Crm';
import Portfolio from './pages/Portfolio';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/secco-em-casa" element={<SeccoEmCasaGallery />} />
        <Route path="/crm" element={<Crm />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="*" element={<main className="not-found"><p className="eyebrow">404 / CAMINHO NÃO ENCONTRADO</p><h1>Vamos encontrar a direção?</h1><p>Essa página não existe ou mudou de endereço.</p><a className="action-primary" href="/">Voltar ao início</a></main>} />
      </Routes>
    </Router>
  );
}

export default App;
