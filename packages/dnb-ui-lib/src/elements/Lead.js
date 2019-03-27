/**
 * HTML Element
 *
 */

import React from 'react'
import E from './Element'

const Lead = p => <E is="h3" {...p} />
Lead.tagName = 'dnb-lead'
export default Lead
