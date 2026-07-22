import type { BlockComponentProps } from '../../types/content'

interface CodeProps {
  /** Raw code — rendered as text, never HTML. */
  code: string
  language?: string
}

export default function CodeBlock({ block }: BlockComponentProps) {
  const p = block.props as unknown as CodeProps
  return (
    <pre className={`block block--code${p.language ? ` language-${p.language}` : ''}`}>
      <code>{p.code ?? ''}</code>
    </pre>
  )
}
