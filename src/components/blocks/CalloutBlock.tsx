import type { BlockComponentProps } from '../../types/content'

interface CalloutProps {
  tone?: 'info' | 'success' | 'warning' | 'danger'
  title?: string
  html?: string
}

export default function CalloutBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as CalloutProps
  return (
    <aside className={`block block--callout callout callout--${p.tone ?? 'info'}`} role="note">
      {p.title ? <p className="callout__title">{p.title}</p> : null}
      <div className="callout__body" dangerouslySetInnerHTML={{ __html: p.html ?? '' }} />
    </aside>
  )
}
