/**
 * Web AccordionGroup Context
 *
 */

import React from 'react'

type AccordionContextProps = {
  expanded?: boolean
  group?: string
  expanded_ssr?: boolean
  remember_state?: boolean
  flush_remembered_state?: boolean
  expanded_id?: string
  onChange?: (...params: unknown[]) => void
  onInit?: (...args: any[]) => any
}

const AccordionGroupContext = React.createContext<AccordionContextProps>(
  {}
)

export default AccordionGroupContext
