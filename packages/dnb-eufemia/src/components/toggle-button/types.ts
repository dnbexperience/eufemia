/**
 * Types for ToggleButton
 *
 */

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
    /**
     * To define the `label` layout direction on how the next element should be placed on. Can be either `vertical` or `horizontal`. Defaults to `vertical`.
     */
    labelDirection?: FormElementProps['labelDirection']
    /**
     * Use `true` to make the label only readable by screen readers.
     */
    labelSrOnly?: boolean
    /**
     * The `title` of the input - describing it a bit further for accessibility reasons.
     */
    title?: string
    /**
     * Determine whether the ToggleButton is checked or not. The default will be `false`.
     */
    checked?: boolean
    /**
     * Use `checkbox` or `radio` to show a checkbox or radio button in front of the text. Defaults to `default`.
     */
    variant?: ToggleButtonVariant
    /**
     * Custom content shown in front of the text, when `variant` is `default`.
     */
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
     * The size of the button. There is `default`, `small`, `medium` and `large`.
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
