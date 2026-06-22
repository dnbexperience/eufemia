/**
 * Web StepIndicator Component
 *
 */

import { useContext } from 'react'
import type { HTMLProps, MouseEvent, ReactNode } from 'react'
import { useSpacing } from '../space/SpacingUtils'
import Card from '../Card'
import CardContext from '../card/CardContext'
import StepIndicatorTriggerButton from './StepIndicatorTriggerButton'
import StepIndicatorList from './StepIndicatorList'
import StepIndicatorContext, {
  StepIndicatorProvider,
} from './StepIndicatorContext'

import type { SpacingProps } from '../../shared/types'
import type { SkeletonShow } from '../Skeleton'
import type { StepIndicatorItemProps } from './StepIndicatorItem'
import { stepIndicatorDefaultProps } from './defaults'
import type {
  FormStatusState,
  FormStatusText,
} from '../form-status/FormStatus'
import FormStatus from '../form-status/FormStatus'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type StepIndicatorMode = 'static' | 'strict' | 'loose'
export type StepIndicatorDataItem = Pick<
  StepIndicatorItemProps,
  | 'title'
  | 'isCurrent'
  | 'inactive'
  | 'disabled'
  | 'status'
  | 'statusState'
  | 'onClick'
>
export type StepIndicatorData = string | string[] | StepIndicatorDataItem[]

export type StepIndicatorMouseEvent = {
  event: MouseEvent<HTMLButtonElement>
  item: StepIndicatorItemProps
  currentStep: number
}

export type StepIndicatorProps = Omit<
  HTMLProps<HTMLAnchorElement>,
  'ref' | 'data' | 'onChange' | 'onClick'
> &
  SpacingProps & {
    /**
     * Defines how the StepIndicator should work. Use `static` for non-interactive steps. Use `strict` for a chronological step order, also, the user can navigate between visited steps. Use `loose` if the user should be able to navigate freely.
     */
    mode: StepIndicatorMode
    /**
     * Defines the data/steps showing up in a JavaScript Array or JSON format like `[{title,isCurrent}]`. See below for properties of `STEP_DATA`.
     */
    data: StepIndicatorData
    /**
     * The title shown inside the `<StepIndicatorModal />` supplemental screen reader text for the `<StepIndicatorTriggerButton />`. Defaults to `Steps Overview`.
     */
    overviewTitle?: string
    /**
     * Label for `<StepIndicatorTriggerButton />` and screen reader text for `<StepIndicatorItem />`. Must contain `%step` and `%count` to interpolate `currentStep` and `stepCount` into the text. Defaults to `Step %step of %count`.
     */
    stepTitle?: string
    /**
     * Defines the initial step starting from 0. Also defines the furthest step visited when `mode="strict"`. Will update to the new step if changed (but will not trigger the `onChange` event). Defaults to `0`.
     */
    currentStep?: number
    /**
     * Define whether to show automatically counted numbers or not. Defaults to `false`.
     */
    hideNumbers?: boolean
    /**
     * Will be called when the user clicks on any clickable step in the list. Is called right before `onChange`. Receives parameter `{ event, item, currentStep }`.
     */
    onClick?: ({
      event,
      item,
      currentStep,
    }: StepIndicatorMouseEvent) => void
    /**
     * Will be called when the user changes step by clicking in the steps list (changing the `currentStep` property does not trigger the event). Receives parameter `{ event, item, currentStep }`.
     */
    onChange?: ({
      event,
      item,
      currentStep,
    }: StepIndicatorMouseEvent) => void
    /**
     * Text for status shown below the step indicator when it is not expanded. Defaults to `undefined`.
     */
    status?: FormStatusText
    /**
     * The type of status shown when the `status` property is set. Defaults to `warning`.
     */
    statusState?: FormStatusState
    /**
     * If set to `true`, the height animation on step change and list expansion will be omitted. Defaults to `false`.
     */
    noAnimation?: boolean
    /**
     * Set to `true` to have the list be expanded initially. Defaults to `false`.
     */
    expandedInitially?: boolean
    /**
     * Whether or not to break out (using negative margins) on larger screens. Defaults to `false`. Same as `outset` in [Card](/uilib/components/card/properties).
     */
    outset?: boolean
    skeleton?: SkeletonShow
    className?: string
    children?: ReactNode
  }

function StepIndicator({
  status,
  statusState = 'warning',
  data = stepIndicatorDefaultProps.data,
  skeleton = stepIndicatorDefaultProps.skeleton,
  currentStep = stepIndicatorDefaultProps.currentStep,
  hideNumbers = stepIndicatorDefaultProps.hideNumbers,
  noAnimation = stepIndicatorDefaultProps.noAnimation,
  expandedInitially = stepIndicatorDefaultProps.expandedInitially,
  ...restOfProps
}: StepIndicatorProps) {
  const { outset, ...props } = {
    data,
    skeleton,
    currentStep,
    hideNumbers,
    noAnimation,
    expandedInitially,
    ...restOfProps,
  }

  return (
    <StepIndicatorProvider {...props}>
      <div className="dnb-step-indicator-wrapper">
        <Card
          align="stretch"
          {...useSpacing(restOfProps, {
            className: 'dnb-step-indicator',
          })}
          backgroundColor="var(--step-indicator-trigger-content-background)"
          outset={outset}
        >
          <StepIndicatorTriggerButton
            isNested={useContext(CardContext)?.isNested}
          />
          <StepIndicatorList />
        </Card>
        <StepIndicatorStatus status={status} statusState={statusState} />
      </div>
    </StepIndicatorProvider>
  )
}

function StepIndicatorStatus({ status, statusState }) {
  const { open, noAnimation } = useContext(StepIndicatorContext)
  const show = !open && !!status
  return (
    <FormStatus
      show={show}
      noAnimation={noAnimation}
      state={status && statusState}
    >
      {status}
    </FormStatus>
  )
}

withComponentMarkers(StepIndicator, {
  _supportsSpacingProps: true,
})

export default StepIndicator
