/**
 * Web AccordionGroup Context
 *
 */

import React from 'react'
import { AccordionGroupProps } from './AccordionGroup'

type AccordionGroupContextProps = {
  expanded?: boolean
  group?: string
  expanded_ssr?: boolean
  remember_state?: boolean
  flush_remembered_state?: boolean
  expanded_id?: string
  onChange?: (...params: unknown[]) => void
  onInit?: (...args: any[]) => any
  collapseAccordionCallbacks?: React.MutableRefObject<(() => void)[]>
  collapseAllHandleRef?: React.MutableRefObject<() => void>
  /**
   * @deprecated – Replaced with expandBehavior, expandBehaviour can be removed in v11
   */
  expandBehaviour?: AccordionGroupProps['expandBehaviour']
  expandBehavior?: AccordionGroupProps['expandBehavior']
}

const AccordionGroupContext =
  React.createContext<AccordionGroupContextProps>({})

export default AccordionGroupContext
