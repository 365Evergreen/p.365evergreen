import { Link } from 'react-router-dom'
import type { BlockComponentProps, CtaLink } from '../../types/content'

interface CtaProps {
  heading: string
  body?: string
  cta: CtaLink
  variant?: 'default' | 'inverse'
}

export default function CtaBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as CtaProps
  const variant = p.variant ?? 'default'
  return (
    <section className={`block block--cta cta cta--${variant}`}>
      <div className="cta__content">
        <h2 className="cta__heading">{p.heading}</h2>
        {p.body ? <p className="cta__body">{p.body}</p> : null}
      </div>
      <Link className="button button--primary" to={p.cta.href}>
        {p.cta.label}
      </Link>
    </section>
  )
}
