/**
 * Web StepIndicator Component
 *
 */

import React from 'react'

import { makeUniqueId, warn } from '../../shared/component-helper'
import StepIndicatorSidebar from './StepIndicatorSidebar'

import StepIndicatorModal from './StepIndicatorModal'
import { StepIndicatorProvider } from './StepIndicatorContext'

import type { SpacingProps } from '../../shared/types'
import type { SkeletonShow } from '../Skeleton'
import type { StepIndicatorItemProps } from './StepIndicatorItem'
import { stepIndicatorDefaultProps } from './StepIndicatorProps'

export type StepIndicatorMode = 'static' | 'strict' | 'loose'
export type StepIndicatorDataItem = Pick<
  StepIndicatorItemProps,
  | 'title'
  | 'is_current'
  | 'inactive'
  | 'disabled'
  | 'status'
  | 'status_state'
  | 'on_click'
  | 'on_render'
>
export type StepIndicatorData = string | string[] | StepIndicatorDataItem[]

export type StepIndicatorProps = Omit<
  React.HTMLProps<HTMLAnchorElement>,
  'ref' | 'data'
> &
  SpacingProps & {
    /**
     * <em>(required with `<StepIndicator.Sidebar />`)</em> a unique string-based ID in order to bind together the main component and the sidebar (`<StepIndicator.Sidebar />`). Both have to get the same ID.
     */
    sidebar_id?: string
    /**
     * <em>(required)</em> defines how the StepIndicator should work. Use `static` for non-interactive steps. Use `strict` for a chronological step order, also, the user can navigate between visited steps. Use `loose` if the user should be able to navigate freely.
     */
    mode: StepIndicatorMode
    /**
     * <em>(required)</em> defines the data/steps showing up in a JavaScript Array or JSON format like `[{title,is_current}]`. See parameters and the example above.
     */
    data: StepIndicatorData
    /**
     * Will be called once the user clicks on the current or another step. Will be emitted on every click. Returns an object `{ event, item, current_step }`.
     */
    on_click?: (...args: any[]) => any
    overview_title?: string
    step_title_extended?: string
    step_title?: string
    /**
     * Defines the active number marked step starting by 0. Defaults to `0`.
     */
    current_step?: number
    /**
     * Define whether to show automatically counted numbers or not. Defaults to `false`.
     */
    hide_numbers?: boolean
    /**
     * Callback function to manipulate or wrap every item. Has to return a React Node. You receive an object you can use in your custom HOC `{ StepItem, element, attributes, props, context }`.
     */
    on_item_render?: (...args: any[]) => any
    /**
     * Will be called once the user visits actively a new step. Will be emitted only once. Returns an object `{ event, item, current_step }`.
     */
    on_change?: (...args: any[]) => any

    /**
     * If set to `true`, the height animation on the step items and the drawer button will be omitted. Defaults to `false`.
     */
    no_animation?: boolean
    skeleton?: SkeletonShow
    class?: string
    className?: string
    children?: React.ReactNode | ((...args: any[]) => any)
  }

function StepIndicator({
  data = stepIndicatorDefaultProps.data,
  skeleton = stepIndicatorDefaultProps.skeleton,
  current_step = stepIndicatorDefaultProps.current_step,
  hide_numbers = stepIndicatorDefaultProps.hide_numbers,
  no_animation = stepIndicatorDefaultProps.no_animation,
  ...restOfProps
}: StepIndicatorProps) {
  const props = {
    data,
    skeleton,
    current_step,
    hide_numbers,
    no_animation,
    ...restOfProps,
  }

  const sidebarId = props.sidebar_id || makeUniqueId()

  if (!props.sidebar_id && props.mode) {
    warn(
      'StepIndicator needs an unique "sidebar_id" property, also on the <StepIndicator.Sidebar... />'
    )
  }

  return (
    <StepIndicatorProvider {...props} sidebar_id={sidebarId}>
      <div className="dnb-step-indicator-wrapper">
        <StepIndicatorModal />
      </div>
    </StepIndicatorProvider>
  )
}

StepIndicator.Sidebar = StepIndicatorSidebar

export default StepIndicator
