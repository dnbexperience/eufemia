/**
 * HTML Element
 *
 */
import P, { PProps } from './P'

const Paragraph = (props: PProps) => <P {...props} />

Paragraph._supportsSpacingProps = true

export default Paragraph
