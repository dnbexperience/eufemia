/**
 * HTML Element
 *
 */

import React from 'react'
import P from './P'

const Paragraph = (p) => <P {...p} />
Paragraph.tagName = 'dnb-p'
export default Paragraph
