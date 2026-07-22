import type { BlockComponentProps, ImageRef } from '../../types/content'
import { BlockRenderer } from '../../content/blockRenderer'

interface MediaTextProps {
  image: ImageRef
  mediaPosition?: 'left' | 'right'
  /** Optional media:content width split, e.g. "40%". */
  mediaWidth?: string
}

export default function MediaTextBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as MediaTextProps
  const position = p.mediaPosition ?? 'left'
  const children = block.innerBlocks ?? []
  return (
    <section className={`block block--media-text media-text media-text--${position}`}>
      <div className="media-text__media" style={{ flexBasis: p.mediaWidth }}>
        <img src={p.image.url} alt={p.image.alt} width={p.image.width} height={p.image.height} loading="lazy" />
      </div>
      <div className="media-text__content">
        <BlockRenderer blocks={children} />
      </div>
    </section>
  )
}
