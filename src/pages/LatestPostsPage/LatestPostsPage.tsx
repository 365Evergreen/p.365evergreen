import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAsyncData } from '../../lib/useAsyncData'
import { formatDate } from '../../lib/format'
import styles from './LatestPostsPage.module.css'
import SeoHead from '../../components/SeoHead'
import {
  loadCategories,
  loadLatestPosts,
} from '../../services/content/contentClient'

type ViewMode = 'grid' | 'list'
const CONTENT_BASE_URL = (
  import.meta.env.VITE_CONTENT_BASE_URL || 'https://cdn.365evergreen.com/content'
).replace(/\/+$/, '')

function slugifyValue(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function resolveFeaturedImageUrl(post: { id?: string; featuredImage?: { url: string } }): string | null {
  const postId = typeof post.id === 'string' && post.id.trim().length > 0 ? post.id : ''
  const metadataImage = post.featuredImage?.url

  if (metadataImage && /^https?:\/\//i.test(metadataImage)) {
    return metadataImage
  }

  if (postId) {
    return `${CONTENT_BASE_URL}/posts/${postId}/featuredImage.webp`
  }

  if (metadataImage) {
    return metadataImage.startsWith('/')
      ? `${CONTENT_BASE_URL}${metadataImage}`
      : `${CONTENT_BASE_URL}/${metadataImage.replace(/^\/+/, '')}`
  }

  return null
}

export default function LatestPostsPage() {
  const { category: categoryParam = '' } = useParams<{ category?: string }>()
  const normalizedCategoryParam = slugifyValue(categoryParam)

  const { data: posts, loading, error } = useAsyncData(loadLatestPosts, [])
  const { data: categoryData } = useAsyncData(loadCategories, [])
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selectedCategorySlugs, setSelectedCategorySlugs] = useState<string[]>(() =>
    normalizedCategoryParam ? [normalizedCategoryParam] : [],
  )
  const tags = useMemo(() => {
    if (!posts) return []
    const allTags = posts.flatMap((post) => post.tags)
    return Array.from(new Set(allTags)).sort((a, b) => a.localeCompare(b))
  }, [posts])
  const enabledCategorySlugs = useMemo(() => {
    if (!posts) return new Set<string>()
    return new Set(
      posts
        .filter((post) => post.status === 'published')
        .map((post) => slugifyValue(post.category ?? ''))
        .filter(Boolean),
    )
  }, [posts])

  const categoryGroups = useMemo(() => {
    if (!posts || !categoryData) return []
    return categoryData.categories
      .map((group) => {
        const parent = {
          id: group.id,
          title: group.title,
          slug: slugifyValue(group.slug),
        }
        const children = (group.children ?? [])
          .map((child) => ({
            id: child.id,
            title: child.title,
            slug: slugifyValue(child.slug),
          }))
          .filter((child) => enabledCategorySlugs.has(child.slug))
        const showParent = enabledCategorySlugs.has(parent.slug)
        if (!showParent && children.length === 0) return null
        return {
          ...parent,
          children,
        }
      })
      .filter((group): group is { id: string; title: string; slug: string; children: { id: string; title: string; slug: string }[] } => group !== null)
      .sort((a, b) => a.title.localeCompare(b.title))
  }, [posts, categoryData, enabledCategorySlugs])

  const visible = useMemo(() => {
    if (!posts) return []
    return posts.filter((post) => {
      if (tag && !post.tags.includes(tag)) return false

      const postCategorySlug = slugifyValue(post.category ?? '')
      if (selectedCategorySlugs.length > 0 && !selectedCategorySlugs.includes(postCategorySlug)) {
        return false
      }

      if (query) {
        const haystack = [post.title, post.description, post.category, ...post.tags]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(query.toLowerCase())) return false
      }

      return true
    })
  }, [posts, query, tag, selectedCategorySlugs])

  const hasFilters = selectedCategorySlugs.length > 0 || tag.length > 0 || query.trim().length > 0

  const toggleCategory = (slug: string) => {
    setSelectedCategorySlugs((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    )
  }

  if (loading) return <p className="blog-status">Loading posts…</p>
  if (error) {
    return (
      <p className="blog-status blog-status--error" role="alert">
        Couldn’t load posts. Please try again later.
      </p>
    )
  }

  return (
    <section className="blog-list">
      <SeoHead
        title="Blog · 365 Evergreen"
        description="Practical Microsoft 365 guidance on security, identity, and modern work from the 365 Evergreen team."
      />

      <header className="blog-list__header">
        <h1>Latest updates</h1>
      </header>

      <div className={styles.layout}>
        <div className={styles.main}>
          <form
            className={`blog-filters ${styles.searchRow}`}
            onSubmit={(event) => event.preventDefault()}
            aria-label="Blog filters"
          >
            <label htmlFor="blog-search" className="sr-only">
              Search posts
            </label>
            <input
              id="blog-search"
              type="search"
              placeholder="Search posts"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <label htmlFor="blog-tag" className="sr-only">
              Filter by tag
            </label>
            <select id="blog-tag" value={tag} onChange={(e) => setTag(e.target.value)}>
              <option value="">All tags</option>
              {tags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </form>

          <div className={styles.toolbar}>
            <p className="blog-list__count" role="status" aria-live="polite">
              {visible.length} post{visible.length === 1 ? '' : 's'}
            </p>
            <div className={styles.viewToggle} role="group" aria-label="Choose archive layout">
              <button
                type="button"
                className={`${styles.viewToggleButton} ${viewMode === 'grid' ? styles.viewToggleButtonActive : ''}`}
                onClick={() => setViewMode('grid')}
                aria-pressed={viewMode === 'grid'}
              >
                Grid
              </button>
              <button
                type="button"
                className={`${styles.viewToggleButton} ${viewMode === 'list' ? styles.viewToggleButtonActive : ''}`}
                onClick={() => setViewMode('list')}
                aria-pressed={viewMode === 'list'}
              >
                List
              </button>
            </div>
          </div>

          {visible.length === 0 ? (
            <p className="blog-status">No posts match your filters.</p>
          ) : (
            <ul className={`${styles.results} ${viewMode === 'grid' ? styles.grid : styles.listView}`}>
              {visible.map((post) => {
                const categorySlug = post.category ? slugifyValue(post.category) : 'uncategorized'
                const postUrl = post.category
                  ? `/blog/${encodeURIComponent(categorySlug)}/${post.slug}`
                  : `/blog/${post.slug}`
                const featuredImageUrl = resolveFeaturedImageUrl(
                  post as { id?: string; featuredImage?: { url: string } },
                )
                return (
                  <li key={`${categorySlug}-${post.slug}`} className={styles.card}>
                    <article className={styles.cardArticle}>
                      {featuredImageUrl ? (
                        <Link to={postUrl} className={styles.imageLink}>
                          <img
                            className={styles.postImage}
                            src={featuredImageUrl}
                            alt={post.featuredImage?.alt || `${post.title} featured image`}
                            loading="lazy"
                          />
                        </Link>
                      ) : null}

                      <h2 className={styles.postTitle}>
                        <Link to={postUrl} className={styles.postTitleLink}>
                          {post.title}
                        </Link>
                      </h2>

                      <p className={styles.blogCardMeta}>
                        <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time>
                        {post.readingTime ? <span> · {post.readingTime} min read</span> : null}
                      </p>
                      <p className={styles.postExcerpt}>{post.description}</p>
                      {post.tags.length > 0 ? (
                        <ul className={styles.blogCardTags} aria-label="Tags">
                          {post.tags.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      ) : null}
                      <div className={styles.cardFooter}>
                        {post.category ? (
                          <p className={styles.categoryPill}>
                            <button
                              type="button"
                              onClick={() => toggleCategory(categorySlug)}
                              className={styles.categoryButton}
                            >
                              {post.category}
                            </button>
                          </p>
                        ) : (
                          <span />
                        )}
                        <Link to={postUrl} className={styles.readMore}>
                          Read more
                        </Link>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <aside className={styles.sidebar} aria-label="Category filters">
          <button
            type="button"
            className={styles.clearFilters}
            onClick={() => {
              setSelectedCategorySlugs([])
              setQuery('')
              setTag('')
            }}
            disabled={!hasFilters}
          >
            <span className={styles.clearIcon} aria-hidden="true">
              ⨯
            </span>
            Clear filters
          </button>

          {categoryGroups.map((group) => (
            <section key={group.id} className={styles.categoryGroup}>
              <h2 className={styles.categoryGroupTitle}>{group.title}</h2>
              <ul className={styles.categoryList}>
                <li>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedCategorySlugs.includes(group.slug)}
                      onChange={() => toggleCategory(group.slug)}
                    />
                    <span>{group.title}</span>
                  </label>
                </li>
                {group.children.map((child) => (
                  <li key={child.id}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={selectedCategorySlugs.includes(child.slug)}
                        onChange={() => toggleCategory(child.slug)}
                      />
                      <span>{child.title}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </aside>
      </div>
    </section>
  )
}
