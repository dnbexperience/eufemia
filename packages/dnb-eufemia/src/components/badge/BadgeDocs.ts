import { PropertiesTableProps } from '../../shared/types'

export const BadgeProperties: PropertiesTableProps = {
  content: {
    doc: 'Content of the component.',
    type: ['string', 'number', 'React.ReactNode'],
    status: 'optional',
  },
  children: {
    doc: 'Content to display the badge on top of.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  vertical: {
    doc: 'Vertical positioning of the component. Options: `bottom` | `top`.',
    type: ['top', 'bottom'],
    status: 'optional',
  },
  horizontal: {
    doc: 'Horizontal positioning of the component. Options: `left` | `right`.',
    type: ['left', 'right'],
    status: 'optional',
  },
  className: {
    doc: 'Custom className for the component.',
    type: 'string',
    status: 'optional',
  },
  skeleton: {
    doc: 'Applies loading skeleton.',
    type: 'boolean',
    status: 'optional',
  },
  variant: {
    doc: 'defines the visual appearance of the badge. There are two main variants `notification` and `information`. The `content` variant is just for placement purposes, and will require you to style the `content` all by yourself. The default variant is `information`.',
    type: ['information', 'notification', 'content'],
    status: 'optional',
  },
  label: {
    doc: 'The label description of the badge. Only required when passing a number as the badge content.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
