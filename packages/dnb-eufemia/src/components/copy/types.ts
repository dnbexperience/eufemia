export type CopyProps = {
  element?: React.ElementType

  /**
   * Whether the show the copy cursor or not.
   * @default true
   */
  showCursor?: boolean

  /**
   * Whether the Copy component is on or off.
   * @default false
   */
  disabled?: boolean

  /**
   * The content to be copied.
   */
  children: React.ReactNode
}

export type CopyAllProps = CopyProps & React.HTMLAttributes<HTMLElement>
