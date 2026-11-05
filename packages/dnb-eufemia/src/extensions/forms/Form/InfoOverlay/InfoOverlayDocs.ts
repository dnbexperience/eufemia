import type { PropertiesTableProps } from '../../../../shared/types'

export const InfoOverlayProperties: PropertiesTableProps = {
  content: {
    doc: 'The content to show. If not given, the children will be shown. Can be `success`, `error` or a custom content.',
    type: ['"success"', '"error"', 'React.ReactNode'],
    status: 'optional',
  },
  success: {
    doc: 'Texts and button settings for the `success` content. See the success object below.',
    type: 'object',
    status: 'optional',
  },
  error: {
    doc: 'Texts for the `error` content. See the error object below.',
    type: 'object',
    status: 'optional',
  },
  id: {
    doc: 'Unique id for connecting with `Form.InfoOverlay.setContent`. Defaults to the `id` of the surrounding Form.Handler.',
    type: ['string', 'function', 'object', 'React.Context'],
    status: 'optional',
  },
  children: {
    doc: 'The content to show when `content` is not set.',
    type: 'React.ReactNode',
    status: 'required',
  },
}

export const InfoOverlayEvents: PropertiesTableProps = {
  onCancel: {
    doc: 'Will be called when the cancel button in the `error` content is clicked.',
    type: 'function',
    status: 'optional',
  },
}

export const InfoOverlaySuccessProperties: PropertiesTableProps = {
  title: {
    doc: 'The title of the component.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  description: {
    doc: 'The description of the component.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  buttonText: {
    doc: 'The text of the button.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  buttonHref: {
    doc: 'The href of the button.',
    type: 'string',
    status: 'optional',
  },
  buttonClickHandler: {
    doc: 'The click handler of the button.',
    type: 'function',
    status: 'optional',
  },
}

export const InfoOverlayErrorProperties: PropertiesTableProps = {
  title: {
    doc: 'The title of the component.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  description: {
    doc: 'The description of the component.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  cancelButton: {
    doc: 'The text of the cancel button.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  retryButton: {
    doc: 'The text of the retry button.',
    type: 'React.ReactNode',
    status: 'optional',
  },
}
