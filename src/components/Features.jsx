import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { MousePointer2, Video, Smartphone, Globe, Database, HeartPulse } from 'lucide-react';
import gsap from 'gsap';

// --- Card 1: Diagnostic Shuffler (Traffic & Meta Ads) ---
const DiagnosticShuffler = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'Leads Qualificados', value: '+180%', color: 'text-primary' },
    { id: 2, title: 'CPA Otimizado', value: '-34%', color: 'text-white' },
    { id: 3, title: 'ROAS Global', value: '4.2x', color: 'text-white' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev];
        const last = newCards.pop();
        newCards.unshift(last);
        return newCards;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-64 w-full flex items-center justify-center perspective-[1000px]">
      {cards.map((card, index) => {
        const isFront = index === 0;
        const scale = 1 - index * 0.1;
        const translateY = index * 20;
        const opacity = 1 - index * 0.3;
        const zIndex = 30 - index;
        return (
          <div 
            key={card.id}
            className="absolute rounded-xl border border-border bg-surface p-6 w-3/4 transition-all duration-700 ease-spring shadow-lg"
            style={{ transform: `translateY(${translateY}px) scale(${scale})`, opacity, zIndex }}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono text-textMuted uppercase tracking-widest">Tráfego (Ads)</span>
              <div className={`w-2 h-2 rounded-full ${isFront ? 'bg-primary' : 'bg-border'}`} />
            </div>
            <h3 className="font-heading tracking-wide text-2xl">{card.title}</h3>
            <p className={`font-mono text-3xl font-bold mt-2 ${card.color}`}>{card.value}</p>
          </div>
        );
      })}
    </div>
  );
};

// --- Card 2: Telemetry Typewriter (Automation & Chatbot) ---
const TelemetryTypewriter = () => {
  const [text, setText] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const codeLines = [
      "> CRM: Novo lead capturado via anúncio.",
      "> Segmentando perfil automaticamente...",
      "> Lead quente? Notificando equipe de vendas.",
      "> Cliente inativo detectado. Disparando reativação.",
      "> CRM Atualizado. Histórico completo registrado."
    ];
    if (lineIdx >= codeLines.length) {
      setTimeout(() => { setText(''); setLineIdx(0); setCharIdx(0); }, 2000);
      return;
    }
    const currentLine = codeLines[lineIdx];
    if (charIdx < currentLine.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + currentLine[charIdx]);
        setCharIdx(prev => prev + 1);
      }, Math.random() * 30 + 20);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setText(prev => prev + '\\n');
        setLineIdx(prev => prev + 1);
        setCharIdx(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [charIdx, lineIdx]);

  return (
    <div className="h-64 w-full bg-black rounded-xl border border-border p-4 flex flex-col relative overflow-hidden">
      <div className="flex justify-between items-center border-b border-border pb-2 mb-2">
        <span className="text-xs font-mono text-primary flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" /> IA CHATBOT
        </span>
        <span className="text-xs font-mono text-textMuted">CRM.SYS</span>
      </div>
      <pre className="font-mono text-xs md:text-sm text-textDefault whitespace-pre-wrap flex-1 overflow-hidden">
        {text}
        <span className="inline-block w-2 h-4 bg-primary align-middle animate-pulse ml-1" />
      </pre>
    </div>
  );
};

// --- Card 3: Cursor Scheduler (Audiovisual) ---
const CursorScheduler = () => {
  const containerRef = useRef(null);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });
      tl.set(".cursor-icon", { x: 0, y: 0, scale: 1 });
      tl.set(".grid-cell", { backgroundColor: "transparent" });
      tl.to(".cursor-icon", { x: 120, y: 40, duration: 1, ease: "power2.inOut", delay: 0.5 });
      tl.to(".cursor-icon", { scale: 0.8, duration: 0.1 });
      tl.to(".cell-thu", { backgroundColor: "rgba(74, 255, 90, 0.2)", duration: 0.1 });
      tl.to(".cursor-icon", { scale: 1, duration: 0.1 });
      tl.to(".cursor-icon", { x: 200, y: 120, duration: 1, ease: "power2.inOut", delay: 0.2 });
      tl.to(".cursor-icon", { scale: 0.8, duration: 0.1 });
      tl.to(".save-btn", { backgroundColor: "#4AFF5A", color: "#000", duration: 0.2 });
      tl.to(".cursor-icon", { scale: 1, duration: 0.1 });
      tl.to(".cursor-icon", { opacity: 0, duration: 0.3, delay: 0.3 });
      tl.to(".save-btn", { backgroundColor: "transparent", color: "#eaeaea", duration: 0.3 }, "<");
      tl.to(".cell-thu", { backgroundColor: "transparent", duration: 0.3 }, "<");
      tl.set(".cursor-icon", { x: 0, y: 0, opacity: 1 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-64 w-full relative pt-4 px-4 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4">
         <Video size={16} className="text-primary"/>
         <span className="text-xs font-mono text-textMuted uppercase">Produção de Vídeo</span>
      </div>
      <div className="grid grid-cols-7 gap-1 w-full max-w-[240px] mb-4">
        {['D','S','T','Q','Q','S','S'].map((day, i) => (
          <div key={i} className="text-center font-mono text-[10px] text-textMuted">{day}</div>
        ))}
        {Array.from({length: 14}).map((_, i) => (
          <div key={i} className={`h-8 rounded border border-border/50 grid-cell ${i === 4 ? 'cell-thu' : ''}`} />
        ))}
      </div>
      <div className="w-full max-w-[240px] flex justify-end">
        <div className="save-btn font-mono text-xs border border-border px-4 py-1 rounded transition-colors">Agendar Gravação</div>
      </div>
      <div className="cursor-icon absolute top-8 left-12 text-primary z-20" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>
        <MousePointer2 size={24} fill="white" stroke="black" strokeWidth={1.5} />
      </div>
    </div>
  );
};


