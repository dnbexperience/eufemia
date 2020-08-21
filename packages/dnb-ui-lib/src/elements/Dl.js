/**
 * HTML Element
 *
 */

import React from 'react'
import E from './Element'

const Dl = (p) => <E is="dl" {...p} skeleton={false} />
Dl.tagName = 'dnb-dl'
export default Dl
