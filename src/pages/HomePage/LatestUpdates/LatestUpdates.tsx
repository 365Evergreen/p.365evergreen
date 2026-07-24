import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import styles from './LatestUpdates.module.css'
import { useAsyncData } from '../../../lib/useAsyncData'
import { loadLatestPosts } from '../../../services/content/contentClient'
import { formatDate } from '../../../lib/format'

export default function LatestPosts() {
  const { data: posts, loading, error } = useAsyncData(loadLatestPosts, [])

  const items = useMemo(() => {
    if (!posts) return []
    const top = posts
      .filter((p) => p.status === 'published')
      .slice(0, 6)
      .map((p) => {
        const categorySlug = p.category ? p.category.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-') : ''
        const linkTo = p.category ? `/blog/${encodeURIComponent(categorySlug)}/${p.slug}` : `/blog/${p.slug}`
        const meta = p.publishDate ? formatDate(p.publishDate) : undefined
        return {
          pageId: p.id,
          category: p.category,
          featuredImage: p.featuredImage,
          title: p.title,
          excerpt: p.description,
          meta,
          linkTo,
        }
      })
    return top
  }, [posts])

  if (loading) return <p>Loading posts…</p>
  if (error) return <p className="blog-status blog-status--error" role="alert">Couldn’t load posts.</p>

  function resolveFeaturedImageUrl(item: { pageId?: string; featuredImage?: { url: string } | undefined } ) {
    const CONTENT_BASE_URL = (import.meta.env.VITE_CONTENT_BASE_URL || 'https://cdn.365evergreen.com/content').replace(/\/+$/, '')
    const metadataImage = item.featuredImage?.url
    if (metadataImage && /^https?:\/\//i.test(metadataImage)) return metadataImage
    if (item.pageId) return `${CONTENT_BASE_URL}/posts/${item.pageId}/featuredImage.webp`
    if (metadataImage) {
      return metadataImage.startsWith('/') ? `${CONTENT_BASE_URL}${metadataImage}` : `${CONTENT_BASE_URL}/${metadataImage.replace(/^\/+/, '')}`
    }
    return null
  }

  return (
    <section className={styles['landing-latest-posts']} aria-labelledby="latest-posts-heading">
      <header className={styles['landing-latest-posts__header']}>
        <h2 id="latest-posts-heading">Latest updates</h2>
        </header>

      <ul className={styles['posts-grid']}>
        {items.map((item) => {
          const imageUrl = resolveFeaturedImageUrl(item as never)
          return (
            <li key={item.linkTo} className={styles['post-grid-item']}>
              <Link to={item.linkTo} className={styles['post-card']}>
                {imageUrl ? <img src={imageUrl} alt={item.title} className={styles['post-card__image']} loading="lazy" /> : null}
                <h3 className={styles['post-card__title']}>{item.title}</h3>
                {item.excerpt ? <p className={styles['post-card__excerpt']}>{item.excerpt}</p> : null}
                {item.meta ? <p className={styles['post-card__meta']}>{item.meta}</p> : null}
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export { LatestPosts as LatestPostsComponent }
