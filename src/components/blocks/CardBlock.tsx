import { Link } from 'react-router-dom'
import type { BlockComponentProps, CtaLink, ImageRef } from '../../types/content'

interface CardProps {
  image?: ImageRef
  title: string
  html?: string
  /** If set, the whole card links here. */
  href?: string
  /** Optional explicit CTA (used when the card isn't a single link). */
  cta?: CtaLink
}

export default function CardBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as CardProps
  const body = (
    <>
      {p.image ? (
        <img className="card__image" src={p.image.url} alt={p.image.alt} loading="lazy" />
      ) : null}
      <h3 className="card__title">{p.title}</h3>
      {p.html ? <div className="card__body" dangerouslySetInnerHTML={{ __html: p.html }} /> : null}
      {p.cta ? (
        <span className="card__cta">{p.cta.label}</span>
      ) : null}
    </>
  )

  if (p.href) {
    return (
      <Link to={p.href} className="block block--card card card--link">
        {body}
      </Link>
    )
  }
  return <article className="block block--card card">{body}</article>
}
