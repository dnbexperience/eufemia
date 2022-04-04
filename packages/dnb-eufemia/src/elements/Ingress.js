/**
 * HTML Element
 *
 */

import React from 'react'
import P from './P'

const Ingress = (p) => <P style_type="ingress" {...p} />
Ingress.tagName = 'dnb-p--ingress'
export default Ingress
