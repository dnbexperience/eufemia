/**
 * Flex namespace — uses a plain object rather than `import * as` (Module
 * Namespace exotic object) so it works reliably when re-exported through
 * barrel files and consumed via named imports in all bundlers.
 */

import Container from './Container'
import Item from './Item'
import Stack from './Stack'
import Horizontal from './Horizontal'
import Vertical from './Vertical'
import withChildren from './withChildren'

const Flex = {
  Container,
  Item,
  Stack,
  Horizontal,
  Vertical,
  withChildren,
} as const

export default Flex
