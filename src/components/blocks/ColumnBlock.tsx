import type { BlockComponentProps } from '../../types/content'
import { BlockRenderer } from '../../content/blockRenderer'

interface ColumnProps {
  /** CSS flex-basis, e.g. "33.33%" or "200px". */
  width?: string
}

export default function ColumnBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as ColumnProps
  return (
    <div className="block block--column column" style={{ flexBasis: p.width }}>
      <BlockRenderer blocks={block.innerBlocks ?? []} />
    </div>
  )
}
