import type { ImageRef } from '../types/content'

export interface SeoHeadProps {
  title: string
  description?: string
  canonicalUrl?: string
  keywords?: string[]
  image?: ImageRef
  noindex?: boolean
  /** 'website' (default) or 'article'. */
  ogType?: string
}

/**
 * Renders document head tags. React 19 hoists <title>/<meta>/<link> to <head>
 * natively, so no react-helmet is required. Use one SeoHead per route.
 */
export default function SeoHead({
  title,
  description,
  canonicalUrl,
  keywords,
  image,
  noindex,
  ogType = 'website',
}: SeoHeadProps) {
  return (
    <>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      {keywords && keywords.length > 0 ? (
        <meta name="keywords" content={keywords.join(', ')} />
      ) : null}
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
      {noindex ? <meta name="robots" content="noindex,nofollow" /> : null}

      <meta property="og:title" content={title} />
      <meta property="og:type" content={ogType} />
      {description ? <meta property="og:description" content={description} /> : null}
      {canonicalUrl ? <meta property="og:url" content={canonicalUrl} /> : null}
      {image ? <meta property="og:image" content={image.url} /> : null}
      {image?.alt ? <meta property="og:image:alt" content={image.alt} /> : null}

      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title} />
      {description ? <meta name="twitter:description" content={description} /> : null}
      {image ? <meta name="twitter:image" content={image.url} /> : null}
    </>
  )
}
