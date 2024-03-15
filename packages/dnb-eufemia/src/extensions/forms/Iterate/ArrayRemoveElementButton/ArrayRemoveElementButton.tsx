import React, { useCallback, useContext } from 'react'
import classnames from 'classnames'
import { Button } from '../../../../components'
import { ButtonProps } from '../../../../components/Button'
import IterateElementContext from '../IterateElementContext'
import { useFieldProps } from '../../hooks'
import {
  DataValueReadWriteComponentProps,
  omitDataValueReadWriteProps,
} from '../../types'

export type Props = ButtonProps &
  DataValueReadWriteComponentProps<unknown[]>

function ArrayRemoveElementButton(props: Props) {
  const iterateElementContext = useContext(IterateElementContext)
  const { handleRemove } = iterateElementContext ?? {}

  if (!iterateElementContext) {
    throw new Error(
      'ArrayRemoveElementButton must be inside an Iterate.Array component.'
    )
  }

  const buttonProps = omitDataValueReadWriteProps(props)

  const { children } = useFieldProps(props)

  const handleClick = useCallback(() => {
    handleRemove()
  }, [handleRemove])

  return (
    <Button
      className={classnames(
        'dnb-forms-array-remove-element-button',
        props.className
      )}
      on_click={handleClick}
      {...buttonProps}
    >
      {children}
    </Button>
  )
}

ArrayRemoveElementButton._supportsSpacingProps = true
export default ArrayRemoveElementButton
