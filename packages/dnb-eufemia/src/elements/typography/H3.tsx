/**
 * HTML Element
 *
 */

import type { SharedHProps } from './H'
import H from './H'

const H3 = ({ size = 'medium', ...props }: SharedHProps) => (
  <H as="h3" size={size} {...props} />
)

export default H3
