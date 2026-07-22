import type { BlockComponentProps, ImageRef } from '../../types/content'

interface GalleryProps {
  images: ImageRef[]
  columns?: number
  caption?: string
}

export default function GalleryBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as GalleryProps
  const images = p.images ?? []
  const columns = p.columns ?? 3
  return (
    <figure className="block block--gallery gallery">
      <ul
        className="gallery__grid"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {images.map((img, i) => (
          <li className="gallery__item" key={img.url + i}>
            <img src={img.url} alt={img.alt} width={img.width} height={img.height} loading="lazy" />
          </li>
        ))}
      </ul>
      {p.caption ? <figcaption className="gallery__caption">{p.caption}</figcaption> : null}
    </figure>
  )
}
