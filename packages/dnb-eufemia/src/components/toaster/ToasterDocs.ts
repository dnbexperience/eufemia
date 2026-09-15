import type { PropertiesTableProps } from '../../shared/types'

export const ToasterProperties: PropertiesTableProps = {
  id: {
    doc: 'A unique identifier for this Toaster instance.',
    type: 'string',
    status: 'optional',
  },
  children: {
    doc: 'Content to render inside the Toaster. When provided, the Toaster acts as both a provider and a renderer.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  className: {
    doc: 'Custom `className` for the component root.',
    type: 'string',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const ToasterHostProperties: PropertiesTableProps = {
  id: {
    doc: 'A unique identifier for this Toaster instance. All other compound components use this value as their `hostId`.',
    type: 'string',
    status: 'required',
  },
  placement: {
    doc: 'Where to position overlay toast messages. Defaults to `bottom-center`.',
    type: '"bottom-center"',
    status: 'optional',
  },
  className: {
    doc: 'Custom `className` for the component root.',
    type: 'string',
    status: 'optional',
  },
  children: {
    doc: 'Content to render inside the host.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const ToasterFocusProxyProperties: PropertiesTableProps = {
  hostId: {
    doc: 'The `id` of the `Toaster.Host` this component belongs to.',
    type: 'string',
    status: 'required',
  },
  floating: {
    doc: 'Whether the associated notification button uses floating (fixed-position) placement. Must match the `floating` prop on `NotificationCenter.Button`. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
}

export const ToasterNotificationCenterProperties: PropertiesTableProps = {
  hostId: {
    doc: 'The `id` of the `Toaster.Host` this component belongs to.',
    type: 'string',
    status: 'required',
  },
}

export const ToasterNotificationCenterButtonProperties: PropertiesTableProps =
  {
    hostId: {
      doc: 'The `id` of the `Toaster.Host` this component belongs to.',
      type: 'string',
      status: 'required',
    },
    floating: {
      doc: 'Use floating (fixed-position) button placement. When `true`, the button is fixed in the bottom-right corner of the viewport. Defaults to `true`.',
      type: 'boolean',
      status: 'optional',
    },
    autoHide: {
      doc: 'Automatically hide the button when there are no messages. It reappears when new messages arrive. Defaults to `false`.',
      type: 'boolean',
      status: 'optional',
    },
    showBadge: {
      doc: 'Show a badge with the unread message count. Defaults to `false`.',
      type: 'boolean',
      status: 'optional',
    },
    '[Button props]': {
      doc: 'All standard [Button](/uilib/components/button/properties) props are supported and forwarded to the inner Button.',
      type: 'Various',
      status: 'optional',
    },
  }

export const ToasterNotificationCenterListProperties: PropertiesTableProps =
  {
    hostId: {
      doc: 'The `id` of the `Toaster.Host` this component belongs to.',
      type: 'string',
      status: 'required',
    },
    order: {
      doc: 'Display order of messages. `asc` shows oldest first, `desc` shows newest first. Defaults to `asc`.',
      type: [`'asc'`, `'desc'`],
      status: 'optional',
    },
  }

export const ToasterMessageProperties: PropertiesTableProps = {
  id: {
    doc: 'Unique identifier for the message.',
    type: 'string',
    status: 'required',
  },
  variant: {
    doc: 'Visual variant of the message. Defaults to `neutral`.',
    type: ['"neutral"', '"info"', '"success"', '"warning"', '"error"'],
    status: 'optional',
  },
  title: {
    doc: 'Short heading for the message.',
    type: 'string',
    status: 'optional',
  },
  text: {
    doc: 'Body text or content of the message.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  actions: {
    doc: 'Action buttons displayed in the message. Provide React elements directly, e.g. `<Button>` components.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  privacy: {
    doc: 'Privacy level of the message content. When set to `sensitive`, the notification center shows `privacyFallbackText` instead of the original text, and hides actions. The toast stack still shows the full content. Defaults to `normal`.',
    type: ['"normal"', '"sensitive"'],
    status: 'optional',
  },
  privacyFallbackText: {
    doc: 'Text shown in place of the original text in the notification center for sensitive messages.',
    type: 'string',
    status: 'optional',
  },
  priority: {
    doc: 'Priority of the announcement to assistive technology. `low` waits for idle, `high` interrupts immediately. Defaults to `low`.',
    type: ['"low"', '"high"'],
    status: 'optional',
  },
}

export const ToasterHookMethods: PropertiesTableProps = {
  addMessage: {
    doc: 'Add a new message to the Toaster. If a message with the same `id` already exists, it will be updated.',
    type: '(message: AddMessageInput) => void',
    status: 'required',
  },
  removeMessage: {
    doc: 'Remove a message entirely from the list.',
    type: '(id: string) => void',
    status: 'required',
  },
  updateMessage: {
    doc: 'Update properties of an existing message.',
    type: '(id: string, updates: Partial<ToasterMessage>) => void',
    status: 'required',
  },
  dismissMessage: {
    doc: 'Dismiss a message (marks it as dismissed). Sensitive messages will have their content cleared.',
    type: '(id: string) => void',
    status: 'required',
  },
  dismissAllMessages: {
    doc: 'Dismiss all active messages.',
    type: '() => void',
    status: 'required',
  },
  markMessageAsRead: {
    doc: 'Mark a message as read (changes status from `unread` to `read`).',
    type: '(id: string) => void',
    status: 'required',
  },
  messages: {
    doc: 'The current list of all messages.',
    type: 'Array<ToasterMessage>',
    status: 'required',
  },
}
