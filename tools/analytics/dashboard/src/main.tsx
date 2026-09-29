import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

import '@dnb/eufemia/src/style'
import '@dnb/eufemia/src/style/themes/ui/ui-theme-dark-mode.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
