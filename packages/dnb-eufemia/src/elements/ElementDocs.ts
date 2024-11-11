import { PropertiesTableProps } from '../shared/types'

export const ElementPropertiesWithoutSkeleton: PropertiesTableProps = {
  innerRef: {
    doc: 'Send along a custom React Ref.',
    type: 'React.RefObject',
    status: 'optional',
  },
  children: {
    doc: 'Contents.',
    type: 'React.Node',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const ElementProperties: PropertiesTableProps = {
  ...ElementPropertiesWithoutSkeleton,
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  skeletonMethod: {
    doc: 'Can be `shape`, `font` or `form`. Defaults to `font`.',
    type: 'string',
    status: 'optional',
  },
}
