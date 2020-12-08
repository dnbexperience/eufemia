/**
 * HTML Element
 *
 */

import React from 'react'
import E from './Element'

const Dd = (p = {}) => <E is="dd" {...p} />
Dd.tagName = 'dnb-dd'

export default Dd
