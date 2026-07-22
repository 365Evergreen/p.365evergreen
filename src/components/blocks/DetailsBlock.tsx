import type { BlockComponentProps } from '../../types/content'

interface DetailsProps {
  summary: string
  html?: string
  open?: boolean
}

export default function DetailsBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as DetailsProps
  return (
    <details className="block block--details" open={p.open}>
      <summary>{p.summary}</summary>
      <div dangerouslySetInnerHTML={{ __html: p.html ?? '' }} />
    </details>
  )
}
