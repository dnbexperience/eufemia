/**
 * HTML Element
 *
 */
import React from 'react'
import P, { PProps } from './P'

const Ingress = (props: PProps) => <P medium {...props} />

Ingress._supportsSpacingProps = true

export default Ingress
