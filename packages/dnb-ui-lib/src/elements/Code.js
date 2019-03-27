/**
 * HTML Element
 *
 */

import React from 'react'
import E from './Element'

const Code = p => <E is="code" {...p} />
Code.tagName = 'dnb-code'
export default Code
