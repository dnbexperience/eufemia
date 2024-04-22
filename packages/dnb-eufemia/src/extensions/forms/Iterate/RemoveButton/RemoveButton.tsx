import React, { useCallback, useContext } from 'react'
import classnames from 'classnames'
import { Button } from '../../../../components'
import { ButtonProps } from '../../../../components/Button'
import IterateElementContext from '../IterateElementContext'
import { useFieldProps, useTranslation } from '../../hooks'
import ElementBlockContext from '../AnimatedContainer/ElementBlockContext'
import {
  DataValueReadWriteComponentProps,
  omitDataValueReadWriteProps,
} from '../../types'
import { trash } from '../../../../icons'

export type Props = ButtonProps &
  DataValueReadWriteComponentProps<unknown[]>

function RemoveButton(props: Props) {
  const iterateElementContext = useContext(IterateElementContext)
  const { handleRemove } = iterateElementContext ?? {}

  if (!iterateElementContext) {
    throw new Error(
      'RemoveButton must be inside an Iterate.Array component.'
    )
  }

  const { className, ...restProps } = props
  const { children, text } = useFieldProps(restProps)
  const buttonProps = omitDataValueReadWriteProps(restProps)
  const translation = useTranslation().Iterate
  const textContent = text || children || translation.remove

  const elementBlockContext = useContext(ElementBlockContext)
  const { handleRemoveBlock } = elementBlockContext ?? {}

  const handleClick = useCallback(() => {
    if (handleRemoveBlock) {
      handleRemoveBlock()
    } else {
      handleRemove()
    }
  }, [handleRemove, handleRemoveBlock])

  return (
    <Button
      className={classnames(
        'dnb-form-iterate-remove-element-button',
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
