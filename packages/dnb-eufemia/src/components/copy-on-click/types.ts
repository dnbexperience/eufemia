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
   */
  children: React.ReactNode
}

export type CopyOnClickAllProps = CopyOnClickProps &
  React.HTMLAttributes<HTMLElement>
