import type { HTMLAttributes, ReactNode, SyntheticEvent } from 'react'
import type { CheckboxProps } from '../checkbox/Checkbox'
import type { RadioGroupProps } from '../radio/group-types'
import type { IconIcon } from '../icon/Icon'

export type ChipVariant = 'default' | 'addable' | 'radio' | 'checkbox'

export type ChipChangeEvent = {
  checked: boolean
  value: string
  event: SyntheticEvent<HTMLInputElement>
}

export type ChipGroupChangeEvent = ChipChangeEvent & {
  values: string[]
}

export type ChipGroupProps = Omit<
  RadioGroupProps,
  'labelPosition' | 'size' | 'onChange'
> &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'> & {
    /** Select several options using `values`. Defaults to false. */
    multiselect?: boolean
    /** The selected values in multiselect mode. User interaction updates the selection, and a changed array synchronizes it. Use an empty array to clear the selection. */
    values?: string[]
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
  | 'labelPosition'
  | 'labelSrOnly'
  | 'indeterminate'
  | 'defaultChecked'
  | 'children'
  | 'onChange'
  | 'onClick'
  | 'suffix'
> & {
  /**
   * The visible name of the chip. Takes precedence over `children` and `label`. Use text and decorative content only.
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
  onChange?: (event: ChipChangeEvent) => void
}
