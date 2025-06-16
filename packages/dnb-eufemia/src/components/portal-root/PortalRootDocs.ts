import { PropertiesTableProps } from '../../shared/types'

export const PortalRootProperties: PropertiesTableProps = {
  children: {
    doc: 'The content that will be placed in a React Portal.',
    type: ['ReactNode'],
    status: 'required',
  },
}
