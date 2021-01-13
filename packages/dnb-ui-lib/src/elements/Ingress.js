/**
 * HTML Element
 *
 */

import React from 'react'
import P from './P'

const Paragraph = (p) => <P style_type="ingress" {...p} />
Paragraph.tagName = 'dnb-p__style--ingress'
export default Paragraph
