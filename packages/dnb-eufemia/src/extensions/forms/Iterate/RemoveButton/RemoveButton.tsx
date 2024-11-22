import React, { useCallback, useContext } from 'react'
import classnames from 'classnames'
import { Button, Dialog } from '../../../../components'
import { ButtonProps } from '../../../../components/Button'
import IterateItemContext from '../IterateItemContext'
import { useTranslation } from '../../hooks'
import ArrayItemAreaContext from '../Array/ArrayItemAreaContext'
import {
  DataValueReadWriteComponentProps,
  omitDataValueReadWriteProps,
} from '../../types'
import { trash } from '../../../../icons'

export type Props = ButtonProps &
  DataValueReadWriteComponentProps<unknown[]> & {
    confirmRemove?: boolean
  }

function RemoveButton(props: Props) {
  const iterateItemContext = useContext(IterateItemContext)
  const { handleRemove } = iterateItemContext || {}

  if (!iterateItemContext) {
    throw new Error('RemoveButton must be inside an Iterate.Array')
  }

  const { text, children, className, confirmRemove, ...restProps } = props
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

  const triggerAttributes: ButtonProps = {
    className: classnames(
      'dnb-forms-iterate-remove-element-button',
      className
    ),
    text: textContent,
    variant: textContent ? 'tertiary' : 'secondary',
    icon: trash,
    icon_position: 'left',
    ...buttonProps,
  }

  if (confirmRemove) {
    return (
      <Dialog
        variant="confirmation"
        triggerAttributes={triggerAttributes}
        onConfirm={handleClick}
      >
        {translation.confirmRemoveText}
      </Dialog>
    )
  }

  return (
    <Button
      {...triggerAttributes}
      on_click={handleClick}
      {...buttonProps}
    />
  )
}

RemoveButton._supportsSpacingProps = true
export default RemoveButton
