import type { BlockComponentProps } from '../../types/content'

interface VideoProps {
  src: string
  poster?: string
  caption?: string
  controls?: boolean
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
}

export default function VideoBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as VideoProps
  return (
    <figure className="block block--video video">
      <video
        className="video__player"
        src={p.src}
        poster={p.poster}
        controls={p.controls ?? true}
        autoPlay={p.autoplay}
        loop={p.loop}
        muted={p.muted ?? p.autoplay}
        playsInline
      />
      {p.caption ? <figcaption className="video__caption">{p.caption}</figcaption> : null}
    </figure>
  )
}
