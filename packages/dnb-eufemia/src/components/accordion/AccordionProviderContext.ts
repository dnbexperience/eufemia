/**
 * Web AccordionGroup Context
 *
 */

import React from 'react'
import type { AccordionGroupProps } from './AccordionGroup'

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
  expandBehavior?: AccordionGroupProps['expandBehavior']
}

const AccordionGroupContext =
  React.createContext<AccordionGroupContextProps>({
    // Make sure the AccordionStore gets the correct `expandBehavior` default value, for when grouped `Accordions` are used outside of an `AccordionGroup`.
    expandBehavior: 'single',
  })

export default AccordionGroupContext
