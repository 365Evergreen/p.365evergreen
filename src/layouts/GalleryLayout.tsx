import type { PropsWithChildren } from 'react'
import styles from './GalleryLayout.module.css'

interface GalleryLayoutProps {
  className?: string
}

export default function GalleryLayout({ children, className }: PropsWithChildren<GalleryLayoutProps>) {
  return (
    <div className={`${styles.gallery} ${className ?? ''}`.trim()}>
      <div className={styles.inner}>{children}</div>
    </div>
  )
}
