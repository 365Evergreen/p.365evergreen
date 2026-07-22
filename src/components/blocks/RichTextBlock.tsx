import type { BlockComponentProps } from '../../types/content'

interface RichTextProps {
  /** Trusted HTML from our own publish pipeline. */
  html?: string
  heading?: string
}

export default function RichTextBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as RichTextProps
  return (
    <section className="block block--rich-text rich-text">
      {p.heading ? <h2 className="rich-text__heading">{p.heading}</h2> : null}
      {/* Sanitize (e.g. DOMPurify) here if authors can inject untrusted HTML. */}
      {p.html ? <div className="rich-text__body" dangerouslySetInnerHTML={{ __html: p.html }} /> : null}
    </section>
  )
}
