import { Link } from 'react-router-dom'
import type { BlockComponentProps } from '../../types/content'

interface ButtonProps {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'outline'
  /** External links open in a new tab. */
  external?: boolean
}

export default function ButtonBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as ButtonProps
  const className = `block block--button button button--${p.variant ?? 'primary'}`
  const isExternal = p.external ?? /^https?:\/\//.test(p.href)

  if (isExternal) {
    return (
      <a className={className} href={p.href} target="_blank" rel="noopener noreferrer">
        {p.label}
      </a>
    )
  }
  return (
    <Link className={className} to={p.href}>
      {p.label}
    </Link>
  )
}
