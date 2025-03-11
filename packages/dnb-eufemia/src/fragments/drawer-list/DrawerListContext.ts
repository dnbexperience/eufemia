/**
 * Web DrawerList Context
 *
 */

import React from 'react'
import type { DrawerListProviderProps } from './DrawerListProvider'
import { ContextProps } from '../../shared/Context'
import { DrawerListDataArrayObject } from './'

export type DrawerListContextProps = ContextProps & {
  drawerList?: Omit<DrawerListProviderProps, 'data'> & {
    data: DrawerListDataArrayObject[]
  }
}
const DrawerListContext = React.createContext<DrawerListContextProps>({})

export default DrawerListContext
