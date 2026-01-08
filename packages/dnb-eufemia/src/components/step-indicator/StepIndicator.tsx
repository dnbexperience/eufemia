/**
 * Web StepIndicator Component
 *
 */

import React, { useContext } from 'react'
import classnames from 'classnames'

import { createSpacingClasses } from '../space/SpacingHelper'
import Card from '../Card'
import CardContext from '../card/CardContext'
import StepIndicatorTriggerButton from './StepIndicatorTriggerButton'
import StepIndicatorSidebar from './StepIndicatorSidebar'
import StepIndicatorList from './StepIndicatorList'
import type { StepIndicatorContextValues } from './StepIndicatorContext'
import StepIndicatorContext, {
  StepIndicatorProvider,
} from './StepIndicatorContext'

import type { SpacingProps } from '../../shared/types'
import type { SkeletonShow } from '../Skeleton'
import type {
  StepIndicatorItemProps,
  StepItemWrapper,
} from './StepIndicatorItem'
import { stepIndicatorDefaultProps } from './StepIndicatorProps'
import type {
  FormStatusState,
  FormStatusText,
} from '../form-status/FormStatus'
import FormStatus from '../form-status/FormStatus'

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

export type StepIndicatorMouseEvent = {
  event: React.MouseEvent<HTMLButtonElement>
  item: StepIndicatorItemProps
  currentStep: number
  current_step: number
}

export type StepIndicatorRenderCallback = {
  /** A component that will render the item with the correct props. */
  StepItem: typeof StepItemWrapper
  /** Element that was originally going to be rendered */
  element: React.ReactNode
  /** @deprecated never has values */
  attributes: React.HTMLProps<HTMLElement>
  props: StepIndicatorItemProps
  context: StepIndicatorContextValues
}

export type StepIndicatorProps = Omit<
  React.HTMLProps<HTMLAnchorElement>,
  'ref' | 'data'
> &
  SpacingProps & {
    /**
     * <em>(required with `<StepIndicator.Sidebar />`)</em> a unique string-based ID in order to bind together the main component and the sidebar (`<StepIndicator.Sidebar />`). Both have to get the same ID.
     * @deprecated StepIndicator.Sidebar variant is no longer supported
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
     *  The title shown inside the `<StepIndicatorModal />` supplemental screen reader text for the `<StepIndicatorTriggerButton />`
     *  Defaults to `Steps Overview`
     */
    overview_title?: string
    /**
     *  The label for `<StepIndicatorTriggerButton />` and supplemental screen reader text for `<StepIndicatorItem />`
     *  This value need to contain `%step` and `%count` if you want to display the current step and total amount of steps
     * `%step` is used to place the current step into the text
     * `%count` is used to place the step total into the text
     *  Defaults to `Step %step of %count`
     */
    step_title?: string
    /**
     *  A descriptive label used in `<StepIndicatorModal />`
     *  This value need to contain `%step` and `%count` if you want to display the current step and total amount of steps
     * `%step` is used to place the current step into the text
     * `%count` is used to place the step total into the text
     *  Defaults to `You are on step %step of %count`
     * @deprecated only `step_title`is used
     */
    step_title_extended?: string
    /**
     * Defines the active number marked step starting by 0. Defaults to `0`.
     */
    current_step?: number
    /**
     * Define whether to show automatically counted numbers or not. Defaults to `false`.
     */
    hide_numbers?: boolean
    /**
     * Will be called once the user clicks on the current or another step. Will be emitted on every click. Returns an object `{ event, item, current_step, currentStep }`.
     */
    on_click?: ({
      event,
      item,
      current_step,
      currentStep,
    }: StepIndicatorMouseEvent) => void
    /**
     * Callback function to manipulate or wrap every item. Has to return a React Node. You receive an object you can use in your custom HOC `{ StepItem, element, attributes, props, context }`.
     * @deprecated no longer does anything other than the step item `title` prop
     */
    on_item_render?: ({
      StepItem,
      element,
      attributes,
      props,
      context,
    }: StepIndicatorRenderCallback) => React.ReactNode
    /**
     * Will be called once the user visits actively a new step. Will be emitted only once. Returns an object `{ event, item, current_step, currentStep }`.
     */
    on_change?: ({
      event,
      item,
      current_step,
      currentStep,
    }: StepIndicatorMouseEvent) => void
    /**
     * Status text. Status is only shown if this prop has text. Defaults to `undefined`
     */
    status?: FormStatusText
    /**
     * The type of status for the `status` prop. Is either `info`, `error` or `warn`.
     * Defaults to `warn`.
     */
    status_state?: FormStatusState
    /**
     * If set to `true`, the height animation on the step items and the drawer button will be omitted. Defaults to `false`.
     */
    no_animation?: boolean
    /**
     * Set to `true` to have the list be expanded initially. Defaults to `false`.
     */
    expandedInitially?: boolean
    /**
     * Whether or not to break out (using negative margins) on larger screens. Defaults to `false`.
     */
    outset?: boolean
    skeleton?: SkeletonShow
    className?: string
    children?: React.ReactNode
  }

function handleDeprecatedProps(
  props: StepIndicatorProps
): Omit<StepIndicatorProps, 'sidebar_id' | 'step_title_extended'> {
  const { sidebar_id, step_title_extended, ...rest } = props
  return rest
}

function StepIndicator({
  status,
  status_state = 'warn',
  data = stepIndicatorDefaultProps.data,
  skeleton = stepIndicatorDefaultProps.skeleton,
  current_step = stepIndicatorDefaultProps.current_step,
  hide_numbers = stepIndicatorDefaultProps.hide_numbers,
  no_animation = stepIndicatorDefaultProps.no_animation,
  expandedInitially = stepIndicatorDefaultProps.expandedInitially,
  ...restOfProps
}: StepIndicatorProps) {
  const { outset, ...props } = handleDeprecatedProps({
    data,
    skeleton,
    current_step,
    hide_numbers,
    no_animation,
    expandedInitially,
    ...restOfProps,
  })

  return (
    <StepIndicatorProvider {...props}>
      <div className="dnb-step-indicator-wrapper">
        <Card
          align="stretch"
          className={classnames(
            'dnb-step-indicator',
            createSpacingClasses(restOfProps)
          )}
          backgroundColor="var(--step-indicator-trigger-content-background)"
          outset={outset}
        >
          <StepIndicatorTriggerButton
            isNested={useContext(CardContext)?.isNested}
          />
          <StepIndicatorList />
        </Card>
        <StepIndicatorStatus status={status} status_state={status_state} />
      </div>
    </StepIndicatorProvider>
  )
}

function StepIndicatorStatus({ status, status_state }) {
  const { openState, no_animation } = useContext(StepIndicatorContext)
  const show = !openState && !!status
  return (
    <FormStatus
      show={show}
      no_animation={no_animation}
      state={status && status_state}
    >
      {status}
    </FormStatus>
  )
}
/**
 * @deprecated StepIndicator.Sidebar variant is no longer supported
 */
StepIndicator.Sidebar = StepIndicatorSidebar

StepIndicator._supportsSpacingProps = true

export default StepIndicator
