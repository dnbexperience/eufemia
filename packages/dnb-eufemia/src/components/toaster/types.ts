import type { ReactNode } from 'react'
import type { SpacingProps } from '../../shared/types'

export type ToasterVariant =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'neutral'

export type ToasterPriority = 'low' | 'high'

export type ToasterMessageStatus =
  | 'unread'
  | 'read'
  | 'dismissed'
  | 'expired'

export type ToasterPrivacy = 'normal' | 'sensitive'

export type ToasterFocus = 'none' | 'message' | 'first-action'

export type ToasterPlacement =
  | 'bottom-center'
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'

export type ToasterMessage = {
  /** Unique identifier for the message. */
  id: string

  /** Visual variant of the message. Default: `'neutral'` */
  variant?: ToasterVariant

  /** Short heading for the message. */
  title?: string

  /** Body text or content of the message. */
  text?: ReactNode

  /** Priority of the announcement to assistive technology. `low` waits for idle, `high` interrupts. Default: `'low'` */
  priority?: ToasterPriority

  /** Action buttons displayed in the message. Provide React elements directly, e.g. `<Button>` components. */
  actions?: ReactNode

  /** Controls focus behavior when the message appears. Default: `'none'` */
  focus?: ToasterFocus

  /** Privacy level of the message content. Default: `'normal'` */
  privacy?: ToasterPrivacy

  /** Fallback text shown after sensitive content is removed on dismiss. */
  privacyFallbackText?: string

  /** Current lifecycle status. Managed internally. */
  status?: ToasterMessageStatus

  /** Timestamp when the message was created. Set internally. */
  createdAt?: number
}

export type AddMessageInput = Omit<
  ToasterMessage,
  'id' | 'status' | 'createdAt'
> & {
  /** Unique identifier for the message. Auto-generated when omitted. */
  id?: string
}

export type ToasterContextValue = {
  messages: ToasterMessage[]
  addMessage: (message: AddMessageInput) => void
  removeMessage: (id: string) => void
  updateMessage: (id: string, updates: Partial<ToasterMessage>) => void
  dismissMessage: (id: string) => void
  dismissAllMessages: () => void
  markMessageAsRead: (id: string) => void
}

export type NotificationButtonPlacement = 'inline' | 'floating'

export type ToasterProps = {
  /** A unique identifier for this Toaster instance. */
  id?: string

  /** Render messages inline instead of as a notification center entry point. Default: `false` */
  inline?: boolean

  /** Where to position the overlay messages. Default: `'bottom-center'` */
  placement?: ToasterPlacement

  /** Placement of the notification button. Default: `'floating'` */
  notificationButtonPlacement?: NotificationButtonPlacement

  /** Automatically hide the notification button when no messages are present. Default: `false` */
  autoHideNotificationButton?: boolean

  /** Show a badge on the notification button with the message count. Default: `false` */
  showBadge?: boolean

  /** Additional CSS class name. */
  className?: string

  /** Content to render inside the Toaster (only relevant when used as a provider). */
  children?: ReactNode
} & SpacingProps

export type ToasterItemProps = {
  /** The message data to render. */
  message: ToasterMessage

  /** Called when the user dismisses the message. */
  onDismiss?: (id: string) => void

  /** Called when the message becomes visible (for marking as read). */
  onVisible?: (id: string) => void

  /** Additional CSS class name. */
  className?: string
}
