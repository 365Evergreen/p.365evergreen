import type { BlockComponentProps } from '../../types/content'
import { BlockRenderer } from '../../content/blockRenderer'

interface ButtonsProps {
  align?: 'left' | 'center' | 'right'
  orientation?: 'horizontal' | 'vertical'
}

export default function ButtonsBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as ButtonsProps
  return (
    <div
      className={`block block--buttons buttons is-${p.orientation ?? 'horizontal'} has-align-${p.align ?? 'left'}`}
    >
      <BlockRenderer blocks={block.innerBlocks ?? []} />
    </div>
  )
}
