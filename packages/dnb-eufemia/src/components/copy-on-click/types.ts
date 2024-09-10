import { SpacingProps } from '../space/types'

export type CopyOnClickProps = {
  /**
   * Whether to show the copy cursor or not.
   * @default true
   */
  showCursor?: boolean

  /**
   * Whether the CopyOnClick component is on or off.
   * @default false
   */
  disabled?: boolean

  /**
   * The content to be copied.
   * Used when the copied value should differ from the visually shown value(`children`).
   */
  copyContent?: React.ReactNode

  /**
   * The content/children to be copied.
   */
  children: React.ReactNode
}

export type CopyOnClickAllProps = CopyOnClickProps &
  SpacingProps &
  React.HTMLAttributes<HTMLSpanElement>
