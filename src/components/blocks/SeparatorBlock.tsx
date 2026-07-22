import type { BlockComponentProps } from '../../types/content'

interface SeparatorProps {
  style?: 'default' | 'wide' | 'dots'
}

export default function SeparatorBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as SeparatorProps
  return <hr className={`block block--separator is-style-${p.style ?? 'default'}`} />
}
