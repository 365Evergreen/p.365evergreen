import type { BlockComponentProps } from '../../types/content'

interface AccordionItem {
  title: string
  html: string
}
interface AccordionProps {
  items: AccordionItem[]
}

export default function AccordionBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as AccordionProps
  return (
    <div className="block block--accordion accordion">
      {(p.items ?? []).map((item, i) => (
        <details className="accordion__item" key={i}>
          <summary className="accordion__title">{item.title}</summary>
          <div className="accordion__body" dangerouslySetInnerHTML={{ __html: item.html }} />
        </details>
      ))}
    </div>
  )
}
