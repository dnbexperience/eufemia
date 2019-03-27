/**
 * HTML Element
 *
 */

import React from 'react'
import E from './Element'

const Ul = p => <E is="ul" {...p} />
Ul.tagName = 'dnb-ul'
export default Ul
