import { useMemo, useState } from 'react'
import type { ResourceItem } from '../../services/content/contentClient'
import styles from './ResourceCardGrid.module.css'

type ResourceCardGridProps = {
  resources: ResourceItem[]
}

function toDateValue(value: string | undefined): number {
  if (!value) {
    return Number.NEGATIVE_INFINITY
  }

  const parsed = Date.parse(value)
  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed
}

function normalizeTypeLabel(value: string): string {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export default function ResourceCardGrid({ resources }: ResourceCardGridProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const sortedResources = useMemo(() => {
    return [...resources].sort((a, b) => {
      const dateDiff = toDateValue(b.publishedDate) - toDateValue(a.publishedDate)
      if (dateDiff !== 0) {
        return dateDiff
      }
      return a.name.localeCompare(b.name)
    })
  }, [resources])

  const availableTypes = useMemo(
    () =>
      Array.from(new Set(sortedResources.map((resource) => resource.type)))
        .filter((type) => type.length > 0)
        .sort((a, b) => a.localeCompare(b)),
    [sortedResources],
  )

  const visibleResources = useMemo(() => {
    if (selectedTypes.length === 0) {
      return sortedResources
    }
    return sortedResources.filter((resource) => selectedTypes.includes(resource.type))
  }, [selectedTypes, sortedResources])

  const hasFilters = selectedTypes.length > 0

  const toggleType = (type: string) => {
    setSelectedTypes((current) =>
      current.includes(type) ? current.filter((value) => value !== type) : [...current, type],
    )
  }

  return (
    <section className={styles.section} aria-labelledby="resources-grid-heading">
      <header className={styles.header}>
        <h2 id="resources-grid-heading" className={styles.title}>
          Resources
        </h2>
      </header>
      <div className={styles.layout}>
        <div className={styles.main}>
          {visibleResources.length === 0 ? (
            <p className={styles.emptyState}>No resources match the selected filters.</p>
          ) : (
            <ul className={styles.grid}>
              {visibleResources.map((resource) => (
                <li key={resource.id} className={styles.card}>
                  <article className={styles.cardBody}>
                    <p className={styles.type}>{normalizeTypeLabel(resource.type)}</p>
                    <h3 className={styles.name}>{resource.name}</h3>
                    {resource.description ? <p className={styles.description}>{resource.description}</p> : null}
                    {resource.publishedDate ? (
                      <p className={styles.date}>Published {resource.publishedDate}</p>
                    ) : null}
                    <a className={styles.link} href={resource.slug} target="_blank" rel="noreferrer">
                      Open resource
                    </a>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className={styles.sidebar} aria-label="Resource filters">
          <button
            type="button"
            className={styles.clearFilters}
            onClick={() => setSelectedTypes([])}
            disabled={!hasFilters}
          >
            Clear filters
          </button>

          <div className={styles.filterGroup}>
            <p className={styles.filterTitle}>Type</p>
            <ul className={styles.filterList}>
              {availableTypes.map((type) => (
                <li key={type}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                    />
                    <span>{normalizeTypeLabel(type)}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}
