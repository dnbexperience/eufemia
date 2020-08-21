/**
 * HTML Element
 *
 */

import React from 'react'
import E from './Element'

const Dt = (p = {}) => <E is="dt" {...p} />
Dt.tagName = 'dnb-dt'

export default Dt
