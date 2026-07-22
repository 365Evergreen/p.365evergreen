import type {
  Author,
  FormDefinition,
  FormIndexEntry,
  FormSchema,
  FormsIndexDoc,
  ImageRef,
  PageBlock,
  PageContent,
  PageIndexEntry,
  PagesIndexDoc,
  Post,
  PostIndexEntry,
  PostsIndexDoc,
  SeoMeta,
  Status,
} from '../types/content'

const CONTENT_BASE_URL: string = (
  import.meta.env.VITE_CONTENT_BASE_URL || 'https://cdn.365evergreen.com/content'
).replace(/\/+$/, '')

const POSTS_INDEX_URL = `${CONTENT_BASE_URL}/posts/posts.json`
const PAGES_INDEX_URL = `${CONTENT_BASE_URL}/pages/index.json`
const NAVIGATION_URL = `${CONTENT_BASE_URL}/navigation/navigation.json`
const CATEGORIES_INDEX_URL = `${CONTENT_BASE_URL}/categories/categories.json`
const FORMS_INDEX_URL = `${CONTENT_BASE_URL}/forms/index.json`
const RESOURCES_INDEX_URL = `${CONTENT_BASE_URL}/resources/index.json`

let postsIndexPromise: Promise<PostsIndexDoc> | null = null
let pagesIndexPromise: Promise<PagesIndexDoc> | null = null
let categoriesIndexPromise: Promise<CategoriesDoc> | null = null
let formsIndexPromise: Promise<FormsIndexDoc> | null = null
let resourcesIndexPromise: Promise<ResourceItem[]> | null = null
const postDetailPromises = new Map<string, Promise<Post>>()
const pageDetailPromises = new Map<string, Promise<PageContent>>()
const formSchemaPromises = new Map<string, Promise<FormDefinition>>()

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function normalizePageId(value: string): string {
  return value.trim()
}

interface CategoryEntry {
  id: string
  title: string
  slug: string
  children?: CategoryEntry[]
}

interface CategoriesDoc {
  version: number
  generatedAt?: string
  categories: CategoryEntry[]
}

export interface ResourceItem {
  id: string
  name: string
  type: string
  slug: string
  publishedDate?: string
  description?: string
}

function normalizePathSlug(path: string | undefined): string {
  if (!path) {
    return ''
  }
  return path.replace(/^\/+|\/+$/g, '')
}

function normalizeStringField(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined
  }

  const normalized = value.trim()
  if (normalized.length === 0 || normalized.toLowerCase() === 'string') {
    return undefined
  }

  return normalized
}

function isStatus(value: string): value is Status {
  return value === 'draft' || value === 'scheduled' || value === 'published' || value === 'archived'
}

const DEFAULT_FETCH_TIMEOUT_MS = 10000

function createAbortController(timeoutMs: number) {
  const controller = new AbortController()
  const id = window.setTimeout(() => controller.abort(), timeoutMs)

  return {
    controller,
    clear: () => window.clearTimeout(id),
  }
}

async function fetchWithTimeout(input: RequestInfo, init: RequestInit = {}, timeoutMs = DEFAULT_FETCH_TIMEOUT_MS) {
  const { controller, clear } = createAbortController(timeoutMs)

  try {
    return await fetch(input, { ...init, signal: controller.signal })
  } finally {
    clear()
  }
}

function inferPageSlug(entry: Pick<PageIndexEntry, 'slug' | 'path' | 'title' | 'pageId'>): string {
  const slugSlug = normalizePathSlug(entry.slug)
  if (slugSlug) {
    return slugSlug
  }

  const pathSlug = normalizePathSlug(entry.path)
  if (pathSlug) {
    return pathSlug
  }

  if (entry.title) {
    return slugify(entry.title)
  }

  return slugify(entry.pageId)
}

