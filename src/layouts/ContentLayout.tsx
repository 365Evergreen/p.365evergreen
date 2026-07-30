import type { PropsWithChildren } from 'react'
import styles from './ContentLayout.module.css'

interface ContentLayoutProps {
  title?: string
  description?: string
  className?: string
}

export default function ContentLayout({ title, description, children, className }: PropsWithChildren<ContentLayoutProps>) {
  return (
    <div className={`${styles.content} ${className ?? ''}`.trim()}>
      <div className={styles.header}>
        {title ? <h1 className={styles.heading}>{title}</h1> : null}
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  )
}
