import React, { useCallback, useContext } from 'react'
import classnames from 'classnames'
import Button, { ButtonProps } from '../../../../components/Button'
import { add } from '../../../../icons'
import IterateElementContext from '../IterateElementContext'

type Props = ButtonProps

function OpenButton(props: Props) {
  const { className, children, ...restProps } = props
  const { switchContainerMode } = useContext(IterateElementContext) || {}

  const handleClick = useCallback(() => {
    switchContainerMode?.('edit')
  }, [switchContainerMode])

  return (
    <Button
      className={classnames('dnb-forms-iterate-open-button', className)}
      variant="secondary"
      icon={add}
      icon_position="left"
      on_click={handleClick}
      {...restProps}
    >
      {children}
    </Button>
  )
}

export default OpenButton
