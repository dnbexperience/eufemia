/**
 * Theme Hook
 *
 */

import React from 'react'
import Context from './Context'

export default function useTheme() {
  const context = React.useContext(Context)

  if (context?.theme) {
    const { name } = context.theme
    return {
      ...context.theme,
      isUi: name === 'ui',
      isSbanken: name === 'sbanken',
      isEiendom: name === 'eiendom',
    }
  }

  return null
}
