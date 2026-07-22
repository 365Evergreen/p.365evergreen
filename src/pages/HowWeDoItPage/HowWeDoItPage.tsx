import { useCallback } from 'react'
import { useAsyncData } from '../../lib/useAsyncData'
import { loadPageBySlug } from '../../content/contentClient'
import { BlockRenderer } from '../../components/Renderers/BlockRenderer'
import SeoHead from '../../components/SeoHead'
import styles from './HowWeDoItPage.module.css'
import { Accordion } from './Accordion/Accordion'
import Tabs from './Tabs/Tabs';
//import TabsList from '../../components/TabsList/TabsList'

const PAGE_SLUG = 'how-we-do-it'

const items = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <p>
        This content is displayed when the accordion item is expanded.
      </p>
    ),
  },
  {
    id: "features",
    title: "Features",
    content: (
      <ul>
        <li>Accessible</li>
        <li>TypeScript support</li>
        <li>CSS Modules</li>
      </ul>
    ),
  },
];

export default function WhatWeDoPage() {
  const loader = useCallback(() => loadPageBySlug(PAGE_SLUG), [])
  const { data: page, loading, error } = useAsyncData(loader, [])

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
      </div>
      <div className={styles.accordion}>
        <Accordion
          items={items}
          allowMultiple={true}
          defaultOpen={["overview"]}
        />
        <div className={styles.tabs}>
           <Tabs />
        </div>
      </div>

    </section>
  )
}


