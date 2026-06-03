import type { PropertiesTableProps } from '../../../../shared/types'

export const FormAppearanceProperties: PropertiesTableProps = {
  size: {
    doc: 'The sizes you can choose are `default`, `medium` and `large`.',
    type: ['"medium"', '"large"'],
    status: 'optional',
  },
}
