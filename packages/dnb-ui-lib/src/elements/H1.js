/**
 * HTML Element
 *
 */

import React from 'react'
import E from './Element'

const H1 = p => <E is="h1" {...p} />
H1.tagName = 'dnb-h1'
export default H1