const Features = () => {
  const extraServices = [
    {
      title: "Social Media",
      desc: "Gestão completa de redes sociais com postagens diárias, design premium e engajamento focado no seu público.",
      icon: <Smartphone size={24} className="text-primary" />
    },
    {
      title: "Audiovisual & Filmagens",
      desc: "Filmagem presencial cinematográfica, captação 4K, edição de vídeo profissional e reels com ganchos virais.",
      icon: <Video size={24} className="text-primary" />
    },
    {
      title: "Google Ads & SEO",
      desc: "Posicionamento no topo do Google quando os clientes procuram exatamente pela sua solução.",
      icon: <Globe size={24} className="text-primary" />
    },
    {
      title: "CRM Inteligente",
      desc: "Nosso CRM próprio organiza e nutre seus leads com automações inteligentes e reativação automática de clientes inativos no momento certo.",
      icon: <Database size={24} className="text-primary" />
    },
    {
      title: "Landing Pages de Conversão",
      desc: "Desenvolvimento de páginas de alta velocidade e persuasão projetadas exclusivamente para receber tráfego pago.",
      icon: <MousePointer2 size={24} className="text-primary" />
    },
    {
      title: "Clínica com Rumo (Especial Saúde)",
      desc: "Um método exclusivo da Growave desenhado para clínicas e médicos que querem lotar agendas particulares.",
      icon: <HeartPulse size={24} className="text-primary" />
    }
  ];

  return (
    <section id="features" className="py-32 px-4 md:px-16 container mx-auto">
      <div className="mb-16">
        <h2 className="text-sm font-mono tracking-widest text-primary mb-4 uppercase">/ Ecossistema de Soluções</h2>
        <h3 className="text-3xl md:text-5xl font-heading font-bold max-w-2xl uppercase tracking-wide">
          Sistemas Interligados para uma Máquina de Vendas Imparável.
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="glass-card flex flex-col p-8 group">
          <div className="mb-6"><DiagnosticShuffler /></div>
          <h4 className="text-3xl font-heading tracking-wide mb-3">Escala de Tráfego</h4>
          <p className="text-textMuted font-body text-sm leading-relaxed">
            Distribuímos seu orçamento cirurgicamente. Esqueça testes rasos — aplicamos gestão de anúncios avançada para otimizar conversões em tempo real.
          </p>
        </div>
        <div className="glass-card flex flex-col p-8 group">
          <div className="mb-6"><TelemetryTypewriter /></div>
          <h4 className="text-3xl font-heading tracking-wide mb-3">CRM & Inteligência de Vendas 24/7</h4>
          <p className="text-textMuted font-body text-sm leading-relaxed">
            Nosso CRM próprio organiza todos os seus leads e dispara automações inteligentes no momento certo. Reativa clientes inativos, registra históricos e prioriza contatos com maior potencial de fechamento.
          </p>
        </div>
        <div className="glass-card flex flex-col p-8 group">
          <div className="mb-6"><CursorScheduler /></div>
          <h4 className="text-3xl font-heading tracking-wide mb-3">Conteúdo que Converte</h4>
          <p className="text-textMuted font-body text-sm leading-relaxed">
            Unimos design estético e produções audiovisuais cinematográficas com retenção psicológica estruturada para impulsionar suas campanhas online.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {extraServices.map((feat, idx) => (
          <div key={idx} className="bg-surface/50 border border-border p-6 rounded-2xl hover:-translate-y-1 transition-transform ease-magnetic overflow-hidden relative">
            {/* Soft highlight for the spec clinic method */}
            {idx === 5 && <div className="absolute inset-0 bg-primary/5 z-0" />}
            <div className="relative z-10">
              <div className="mb-4">{feat.icon}</div>
              <h5 className="font-heading tracking-wide text-2xl mb-2">{feat.title}</h5>
              <p className="text-sm text-textMuted font-body">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
