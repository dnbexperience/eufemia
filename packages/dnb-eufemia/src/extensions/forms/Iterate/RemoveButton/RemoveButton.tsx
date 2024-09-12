import React, { useCallback, useContext } from 'react'
import classnames from 'classnames'
import { Button } from '../../../../components'
import { ButtonProps } from '../../../../components/Button'
import IterateItemContext from '../IterateItemContext'
import { useFieldProps, useTranslation } from '../../hooks'
import ArrayItemAreaContext from '../Array/ArrayItemAreaContext'
import {
  DataValueReadWriteComponentProps,
  omitDataValueReadWriteProps,
} from '../../types'
import { trash } from '../../../../icons'

export type Props = ButtonProps &
  DataValueReadWriteComponentProps<unknown[]>

function RemoveButton(props: Props) {
  const iterateItemContext = useContext(IterateItemContext)
  const { handleRemove } = iterateItemContext || {}

  if (!iterateItemContext) {
    throw new Error('RemoveButton must be inside an Iterate.Array')
  }

  const { className, ...restProps } = props
  const { children, text } = useFieldProps(restProps)
  const buttonProps = omitDataValueReadWriteProps(restProps)
  const translation = useTranslation().RemoveButton
  const textContent = text || children || translation.text

  const elementBlockContext = useContext(ArrayItemAreaContext)
  const { handleRemoveItem } = elementBlockContext || {}

  const handleClick = useCallback(() => {
    if (handleRemoveItem) {
      handleRemoveItem?.()
    } else {
      handleRemove?.()
    }
  }, [handleRemove, handleRemoveItem])

  return (
    <Button
      className={classnames(
        'dnb-forms-iterate-remove-element-button',
        className
      )}
      variant={textContent ? 'tertiary' : 'secondary'}
      icon={trash}
      icon_position="left"
      on_click={handleClick}
      {...buttonProps}
    >
      {textContent}
    </Button>
  )
}

RemoveButton._supportsSpacingProps = true
export default RemoveButton
