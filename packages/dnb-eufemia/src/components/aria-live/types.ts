import type { ElementType, HTMLAttributes, ReactNode } from 'react'
export type AriaLiveProps = {
  element?: ElementType

  /**
   * Can be `text` for text messages or `content` for whole application content. Defaults to `text`.
   */
  variant?: 'text' | 'content'

  /**
   * Priority of the announcement. Can be `low` or `high`. Defaults to `low`.
   */
  priority?: 'low' | 'high'

  /**
   * Delay in milliseconds before the announcement is made. Defaults to `1000`.
   */
  delay?: number

  /**
   * If `true`, the announcement will not be made. Defaults to `false`.
   */
  disabled?: boolean

  /**
   * The politeness level of the announcement. Can be `off`, `polite`, or `assertive`.
   */
  politeness?: HTMLAttributes<HTMLElement>['aria-live']

  /**
   * If `true`, assistive technologies will present the entire region as a whole. If `false`, only additions will be announced.
   */
  atomic?: HTMLAttributes<HTMLElement>['aria-atomic']

  /**
   * A space-separated list of the types of changes that should be announced. Can be `additions`, `removals`, `text`, or `all`.
   */
  relevant?: HTMLAttributes<HTMLElement>['aria-relevant']

  /**
   * Whether to show the children or not. Defaults to `false`.
   */
  showAnnouncement?: boolean

  /**
   * The content that will be announced to the user.
   */
  children: ReactNode
}

export type AriaLiveAllProps = AriaLiveProps & HTMLAttributes<HTMLElement>
