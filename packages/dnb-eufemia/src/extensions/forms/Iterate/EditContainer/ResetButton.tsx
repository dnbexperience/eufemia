import React, { useCallback, useContext } from 'react'
import classnames from 'classnames'
import { Button, Dialog } from '../../../../components'
import useTranslation from '../../hooks/useTranslation'
import IterateItemContext from '../IterateItemContext'
import ToolbarContext from '../Toolbar/ToolbarContext'
import FieldBoundaryContext from '../../DataContext/FieldBoundary/FieldBoundaryContext'
import { reset } from '../../../../icons'
import { ButtonProps } from '../../../../components/Button'
import useHasContentChanged from './useHasContentChanged'
import { omitDataValueReadWriteProps } from '../../types'

type Props = ButtonProps & {
  showConfirmDialog?: boolean
}

export default function ResetButton(props: Props) {
  const {
    text,
    children,
    onClick,
    className,
    hidden,
    showConfirmDialog = true,
    ...restProps
  } = props
  const { restoreOriginalValue } = useContext(IterateItemContext) || {}
  const { setShowBoundaryErrors } = useContext(FieldBoundaryContext) || {}
  const { setShowError } = useContext(ToolbarContext) || {}
  const { hasContentChanged } = useHasContentChanged()

  const buttonProps = omitDataValueReadWriteProps(restProps)
  const { resetButton } = useTranslation().IterateEditContainer
  const { confirmRemoveText } = useTranslation().RemoveButton
  const textContent = text || children || resetButton

  const buttonWrapperRef = React.useRef<HTMLButtonElement>(null)
  const handleClick = useCallback(
    ({ close, event }) => {
      close?.()
      onClick?.(event)
      restoreOriginalValue?.()
      setShowError(false)
      setShowBoundaryErrors?.(false)
      buttonWrapperRef.current?.focus()
    },
    [onClick, restoreOriginalValue, setShowBoundaryErrors, setShowError]
  )

  if (hidden) {
    return null
  }

  const triggerAttributes: ButtonProps = {
    className: classnames('dnb-forms-iterate__reset-button', className),
    text: textContent,
    variant: textContent ? 'tertiary' : 'secondary',
    icon: reset,
    icon_position: 'left',
    disabled:
      typeof hasContentChanged === 'boolean' ? !hasContentChanged : false,
    ...buttonProps,
  }

  return (
    <span tabIndex={-1} ref={buttonWrapperRef} className="dnb-no-focus">
      {showConfirmDialog ? (
        <Dialog
          variant="confirmation"
          title={confirmRemoveText}
          triggerAttributes={triggerAttributes}
          onConfirm={handleClick}
        />
      ) : (
        <Button
          {...triggerAttributes}
          on_click={handleClick}
          {...buttonProps}
        >
          {resetButton}
        </Button>
      )}
    </span>
  )
}
