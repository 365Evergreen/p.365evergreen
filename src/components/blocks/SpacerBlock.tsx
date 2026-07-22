import type { BlockComponentProps } from '../../types/content'

interface SpacerProps {
  /** Height in pixels. */
  height?: number
}

export default function SpacerBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as SpacerProps
  return (
    <div
      className="block block--spacer"
      aria-hidden="true"
      style={{ height: `${p.height ?? 32}px` }}
    />
  )
}
