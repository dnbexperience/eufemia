import React, { useCallback, useContext } from 'react'
import classnames from 'classnames'
import { Button } from '../../../components'
import { ButtonProps } from '../../../components/Button'
import { forwardSpaceProps } from '../utils'
import IterateElementContext from './IterateElementContext'
import { useDataValue } from '../hooks'
import {
  ComponentProps,
  DataValueReadProps,
  DataValueWriteProps,
} from '../types'

export type Props = ComponentProps &
  DataValueReadProps<unknown[]> &
  DataValueWriteProps<unknown[]> & {
    text?: ButtonProps['text']
    pushValue: unknown
    children?: ButtonProps['children']
  }

function ArrayPushButton(props: Props) {
  const iterateElementContext = useContext(IterateElementContext)
  const { handlePush } = iterateElementContext ?? {}

  const { text, value, pushValue, handleChange, children } =
    useDataValue(props)

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
    console.log('TO ADD', value)
    handleChange([...(value ?? []), pushValue])
  }, [value, pushValue, handlePush, handleChange])

  return (
    <Button
      className={classnames(
        'dnb-forms-array-push-button',
        props.className,
      )}
      text={text}
      on_click={handleClick}
      {...forwardSpaceProps(props)}
    >
      {children}
    </Button>
  )
}

ArrayPushButton._supportsEufemiaSpacingProps = true
export default ArrayPushButton
