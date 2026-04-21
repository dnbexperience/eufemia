/**
 * Web Pagination Context
 *
 */

import React from 'react'

const Context = React.createContext<Record<string, any>>({
  pagination: {},
})

export default Context
