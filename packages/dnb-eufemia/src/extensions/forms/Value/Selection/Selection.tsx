import React from 'react'
import StringValue from '../String'
import { ValueProps } from '../../types'

export type Props = ValueProps<string>

function Selection(props: Props) {
  return <StringValue {...props} />
}

Selection._supportsSpacingProps = true
export default Selection
