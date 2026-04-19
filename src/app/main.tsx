import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import '../index.css'
import '../styles/dark-theme.css'

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark-theme') {
    document.documentElement.classList.add('dark-theme');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
