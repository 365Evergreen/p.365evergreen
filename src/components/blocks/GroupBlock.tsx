import { createElement } from 'react'
import type { BlockComponentProps } from '../../types/content'
import { BlockRenderer } from '../../content/blockRenderer'

interface GroupProps {
  /** Semantic wrapper tag. */
  tag?: 'div' | 'section' | 'article' | 'aside'
  background?: string
  layout?: 'flow' | 'row' | 'stack'
}

export default function GroupBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as GroupProps
  return createElement(
    p.tag ?? 'div',
    {
      className: `block block--group group is-layout-${p.layout ?? 'flow'}`,
      style: p.background ? { backgroundColor: p.background } : undefined,
    },
    <BlockRenderer blocks={block.innerBlocks ?? []} />,
  )
}
