/**
 * Web DrawerList Context
 *
 */

import React from 'react'
import type { DrawerListProviderProps } from './DrawerListProvider'
import { ContextProps } from '../../shared/Context'
import { DrawerListDataArrayObject } from './'

export type DrawerListContextState = Omit<
  DrawerListProviderProps,
  'data'
> & {
  data: DrawerListDataArrayObject[]
  /** used by Autocomplere */
  original_data?: DrawerListDataArrayObject[]
  /** used by Autocomplere */
  current_title?: string
  /** used internally */
  _data?: any
  /** used internally */
  _value?: any
}

export type DrawerListContextProps = ContextProps & {
  drawerList?: DrawerListContextState
}

const DrawerListContext = React.createContext<DrawerListContextProps>({})

export default DrawerListContext
