import { useCallback, useContext } from 'react'
import { clsx } from 'clsx'
import { Button, Dialog } from '../../../../components'
import type { ButtonProps } from '../../../../components/Button'
import IterateItemContext from '../IterateItemContext'
import { replaceItemNo } from '../ItemNo'
import { useTranslation } from '../../hooks'
import ArrayItemAreaContext from '../Array/ArrayItemAreaContext'
import type { DataValueReadWriteComponentProps } from '../../types'
import { omitDataValueReadWriteProps } from '../../types'
import { trash } from '../../../../icons'
import mergeProps from '../../utils/mergeProps'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type IterateRemoveButtonProps = ButtonProps &
  DataValueReadWriteComponentProps<unknown[]> & {
    showConfirmDialog?: boolean
  }

function RemoveButton(props: IterateRemoveButtonProps) {
  const iterateItemContext = useContext(IterateItemContext)
  const { handleRemove, itemPath, index } = iterateItemContext || {}

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
    ({ close }: { close?: () => void }) => {
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

  const defaultProps: ButtonProps = {
    className: clsx('dnb-forms-iterate-remove-element-button', className),
    text: replaceItemNo(textContent, index),
    variant: textContent ? 'tertiary' : 'secondary',
    icon: trash,
    iconPosition: 'left',
  }

  const triggerProps: ButtonProps = {
    ...defaultProps,
    ...buttonProps,
  }

  if (showConfirmDialog) {
    return (
      <Dialog
        variant="confirmation"
        title={translation.confirmRemoveText}
        triggerProps={triggerProps}
        onConfirm={handleClick}
      />
    )
  }

  return (
    <Button
      {...mergeProps(
        { ...defaultProps, onClick: (args) => handleClick(args) },
        buttonProps
      )}
    />
  )
}

withComponentMarkers(RemoveButton, {
  _supportsSpacingProps: true,
})

export default RemoveButton
