import { Search, Layers, TrendingUp, ArrowUpRight } from 'lucide-react';
const steps = [
  { id: '01', icon: Search, tag: 'DIAGNÓSTICO', title: 'Primeiro, entendemos.', desc: 'Mergulhamos no seu negócio, identificamos oportunidades e alinhamos objetivos. Toda boa estratégia começa com as perguntas certas.' },
  { id: '02', icon: Layers, tag: 'IMPLEMENTAÇÃO', title: 'Depois, conectamos.', desc: 'Tráfego, CRM, automações e conteúdo passam a trabalhar juntos. Cada entrega tem uma função no crescimento da sua marca.' },
  { id: '03', icon: TrendingUp, tag: 'EVOLUÇÃO', title: 'E seguimos evoluindo.', desc: 'Analisamos os resultados, testamos novas ideias e aprimoramos a estratégia. Crescimento é um trabalho contínuo.' },
];
export default function Protocol() {
  return <section className="process-section" id="estratégia">
    <div className="section-heading"><div><p className="eyebrow">03 / COMO ACONTECE</p><h2>Uma direção clara.<br /><span>Cada passo conectado.</span></h2></div><p>Da primeira conversa à próxima conquista, você acompanha o caminho.</p></div>
    <div className="process-grid">{steps.map(({ id, icon: Icon, tag, title, desc }) => <article className="process-card" key={id}><div className="process-top"><span>{id}</span><Icon size={26} strokeWidth={1.4} /></div><p className="eyebrow">{tag}</p><h3>{title}</h3><p>{desc}</p><ArrowUpRight className="process-arrow" size={22} /></article>)}</div>
  </section>;
}
