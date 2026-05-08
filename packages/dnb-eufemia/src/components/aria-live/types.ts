import type { ElementType, HTMLAttributes, ReactNode } from 'react'
export type AriaLiveProps = {
  element?: ElementType

  /**
   * The variant of the announcement. Can be 'text' or 'content'.
   */
  variant?: 'text' | 'content'

  /**
   * The priority level of the announcement. Can be 'low', or 'high'.
   */
  priority?: 'low' | 'high'

  /**
   * Delay in milliseconds before the announcement is made. Defaults to `1000`.
   * Default: `1000`
   */
  delay?: number

  /**
   * Whether the AriaLive component is on or off.
   * Default: `false`
   */
  disabled?: boolean

  /**
   * The politeness level of the announcement. Can be 'off', 'polite', or 'assertive'.
   */
  politeness?: HTMLAttributes<HTMLElement>['aria-live']

  /**
   * Whether the entire region should be considered as a whole when communicating updates.
   */
  atomic?: HTMLAttributes<HTMLElement>['aria-atomic']

  /**
   * What types of changes should be presented to the user. Can be 'additions', 'removals', 'text', or 'all'.
   */
  relevant?: HTMLAttributes<HTMLElement>['aria-relevant']

  /**
   * Whether to show the children or not.
   * Default: `false`
   */
  showAnnouncement?: boolean

  /**
   * The content to be announced.
   */
  children: ReactNode
}

export type AriaLiveAllProps = AriaLiveProps & HTMLAttributes<HTMLElement>
