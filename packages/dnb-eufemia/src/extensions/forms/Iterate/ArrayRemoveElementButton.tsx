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
    // Button props
    variant?: ButtonProps['variant']
    size?: ButtonProps['size']
    text?: ButtonProps['text']
    icon?: ButtonProps['icon']
    iconPosition?: ButtonProps['icon_position']
    iconSize?: ButtonProps['icon_size']
    title?: ButtonProps['title']
    children?: ButtonProps['children']
  }

function ArrayRemoveElementButton(props: Props) {
  const iterateElementContext = useContext(IterateElementContext)
  const { handleRemove } = iterateElementContext ?? {}

  if (!iterateElementContext) {
    throw new Error(
      'ArrayRemoveElementButton must be inside an Iterate.Array component.'
    )
  }

  const {
    variant,
    size,
    text,
    icon,
    iconPosition,
    iconSize,
    title,
    children,
  } = useDataValue(props)

  const handleClick = useCallback(() => {
    handleRemove()
  }, [handleRemove])

  return (
    <Button
      className={classnames(
        'dnb-forms-array-remove-element-button',
        props.className
      )}
      variant={variant}
      size={size}
      text={text}
      icon={icon}
      icon_position={iconPosition}
      icon_size={iconSize}
      title={title}
      on_click={handleClick}
      {...forwardSpaceProps(props)}
    >
      {children}
    </Button>
  )
}

ArrayRemoveElementButton._supportsEufemiaSpacingProps = true
export default ArrayRemoveElementButton
