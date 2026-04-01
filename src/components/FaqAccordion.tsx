'use client';
import { useState } from 'react';

export type FaqItem = { question: string; answer: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number|null>(null);
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className={"faq-item" + (openIndex === i ? ' open' : '')}>
          <div className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
            {item.question}
          </div>
          <div className="faq-answer" dangerouslySetInnerHTML={{ __html: item.answer }} />
        </div>
      ))}
    </div>
  );
}
