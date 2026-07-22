import type { BlockComponentProps } from '../../types/content'

interface FaqItem {
  question: string
  answer: string
}
interface FaqProps {
  heading?: string
  items: FaqItem[]
}

export default function FaqBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as FaqProps
  const items = p.items ?? []

  // FAQPage structured data for rich results.
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  }

  return (
    <section className="block block--faq faq">
      {p.heading ? <h2 className="faq__heading">{p.heading}</h2> : null}
      {items.map((it, i) => (
        <details className="faq__item" key={i}>
          <summary className="faq__question">{it.question}</summary>
          <div className="faq__answer" dangerouslySetInnerHTML={{ __html: it.answer }} />
        </details>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </section>
  )
}
