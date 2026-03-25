import { PropertiesTableProps } from '../../shared/types'
import { skeletonProperty, spacingProperties } from './StatDocsUtils'

export const LabelProperties: PropertiesTableProps = {
  children: {
    doc: 'Label content.',
    type: ['React.ReactNode'],
    status: 'optional',
  },
  srOnly: {
    doc: 'If `true`, hides the label visually while keeping it available for screen readers.',
    type: ['boolean'],
    defaultValue: 'false',
    status: 'optional',
  },
  fontWeight: {
    doc: 'Typography weight for the label.',
    type: ['"regular"', '"medium"'],
    defaultValue: 'regular',
    status: 'optional',
  },
  fontSize: {
    doc: 'Typography size for the label. Line-height is derived from the shared heading/text scale.',
    type: [
      '"x-small"',
      '"small"',
      '"basis"',
      '"medium"',
      '"large"',
      '"x-large"',
      '"xx-large"',
    ],
    defaultValue: 'basis',
    status: 'optional',
  },
  variant: {
    doc: 'Label color style variant. `"default"` is deprecated — use `"plain"` instead.',
    type: ['"plain"', '"subtle"'],
    defaultValue: 'plain',
    status: 'optional',
  },
  skeleton: skeletonProperty,
  '[Space](/uilib/layout/space/properties)': spacingProperties,
}
