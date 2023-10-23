/**
 * HTML Element
 *
 */
import React from 'react'
import P, { PProps } from './P'

const Paragraph = (props: PProps) => <P {...props} />

Paragraph._supportsSpacingProps = true

export default Paragraph
