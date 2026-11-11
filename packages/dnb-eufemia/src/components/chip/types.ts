import type { HTMLAttributes, ReactNode, SyntheticEvent } from 'react'
import type { CheckboxProps } from '../checkbox/Checkbox'
import type { RadioGroupProps } from '../radio/group-types'
import type { IconIcon } from '../icon/Icon'

export type ChipVariant = 'default' | 'addable' | 'radio' | 'checkbox'
export type ChipSize = 'default' | 'small' | 'medium' | 'large'
export type ChipValue = string | number

export type ChipChangeEvent = {
  checked: boolean
  value: ChipValue
  event: SyntheticEvent<HTMLInputElement>
}

export type ChipGroupChangeEvent = ChipChangeEvent & {
  values: ChipValue[]
}

export type ChipGroupProps = Omit<
  RadioGroupProps,
  'labelPosition' | 'size' | 'value' | 'onChange'
> &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'> & {
    /** Select one option using `value`, or several options using `values`. Defaults to `single`. */
    selectionMode?: 'single' | 'multiple'
    /** The selected values with `selectionMode="multiple"`. User interaction updates the selection, and a new array synchronizes it. Keep the array in state and update it in `onChange`, because an inline array replaces the selection on every render. Use an empty array to clear the selection. */
    values?: ChipValue[]
    value?: ChipValue
    /** Shared size. Each Chip can override it. Defaults to `default`. */
    size?: ChipSize
    /** Shared appearance. Each Chip can override it. Defaults to `default`. */
    variant?: ChipVariant
    readOnly?: boolean
    onChange?: (event: ChipGroupChangeEvent) => void
  }

export type ChipProps = Omit<
  CheckboxProps,
  | 'element'
  | 'type'
  | 'role'
  | 'size'
  | 'value'
  | 'label'
  | 'labelPosition'
  | 'indeterminate'
  | 'defaultChecked'
  | 'children'
  | 'onChange'
  | 'onClick'
> & {
  /**
   * The size of the chip. Inherits from Chip.Group. Defaults to `default`. Small, medium, default, and large have minimum heights of 1.5, 2, 2.5, and 3 rem respectively.
   */
  size?: ChipSize
  /**
   * The option identifier. Events preserve its string or number type; native form submission uses a string. Defaults to an empty string. Give every option in Chip.Group a unique value, including after conversion to a string.
   */
  value?: ChipValue
  /**
   * The visible name of the chip. Takes precedence over `children`. Use text and decorative content only.
   */
  text?: ReactNode
  children?: ReactNode
  /**
   * Choose the appearance. Chip.Group controls single or multiple selection independently of the appearance. Defaults to `default`. The addable icon switches between add and remove; the chip stays visible.
   */
  variant?: ChipVariant
  /**
   * Optional decorative icon, flag, or logo before the text. Accepts an [Icon](/web/components/icon/) name or React element.
   */
  icon?: IconIcon
  /** Additional information shown on hover or keyboard focus. Accepts text, React content, or a [Tooltip](/web/components/tooltip/) component for configuration. A tooltip that repeats the chip name is not announced twice. */
  tooltip?: ReactNode
  onChange?: (event: ChipChangeEvent) => void
}
