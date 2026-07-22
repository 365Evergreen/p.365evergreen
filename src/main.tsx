import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/blocks.scss'
import './styles/site.scss'
import App from './App.tsx'
import { loadPagesIndex, loadPostsIndex } from './services/content/contentClient.ts'

// Eager load content indexes
loadPagesIndex().catch(console.error)
loadPostsIndex().catch(console.error)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
