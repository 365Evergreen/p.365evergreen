import type { BlockComponentProps } from '../../types/content'

export function getBlockProps<T>(block: BlockComponentProps['block']): T {
  return (block.props ?? {}) as unknown as T
}
