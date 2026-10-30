import { commonFaq } from '../content/sitePages';

export default function Faq({ items = commonFaq }) {
  return (
    <section id="duvidas" className="faq-section" aria-labelledby="faq-heading">
      <p className="eyebrow">PERGUNTAS FREQUENTES</p>
      <h2 id="faq-heading">Vamos esclarecer?</h2>
      <div className="faq-list">
        {items.map(([question, answer]) => (
          <details key={question} className="faq-item">
            <summary>
              <span>{question}</span>
              <span className="faq-toggle" aria-hidden="true">+</span>
            </summary>
            <div className="faq-answer">
              <p>{answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

