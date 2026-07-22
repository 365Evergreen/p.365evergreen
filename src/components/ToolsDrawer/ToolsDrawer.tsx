import type { ReactNode } from 'react'
import styles from './ToolsDrawer.module.scss'

type ToolsDrawerProps = {
  isOpen: boolean
  onClose: () => void
  children?: ReactNode
}

export default function ToolsDrawer({
  isOpen,
  onClose,
  children,
}: ToolsDrawerProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className={styles.overlay}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        aria-labelledby="tools-drawer-title"
        aria-modal="true"
        role="dialog"
      >
        <div className={styles.header}>
          <div id="tools-drawer-title" className={styles.title}>
            Workspace
          </div>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close workspace"
          >
            ✕
          </button>
        </div>

        <div className={styles.content}>
          {children ? (
            <div className={styles.panelContent}>{children}</div>
          ) : (
            <>
              <h3>Content</h3>
              <a href="/editor">Content dashboard</a>
              <a href="/editor/posts">Manage posts</a>
              <a href="/editor/media">Media library</a>

              <hr />

              <h3>Site</h3>
              <a href="/about">Site information</a>
            </>
          )}
        </div>
      </aside>
    </>
  )
}