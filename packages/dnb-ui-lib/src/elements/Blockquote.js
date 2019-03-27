/**
 * HTML Element
 *
 */

import React from 'react'
import E from './Element'

const Blockquote = p => <E is="blockquote" {...p} />
Blockquote.tagName = 'dnb-blockquote'
export default Blockquote
