import type { BlockComponentProps } from '../../types/content'

interface AudioProps {
  src: string
  caption?: string
}

export default function AudioBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as AudioProps
  return (
    <figure className="block block--audio audio">
      /* eslint-disable-next-line jsx-a11y/media-has-caption */
      <audio className="audio__player" controls src={p.src} />
      {p.caption ? <figcaption>{p.caption}</figcaption> : null}
    </figure>
  )
}