function normalizePagesIndexDoc(payload: unknown): PagesIndexDoc {
  if (typeof payload !== 'object' || payload === null) {
    throw new Error('Invalid pages index document payload')
  }

  const raw = payload as Record<string, unknown>
  const rawPages = raw.pages

  if (Array.isArray(rawPages)) {
    const pages = rawPages
      .map((item): PageIndexEntry | null => {
        if (typeof item !== 'object' || item === null) {
          return null
        }

        const entry = item as Record<string, unknown>
        const rawId = entry.pageId
        if (typeof rawId !== 'string' || normalizePageId(rawId).length === 0) {
          return null
        }

        const pageId = normalizePageId(rawId)
        const status =
          typeof entry.status === 'string' && isStatus(entry.status) ? entry.status : 'draft'
        const rawPath = normalizeStringField(entry.path)
        const title = typeof entry.title === 'string' ? entry.title : undefined

        return {
          pageId: pageId,
          status,
          title,
          description: typeof entry.description === 'string' ? entry.description : undefined,
          path: rawPath ?? `/${inferPageSlug({ pageId: pageId, path: undefined, title })}`,
          publishDate: typeof entry.publishDate === 'string' ? entry.publishDate : undefined,
          updatedDate: typeof entry.updatedDate === 'string' ? entry.updatedDate : undefined,
          source: normalizeStringField(entry.source),
          blobPath: normalizeStringField(entry.blobPath),
          url: normalizeStringField(entry.url),
        }
      })
      .filter((entry): entry is PageIndexEntry => entry !== null)

    return {
      version: typeof raw.version === 'number' ? raw.version : 1,
      generatedAt: typeof raw.generatedAt === 'string' ? raw.generatedAt : undefined,
      pages,
    }
  }

  const rawPosts = raw.posts
  if (Array.isArray(rawPosts)) {
    const pages = rawPosts
      .map((item): PageIndexEntry | null => {
        if (typeof item !== 'object' || item === null) {
          return null
        }

        const entry = item as Record<string, unknown>
        const rawId = typeof entry.pageId === 'string'
          ? entry.pageId
          : typeof entry.id === 'string'
            ? entry.id
            : undefined
        const rawTitle = entry.title

        if (typeof rawId !== 'string' || normalizePageId(rawId).length === 0) {
          return null
        }

        const id = normalizePageId(rawId)
        const title = typeof rawTitle === 'string' ? rawTitle : undefined
        const rawSlug = normalizeStringField(entry.slug)
        const normalizedSlug = rawSlug ? normalizePathSlug(rawSlug) : undefined
        const rawSource = normalizeStringField(entry.source)
        const pathSlug = normalizedSlug ?? (title ? slugify(title) : slugify(id))

        return {
          pageId: id,
          status: 'published',
          title,
          slug: normalizedSlug,
          path: `/${pathSlug}`,
          updatedDate: typeof entry.modified === 'string' ? entry.modified : undefined,
          source: rawSource ?? `pages/${id}/page.json`,
        }
      })
      .filter((entry): entry is PageIndexEntry => entry !== null)

    return {
      version: typeof raw.schemaVersion === 'number' ? raw.schemaVersion : 1,
      generatedAt: typeof raw.generatedAt === 'string' ? raw.generatedAt : undefined,
      pages,
    }
  }

  throw new Error('Pages index document does not contain a valid pages or posts array')
}

