import { PropertiesTableProps } from '../../shared/types'

export const PortalRootProperties: PropertiesTableProps = {
  innerRef: {
    doc: 'The ref of the element that will be used.',
    type: [
      'React.Ref<HTMLElement>',
      'React.MutableRefObject<HTMLElement>',
    ],
    status: 'optional',
  },
  className: {
    doc: 'The className of the portal root.',
    type: ['string'],
    status: 'optional',
  },
  style: {
    doc: 'The style of the portal root.',
    type: ['React.CSSProperties'],
    status: 'optional',
  },
  children: {
    doc: 'The content that will be placed in a React Portal.',
    type: ['ReactNode'],
    status: 'required',
  },
}
