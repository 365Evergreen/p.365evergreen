import type { BlockComponentProps, ImageRef } from '../../types/content'

interface TestimonialProps {
  quote: string
  authorName: string
  authorTitle?: string
  avatar?: ImageRef
  rating?: number
}

export default function TestimonialBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as TestimonialProps
  const stars = p.rating ? Math.round(p.rating) : 0
  return (
    <figure className="block block--testimonial testimonial">
      {p.rating ? (
        <div className="testimonial__rating" aria-label={`${p.rating} out of 5`}>
          {'★'.repeat(stars)}
          {'☆'.repeat(5 - stars)}
        </div>
      ) : null}
      <blockquote className="testimonial__quote" dangerouslySetInnerHTML={{ __html: p.quote }} />
      <figcaption className="testimonial__author">
        {p.avatar ? (
          <img className="testimonial__avatar" src={p.avatar.url} alt={p.avatar.alt} loading="lazy" />
        ) : null}
        <span className="testimonial__person">
          <span className="testimonial__name">{p.authorName}</span>
          {p.authorTitle ? <span className="testimonial__title">{p.authorTitle}</span> : null}
        </span>
      </figcaption>
    </figure>
  )
}
