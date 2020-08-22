/**
 * HTML Element
 *
 */

import React from 'react'
import E from './Element'

const Li = (p = {}) => <E is="li" {...p} />
Li.tagName = 'dnb-li'

export default Li
