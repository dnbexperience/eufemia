/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import SummaryTable from './SummaryTable'
export default SummaryTable
export * from './SummaryTable'

registerElement(
  SummaryTable.tagName,
  SummaryTable,
  SummaryTable.defaultProps
)
