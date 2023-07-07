/**
 * ToggleGrid
 *
 */

import React from 'react'

export default function GridActivator() {
  React.useEffect(() => {
    if (isGridVisible()) {
      makeGridVisible()
    }
  }, [])

  return null
}

export function makeGridVisible(showGrid = true) {
  if (typeof document !== 'undefined') {
    if (showGrid) {
      document.documentElement.setAttribute('show-dev-grid', 'true')
    } else {
      document.documentElement.removeAttribute('show-dev-grid')
    }
    window.localStorage.setItem('showGrid', String(showGrid ? 1 : 0))
  }
}

export function isGridVisible() {
  return Boolean(
    typeof window !== 'undefined' &&
      parseFloat(window.localStorage.getItem('showGrid'))
  )
}
