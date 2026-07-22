import type { BlockComponentProps } from '../../types/content'

interface ParagraphProps {
  /** Inline rich-text HTML (bold/italic/links) from the editor. */
  html?: string
  align?: 'left' | 'center' | 'right'
  dropCap?: boolean
}

export default function ParagraphBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as ParagraphProps
  const className = [
    'block block--paragraph',
    p.align ? `has-text-align-${p.align}` : '',
    p.dropCap ? 'has-drop-cap' : '',
  ]
    .filter(Boolean)
    .join(' ')
  // Trusted HTML from our own pipeline; sanitize here if authors are untrusted.
  return <p className={className} dangerouslySetInnerHTML={{ __html: p.html ?? '' }} />
}
