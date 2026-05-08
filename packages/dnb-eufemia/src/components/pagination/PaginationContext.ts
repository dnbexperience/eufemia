import { createContext } from 'react'
/**
 * Web Pagination Context
 *
 */

const Context = createContext<Record<string, any>>({
  pagination: {},
})

export default Context
