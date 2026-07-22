import type { BlockComponentProps, ImageRef } from '../../types/content'
import { BlockRenderer } from '../../content/blockRenderer'

interface CoverProps {
  image?: ImageRef
  /** 0–100 overlay darkness. */
  dimRatio?: number
  overlayColor?: string
  minHeight?: number
  align?: 'left' | 'center' | 'right'
}

export default function CoverBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as CoverProps
  const children = block.innerBlocks ?? []
  return (
    <section
      className={`block block--cover cover has-text-align-${p.align ?? 'center'}`}
      style={{ minHeight: p.minHeight ? `${p.minHeight}px` : undefined }}
    >
      {p.image ? (
        <img className="cover__image" src={p.image.url} alt={p.image.alt} loading="lazy" />
      ) : null}
      <span
        className="cover__overlay"
        aria-hidden="true"
        style={{
          backgroundColor: p.overlayColor ?? '#000',
          opacity: (p.dimRatio ?? 50) / 100,
        }}
      />
      <div className="cover__content">
        <BlockRenderer blocks={children} />
      </div>
    </section>
  )
}
