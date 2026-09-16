import type {
  HTMLProps,
  ReactElement,
  ReactNode,
  SyntheticEvent,
} from 'react'
import type { FormElementProps } from '../../shared/helpers/filterValidProps'
import type {
  ButtonIconPosition,
  ButtonSize,
  ButtonTooltip,
} from '../Button'
import type { IconIcon, IconSize } from '../Icon'
import type { FormStatusBaseProps } from '../FormStatus'
import type { SkeletonShow } from '../Skeleton'
import type { SpaceType, SpacingProps } from '../../shared/types'
/**
 * Types for ToggleButton
 *
 */

import type ToggleButtonGroup from './ToggleButtonGroup'

export type ToggleButtonVariant = 'default' | 'checkbox' | 'radio'

export type ToggleButtonSuffix = string | (() => ReactNode) | ReactNode

export type ToggleButtonValue =
  | string
  | number
  | Record<string, unknown>
  | unknown[]

export type ToggleButtonChildren = string | (() => ReactNode)

export type ToggleButtonChangeEvent = {
  checked: boolean
  value: ToggleButtonValue
  event: SyntheticEvent
}

export type ToggleButtonProps = Omit<
  HTMLProps<HTMLButtonElement>,
  'ref' | 'label' | 'value' | 'children' | 'onChange' | 'size'
> &
  Omit<SpacingProps, 'top' | 'right' | 'bottom' | 'left'> &
  FormStatusBaseProps & {
    /**
     * The text shown in the ToggleButton.
     */
    text?: ReactNode
    /**
     * Use either the `label` property or provide a custom one.
     */
    label?: string | ReactNode
    labelDirection?: FormElementProps['labelDirection']
    labelSrOnly?: boolean
    /**
     * The `title` of the input - describing it a bit further for accessibility reasons.
     */
    title?: string
    /**
     * Determine whether the ToggleButton is checked or not. The default will be `false`.
     */
    checked?: boolean
    variant?: ToggleButtonVariant
    leftComponent?: ReactNode
    disabled?: boolean
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow
    id?: string
    /**
     * Text describing the content of the ToggleButton more than the label. You can also send in a React component, so it gets wrapped inside the ToggleButton component.
     */
    suffix?: ToggleButtonSuffix
    /**
     * Provide a string or a React Element to be shown as the tooltip content.
     */
    tooltip?: ButtonTooltip
    /**
     * Defines the `value`. Use it to get the value during the `onChange` event listener callback in the **ToggleButtonGroup**.
     */
    value?: ToggleButtonValue
    /**
     * The size of the button. For now there are `small`, `medium`, `default` and `large`.
     */
    size?: ButtonSize
    /**
     * Icon to be included in the toggle button.
     */
    icon?: IconIcon
    /**
     * Position of the icon inside the toggle button. Set to `left` or `right`. Defaults to `right` if not set.
     */
    iconPosition?: ButtonIconPosition
    /**
     * Define icon width and height. Defaults to `16px`.
     */
    iconSize?: IconSize
    readOnly?: boolean
    className?: string
    children?: ToggleButtonChildren
    onChange?: (event: ToggleButtonChangeEvent) => void
    // Additional properties that are used in tests
    top?: SpaceType
    right?: SpaceType
    bottom?: SpaceType
    left?: SpaceType
  }

export type ToggleButtonComponent = {
  (props: ToggleButtonProps): ReactElement
  Group: typeof ToggleButtonGroup
}

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