function normalizePageContent(payload: unknown): PageContent {
  if (typeof payload !== 'object' || payload === null) {
    throw new Error('Invalid page content payload')
  }

  const raw = payload as Record<string, unknown>
  const metadata =
    typeof raw.metadata === 'object' && raw.metadata !== null
      ? (raw.metadata as Record<string, unknown>)
      : raw

  const rawPageId = typeof metadata.pageId === 'string'
    ? metadata.pageId
    : typeof metadata.id === 'string'
      ? metadata.id
      : undefined
  const pageId = rawPageId ? normalizePageId(rawPageId) : ''
  const title = typeof metadata.title === 'string' ? metadata.title : 'Untitled'
  const status =
    typeof metadata.status === 'string' && isStatus(metadata.status)
      ? metadata.status
      : 'published'
  const description = typeof metadata.description === 'string' ? metadata.description : undefined
  const path = typeof metadata.path === 'string' ? metadata.path : undefined
  const publishDate = typeof metadata.publishDate === 'string' ? metadata.publishDate : undefined
  const updatedDate = typeof metadata.updatedDate === 'string' ? metadata.updatedDate : undefined
  const keywords = Array.isArray(metadata.keywords)
    ? (metadata.keywords.filter((item): item is string => typeof item === 'string'))
    : undefined
  const featuredImage =
    typeof metadata.featuredImage === 'object' && metadata.featuredImage !== null
      ? (metadata.featuredImage as ImageRef)
      : undefined
  const seo =
    typeof metadata.seo === 'object' && metadata.seo !== null
      ? (metadata.seo as SeoMeta)
      : undefined
  const blocks = normalizePageBlocks(raw.blocks)

  return {
    pageId: pageId || slugify(title),
    title,
    description,
    path,
    status,
    publishDate,
    updatedDate,
    keywords,
    featuredImage,
    seo,
    blocks,
  }
}

function normalizePageBlocks(value: unknown, idPrefix = 'block'): PageBlock[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((item, index): PageBlock | null => {
      if (typeof item !== 'object' || item === null) {
        return null
      }

      const rawBlock = item as Record<string, unknown>
      const blockType = typeof rawBlock.type === 'string' ? rawBlock.type.trim() : ''
      if (!blockType) {
        return null
      }

      const blockId =
        typeof rawBlock.blockId === 'string' && rawBlock.blockId.trim().length > 0
          ? rawBlock.blockId
          : typeof rawBlock.id === 'string' && rawBlock.id.trim().length > 0
            ? rawBlock.id
            : `${idPrefix}-${index + 1}`

      const props = normalizeBlockProps(rawBlock)
      const rawInnerBlocks =
        Array.isArray(rawBlock.innerBlocks)
          ? rawBlock.innerBlocks
          : Array.isArray(rawBlock.blocks)
            ? rawBlock.blocks
            : undefined
      const innerBlocks = normalizePageBlocks(rawInnerBlocks, `${blockId}-child`)

      return {
        blockId,
        type: blockType,
        props,
        ...(innerBlocks.length > 0 ? { innerBlocks } : {}),
      }
    })
    .filter((block): block is PageBlock => block !== null)
}

function normalizeBlockProps(rawBlock: Record<string, unknown>): Record<string, unknown> {
  if (typeof rawBlock.props === 'object' && rawBlock.props !== null) {
    return rawBlock.props as Record<string, unknown>
  }

  if (typeof rawBlock.payload === 'object' && rawBlock.payload !== null) {
    return rawBlock.payload as Record<string, unknown>
  }

  const flatProps: Record<string, unknown> = {}
  const structuralKeys = new Set([
    'blockId',
    'id',
    'type',
    'props',
    'payload',
    'innerBlocks',
    'blocks',
  ])

  for (const [key, value] of Object.entries(rawBlock)) {
    if (structuralKeys.has(key)) {
      continue
    }
    flatProps[key] = value
  }

  if (typeof flatProps.text === 'string' && typeof flatProps.html !== 'string') {
    flatProps.html = flatProps.text
  }

  const imageUrl =
    typeof flatProps.url === 'string'
      ? flatProps.url
      : typeof flatProps.src === 'string'
        ? flatProps.src
        : undefined

  if (imageUrl && typeof flatProps.image !== 'object') {
    flatProps.image = {
      url: imageUrl,
      alt: typeof flatProps.alt === 'string' ? flatProps.alt : '',
    }
  }

  return flatProps
}

