import { useCallback } from 'react'
import { useAsyncData } from '../../lib/useAsyncData'
import { loadPageBySlug, loadResourcesIndex } from '../../content/contentClient'
import { BlockRenderer } from '../../components/Renderers/BlockRenderer'
import ResourceCardGrid from '../../components/ResourceCardGrid'
import SeoHead from '../../components/SeoHead'
import styles from './ResourcesPage.module.css'

const PAGE_SLUG = 'resources'

export default function ResourcesPage() {
  const pageLoader = useCallback(() => loadPageBySlug(PAGE_SLUG), [])
  const { data: page, loading: pageLoading, error: pageError } = useAsyncData(pageLoader, [])
  const { data: resources, loading: resourcesLoading, error: resourcesError } = useAsyncData(
    loadResourcesIndex,
    [],
  )

  const loading = pageLoading || resourcesLoading
  const error = pageError || resourcesError

  if (loading) {
    return <div className={styles.status}>Loading…</div>
  }

  if (error) {
    return (
      <div className={styles.status} role="alert">
        Couldn’t load this page. Please try again later.
      </div>
    )
  }

  if (!page) {
    return (
      <div className={styles.status}>
        <h1>Page not found</h1>
      </div>
    )
  }

  return (
    <section className={styles.page}>
      <SeoHead
        title={page.seo?.metaTitle ?? page.title}
        description={page.seo?.metaDescription ?? page.description}
        canonicalUrl={page.seo?.canonicalUrl}
        keywords={page.keywords}
        image={page.seo?.openGraph?.image ?? page.featuredImage}
        noindex={page.seo?.noindex}
        ogType={page.seo?.openGraph?.type ?? 'website'}
      />

      <div className={styles.content}>
        <div className={styles.header}>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
        </div>
        <BlockRenderer blocks={page.blocks} />
        <ResourceCardGrid resources={resources ?? []} />
      </div>
    </section>
  )
}
