/**
 * HTML Element
 *
 */

import React from 'react'
import P from './P'

const Paragraph = (p) => <P style_type="ingress" {...p} />
Paragraph.tagName = 'dnb-p--ingress'
export default Paragraph
