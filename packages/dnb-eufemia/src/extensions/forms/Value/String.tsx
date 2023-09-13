import React from 'react'
import ValueBlock from '../ValueBlock'
import { useDataValue } from '../hooks'
import { ValueProps, pickSpacingProps } from '../types'

export type Props = ValueProps<string>

function StringComponent(props: Props) {
  const {
    className,
    label,
    placeholder,
    value,
    inline,
    showEmpty,
    prepare = (value) => value,
  } = useDataValue(props)

  return (
    <ValueBlock
      className={className}
      label={label}
      showEmpty={showEmpty}
      placeholder={placeholder}
      inline={inline}
      {...pickSpacingProps(props)}
    >
      {prepare(value)}
    </ValueBlock>
  )
}

StringComponent._supportsEufemiaSpacingProps = true
export default StringComponent
