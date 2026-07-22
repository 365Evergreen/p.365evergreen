import { Link } from 'react-router-dom'
import type { BlockComponentProps, CtaLink, ImageRef } from '../../types/content'

interface HeroProps {
  eyebrow?: string
  heading: string
  subheading?: string
  image?: ImageRef
  primaryCta?: CtaLink
  secondaryCta?: CtaLink
}

export default function HeroBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as HeroProps
  return (
    <section className="block block--hero hero">
      <div className="hero__content">
        {p.eyebrow ? <p className="hero__eyebrow">{p.eyebrow}</p> : null}
        <h1 className="hero__heading">{p.heading}</h1>
        {p.subheading ? <p className="hero__subheading">{p.subheading}</p> : null}
        {(p.primaryCta || p.secondaryCta) && (
          <div className="hero__actions">
            {p.primaryCta ? (
              <Link className="button button--primary" to={p.primaryCta.href}>
                {p.primaryCta.label}
              </Link>
            ) : null}
            {p.secondaryCta ? (
              <Link className="button button--secondary" to={p.secondaryCta.href}>
                {p.secondaryCta.label}
              </Link>
            ) : null}
          </div>
        )}
      </div>
      {p.image ? (
        <img
          className="hero__image"
          src={p.image.url}
          alt={p.image.alt}
          width={p.image.width}
          height={p.image.height}
          loading="eager"
        />
      ) : null}
    </section>
  )
}
