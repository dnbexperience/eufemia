import type { HTMLAttributes, ReactNode } from 'react'
import type { SpacingProps } from '../../shared/types'

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
