/**
 * HTML Element
 *
 */

import React from 'react'
import E from './Element'

const Blockquote = (p) => (
  <E is="blockquote" skeleton_method="font-only" {...p} />
)
Blockquote.tagName = 'dnb-blockquote'
export default Blockquote
