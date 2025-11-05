import { PropertiesTableProps } from '../../../../shared/types'

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
  '[Section](/uilib/components/section/properties)': {
    doc: 'All Section properties.',
    type: 'various',
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
  '[Section](/uilib/components/section/properties)': {
    doc: 'All Section properties.',
    type: 'various',
    status: 'optional',
  },
}
