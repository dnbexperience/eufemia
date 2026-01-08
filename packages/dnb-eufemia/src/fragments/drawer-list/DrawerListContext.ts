/**
 * Web DrawerList Context
 *
 */

import React from 'react'
import type { DrawerListProviderProps } from './DrawerListProvider'
import type { ContextProps } from '../../shared/Context'
import type {
  DrawerListDataAll,
  DrawerListGroupTitles,
  DrawerListInternalData,
} from './'

export type DrawerListContextState = Omit<
  DrawerListProviderProps,
  'data' | 'wrapper_element' | 'children'
> & {
  data: DrawerListInternalData
  groups?: DrawerListGroupTitles
  wrapper_element?: HTMLElement
  /** used by Autocomplete */
  original_data?: DrawerListInternalData
  /** used by Autocomplete */
  current_title?: string
  isOpen?: boolean
  /** used internally */
  _data?: any
  /** used internally */
  _value?: any
  /** used internally to have a backup to look up what we got in the first place (array vs object) */
  raw_data?: DrawerListDataAll
  /** the id of the current active-descendant for screen readers */
  ariaActiveDescendant?: string
}

export type DrawerListContextProps = ContextProps & {
  drawerList?: DrawerListContextState
}

const DrawerListContext = React.createContext<DrawerListContextProps>({})

export default DrawerListContext
