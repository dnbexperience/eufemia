import { createContext } from 'react'
import type { ReactElement } from 'react'

export const DrawerContentContext = createContext<{
  navigationElement?: ReactElement
  headerElement?: ReactElement
  reveal?: boolean
}>(null)
