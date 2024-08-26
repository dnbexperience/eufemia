import React, { useCallback, useContext } from 'react'
import classnames from 'classnames'
import { Button } from '../../../../components'
import { ButtonProps } from '../../../../components/Button'
import IterateItemContext from '../IterateItemContext'
import { useFieldProps } from '../../hooks'
import {
  DataValueReadWriteComponentProps,
  omitDataValueReadWriteProps,
} from '../../types'
import { add } from '../../../../icons'

export type Props = ButtonProps &
  DataValueReadWriteComponentProps<unknown[]> & {
    pushValue: unknown | ((value: unknown) => void)
  }

function PushButton(props: Props) {
  const iterateItemContext = useContext(IterateItemContext)
  const { handlePush } = iterateItemContext ?? {}

  const { pushValue, className, ...restProps } = props
  const buttonProps = omitDataValueReadWriteProps(restProps)
  const { value, handleChange, children } = useFieldProps(restProps)

  if (value !== undefined && !Array.isArray(value)) {
    throw new Error('PushButton received a non-array value')
  }

  const handleClick = useCallback(() => {
    const newValue =
      typeof pushValue === 'function' ? pushValue(value) : pushValue

    if (handlePush) {
      // Inside an Iterate element - make the change through the Iterate component
      handlePush(newValue)
      return // stop here
    }

    // If not inside an iterate, it could still manipulate a source data set through useFieldProps
    handleChange([...(value ?? []), newValue])
  }, [value, pushValue, handlePush, handleChange])

  return (
    <Button
      className={classnames('dnb-forms-iterate-push-button', className)}
      variant="secondary"
      icon={add}
      icon_position="left"
      on_click={handleClick}
      {...buttonProps}
    >
      {children}
    </Button>
  )
}

PushButton._supportsSpacingProps = true
export default PushButton
