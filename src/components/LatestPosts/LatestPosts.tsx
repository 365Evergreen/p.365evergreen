import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAsyncData } from '../../lib/useAsyncData'
import { loadCategories } from '../../services/content/contentClient'
import styles from './LatestPosts.module.css'
import type { LatestPostsProps } from './LatestPosts.types'

function slugifyValue(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function LatestPosts({
  heading,
  posts,
  viewAllLabel,
  viewAllLink,
}: LatestPostsProps) {
  const { data: categoryData } = useAsyncData(loadCategories, [])
  const [query, setQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const groupedCategories = useMemo(() => categoryData?.categories ?? [], [categoryData])

  const searchablePosts = useMemo(
    () =>
      posts.filter((post) => {
        if (selectedCategories.length > 0) {
          const categorySlug = slugifyValue(post.category ?? '')
          if (!selectedCategories.includes(categorySlug)) return false
        }

        if (query.trim()) {
          const haystack = [post.title, post.excerpt ?? '', post.meta ?? '', post.category ?? '']
            .join(' ')
            .toLowerCase()
          if (!haystack.includes(query.trim().toLowerCase())) return false
        }

        return true
      }),
    [posts, query, selectedCategories],
  )

  const toggleCategory = (slug: string) => {
    setSelectedCategories((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    )
  }

  const hasActiveFilters = selectedCategories.length > 0 || query.trim().length > 0

  return (
    <section className={styles.section} aria-labelledby="latest-posts-heading">
      <header className={styles.header}>
        <div>
          <h2 id="latest-posts-heading" className={styles.title}>
            {heading}
          </h2>
          <p className={styles.intro}>
            Recent thinking on clarity, structure, and practical Microsoft 365 outcomes.
          </p>
        </div>
        {viewAllLabel && viewAllLink ? (
          <Link className={styles.viewAll} to={viewAllLink}>
            {viewAllLabel}
          </Link>
        ) : null}
      </header>

      <div className={styles.layout}>
        <div>
          <label htmlFor="latest-posts-search" className={styles.searchLabel}>
            Search posts
          </label>
          <input
            id="latest-posts-search"
            className={styles.searchInput}
            type="search"
            placeholder="Search latest posts"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <aside className={styles.filters} aria-label="Post category filters">
          <button
            type="button"
            className={styles.clearFilters}
            onClick={() => {
              setSelectedCategories([])
              setQuery('')
            }}
            disabled={!hasActiveFilters}
          >
            <span className={styles.clearFiltersIcon} aria-hidden="true">
              ⨯
            </span>
            Clear filters
          </button>

          {groupedCategories.map((group) => (
            <div key={group.id} className={styles.filterGroup}>
              <p className={styles.filterGroupTitle}>{group.title}</p>
              <ul className={styles.filterList}>
                <li>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(slugifyValue(group.slug))}
                      onChange={() => toggleCategory(slugifyValue(group.slug))}
                    />
                    <span>{group.title}</span>
                  </label>
                </li>
                {(group.children ?? []).map((child) => {
                  const childSlug = slugifyValue(child.slug)
                  return (
                    <li key={child.id}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(childSlug)}
                          onChange={() => toggleCategory(childSlug)}
                        />
                        <span>{child.title}</span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </aside>

        <ul className={styles.grid}>
          {searchablePosts.map((post) => (
            <li key={`${post.linkTo}-${post.title}`}>
              <Link className={styles.cardLink} to={post.linkTo}>
                <article className={styles.card}>
                  {post.meta ? <p className={styles.meta}>{post.meta}</p> : null}
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  {post.excerpt ? <p className={styles.excerpt}>{post.excerpt}</p> : null}
                  {post.category ? <p className={styles.category}>{post.category}</p> : null}
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
