/**
 * Theme Hook
 *
 */

import React from 'react'
import Context from './Context'

export default function useTheme() {
  const context = React.useContext(Context)

  return context?.theme || null
}
