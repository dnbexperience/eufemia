/**
 * HTML Element
 *
 */

import React from 'react'
import H from './H'

const H2 = (props) => <H is="h2" size="large" {...props} />
H2.tagName = 'dnb-h2'

export default H2
