import React from 'react'
import type { TooltipProps } from './types'

export type TooltipContextProps = {
  /**
   * The props of the Tooltip component.
   */
  props: TooltipProps
  /**
   * Whether the tooltip is controlled from outside.
   */
  isControlled: boolean
  /**
   * The internal ID used for aria-describedby.
   */
  internalId: string
}

export const TooltipContext =
  React.createContext<TooltipContextProps>(null)
