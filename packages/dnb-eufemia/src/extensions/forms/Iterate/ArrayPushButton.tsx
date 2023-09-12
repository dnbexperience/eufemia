import React, { useCallback, useContext } from 'react'
import classnames from 'classnames'
import { Button } from '../../../components'
import { ButtonProps } from '../../../components/Button'
import IterateElementContext from './IterateElementContext'
import { useDataValue } from '../hooks'
import {
  DataValueReadWriteComponentProps,
  omitDataValueReadWriteProps,
} from '../types'

export type Props = ButtonProps &
  DataValueReadWriteComponentProps<unknown[]> & {
    pushValue: unknown
  }

function ArrayPushButton(props: Props) {
  const iterateElementContext = useContext(IterateElementContext)
  const { handlePush } = iterateElementContext ?? {}

  const { pushValue, ...restProps } = props
  const buttonProps = omitDataValueReadWriteProps(restProps)
  const { value, handleChange, children } = useDataValue(restProps)

  if (value !== undefined && !Array.isArray(value)) {
    throw new Error('ArrayPushButton received a non-array value.')
  }

  const handleClick = useCallback(() => {
    if (handlePush) {
      // Inside an Iterate element - make the change through the Iterate component
      handlePush(pushValue)
      return
    }

    // If not inside an iterate, it could still manipulate a source data set through useDataValue
    handleChange([...(value ?? []), pushValue])
  }, [value, pushValue, handlePush, handleChange])

  return (
    <Button
      className={classnames(
        'dnb-forms-array-push-button',
        props.className
      )}
      on_click={handleClick}
      {...buttonProps}
    >
      {children}
    </Button>
  )
}

ArrayPushButton._supportsEufemiaSpacingProps = true
export default ArrayPushButton
