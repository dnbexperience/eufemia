import type { HTMLAttributes, ReactNode } from 'react'
import type { SpacingProps } from '../../shared/types'

export type CopyOnClickProps = {
  /**
   * Whether to show the copy cursor or not.
   * Default: `true`
   */
  showCursor?: boolean

  /**
   * If `true`, the copy functionality and copy cursor will be omitted.
   * Default: `false`
   */
  disabled?: boolean

  /**
   * The content to be copied.
   * Used when the copied value should differ from the visually shown value(`children`).
   */
  copyContent?: ReactNode

  /**
   * The message shown in the tooltip when the content is copied.
   * Defaults to the translation `CopyOnClick.clipboardCopy`.
   */
  tooltipContent?: ReactNode

  /**
   * The content/children to be copied.
   */
  children: ReactNode
}

export type CopyOnClickAllProps = CopyOnClickProps &
  SpacingProps &
  HTMLAttributes<HTMLSpanElement>
