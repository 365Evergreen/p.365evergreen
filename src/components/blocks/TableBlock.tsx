import type { BlockComponentProps } from '../../types/content'

interface TableProps {
  rows: string[][]
  header?: boolean
  caption?: string
}

export default function TableBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as TableProps
  const rows = p.rows ?? []
  const headRow = p.header ? rows[0] : null
  const bodyRows = p.header ? rows.slice(1) : rows
  return (
    <figure className="block block--table table">
      <table>
        {headRow ? (
          <thead>
            <tr>
              {headRow.map((cell, i) => (
                <th key={i} dangerouslySetInnerHTML={{ __html: cell }} />
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {bodyRows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} dangerouslySetInnerHTML={{ __html: cell }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {p.caption ? <figcaption>{p.caption}</figcaption> : null}
    </figure>
  )
}
