import React from 'react'
import type { SpacingProps } from '../../shared/types'
import type {
  StepIndicatorData,
  StepIndicatorMode,
  StepIndicatorProps,
} from '../StepIndicator'

export type StepIndicatorSidebarProps = SpacingProps &
  Pick<StepIndicatorProps, 'current_step' | 'skeleton'> &
  Omit<React.HTMLProps<HTMLAnchorElement>, 'ref' | 'data'> & {
    /**
     * Defines the data/steps showing up in a JavaScript Array or JSON format like `[{title,is_current}]`. See parameters and the example above.
     * @deprecated StepIndicator.Sidebar variant is no longer supported
     */
    data?: StepIndicatorData
    /**
     * Defines how the StepIndicator should work. Use `static` for non-interactive steps. Use `strict` for a chronological step order, also, the user can navigate between visited steps. Use `loose` if the user should be able to navigate freely.
     * @deprecated StepIndicator.Sidebar variant is no longer supported
     */
    mode?: StepIndicatorMode
    /**
     * Stuff
     * @deprecated StepIndicator.Sidebar variant is no longer supported
     */
    showInitialData?: boolean
    /**
     * <em>(required)</em> a unique string-based ID in order to bind together the main component and the sidebar (`<StepIndicator.Sidebar />`). Both have to get the same ID.
     * @deprecated StepIndicator.Sidebar variant is no longer supported
     */
    sidebar_id: string
  }

/**
 * @deprecated StepIndicatorSidebar variant is no longer supported
 */
function StepIndicatorSidebar(props: StepIndicatorSidebarProps) {
  return <div className="dnb-step-indicator__sidebar" />
}

export default StepIndicatorSidebar
