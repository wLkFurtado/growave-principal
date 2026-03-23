import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#030303] pt-24 pb-12 px-8 md:px-16 rounded-t-[4rem] border-t border-border mt-16 relative">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
        
        <div className="lg:col-span-2">
          <img src="/logo-horizontal.png" alt="Growave" className="object-contain mb-6" style={{ height: '48px', width: '93px' }} />
          <p className="text-textMuted max-w-sm mb-8 leading-relaxed">
            Uma agência de Full-Service focada na Tríade do Crescimento: Tráfego, Automação e Audiovisual.
          </p>
          
          <div className="flex items-center gap-3 bg-surface/50 border border-border rounded-full px-4 py-2 w-max">
            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-glow" />
            <span className="font-mono text-xs uppercase tracking-widest text-textMuted">SYSTEM OPERATIONAL</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-heading font-bold text-lg mb-2">Serviços</h4>
          <a href="#" className="text-sm text-textMuted hover:text-primary transition-colors">Performance Ads</a>
          <a href="#" className="text-sm text-textMuted hover:text-primary transition-colors">Integração CRM</a>
          <a href="#" className="text-sm text-textMuted hover:text-primary transition-colors">Produção de Vídeo</a>
          <a href="#" className="text-sm text-textMuted hover:text-primary transition-colors">Criação de Landing Pages</a>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-heading font-bold text-lg mb-2">Contato</h4>
          <a href="#" className="text-sm text-textMuted hover:text-primary transition-colors">contato@growave.com.br</a>
          <a href="#" className="text-sm text-textMuted hover:text-primary transition-colors">+55 11 99999-9999</a>
          <div className="mt-4 flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary transition-colors">in</a>
            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary transition-colors">ig</a>
          </div>
        </div>

      </div>

      <div className="container mx-auto pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs text-textMuted">
        <p>&copy; {new Date().getFullYear()} Growave. Todos os direitos reservados.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
          <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
