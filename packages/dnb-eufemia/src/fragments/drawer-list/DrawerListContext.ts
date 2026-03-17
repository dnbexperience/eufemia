/**
 * Web DrawerList Context
 *
 */

import React from 'react'
import type { DrawerListProviderProps } from './DrawerListProvider'
import { ContextProps } from '../../shared/Context'
import {
  DrawerListData,
  DrawerListDataAll,
  DrawerListGroupTitles,
  DrawerListInternalData,
} from './'

export type DrawerListContextState = Omit<
  DrawerListProviderProps,
  'data' | 'wrapperElement' | 'children'
> & {
  data: DrawerListInternalData
  groups?: DrawerListGroupTitles
  wrapperElement?: HTMLElement
  /** used by Autocomplete */
  originalData?: DrawerListInternalData
  /** used by Autocomplete */
  currentTitle?: string
  isOpen?: boolean
  /** used internally */
  _data?: DrawerListData
  /** used internally */
  _value?: string | number
  /** used internally to have a backup to look up what we got in the first place (array vs object) */
  rawData?: DrawerListDataAll
  /** the id of the current active-descendant for screen readers */
  ariaActiveDescendant?: string
}

export type DrawerListContextValue = ContextProps & {
  drawerList?: DrawerListContextState
}

const DrawerListContext = React.createContext<DrawerListContextValue>({})

export default DrawerListContext
