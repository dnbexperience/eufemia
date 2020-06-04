/**
 * HTML Element
 *
 */

import React from 'react'
import E from './Element'

const Lead = (p) => <E is="p" {...p} />
Lead.tagName = 'dnb-lead'
export default Lead
