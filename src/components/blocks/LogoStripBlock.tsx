import type { BlockComponentProps, ImageRef } from '../../types/content'

interface LogoItem {
  image: ImageRef
  href?: string
}
interface LogoStripProps {
  heading?: string
  logos: LogoItem[]
}

export default function LogoStripBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as LogoStripProps
  return (
    <section className="block block--logo-strip logo-strip">
      {p.heading ? <p className="logo-strip__heading">{p.heading}</p> : null}
      <ul className="logo-strip__list">
        {(p.logos ?? []).map((logo, i) => (
          <li className="logo-strip__item" key={i}>
            {logo.href ? (
              <a href={logo.href} target="_blank" rel="noopener noreferrer">
                <img src={logo.image.url} alt={logo.image.alt} loading="lazy" />
              </a>
            ) : (
              <img src={logo.image.url} alt={logo.image.alt} loading="lazy" />
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
