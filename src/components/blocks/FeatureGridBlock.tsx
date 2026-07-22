import type { BlockComponentProps, ImageRef } from '../../types/content'

interface FeatureItem {
  title: string
  body: string
  icon?: ImageRef
}

interface FeatureGridProps {
  heading?: string
  items: FeatureItem[]
}

export default function FeatureGridBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as FeatureGridProps
  const items = p.items ?? []
  return (
    <section className="block block--feature-grid feature-grid">
      {p.heading ? <h2 className="feature-grid__heading">{p.heading}</h2> : null}
      <ul className="feature-grid__items">
        {items.map((item) => (
          <li className="feature-card" key={item.title}>
            {item.icon ? (
              <img className="feature-card__icon" src={item.icon.url} alt={item.icon.alt} loading="lazy" />
            ) : null}
            <h3 className="feature-card__title">{item.title}</h3>
            <p className="feature-card__body">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
