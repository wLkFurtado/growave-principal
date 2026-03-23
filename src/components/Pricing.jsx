const Pricing = () => {
  return (
    <section id="pricing" className="py-32 px-4 md:px-16 container mx-auto">
      <div className="max-w-4xl mx-auto pt-16">
        <div className="flex flex-col items-center text-center rounded-3xl p-8 md:p-16 relative overflow-hidden bg-surface border border-primary/20 shadow-2xl scale-100 z-10 w-full transition-transform duration-500 hover:scale-[1.01] hover:border-primary/50 hover:shadow-glow">
          
          <div className="absolute top-0 right-8 bg-primary/10 text-primary border border-primary/30 font-bold font-mono text-xs px-4 py-1 rounded-b-lg top-0 z-20 uppercase tracking-widest">
            Exclusivo
          </div>
          
          <h2 className="text-6xl md:text-7xl font-heading text-primary tracking-wider uppercase mb-8 mt-4 drop-shadow-[0_0_15px_rgba(0,255,157,0.3)]">
            Investimento
          </h2>
          
          <p className="text-xl md:text-2xl text-textDefault/90 font-body max-w-3xl leading-relaxed mb-16">
            Entendemos que <strong className="text-primary font-bold">cada negócio é único.</strong> É por isso que não temos uma tabela fixa de preços. Quero garantir que você <strong className="text-primary font-bold">pague pelo que realmente precisa</strong>, sem surpresas ou custos extras.
          </p>
          
          <h3 className="text-3xl md:text-5xl font-heading text-primary tracking-wide uppercase mb-6 drop-shadow-[0_0_10px_rgba(0,255,157,0.2)]">
            Mas, calma! Te darei uma consultoria gratuita
          </h3>
          
          <p className="text-lg md:text-xl text-textMuted font-body max-w-3xl leading-relaxed mb-6">
            Antes de falarmos de números, <strong className="text-primary font-bold">quero conhecer a fundo a sua empresa.</strong> Isso me permite criar uma estratégia sob medida para você.
          </p>

          <p className="text-lg md:text-xl text-textMuted font-body max-w-3xl leading-relaxed mb-12">
            <strong className="text-primary font-bold">Ofereço um encontro inicial sem custos.</strong> Aqui, exploraremos suas metas e <strong className="text-primary font-bold">como podemos ajudar a alcançá-las.</strong>
          </p>

          <button className="interactive-btn w-full md:w-auto py-5 px-12 rounded-full font-bold font-heading text-xl transition-all bg-primary text-background group hover:bg-white">
            <span className="interactive-btn-content flex items-center justify-center gap-2 tracking-wide uppercase">
              Agendar Reunião de Diagnóstico
              <span className="transition-transform group-hover:translate-x-2">→</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
