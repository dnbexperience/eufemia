/**
 * Web StepIndicator Component
 *
 */

import React, { useContext, useEffect, useRef, useState } from 'react'

import classnames from 'classnames'
import { extendPropsWithContext } from '../../shared/component-helper'
import Context from '../../shared/Context'
import StepIndicatorList from './StepIndicatorList'
import { stepIndicatorDefaultProps } from './StepIndicatorProps'
import { StepIndicatorProvider } from './StepIndicatorContext'
import { createSpacingClasses } from '../space/SpacingHelper'
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

function StepIndicatorSidebar({
  current_step = stepIndicatorDefaultProps.current_step,
  data = stepIndicatorDefaultProps.data,
  ...restOfProps
}: StepIndicatorSidebarProps) {
  const props = { current_step, data, ...restOfProps }

  const context = useContext(Context)

  const [showInitialData, setShowInitialData] = useState<boolean>(true)

  const hasSkeletonData = useRef<boolean>(null)

  useEffect(() => {
    if (!props.showInitialData) {
      setShowInitialData(false)
    }
  }, [])

  function getContextAndProps() {
    const providerProps = extendPropsWithContext(
      props,
      stepIndicatorDefaultProps,
      { skeleton: context?.skeleton },
      context.getTranslation(context).StepIndicator,
      context?.StepIndicator
    )

    if (!(providerProps.data?.length > 0)) {
      const text = 'Skeleton text'
      providerProps.data = [text.slice(10), text, text, text.slice(4)]
      providerProps.skeleton = true
      hasSkeletonData.current = true
    }

    return providerProps
  }

  const providerProps = showInitialData ? getContextAndProps() : null

  return (
    <div
      id={'sidebar__' + props.sidebar_id}
      className={classnames(
        'dnb-step-indicator-wrapper',
        'dnb-step-indicator__sidebar',
        hasSkeletonData.current &&
          providerProps?.skeleton &&
          'dnb-step-indicator__sidebar--ssr-skeleton',
        createSpacingClasses(props)
      )}
    >
      {providerProps && (
        <StepIndicatorProvider
          isSidebar
          sidebar_id={props.sidebar_id}
          {...providerProps}
        >
          <StepIndicatorList />
        </StepIndicatorProvider>
      )}
    </div>
  )
}

export default StepIndicatorSidebar
