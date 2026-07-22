// Content model for the blob-backed read layer.
// Mirrors content/posts.json and content/pages.json. See _REFACTOR_NOTES.md §Schema.

// ---------------------------------------------------------------------------
// Shared building blocks
// ---------------------------------------------------------------------------

export type Status = 'draft' | 'scheduled' | 'published' | 'archived'
export type ContentType = 'blocks' | 'html' | 'markdown'

export interface ImageRef {
  url: string
  /** Accessible alt text. Empty string is allowed for purely decorative images. */
  alt: string
  width?: number
  height?: number
}

export interface Author {
  name: string
  role?: string
  avatar?: ImageRef
}

export interface CtaLink {
  label: string
  href: string
}

export interface OpenGraph {
  /** 'website' for pages, 'article' for posts. */
  type?: string
  title?: string
  description?: string
  image?: ImageRef
}

export interface TwitterCard {
  card?: 'summary' | 'summary_large_image'
  title?: string
  description?: string
  image?: ImageRef
}

/** SEO / social overrides. Anything omitted falls back to top-level fields. */
export interface SeoMeta {
  metaTitle?: string
  metaDescription?: string
  canonicalUrl?: string
  /** Emit <meta name="robots" content="noindex,nofollow"> when true. */
  noindex?: boolean
  openGraph?: OpenGraph
  twitter?: TwitterCard
}

// ---------------------------------------------------------------------------
// Blog posts (content/posts.json)
// ---------------------------------------------------------------------------

export interface Post {
  id: never
  bodyUrl?: string
  /** Identity. Immutable once published — renames are delete-old + insert-new. */
  slug: string
  title: string
  /** Card excerpt + default meta/OG description. */
  description: string
  status: Status
  /** ISO date or datetime. Drives sort order and the visible publish date. */
  publishDate: string
  updatedDate?: string

  author: Author
  category: string
  tags: string[]
  /** SEO keywords (distinct from taxonomy tags). */
  keywords: string[]
  featuredImage?: ImageRef

  contentType?: ContentType
  /** Canonical body — a block tree, rendered by BlockRenderer (contentType "blocks"). */
  blocks?: PageBlock[]
  /** Legacy/imported body for migrated posts (contentType "html"/"markdown"). */
  body?: string
  readingTime?: number

  seo?: SeoMeta
}

export interface PostsDoc {
  version: number
  generatedAt?: string
  posts: Post[]
}

// ---------------------------------------------------------------------------
// Marketing pages (content/pages.json)
// ---------------------------------------------------------------------------

export interface PageBlock {
  /** Identity within a page. Immutable once published. */
  blockId: string
  /** Maps to a component in the block registry (see BlockRenderer). */
  type: string
  props?: Record<string, unknown>
  /** Child blocks for container blocks (columns, group, buttons, cover, …). */
  innerBlocks?: PageBlock[]
}

export interface PageContent {
  pageId: string
  title: string
  description?: string
  /** Route path this page renders at, e.g. "/", "/platform". */
  path?: string
  status: Status
  publishDate?: string
  updatedDate?: string
  keywords?: string[]
  featuredImage?: ImageRef
  seo?: SeoMeta
  blocks: PageBlock[]
}

export interface PagesDoc {
  version: number
  generatedAt?: string
  /** Keyed by page id, e.g. "home", "platform", "about". */
  pages: Record<string, PageContent>
}

// ---------------------------------------------------------------------------
// Blob index documents (content/pages/index.json and content/posts/index.json)
// ---------------------------------------------------------------------------

export interface PageIndexEntry {
  pageId: string
  status: Status
  title?: string
  description?: string
  slug?: string
  path?: string
  publishDate?: string
  updatedDate?: string
  source?: string
  blobPath?: string
  url?: string
}

export interface PagesIndexDoc {
  version: number
  generatedAt?: string
  pages: PageIndexEntry[]
}

export type PostIndexEntry = Omit<Post, 'body' | 'blocks'> & {
  id?: string
  source?: string
  blobPath?: string
  url?: string
}

export interface PostsIndexDoc {
  version: number
  generatedAt?: string
  posts: PostIndexEntry[]
}

/** Props every block component receives. */

export interface BlockComponentProps {
  block: PageBlock
}

export type FormSchema = Record<string, unknown>

export interface FormIndexEntry {
  id: string
  title?: string
  pageId?: string
  pageTitle?: string
  pageUrl?: string
  schemaUrl: string
  submitUrl?: string
}

export interface FormsIndexDoc {
  version: number
  generatedAt?: string
  forms: FormIndexEntry[]
}

export interface FormDefinition {
  metadata: FormIndexEntry
  schema: FormSchema
}

// ---------------------------------------------------------------------------
// Tabs (content/tabs/index.json)
// ---------------------------------------------------------------------------

export interface TabIndexEntry {
  id: string
  title?: string
  pageId?: string
  pageTitle?: string
  pageUrl?: string
  submitUrl?: string
}

export interface TabsIndexDoc {
  version: number
  generatedAt?: string
  tabs: TabIndexEntry[]
  pageId?: string
}

export interface TabDefinition {
  id: string
  pageId?: string
  title?: string
}

export interface TabContent {
  id: string  
  title: string
  content: PageBlock[]
}
