/**
 * HTML Element
 *
 */

import React from 'react'
import H from './H'

const H1 = (props) => <H is="h1" size="xx-large" {...props} />
H1.tagName = 'dnb-h1'

export default H1
