/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Pagination from './Pagination'
export default Pagination
export * from './Pagination'

registerElement(Pagination.tagName, Pagination, Pagination.defaultProps)
