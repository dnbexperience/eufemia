import React from 'react'
import { SpacingProps } from '../../shared/types'
import {
  StepIndicatorData,
  StepIndicatorMode,
  StepIndicatorProps,
} from '../StepIndicator'

export type StepIndicatorSidebarProps = SpacingProps &
  Pick<StepIndicatorProps, 'current_step' | 'skeleton'> &
  Omit<React.HTMLProps<HTMLAnchorElement>, 'ref' | 'data'> & {
    /**
     * Defines the data/steps showing up in a JavaScript Array or JSON format like `[{title,is_current}]`. See parameters and the example above.
     */
    data?: StepIndicatorData
    /**
     * Defines how the StepIndicator should work. Use `static` for non-interactive steps. Use `strict` for a chronological step order, also, the user can navigate between visited steps. Use `loose` if the user should be able to navigate freely.
     */
    mode?: StepIndicatorMode
    /**
     * Stuff
     */
    showInitialData?: boolean
    /**
     * <em>(required)</em> a unique string-based ID in order to bind together the main component and the sidebar (`<StepIndicator.Sidebar />`). Both have to get the same ID.
     */
    sidebar_id: string
  }

/**
 * @deprecated StepIndicatorSidebar variant is no longer supported
 */
function StepIndicatorSidebar(props: any) {
  return <div className="dnb-step-indicator__sidebar"></div>
}

export default StepIndicatorSidebar
