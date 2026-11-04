import type { HTMLAttributes, ReactNode } from 'react'
import type { SpacingProps } from '../../shared/types'
import type { ButtonProps } from '../button/types'

export type CopyOnClickProps = {
  /**
   * Define if the copy cursor should be visible. Defaults to `true`.
   */
  showCursor?: boolean

  /**
   * If `true`, the copy functionality and copy cursor will be omitted. Defaults to `false`.
   */
  disabled?: boolean

  /**
   * Contents to copy. Used when the copied value should differ from the visually shown value(`children`).
   */
  copyContent?: ReactNode

  /**
   * The message shown in the tooltip when the content is copied.
   * Defaults to the translation `CopyOnClick.clipboardCopy`.
   */
  tooltipContent?: ReactNode

  /**
   * Contents.
   */
  children: ReactNode
}

export type CopyOnClickAllProps = CopyOnClickProps &
  SpacingProps &
  HTMLAttributes<HTMLSpanElement>

export type CopyOnClickButtonProps = {
  /**
   * The text to copy.
   */
  copyContent: string | number

  /**
   * The message shown in the tooltip when the content is copied.
   * Defaults to the translation `CopyOnClick.clipboardCopy`.
   */
  tooltipContent?: ReactNode

  /**
   * Describes what the button copies, such as "Copy account number". When the button has no text, it is also used as the `aria-label` and defaults to the translation `CopyOnClick.buttonTitle`.
   */
  title?: ButtonProps['title']

  /**
   * Icon displayed on the button. Defaults to the `copy` icon.
   */
  icon?: ButtonProps['icon']

  /**
   * Button variant. Defaults to `tertiary`.
   */
  variant?: ButtonProps['variant']
} & Omit<ButtonProps, 'title' | 'icon' | 'variant'>
