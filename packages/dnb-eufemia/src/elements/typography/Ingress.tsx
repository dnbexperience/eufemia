/**
 * HTML Element
 *
 */
import React from 'react'
import P, { PProps } from './P'

const Ingress = (props: PProps) => <P weight="medium" {...props} />

Ingress._supportsSpacingProps = true

export default Ingress
