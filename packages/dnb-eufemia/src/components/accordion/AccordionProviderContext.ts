/**
 * Web AccordionGroup Context
 *
 */

import { createContext } from 'react'
import type { RefObject } from 'react'
import type { AccordionGroupProps } from './AccordionGroup'
import type { AccordionInstance } from './types'

type AccordionGroupContextProps = {
  expanded?: boolean
  group?: string
  expandedSsr?: boolean
  rememberState?: boolean
  flushRememberedState?: boolean
  expandedId?: string
  onChange?: (...params: unknown[]) => void
  onInit?: (accordion: AccordionInstance) => void
  collapseAccordionCallbacks?: RefObject<(() => void)[]>
  collapseAllHandleRef?: RefObject<() => void>
  expandBehavior?: AccordionGroupProps['expandBehavior']
}

const AccordionGroupContext = createContext<AccordionGroupContextProps>({
  // Make sure the AccordionStore gets the correct `expandBehavior` default value, for when grouped `Accordions` are used outside of an `AccordionGroup`.
  expandBehavior: 'single',
})

export default AccordionGroupContext
