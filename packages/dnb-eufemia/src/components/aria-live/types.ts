export type AriaLiveProps = {
  element?: React.ElementType

  /**
   * The variant of the announcement. Can be 'text' or 'content'.
   */
  variant?: 'text' | 'content'

  /**
   * The priority level of the announcement. Can be 'low', or 'high'.
   */
  priority?: 'low' | 'high'

  /**
   * Delay in milliseconds before the announcement is made. Defaults to 1000.
   * @default 1000
   */
  delay?: number

  /**
   * Whether the AriaLive component is on or off.
   * @default false
   */
  disabled?: boolean

  /**
   * The politeness level of the announcement. Can be 'off', 'polite', or 'assertive'.
   */
  politeness?: React.HTMLAttributes<HTMLElement>['aria-live']

  /**
   * Whether the entire region should be considered as a whole when communicating updates.
   */
  atomic?: React.HTMLAttributes<HTMLElement>['aria-atomic']

  /**
   * What types of changes should be presented to the user. Can be 'additions', 'removals', 'text', or 'all'.
   */
  relevant?: React.HTMLAttributes<HTMLElement>['aria-relevant']

  /**
   * Whether to show the children or not.
   * @default false
   */
  showAnnouncement?: boolean

  /**
   * The content to be announced.
   */
  children: React.ReactNode
}

export type AriaLiveAllProps = AriaLiveProps &
  React.HTMLAttributes<HTMLElement>