function normalizePostsIndexDoc(payload: unknown): PostsIndexDoc {
  if (typeof payload !== 'object' || payload === null) {
    throw new Error('Invalid posts index document payload')
  }

  const raw = payload as Record<string, unknown>
  const rawPosts = Array.isArray(raw.posts) ? raw.posts : Array.isArray(raw.items) ? raw.items : []

  const posts = rawPosts
    .map((item): PostIndexEntry | null => {
      if (typeof item !== 'object' || item === null) {
        return null
      }

      const entry = item as Record<string, unknown>
      const rawId = entry.id ?? entry.postId ?? entry.ID ?? entry.pageId
      if (typeof rawId === 'undefined' || rawId === null) {
        return null
      }

      const id = String(rawId)
      const title = typeof entry.title === 'string' ? entry.title : 'Untitled'
      const slug = typeof entry.slug === 'string' ? entry.slug : slugify(title) || id
      const status =
        typeof entry.status === 'string' && isStatus(entry.status) ? entry.status : 'published'

      return {
        ...entry,
        id,
        slug,
        status,
        title,
        description: typeof entry.description === 'string' ? entry.description : '',
        publishDate: String(entry.publishDate ?? entry.date ?? entry.publishedAt ?? ''),
        category: typeof entry.category === 'string' ? entry.category : '',
        tags: Array.isArray(entry.tags) ? entry.tags.map(String) : [],
      } as PostIndexEntry
    })
    .filter((entry): entry is PostIndexEntry => entry !== null)

  return {
    version: typeof raw.version === 'number' ? raw.version : 1,
    generatedAt: typeof raw.generatedAt === 'string' ? raw.generatedAt : undefined,
    posts,
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetchWithTimeout(url, {
    headers: { Accept: 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Failed to load ${url} (HTTP ${res.status})`)
  }

  try {
    return (await res.json()) as T
  } catch (error) {
    throw new Error(`Failed to parse JSON from ${url}: ${error instanceof Error ? error.message : String(error)}`, { cause: error })
  }
}

function toAbsoluteContentUrl(source: string): string {
  if (/^https?:\/\//i.test(source)) return source
  return `${CONTENT_BASE_URL}/${source.replace(/^\/+/, '')}`
}

function resolveEntrySource(
  entry: Pick<PageIndexEntry | PostIndexEntry, 'source' | 'blobPath' | 'url'>,
  fallbackPath: string,
): string {
  const raw = entry.source ?? entry.blobPath ?? entry.url ?? fallbackPath
  return toAbsoluteContentUrl(raw)
}

function normalizeCategoriesDoc(payload: unknown): CategoriesDoc {
  if (typeof payload !== 'object' || payload === null) {
    return { version: 1, categories: [] }
  }

  const raw = payload as Record<string, unknown>
  const rawCategories = Array.isArray(raw.categories) ? raw.categories : []

  const categories = rawCategories
    .map((item): CategoryEntry | null => {
      if (typeof item !== 'object' || item === null) {
        return null
      }

      const entry = item as Record<string, unknown>
      const id = typeof entry.id === 'string' ? entry.id : undefined
      const title = typeof entry.title === 'string' ? entry.title : undefined
      const slug = typeof entry.slug === 'string' ? entry.slug : undefined

      if (!id || !title || !slug) {
        return null
      }

      const rawChildren = Array.isArray(entry.children) ? entry.children : []
      const children = rawChildren
        .map((child): CategoryEntry | null => {
          if (typeof child !== 'object' || child === null) {
            return null
          }
          const childEntry = child as Record<string, unknown>
          const childId = typeof childEntry.id === 'string' ? childEntry.id : undefined
          const childTitle = typeof childEntry.title === 'string' ? childEntry.title : undefined
          const childSlug = typeof childEntry.slug === 'string' ? childEntry.slug : undefined
          if (!childId || !childTitle || !childSlug) {
            return null
          }
          return { id: childId, title: childTitle, slug: childSlug }
        })
        .filter((child): child is CategoryEntry => child !== null)

      return { id, title, slug, children: children.length ? children : undefined }
    })
    .filter((entry): entry is CategoryEntry => entry !== null)

  return {
    version: typeof raw.version === 'number' ? raw.version : 1,
    generatedAt: typeof raw.generatedAt === 'string' ? raw.generatedAt : undefined,
    categories,
  }
}

function normalizeResourceItems(payload: unknown): ResourceItem[] {
  if (typeof payload !== 'object' || payload === null) {
    throw new Error('Invalid resources index payload')
  }

  const raw = payload as Record<string, unknown>
  const rawResources = Array.isArray(raw.Resources)
    ? raw.Resources
    : Array.isArray(raw.resources)
      ? raw.resources
      : Array.isArray(raw.items)
        ? raw.items
        : []

  return rawResources
    .map((item): ResourceItem | null => {
      if (typeof item !== 'object' || item === null) {
        return null
      }

      const entry = item as Record<string, unknown>
      const id = normalizeStringField(entry.id) ?? normalizeStringField(entry.resourceId) ?? ''
      const name = normalizeStringField(entry.name) ?? normalizeStringField(entry.title) ?? ''
      const path = normalizeStringField(entry.path) ?? normalizeStringField(entry.url) ?? ''

      if (!id || !name || !path) {
        return null
      }

      const type = normalizeStringField(entry.type) ?? normalizeStringField(entry.category) ?? 'other'
      const publishedDate =
        normalizeStringField(entry.publishedDate) ??
        normalizeStringField(entry.publishDate) ??
        normalizeStringField(entry.datePublished) ??
        normalizeStringField(entry.date) ??
        normalizeStringField(entry.modified) ??
        normalizeStringField(entry.updatedDate) ??
        normalizeStringField(entry.createdAt)

      return {
        id,
        name,
        type,
        slug: toAbsoluteContentUrl(path),
        publishedDate,
        description: normalizeStringField(entry.description) ?? normalizeStringField(entry.summary),
      }
    })
    .filter((entry): entry is ResourceItem => entry !== null)
}

function normalizeFormsIndexDoc(payload: unknown): FormsIndexDoc {
  if (typeof payload !== 'object' || payload === null) {
    throw new Error('Invalid forms index document payload')
  }

  const raw = payload as Record<string, unknown>
  const rawForms = Array.isArray(raw.forms) ? raw.forms : []

  const forms = rawForms
    .map((item): FormIndexEntry | null => {
      if (typeof item !== 'object' || item === null) {
        return null
      }

      const entry = item as Record<string, unknown>
      const rawId = normalizeStringField(entry.id)
      const schemaUrl = normalizeStringField(entry.schemaUrl)
      if (!rawId || !schemaUrl) {
        return null
      }

      return {
        id: rawId,
        title: normalizeStringField(entry.title),
        pageId: normalizeStringField(entry.pageId),
        pageTitle: normalizeStringField(entry.pageTitle),
        pageUrl: normalizeStringField(entry.pageUrl),
        schemaUrl,
        submitUrl: normalizeStringField(entry.submitUrl),
      }
    })
    .filter((entry): entry is FormIndexEntry => entry !== null)

  return {
    version: typeof raw.version === 'number' ? raw.version : 1,
    generatedAt: typeof raw.generatedAt === 'string' ? raw.generatedAt : undefined,
    forms,
  }
}

function loadCategoriesIndex(): Promise<CategoriesDoc> {
  if (!categoriesIndexPromise) {
    categoriesIndexPromise = fetchJson<unknown>(CATEGORIES_INDEX_URL)
      .then((payload) => normalizeCategoriesDoc(payload))
  }
  return categoriesIndexPromise
}

export function loadPostsIndex(): Promise<PostsIndexDoc> {
  if (!postsIndexPromise) {
    postsIndexPromise = fetchJson<unknown>(POSTS_INDEX_URL).then((payload) =>
      normalizePostsIndexDoc(payload),
    )
  }
  return postsIndexPromise
}

export function loadPagesIndex(): Promise<PagesIndexDoc> {
  if (!pagesIndexPromise) {
    pagesIndexPromise = fetchJson<unknown>(PAGES_INDEX_URL)
      .then((payload) => normalizePagesIndexDoc(payload))
  }
  return pagesIndexPromise
}

export function loadResourcesIndex(): Promise<ResourceItem[]> {
  if (!resourcesIndexPromise) {
    resourcesIndexPromise = fetchJson<unknown>(RESOURCES_INDEX_URL).then((payload) =>
      normalizeResourceItems(payload),
    )
  }

  return resourcesIndexPromise
}

export function loadFormsIndex(): Promise<FormsIndexDoc> {
  if (!formsIndexPromise) {
    formsIndexPromise = fetchJson<unknown>(FORMS_INDEX_URL)
      .then((payload) => normalizeFormsIndexDoc(payload))
  }
  return formsIndexPromise
}

function mapIndexPostToPost(entry: PostIndexEntry): Post {
  const slug = entry.slug || entry.id || (entry.title ? slugify(entry.title) : '')
  return {
    slug: String(slug),
    title: entry.title,
    description: entry.description,
    status: entry.status,
    publishDate: entry.publishDate,
    updatedDate: entry.updatedDate,
    author: entry.author ?? { name: '365 Evergreen' },
    category: entry.category ?? '',
    tags: entry.tags ?? [],
    keywords: entry.keywords ?? [],
    featuredImage: entry.featuredImage,
    contentType: entry.contentType,
    bodyUrl: entry.bodyUrl,
    readingTime: entry.readingTime,
    seo: entry.seo,
    id: entry.id,
  }
}

function normalizePostContent(payload: unknown, entry: PostIndexEntry): Post {
  if (typeof payload !== 'object' || payload === null) {
    return mapIndexPostToPost(entry)
  }

  const raw = payload as Record<string, unknown>
  const metadata =
    typeof raw.metadata === 'object' && raw.metadata !== null
      ? (raw.metadata as Record<string, unknown>)
      : raw

  const rawSlug =
    typeof metadata.slug === 'string'
      ? metadata.slug
      : typeof metadata.path === 'string'
        ? metadata.path
        : undefined
  const normalizedSlug = rawSlug ? normalizePathSlug(rawSlug) : undefined

  const status =
    typeof metadata.status === 'string' && isStatus(metadata.status)
      ? metadata.status
      : entry.status

  const title = typeof metadata.title === 'string' ? metadata.title : entry.title
  const description =
    typeof metadata.description === 'string' ? metadata.description : entry.description
  const publishDate =
    typeof metadata.publishDate === 'string' ? metadata.publishDate : entry.publishDate
  const updatedDate =
    typeof metadata.updatedDate === 'string' ? metadata.updatedDate : entry.updatedDate
  const category = typeof metadata.category === 'string' ? metadata.category : entry.category
  const tags = Array.isArray(metadata.tags)
    ? metadata.tags.map(String)
    : Array.isArray(entry.tags)
      ? entry.tags
      : []
  const keywords = Array.isArray(metadata.keywords)
    ? metadata.keywords.map(String)
    : Array.isArray(entry.keywords)
      ? entry.keywords
      : []
  const readingTime =
    typeof metadata.readingTime === 'number' ? metadata.readingTime : entry.readingTime

  const featuredImage =
    typeof metadata.featuredImage === 'object' && metadata.featuredImage !== null
      ? (metadata.featuredImage as ImageRef)
      : entry.featuredImage
  const seo =
    typeof metadata.seo === 'object' && metadata.seo !== null
      ? (metadata.seo as SeoMeta)
      : entry.seo
  const author =
    typeof metadata.author === 'object' && metadata.author !== null
      ? (metadata.author as Author)
      : entry.author ?? { name: '365 Evergreen' }

  const contentType =
    typeof metadata.contentType === 'string' &&
    (metadata.contentType === 'blocks' ||
      metadata.contentType === 'html' ||
      metadata.contentType === 'markdown')
      ? metadata.contentType
      : entry.contentType

  const body = typeof raw.body === 'string' ? raw.body : undefined
  const bodyUrl =
    typeof metadata.bodyUrl === 'string'
      ? metadata.bodyUrl
      : typeof raw.bodyUrl === 'string'
        ? raw.bodyUrl
        : entry.bodyUrl
  const blocks = normalizePageBlocks(raw.blocks)

  return {
    id: entry.id,
    slug: normalizedSlug || entry.slug || entry.id || slugify(title) || '',
    title,
    description,
    status,
    publishDate,
    updatedDate,
    author,
    category,
    tags,
    keywords,
    featuredImage,
    contentType,
    body,
    bodyUrl,
    readingTime,
    seo,
    ...(blocks.length > 0 ? { blocks } : {}),
  }
}

/** Published posts, newest first by publishDate. */
export async function loadPublishedPosts(): Promise<Post[]> {
  const doc = await loadPostsIndex()
  return (doc.posts ?? [])
    .filter((p) => p.status === 'published')
    .map(mapIndexPostToPost)
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1))
}

export async function loadLatestPosts(): Promise<Post[]> {
  const doc = await loadPostsIndex()
  return (doc.posts ?? [])
    .map(mapIndexPostToPost)
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1))
}

export async function loadCategories(): Promise<CategoriesDoc> {
  return loadCategoriesIndex()
}

/** A single published post by slug, or undefined. */
export async function loadPostBySlug(slug: string): Promise<Post | undefined> {
  const index = await loadPostsIndex()
  const entry = index.posts.find(
    (post) => post.slug === slug && (post.status === 'draft' || post.status === 'published'),
  )
  if (!entry) return undefined
  if (!postDetailPromises.has(slug)) {
    const postId = entry.id || slug
    const source = toAbsoluteContentUrl(`posts/${postId}/post.json`)
    postDetailPromises.set(slug, fetchJson<unknown>(source).then((payload) => normalizePostContent(payload, entry)))
  }
  const post = await postDetailPromises.get(slug)!
  return post.status === 'published' ? post : undefined
}

/** Resolves a post body to a string, fetching the body blob if it lives out-of-line. */
function extractHtmlFromJsonBody(raw: unknown): string {
  if (raw === null || typeof raw !== 'object') return ''

  const payload = raw as Record<string, unknown>

  if (typeof payload.html === 'string' && payload.html.trim().length > 0) {
    return payload.html
  }

  if (typeof payload.body === 'string' && payload.body.trim().length > 0) {
    return payload.body
  }

  const content = payload.content
  if (typeof content === 'object' && content !== null) {
    const contentRecord = content as Record<string, unknown>
    if (typeof contentRecord.html === 'string' && contentRecord.html.trim().length > 0) {
      return contentRecord.html
    }
    if (typeof contentRecord.body === 'string' && contentRecord.body.trim().length > 0) {
      return contentRecord.body
    }
  }

  return ''
}

export async function loadPostBody(post: Post): Promise<string> {
  if (post.body != null) return post.body
  const bodyUrl = post.bodyUrl
  if (bodyUrl) {
    const absoluteBodyUrl = toAbsoluteContentUrl(bodyUrl)
    const res = await fetchWithTimeout(absoluteBodyUrl, { headers: { Accept: '*/*' } })
    if (!res.ok) throw new Error(`Failed to load body ${bodyUrl} (HTTP ${res.status})`)

    const text = await res.text()
    const contentType = res.headers.get('content-type')?.toLowerCase() ?? ''
    const shouldParseJson =
      contentType.includes('application/json') ||
      contentType.includes('+json') ||
      bodyUrl.trim().toLowerCase().endsWith('.json')

    if (shouldParseJson) {
      try {
        const parsed = JSON.parse(text)
        const extractedHtml = extractHtmlFromJsonBody(parsed)
        return extractedHtml
      } catch (error) {
        throw new Error(`Failed to parse body JSON ${bodyUrl}: ${error instanceof Error ? error.message : String(error)}`, { cause: error })
      }
    }

    return text
  }
  return ''
}
/** Published page content by id (e.g. "home", "about"), or undefined. */
export async function loadPage(id: string): Promise<PageContent | undefined> {
  const normalizedId = normalizePageId(id)
  const index = await loadPagesIndex()
  const entry = index.pages.find(
    (page) => normalizePageId(page.pageId) === normalizedId && (page.status === 'draft' || page.status === 'published'),
  )
  if (!entry) return undefined
  if (!pageDetailPromises.has(normalizedId)) {
    const source = resolveEntrySource(entry, `pages/${normalizedId}/page.json`)
    pageDetailPromises.set(
      normalizedId,
      fetchJson<unknown>(source).then((payload) => normalizePageContent(payload)),
    )
  }
  const page = await pageDetailPromises.get(normalizedId)!
  return page && page.status === 'published' ? page : undefined
}

/** Published page content by slug (e.g. "what-we-do"), or undefined. */
export async function loadPageBySlug(slug: string): Promise<PageContent | undefined> {
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, '').trim().toLowerCase()
  if (!normalizedSlug) {
    return undefined
  }

  const index = await loadPagesIndex()
  const entry = index.pages.find((page) => {
    if (page.status !== 'published') {
      return false
    }

    const pageSlug = inferPageSlug(page)
    return pageSlug.toLowerCase() === normalizedSlug
  })

  if (!entry) {
    return undefined
  }

  return loadPage(entry.pageId)
}

// --- Client-side search / filter (pure helpers over an already-loaded list) ---

export interface PostFilter {
  query?: string
  tag?: string
  category?: string
}

export interface NavigationItemDocument {
  schemaVersion?: number
  generatedAt?: string
  count?: number
  items?: Array<{
    id?: string
    label?: string
    slug?: string
    parent?: string
  }>
}

export async function loadNavigation(): Promise<NavigationItemDocument> {
  return fetchJson<NavigationItemDocument>(NAVIGATION_URL)
}

export function filterPosts(posts: readonly Post[], filter: PostFilter): Post[] {
  const q = filter.query?.trim().toLowerCase() ?? ''
  return posts.filter((post) => {
    if (filter.tag && !post.tags.includes(filter.tag)) return false
    if (filter.category && post.category !== filter.category) return false
    if (q) {
      const haystack = [post.title, post.description, ...post.tags, ...post.keywords]
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })
}

export function collectTags(posts: readonly Post[]): string[] {
  return Array.from(new Set(posts.flatMap((p) => p.tags))).sort((a, b) => a.localeCompare(b))
}

export function collectCategories(posts: readonly Post[]): string[] {
  return Array.from(new Set(posts.map((p) => p.category).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b),
  )
}

/** Forms **/

export async function loadFormById(id: string): Promise<FormDefinition> {
  const normalizedId = id.trim()
  if (!normalizedId) {
    throw new Error('Form id is required')
  }

  const index = await loadFormsIndex()
  const entry = index.forms.find((form) => form.id === normalizedId)
  if (!entry) {
    throw new Error(`Form ${normalizedId} was not found in forms index`)
  }

  if (!formSchemaPromises.has(normalizedId)) {
    const source = toAbsoluteContentUrl(entry.schemaUrl)
    const formPromise = fetchJson<unknown>(source).then((payload) => {
      if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
        throw new Error(`Form ${normalizedId} schema must be a JSON object`)
      }

      return {
        metadata: entry,
        schema: payload as FormSchema,
      }
    })
    formSchemaPromises.set(normalizedId, formPromise)
  }

  return formSchemaPromises.get(normalizedId)!
}

