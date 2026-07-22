import type { BlockComponentProps } from '../../types/content'

interface IconProps {
  /** Icon key from the icon registry (icon-registry.json). */
  name: string
  size?: number
  color?: string
  /** Accessible label; omit for purely decorative icons. */
  label?: string
}

export default function IconBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as IconProps
  return (
    <span
      className={`block block--icon icon icon--${p.name}`}
      style={{ fontSize: p.size ? `${p.size}px` : undefined, color: p.color }}
      role={p.label ? 'img' : undefined}
      aria-label={p.label}
      aria-hidden={p.label ? undefined : true}
    />
  )
}
