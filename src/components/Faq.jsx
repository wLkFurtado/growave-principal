import { commonFaq } from '../content/sitePages';
export default function Faq({ items = commonFaq }) {
  return <section className="faq-section" aria-labelledby="faq-heading">
    <p className="eyebrow">PERGUNTAS FREQUENTES</p>
    <h2 id="faq-heading">Vamos esclarecer?</h2>
    <div>{items.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
  </section>;
}
