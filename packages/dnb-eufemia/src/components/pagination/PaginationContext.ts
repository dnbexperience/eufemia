/**
 * Web Pagination Context
 *
 */

import React from 'react'

const Context = React.createContext<Record<string, unknown>>({
  pagination: {},
})

export default Context
