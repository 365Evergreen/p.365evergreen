import type { PropsWithChildren } from 'react'
import styles from './LandingLayout.module.css'

interface LandingLayoutProps {
  className?: string
}

export default function LandingLayout({ children, className }: PropsWithChildren<LandingLayoutProps>) {
  return (
    <div className={`${styles.landing} ${className ?? ''}`.trim()}>
      <div className={styles.inner}>{children}</div>
    </div>
  )
}
