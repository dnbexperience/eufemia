/**
 * HTML Element
 *
 */
import React from 'react'
import type { PProps } from './P';
import P from './P'

const Ingress = (props: PProps) => <P weight="medium" {...props} />

Ingress._supportsSpacingProps = true

export default Ingress
