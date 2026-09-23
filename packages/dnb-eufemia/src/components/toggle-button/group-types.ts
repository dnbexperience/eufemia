/**
 * Types for ToggleButtonGroup
 *
 * Separate from `types.ts` so ToggleButton and ToggleButtonGroup each export
 * only their own types.
 */

import type { HTMLProps, ReactNode, SyntheticEvent } from 'react'
import type { FormElementProps } from '../../shared/helpers/filterValidProps'
import type { ButtonSize } from '../Button'
import type { FormStatusBaseProps } from '../FormStatus'
import type { SkeletonShow } from '../Skeleton'
import type { SpaceType, SpacingProps } from '../../shared/types'

export type ToggleButtonGroupVariant = 'default' | 'checkbox' | 'radio'

export type ToggleButtonGroupSuffix =
  | string
  | (() => ReactNode)
  | ReactNode

export type ToggleButtonGroupLayoutDirection = 'column' | 'row'

export type ToggleButtonGroupValue =
  | string
  | number
  | Record<string, unknown>
  | unknown[]

export type ToggleButtonGroupValues = string | ToggleButtonGroupValue[]

export type ToggleButtonGroupChildren =
  | string
  | (() => ReactNode)
  | ReactNode

export type ToggleButtonGroupChangeEvent = {
  value: ToggleButtonGroupValue
  values: ToggleButtonGroupValues
  event: SyntheticEvent
}

export type ToggleButtonGroupProps = Omit<
  HTMLProps<HTMLElement>,
  'label' | 'value' | 'children' | 'onChange' | 'size'
> &
  Omit<SpacingProps, 'top' | 'right' | 'bottom' | 'left'> &
  FormStatusBaseProps & {
    /**
     * Use either the `label` property or provide a custom one.
     */
    label?: string | ReactNode
    labelDirection?: FormElementProps['labelDirection']
    labelSrOnly?: boolean
    /**
     * The `title` of group, describing it a bit further for accessibility reasons.
     */
    title?: string
    /**
     * Determine whether the ToggleButtonGroup is checked or not. The default will be `false`.
     */
    checked?: boolean
    variant?: ToggleButtonGroupVariant
    leftComponent?: ReactNode
    disabled?: boolean
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow
    id?: string
    /**
     * Text describing the content of the ToggleButtonGroup more than the label. You can also send in a React component, so it gets wrapped inside the ToggleButtonGroup component.
     */
    suffix?: ToggleButtonGroupSuffix
    /**
     * Defines the pre-selected ToggleButton button. The value has to match the one provided in the ToggleButton button. Use a string value.
     */
    value?: ToggleButtonGroupValue
    /**
     * The size of the button. For now there are `small`, `medium`, `default` and `large`.
     */
    size?: ButtonSize
    /**
     * Define the layout direction of the ToggleButton buttons. Can be either `column` or `row`. Defaults to `row`.
     */
    layoutDirection?: ToggleButtonGroupLayoutDirection
    /**
     * Defines the pre-selected ToggleButton buttons in `multiselect` mode. The values have to match the one provided in the ToggleButton buttons. Use array, either as JS or JSON string.
     */
    values?: ToggleButtonGroupValues
    readOnly?: boolean
    className?: string
    children?: ToggleButtonGroupChildren
    onChange?: (event: ToggleButtonGroupChangeEvent) => void
    // Additional properties that are used in tests
    top?: SpaceType
    right?: SpaceType
    bottom?: SpaceType
    left?: SpaceType
    multiselect?: boolean
    name?: string
    vertical?: boolean
  }
