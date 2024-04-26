import React from 'react'
import ValueBlock from '../../ValueBlock'
import { useValueProps } from '../../hooks'
import { ValueProps } from '../../types'

export type Props = ValueProps<string>

function StringComponent(props: Props) {
  const { value, ...rest } = useValueProps(props)

  return <ValueBlock {...rest}>{value}</ValueBlock>
}

StringComponent._supportsSpacingProps = true
export default StringComponent
