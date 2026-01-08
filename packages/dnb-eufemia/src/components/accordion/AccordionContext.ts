/**
 * Web AccordionGroup Context
 *
 */

import React from 'react'
import type { SkeletonContextProps } from '../skeleton/SkeletonHelper'
import type { AccordionProps } from './Accordion'
import type { AccordionGroupProps } from './AccordionGroup'

export type AccordionContextProps = AccordionProps &
  SkeletonContextProps & {
    allow_close_all?: boolean
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

const AccordionContext = React.createContext<AccordionContextProps>({})

export default AccordionContext
