/**
 * HTML Element
 *
 */

import React from 'react'
import P from './P'

const Lead = (p) => <P style_type="lead" {...p} />
Lead.tagName = 'dnb-p--lead'
export default Lead
