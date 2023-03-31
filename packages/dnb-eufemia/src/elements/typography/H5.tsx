/**
/**
 * HTML Element
 *
 */

import type { SharedHProps } from './H'
import H from './H'

const H5 = ({ size = 'small', ...props }: SharedHProps) => (
  <H as="h5" size={size} {...props} />
)

export default H5
