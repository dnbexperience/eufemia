/**
 * HTML Element
 *
 */

import type { SharedHProps } from './H'
import H from './H'

const H2 = ({ size = 'large', ...props }: SharedHProps) => (
  <H as="h2" size={size} {...props} />
)

export default H2
