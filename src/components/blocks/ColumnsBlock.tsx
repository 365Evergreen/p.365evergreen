import type { BlockComponentProps } from '../../types/content'
import { BlockRenderer } from '../../content/blockRenderer'

interface ColumnsProps {
  /** Stack below this viewport width (px). */
  stackBelow?: number
  verticalAlignment?: 'top' | 'center' | 'bottom'
}

export default function ColumnsBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as ColumnsProps
  // innerBlocks are `column` blocks.
  return (
    <div
      className={`block block--columns columns is-valign-${p.verticalAlignment ?? 'top'}`}
      data-stack-below={p.stackBelow}
    >
      <BlockRenderer blocks={block.innerBlocks ?? []} />
    </div>
  )
}
