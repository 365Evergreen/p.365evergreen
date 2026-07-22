import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { NavigationTreeItem } from '../../hooks/useNavigation'
import SiteNavigation from '../SiteNavigation/SiteNavigation'
import styles from './SiteHeader.module.css'

type SiteHeaderProps = {
  items: NavigationTreeItem[]
  isMenuOpen: boolean
  onToggleMenu: () => void
  onCloseMenu: () => void
  onToggleTools?: () => void
}

export default function SiteHeader({
  items,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
}: SiteHeaderProps) {
  const menuButtonLabel = isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
  const menuButtonText = isMenuOpen ? 'Close' : 'Menu'

  const navigationClassName = isMenuOpen
    ? `${styles.navigation} ${styles.open}`
    : styles.navigation

  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onCloseMenu()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onCloseMenu])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link
            className={styles.brand}
            to="/"
            aria-label="365 Evergreen Home"
            onClick={onCloseMenu}
          >
            <img
              className={styles.brandLogo}
              src="https://cdn.365evergreen.com/media/home/365-evergreen-logo.svg"
              alt="365 Evergreen"
            />
            <span className={styles.brandText}>365 Evergreen</span>
          </Link>
        </div>

        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={onToggleMenu}
          aria-label={menuButtonLabel}
        >
          {menuButtonText}
        </button>
<div className={styles.navigationContainer}>
        <nav
          id="primary-navigation"
          className={navigationClassName}
          aria-label="Main navigation"
        >
          <SiteNavigation items={items} onNavigate={onCloseMenu} />
        </nav>

     {/* <div className={styles.actions}>
          <button
            type="button"
            className={styles.toolsButton}
            onClick={onToggleTools}
            aria-label="Open settings"
          >
            ⚙
          </button>
        </div> */} 
        </div> {/* Close navigationContainer */}
      </div>
    </header>
  )
}