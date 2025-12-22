/**
 * ToggleGrid
 *
 */

import React from 'react'
import { Switch } from '@dnb/eufemia/src'

function setGridVisibility(visibility = true) {
  if (typeof document !== 'undefined') {
    if (visibility) {
      document.documentElement.setAttribute('show-dev-grid', 'true')
    } else {
      document.documentElement.removeAttribute('show-dev-grid')
    }
    window.localStorage.setItem('showGrid', String(visibility ? 1 : 0))
  }
}

function isGridVisible() {
  return Boolean(
    typeof window !== 'undefined' &&
      parseFloat(window.localStorage.getItem('showGrid')),
  )
}

export function GridActivator() {
  React.useEffect(() => {
    if (isGridVisible()) {
      setGridVisibility()
    }
  }, [])

  return null
}

export default function ToggleGrid(
  props: React.HTMLAttributes<HTMLSpanElement>,
) {
  const handleChange = () => {
    setGridVisibility(!isGridVisible())
  }

  return (
    <span {...props}>
      <Switch
        id="switch-grid"
        label="Grid"
        checked={isGridVisible()}
        onChange={handleChange}
      />
      <GridActivator />
    </span>
  )
}
