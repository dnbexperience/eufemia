/**
 * HTML Element
 *
 */
import type { PProps } from './P'
import P from './P'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

const Paragraph = (props: PProps) => <P {...props} />

withComponentMarkers(Paragraph, {
  _supportsSpacingProps: true,
})

export default Paragraph
