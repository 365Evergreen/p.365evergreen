import { useParams, Link } from 'react-router-dom'
import { useAsyncData } from '../../lib/useAsyncData'
import { loadPostBySlug, loadPostBody } from '../../services/content/contentClient'
import { formatDate } from '../../lib/format'
import SeoHead from '../../components/SeoHead'
import { BlockRenderer } from '../../components/Renderers/BlockRenderer'
import RelatedPostsGrid from './RelatedPostsGrid'
import styles from './BlogPostPage.module.css'


function BlogPostPage() {
  const { slug = '' } = useParams<{ category?: string; slug: string }>()

  const { data: post, loading: postLoading, error: postError } = useAsyncData(() => loadPostBySlug(slug), [
    slug,
  ])

  const shouldLoadBody = Boolean(post && (!post.blocks || post.blocks.length === 0))
  const { data: bodyHtml, loading: bodyLoading, error: bodyError } = useAsyncData(
    () => (post && shouldLoadBody ? loadPostBody(post) : Promise.resolve('')),
    [post, shouldLoadBody],
  )

  const loading = postLoading || (!!post && bodyLoading)
  const error = postError || bodyError

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.inner}>
          <p>Loading article…</p>
        </div>
      </div>
    )
  }

  if (error) {
    const message = error instanceof Error ? error.message : 'Please try again later.'
    return (
      <div className={styles.page}>
        <div className={styles.inner}>
          <Link to="/blog" className={styles.back}>
            ← Back to blog
          </Link>
          <h1 className={styles.heading}>Unable to load article</h1>
          <p className={styles.notFound} role="alert">
            {message}
          </p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.heading}>Article not found</h1>
          <p className={styles.notFound}>
            The article you are looking for does not exist.{' '}
            <Link to="/blog" className={styles.backLink}>
              Back to blog
            </Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <SeoHead
        title={post.seo?.metaTitle ?? `${post.title} · 365 Evergreen`}
        description={post.seo?.metaDescription ?? post.description}
        canonicalUrl={post.seo?.canonicalUrl}
        keywords={post.keywords}
        image={post.seo?.openGraph?.image ?? post.featuredImage}
        noindex={post.seo?.noindex}
        ogType={post.seo?.openGraph?.type ?? 'article'}
      />
      <div className={styles.inner}>
        <Link to="/blog" className={styles.back}>
          ← Back to blog
        </Link>
        <div className={styles.meta}>
          {post.author?.name ? <span>{post.author.name}</span> : null}
          <time className={styles.date} dateTime={post.publishDate}>
            {formatDate(post.publishDate)}
          </time>
          {post.readingTime ? <span>{post.readingTime} min read</span> : null}
        </div>
        <h1 className={styles.heading}>{post.title}</h1>
        {post.featuredImage ? (
          <img
            className={styles.featuredImage}
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            width={post.featuredImage.width}
            height={post.featuredImage.height}
          />
        ) : null}
        {post.tags && post.tags.length > 0 ? (
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        {post.blocks && post.blocks.length > 0 ? (
          <div className={styles.body}>
            <BlockRenderer blocks={post.blocks} />
          </div>
        ) : (
          <div className={styles.body} dangerouslySetInnerHTML={{ __html: bodyHtml ?? '' }} />
        )}
        {post.updatedDate ? (
          <p className={styles.updated}>
            Updated <time dateTime={post.updatedDate}>{formatDate(post.updatedDate)}</time>
          </p>
        ) : null}
      </div>
      <RelatedPostsGrid
        heading="Related posts"
        posts={[]}
        viewAllLabel="View all posts"
        viewAllLink="/blog"
      />
    </div>
  )
}

export default BlogPostPage
