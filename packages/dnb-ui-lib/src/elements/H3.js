/**
 * HTML Element
 *
 */

import React from 'react'
import E from './Element'

const H3 = p => <E is="h3" {...p} />
H3.tagName = 'dnb-h3'
export default H3
