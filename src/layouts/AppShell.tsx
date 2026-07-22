import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter/SiteFooter'
import SiteHeader from '../components/SiteHeader/SiteHeader'
import { useNavigation } from '../hooks/useNavigation'
import ToolsDrawer from '../components/ToolsDrawer/ToolsDrawer'
//import { AgentPanel } from '../AgentPanel/AgentPanel'
//import type { ClientPrincipal } from '../../types/auth'

export function AppShell() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isToolsOpen, setIsToolsOpen] = useState(false)

  const { treeItems: navigationItems } = useNavigation()

  function toggleMenu() {
    setIsMenuOpen((currentState) => !currentState)
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  function openTools() {
     setIsToolsOpen(true)
  }

  function closeTools() {
    setIsToolsOpen(false)
  }

  return (
    <div className="app-shell">

      <SiteHeader
        items={navigationItems}
        isMenuOpen={isMenuOpen}
        onToggleMenu={toggleMenu}
        onCloseMenu={closeMenu}
        onToggleTools={openTools}
      />

      {/* ✅ UPDATED: Tools drawer now contains the agent */}
       <ToolsDrawer
        isOpen={isToolsOpen}
        onClose={closeTools}
      >
     {/*   <AgentPanel /> */}
      </ToolsDrawer>

      <main id="main-content" className="main-content">
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  )
}

export default AppShell
