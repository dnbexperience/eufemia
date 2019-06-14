/**
 * HTML Element
 *
 */

import React from 'react'
import E from './Element'

const Paragraph = p => <E is="p" {...p} />
Paragraph.tagName = 'dnb-p'
export default Paragraph
