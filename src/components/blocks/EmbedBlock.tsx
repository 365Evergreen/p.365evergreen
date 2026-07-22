import type { BlockComponentProps } from '../../types/content'

interface EmbedProps {
  url: string
  provider?: string
  /** Provider oEmbed HTML, resolved at author time. */
  html?: string
  caption?: string
}

export default function EmbedBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as EmbedProps
  return (
    <figure className={`block block--embed embed${p.provider ? ` is-provider-${p.provider}` : ''}`}>
      {p.html ? (
        // Trusted provider markup resolved at author time.
        <div className="embed__frame" dangerouslySetInnerHTML={{ __html: p.html }} />
      ) : (
        <a href={p.url} target="_blank" rel="noopener noreferrer">
          {p.url}
        </a>
      )}
      {p.caption ? <figcaption>{p.caption}</figcaption> : null}
    </figure>
  )
}
