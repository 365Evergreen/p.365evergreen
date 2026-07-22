import type { BlockComponentProps } from '../../types/content'

interface FileProps {
  url: string
  filename: string
  sizeBytes?: number
}

function formatBytes(n?: number): string {
  if (!n) return ''
  const units = ['B', 'KB', 'MB', 'GB']
  let v = n
  let u = 0
  while (v >= 1024 && u < units.length - 1) {
    v /= 1024
    u += 1
  }
  return `${v.toFixed(v < 10 && u > 0 ? 1 : 0)} ${units[u]}`
}

export default function FileBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as FileProps
  return (
    <div className="block block--file file">
      <a className="file__link" href={p.url} download>
        {p.filename}
      </a>
      {p.sizeBytes ? <span className="file__size">{formatBytes(p.sizeBytes)}</span> : null}
    </div>
  )
}
