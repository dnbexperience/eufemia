/**
 * Web AccordionGroup Context
 *
 */

import React from 'react'
import { SkeletonContextValue } from '../skeleton/SkeletonHelper'
import { AccordionProps } from './Accordion'
import { AccordionGroupProps } from './AccordionGroup'

export type AccordionContextValue = AccordionProps &
  SkeletonContextValue & {
    allowCloseAll?: boolean
    expandBehavior?: AccordionGroupProps['expandBehavior']
    callOnChange?: (parameters: {
      id: string
      group: string
      expanded: boolean
      event:
        | React.MouseEvent<HTMLElement>
        | React.KeyboardEvent<HTMLElement>
    }) => void
  }

const AccordionContext = React.createContext<AccordionContextValue>({})

export default AccordionContext
