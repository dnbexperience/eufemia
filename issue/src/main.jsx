import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from '@dnb/eufemia/shared'
import App from './App.jsx'

import '@dnb/eufemia/style'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider locale="en-GB">
      <App />
    </Provider>
  </StrictMode>
)
