import type { BlockComponentProps } from '../../types/content'

interface QuoteProps {
  html?: string
  citation?: string
  variant?: 'default' | 'pullquote'
}

export default function QuoteBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as QuoteProps
  return (
    <blockquote className={`block block--quote quote quote--${p.variant ?? 'default'}`}>
      <div className="quote__body" dangerouslySetInnerHTML={{ __html: p.html ?? '' }} />
      {p.citation ? <cite className="quote__cite">{p.citation}</cite> : null}
    </blockquote>
  )
}
