/**
 * Global Portal providers
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import { CacheProvider } from '@emotion/core'
import createEmotionCache from '@emotion/cache'

import EufemiaProvider from 'dnb-ui-lib/src/shared/Provider'
import stylisPlugin from 'dnb-ui-lib/src/style/stylis'

import cssVars from 'css-vars-ponyfill'

// run the polifills because of the dynamic menu changes
cssVars()

const emotionCache = createEmotionCache({
  stylisPlugins: [stylisPlugin]
})

// Optional, use a Provider
export const rootElement = ({ element }) => (
  <CacheProvider value={emotionCache}>
    <EufemiaProvider>{element}</EufemiaProvider>
  </CacheProvider>
)
rootElement.propTypes = {
  element: PropTypes.node.isRequired
}
