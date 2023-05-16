import React from 'react'
import Value from '../Value/Value'
import { forwardSpaceProps } from '../utils'
import { useValue } from './hooks'
import type { ComponentProps } from '../component-types'
import type { ValueProps } from '../value-types'

export type Props = ComponentProps & ValueProps<string>

export default function DataValueString(props: Props) {
  const {
    className,
    'data-testid': dataTestId,
    label,
    placeholder,
    value,
    inline,
    showEmpty,
  } = useValue(props)

  return (
    <Value
      className={className}
      data-testid={dataTestId}
      label={label}
      showEmpty={showEmpty}
      placeholder={placeholder}
      inline={inline}
      {...forwardSpaceProps(props)}
    >
      {value}
    </Value>
  )
}
