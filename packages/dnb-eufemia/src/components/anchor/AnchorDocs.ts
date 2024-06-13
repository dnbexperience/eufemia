import { PropertiesTableProps } from '../../shared/types'

export const AnchorProperties: PropertiesTableProps = {
  element: {
    doc: 'Define what HTML or React element should be used (e.g. `element={Link}`). Defaults to semantic `a` element.',
    type: 'React.Element',
    status: 'optional',
  },
  href: {
    doc: 'Relative or absolute url.',
    type: 'string',
    status: 'optional',
  },
  to: {
    doc: 'Use this prop only if you are using a router Link component as the `element` that uses the `to` property to declare the navigation url.',
    type: 'string',
    status: 'optional',
  },
  target: {
    doc: 'Defines the opening method. Use `_blank` to open a new browser window/tab.',
    type: 'string',
    status: 'optional',
  },
  targetBlankTitle: {
    doc: 'The title shown as a tooltip when target is set to `_blank`.',
    type: 'string',
    status: 'optional',
  },
  tooltip: {
    doc: 'Provide a string or a React Element to be shown as the tooltip content.',
    type: 'string',
    status: 'optional',
  },
  icon: {
    doc: '[Primary Icons](/icons/primary) can be set as a string (e.g. icon="chevron_right"), other icons should be set as React elements.',
    type: 'React.Node',
    status: 'optional',
  },
  iconPosition: {
    doc: '`left` (default) or `right`. Places icon to the left or to the right of the text.',
    type: 'string',
    status: 'optional',
  },
  noAnimation: {
    doc: 'Removes animations if set to `true`. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  noHover: {
    doc: 'Removes hover effects if set to `true`. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  noStyle: {
    doc: 'Removes styling if set to `true`. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  noUnderline: {
    doc: 'Removes underline if set to `true`. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const AnchorEvents: PropertiesTableProps = {}
