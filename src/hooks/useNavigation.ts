import { useMemo, useState, useEffect } from 'react'
import { loadNavigation } from '../content/contentClient'
import type { NavigationItemDocument } from '../content/contentClient'

type RawNavigationItem = {
  id?: string
  label?: string
  slug?: string
  parent?: string
}

type RawNavigationDocument = NavigationItemDocument

export type NavigationItem = {
  label: string
  to: string
}

export type NavigationTreeItem = {
  id: string
  label: string
  slug: string
  to: string
  subItems: NavigationTreeItem[]
}

function toPath(slug: string): string {
  const normalizedSlug = slug.trim().replace(/^\/+/, '')
  if (normalizedSlug.length === 0 || normalizedSlug.toLowerCase() === 'home') {
    return '/'
  }

  return `/${normalizedSlug}`
}

function flattenRawNavigationItems(rawItems: unknown[]): RawNavigationItem[] {
  const flattened: RawNavigationItem[] = []

  for (const item of rawItems) {
    if (Array.isArray(item)) {
      flattened.push(...flattenRawNavigationItems(item))
      continue
    }

    if (typeof item !== 'object' || item === null) {
      continue
    }

    flattened.push(item as RawNavigationItem)
  }

  return flattened
}

function buildNavigationTree(rawItems: RawNavigationItem[]): NavigationTreeItem[] {
  const normalizedItems = flattenRawNavigationItems(rawItems)
    .map((item): Required<Pick<RawNavigationItem, 'id' | 'label' | 'slug'>> & { parent: string } | null => {
      if (typeof item.id !== 'string' || item.id.trim().length === 0) {
        return null
      }

      if (typeof item.label !== 'string' || item.label.trim().length === 0) {
        return null
      }

      if (typeof item.slug !== 'string' || item.slug.trim().length === 0) {
        return null
      }

      return {
        id: item.id.trim(),
        label: item.label.trim(),
        slug: item.slug.trim(),
        parent: typeof item.parent === 'string' ? item.parent.trim() : '',
      }
    })
    .filter((item): item is Required<Pick<RawNavigationItem, 'id' | 'label' | 'slug'>> & { parent: string } => item !== null)

  const dedupedItems = normalizedItems.filter((item, index, items) =>
    items.findIndex((candidate) => candidate.id === item.id || candidate.slug === item.slug) === index,
  )

  const nodeById = new Map<string, NavigationTreeItem>()
  const nodeByLabel = new Map<string, NavigationTreeItem>()
  const roots: NavigationTreeItem[] = []

  for (const item of dedupedItems) {
    if (item.slug.toLowerCase() === 'home') {
      continue
    }

    const node: NavigationTreeItem = {
      id: item.id,
      label: item.label,
      slug: item.slug,
      to: toPath(item.slug),
      subItems: [],
    }
    nodeById.set(node.id, node)
    nodeByLabel.set(node.label, node)
  }

  for (const item of dedupedItems) {
    const node = nodeById.get(item.id)
    if (!node) {
      continue
    }

    if (item.parent.length === 0) {
      roots.push(node)
      continue
    }

    const parentNode = nodeById.get(item.parent) ?? nodeByLabel.get(item.parent)
    if (!parentNode) {
      roots.push(node)
      continue
    }

    parentNode.subItems.push(node)
  }

  return roots
}

function getNavigationTreeFromDocument(document: RawNavigationDocument): NavigationTreeItem[] {
  if (!Array.isArray(document.items)) {
    return []
  }

  return buildNavigationTree(document.items)
}

export function useNavigation() {
  const [treeItems, setTreeItems] = useState<NavigationTreeItem[]>(() =>
    getNavigationTreeFromDocument({} as RawNavigationDocument),
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let canceled = false

    async function load() {
      try {
        const document = await loadNavigation()
        if (!canceled) {
          setTreeItems(getNavigationTreeFromDocument(document))
        }
      } catch {
        // Keep the local navigation fallback.
      } finally {
        if (!canceled) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      canceled = true
    }
  }, [])

  const items = useMemo<NavigationItem[]>(
    () =>
      treeItems.map((item) => ({
        label: item.label,
        to: item.to,
      })),
    [treeItems],
  )

  return { items, treeItems, loading }
}
