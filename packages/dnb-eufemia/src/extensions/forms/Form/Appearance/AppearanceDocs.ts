import type { PropertiesTableProps } from '../../../../shared/types'

export const FormAppearanceProperties: PropertiesTableProps = {
  size: {
    doc: 'The sizes you can choose is `default`, `medium` and `large`.',
    type: 'string',
    status: 'optional',
  },
}
