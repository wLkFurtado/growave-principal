import ShineButton from './ui/ShineButton';
import { ArrowUpRight } from 'lucide-react';
const whatsappUrl = `https://wa.me/5522981611733?text=${encodeURIComponent('Olá! Vim pelo site e quero agendar um diagnóstico gratuito.')}`;
export default function Pricing({ openModal }) {
  return <section className="contact-section" id="contato">
    <div className="contact-panel">
      <p className="eyebrow">DIAGNÓSTICO GRATUITO</p>
      <h2>Descubra onde sua empresa<br />está perdendo <span>clientes.</span></h2>
      <div className="contact-bottom"><p>Em uma conversa sem custo, analisamos como sua empresa atrai e atende clientes hoje e mostramos onde estão as maiores oportunidades. Sem compromisso de contratar.</p><div className="contact-actions"><ShineButton className="action-dark" onClick={openModal}>Agendar diagnóstico gratuito <ArrowUpRight size={22} /></ShineButton><a className="contact-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Prefere WhatsApp? Chame a gente</a></div></div>
    </div>
  </section>;
}
