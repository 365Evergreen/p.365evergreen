import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigation, type NavigationTreeItem } from '../hooks/useNavigation'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const { treeItems } = useNavigation()

  function renderNavigationItem(item: NavigationTreeItem) {
    const hasSubItems = item.subItems.length > 0

    return (
      <li key={item.id} className="site-nav__item">
        <NavLink
          to={item.to}
          end={item.to === '/'}
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => `site-nav__link ${isActive ? 'is-active' : ''}`}
        >
          {item.label}
        </NavLink>
        {hasSubItems ? <ul className="site-nav__sublist">{item.subItems.map(renderNavigationItem)}</ul> : null}
      </li>
    )
  }

  return (
    <header className="site-nav">
      <div className="site-nav__inner">
        <NavLink to="/" className="site-nav__brand" onClick={() => setIsOpen(false)}>
          365 Evergreen
        </NavLink>
        <button
          type="button"
          className="site-nav__toggle"
          aria-controls="primary-navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Menu
        </button>
        <nav
          id="primary-navigation"
          className={`site-nav__links ${isOpen ? 'is-open' : ''}`}
          aria-label="Primary"
        >
          <ul className="site-nav__list">
            {treeItems.map(renderNavigationItem)}
          </ul>
        </nav>
      </div>
    </header>
  )
}
