/**
 * Web AccordionGroup Context
 *
 */

import React from 'react'
import { SkeletonContextProps } from '../skeleton/SkeletonHelper'
import { AccordionProps } from './Accordion'

type AccordionContextProps = AccordionProps &
  SkeletonContextProps & {
    allow_close_all?: boolean
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
