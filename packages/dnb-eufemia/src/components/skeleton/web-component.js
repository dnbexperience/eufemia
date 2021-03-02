/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Skeleton from './Skeleton'
export default Skeleton
export * from './Skeleton'

registerElement(Skeleton.tagName, Skeleton, Skeleton.defaultProps)
