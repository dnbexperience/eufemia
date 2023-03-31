/**
 * HTML Element
 *
 */

import type { SharedHProps } from './H'
import H from './H'

const H6 = ({ size = 'x-small', ...props }: SharedHProps) => (
  <H as="h6" size={size} {...props} />
)

export default H6
