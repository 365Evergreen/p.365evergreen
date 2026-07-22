import type { BlockComponentProps, ImageRef } from '../../types/content'

interface ImageBlockProps {
  image: ImageRef
  caption?: string
}

export default function ImageBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as ImageBlockProps
  return (
    <figure className="block block--image image-block">
      <img
        className="image-block__img"
        src={p.image.url}
        alt={p.image.alt}
        width={p.image.width}
        height={p.image.height}
        loading="lazy"
      />
      {p.caption ? <figcaption className="image-block__caption">{p.caption}</figcaption> : null}
    </figure>
  )
}
