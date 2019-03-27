/**
 * HTML Element
 *
 */

import React from 'react'
import E from './Element'

const Textarea = p => <E is="textarea" {...p} />
Textarea.tagName = 'dnb-textarea'
export default Textarea
