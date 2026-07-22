import { createElement } from 'react'
import type { BlockComponentProps } from '../../types/content'

interface HeadingProps {
  /** 2–6 (h1 is the page title, owned by the page, not a block). */
  level?: 2 | 3 | 4 | 5 | 6
  html?: string
  align?: 'left' | 'center' | 'right'
}

export default function HeadingBlock({ block }: BlockComponentProps) {
  const p = (block.props ?? {}) as HeadingProps
  const level = p.level ?? 2
  const className = ['block block--heading', p.align ? `has-text-align-${p.align}` : '']
    .filter(Boolean)
    .join(' ')
  return createElement(`h${level}`, {
    className,
    dangerouslySetInnerHTML: { __html: p.html ?? '' },
  })
}
