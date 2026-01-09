/**
 * HTML Element
 *
 */
import React from 'react'
import type { PProps } from './P'
import P from './P'

const Paragraph = (props: PProps) => <P {...props} />

Paragraph._supportsSpacingProps = true

export default Paragraph
