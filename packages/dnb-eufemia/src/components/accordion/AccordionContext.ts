/**
 * Web AccordionGroup Context
 *
 */

import { createContext } from 'react'
import type { KeyboardEvent, MouseEvent } from 'react'
import type { SkeletonContextValue } from '../skeleton/SkeletonHelper'
import type { AccordionProps } from './Accordion'
import type { AccordionGroupProps } from './AccordionGroup'

export type AccordionContextValue = AccordionProps &
  SkeletonContextValue & {
    allowCloseAll?: boolean
    expandBehavior?: AccordionGroupProps['expandBehavior']
    callOnChange?: (parameters: {
      id: string
      group: string
      expanded: boolean
      event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>
    }) => void
  }

const AccordionContext = createContext<AccordionContextValue>({})

export default AccordionContext
