import type { PropertiesTableProps } from '../../../../shared/types'

import { ListFormatProperties } from '../../../../components/list-format/ListFormatDocs'

// `value` is in the general properties; the other omitted keys are not supported
const {
  value,
  children,
  inside,
  outside,
  nested,
  ref,
  ...listProperties
} = ListFormatProperties

export const ArraySelectionProperties: PropertiesTableProps = {
  ...listProperties,
}
