/**
 * HTML Element
 *
 */

import React from 'react'
import E from './Element'

const P = p => <E is="p" {...p} />
P.tagName = 'dnb-p'
export default P
