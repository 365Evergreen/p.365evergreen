import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import type { NavigationTreeItem } from '../../hooks/useNavigation'
import styles from './SiteNavigation.module.css'

type SiteNavigationProps = {
  items: NavigationTreeItem[]
  onNavigate: () => void
}

function getSubLinkClassName({
  isActive,
  isPending,
}: {
  isActive: boolean
  isPending: boolean
}) {
  const classNames = [styles.subLink]

  if (isActive) {
    classNames.push(styles.active)
  }

  if (isPending) {
    classNames.push(styles.pending)
  }

  return classNames.join(' ')
}

function panelIdFor(itemId: string): string {
  return `primary-navigation-panel-${itemId}`
}

export default function SiteNavigation({ items, onNavigate }: SiteNavigationProps) {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setExpandedItemId(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleNavigate = () => {
    setExpandedItemId(null)
    onNavigate()
  }

  const matchesItemPath = (item: NavigationTreeItem): boolean => {
    if (location.pathname === item.to) {
      return true
    }

    return item.subItems.some((subItem) => {
      if (location.pathname === subItem.to) {
        return true
      }

      return subItem.subItems.some((grandChild) => location.pathname === grandChild.to)
    })
  }

  return (
    <ul className={styles.list}>
      {items.map((item) => {
        const hasChildren = item.subItems.length > 0
        const isExpanded = expandedItemId === item.id
        const panelId = panelIdFor(item.id)

        return (
          <li key={item.id} className={`${styles.item} ${isExpanded ? styles.itemOpen : ''}`}>
            <button
              type="button"
              className={`${styles.triggerButton} ${matchesItemPath(item) ? styles.active : ''}`}
              aria-expanded={hasChildren ? isExpanded : undefined}
              aria-controls={hasChildren ? panelId : undefined}
              onClick={() => {
                if (hasChildren) {
                  setExpandedItemId((current) => (current === item.id ? null : item.id))
                  return
                }

                setExpandedItemId(null)
                navigate(item.to)
                onNavigate()
              }}
            >
              <span>{item.label}</span>
              {hasChildren ? (
                <span className={styles.chevron} aria-hidden="true">
                  {isExpanded ? '▴' : '▾'}
                </span>
              ) : null}
            </button>

            {hasChildren && isExpanded ? (
              <div id={panelId} className={styles.panel}>
                <ul className={styles.panelColumns}>
                  {item.subItems.map((child) => (
                    <li key={child.id} className={styles.column}>
                      <NavLink className={getSubLinkClassName} to={child.to} onClick={handleNavigate}>
                        {child.label}
                      </NavLink>

                      {child.subItems.length > 0 ? (
                        <ul className={styles.nestedList}>
                          {child.subItems.map((grandChild) => (
                            <li key={grandChild.id}>
                              <NavLink className={getSubLinkClassName} to={grandChild.to} onClick={handleNavigate}>
                                {grandChild.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}
