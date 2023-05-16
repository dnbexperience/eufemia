import React, { useContext } from 'react'
import Value from '../Value/Value'
import { useValue } from './hooks'
import { forwardSpaceProps } from '../utils'
import type { ComponentProps } from '../component-types'
import type { ValueProps } from '../value-types'
import SharedContext from '../../../shared/Context'

export type Props = ComponentProps & ValueProps<boolean>

export default function DataValueBoolean(props: Props) {
  const sharedContext = useContext(SharedContext)
  const {
    className,
    'data-testid': dataTestId,
    label,
    placeholder,
    showEmpty,
    value,
    inline,
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
      {value === true || value === false
        ? value === true
          ? sharedContext?.translation.Forms.booleanYes
          : sharedContext?.translation.Forms.booleanNo
        : null}
    </Value>
  )
}
