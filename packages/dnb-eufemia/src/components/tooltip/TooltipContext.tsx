import React from 'react'

export type TooltipContextProps = {
  /**
   * Whether the tooltip is controlled from outside.
   */
  isControlled?: boolean
  /**
   * Whether to omit the aria-describedby attribute.
   */
  omitDescribedBy?: boolean
}

export const TooltipContext =
  React.createContext<TooltipContextProps>(null)
