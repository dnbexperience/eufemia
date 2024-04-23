import React from 'react'
import ValueBlock from '../../ValueBlock'
import { useFieldProps } from '../../hooks'
import { ValueProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'

export type Props = ValueProps<string>

function StringComponent(props: Props) {
  const {
    className,
    label,
    placeholder,
    value,
    inline,
    maxWidth,
    showEmpty,
    prepare = (value) => value,
  } = useFieldProps(props)

  return (
    <ValueBlock
      className={className}
      label={label}
      showEmpty={showEmpty}
      placeholder={placeholder}
      inline={inline}
      maxWidth={maxWidth}
      {...pickSpacingProps(props)}
    >
      {prepare(value)}
    </ValueBlock>
  )
}

StringComponent._supportsSpacingProps = true
export default StringComponent
