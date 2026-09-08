import ShineButton from './ui/ShineButton';
import { ArrowUpRight } from 'lucide-react';
export default function Pricing({ openModal }) {
  return <section className="contact-section" id="contato">
    <div className="contact-panel">
      <p className="eyebrow">O PRÓXIMO MOVIMENTO É SEU</p>
      <h2>Vamos tirar seu<br />próximo passo <span>do papel?</span></h2>
      <div className="contact-bottom"><p>Conte onde sua marca está e aonde quer chegar. A primeira conversa é gratuita. O plano é feito para você.</p><ShineButton className="action-dark" onClick={openModal}>Agendar meu diagnóstico <ArrowUpRight size={22} /></ShineButton></div>
    </div>
  </section>;
}
