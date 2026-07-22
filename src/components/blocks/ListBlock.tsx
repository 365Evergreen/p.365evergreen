import { createElement } from 'react'
import type { BlockComponentProps } from '../../types/content'

interface ListProps {
  ordered?: boolean
  /** Each item is inline rich-text HTML. */
  items: string[]
}

export default function ListBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as ListProps
  const items = p.items ?? []
  return createElement(
    p.ordered ? 'ol' : 'ul',
    { className: 'block block--list' },
    items.map((html, i) => <li key={i} dangerouslySetInnerHTML={{ __html: html }} />),
  )
}
