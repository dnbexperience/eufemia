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
    showConfirmDialog?: boolean
  }

function RemoveButton(props: Props) {
  const iterateItemContext = useContext(IterateItemContext)
  const { handleRemove, itemPath } = iterateItemContext || {}

  if (!iterateItemContext) {
    throw new Error('RemoveButton must be inside an Iterate.Array')
  }

  const { text, children, className, showConfirmDialog, ...restProps } =
    props
  const buttonProps = omitDataValueReadWriteProps(restProps)
  const translation = useTranslation().RemoveButton
  const textContent = text || children || translation.text

  const arrayItemAreaContext = useContext(ArrayItemAreaContext)
  const { handleRemoveItem } = arrayItemAreaContext || {}

  const handleClick = useCallback(
    ({ close }) => {
      close?.()

      // - Don't call handleRemoveItem when itemPath is given to support nested arrays
      if (handleRemoveItem && !itemPath) {
        handleRemoveItem()
      } else {
        handleRemove?.()
      }
    },
    [handleRemove, handleRemoveItem, itemPath]
  )

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

  if (showConfirmDialog) {
    return (
      <Dialog
        variant="confirmation"
        title={translation.confirmRemoveText}
        triggerAttributes={triggerAttributes}
        onConfirm={handleClick}
      />
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
