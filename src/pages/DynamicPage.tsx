import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useAsyncData } from '../lib/useAsyncData'
import { loadPageBySlug } from '../services/content/contentClient'
import { BlockRenderer } from '../components/Renderers/BlockRenderer'
import SeoHead from '../components/SeoHead'
import ContentLayout from '../layouts/ContentLayout'
import LandingLayout from '../layouts/LandingLayout'
import GalleryLayout from '../layouts/GalleryLayout'
import styles from './DynamicPage.module.css'

function normalizeSlug(pathname: string): string {
  try {
    return decodeURIComponent(pathname).replace(/^\/+|\/+$/g, '').trim().toLowerCase()
  } catch {
    return pathname.replace(/^\/+|\/+$/g, '').trim().toLowerCase()
  }
}

export default function DynamicPage() {
  const location = useLocation()
  const slug = normalizeSlug(location.pathname)

  const loader = useCallback(() => loadPageBySlug(slug), [slug])
  const { data: page, loading, error } = useAsyncData(loader, [slug])

  if (loading) {
    return <p className={styles.status}>Loading…</p>
  }

  if (error) {
    return (
      <p className={styles.status} role="alert">
        Couldn’t load this page. Please try again later.
      </p>
    )
  }

  if (!page) {
    return (
      <div className={styles.status}>
        <h1>Page not found</h1>
      </div>
    )
  }

  const pageBody = (
    <>
      <SeoHead
        title={page.seo?.metaTitle ?? page.title}
        description={page.seo?.metaDescription ?? page.description}
        canonicalUrl={page.seo?.canonicalUrl}
        keywords={page.keywords}
        image={page.seo?.openGraph?.image ?? page.featuredImage}
        noindex={page.seo?.noindex}
        ogType={page.seo?.openGraph?.type ?? 'website'}
      />
      <div className={styles.header}>
        <h1>{page.title}</h1>
        {page.description ? <p>{page.description}</p> : null}
      </div>
      <BlockRenderer blocks={page.blocks} />
    </>
  )

  switch (page.layout) {
    case 'landing':
      return <LandingLayout className={styles.page}>{pageBody}</LandingLayout>
    case 'gallery':
      return <GalleryLayout className={styles.page}>{pageBody}</GalleryLayout>
    default:
      return (
        <ContentLayout className={styles.page}>
          {pageBody}
        </ContentLayout>
      )
  }
}
