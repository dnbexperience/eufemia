import React, { useCallback, useContext } from 'react'
import clsx from 'clsx'
import { Button, Dialog } from '../../../../components'
import useTranslation from '../../hooks/useTranslation'
import IterateItemContext from '../IterateItemContext'
import ToolbarContext from '../Toolbar/ToolbarContext'
import FieldBoundaryContext from '../../DataContext/FieldBoundary/FieldBoundaryContext'
import { reset } from '../../../../icons'
import type { ButtonProps } from '../../../../components/Button'
import type { ButtonClickEvent } from '../../../../components/button/Button'
import useHasContentChanged from '../../Form/Isolation/useHasContentChanged'
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
  const { hasContentChanged } = useHasContentChanged({ enabled: true })

  const buttonProps = omitDataValueReadWriteProps(restProps)
  const { resetButton } = useTranslation().IterateEditContainer
  const { confirmResetText } = useTranslation().IterateEditContainer
  const textContent = text || children || resetButton

  const buttonWrapperRef = React.useRef<HTMLButtonElement>(null)
  const handleClick = useCallback(
    ({
      close,
      event,
    }: {
      close?: () => void
      event?: React.SyntheticEvent
    }) => {
      close?.()
      onClick?.(
        event as unknown as React.MouseEvent<HTMLButtonElement> &
          ButtonClickEvent
      )
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
    className: clsx('dnb-forms-iterate__reset-button', className),
    text: textContent,
    variant: textContent ? 'tertiary' : 'secondary',
    icon: reset,
    iconPosition: 'left',
    disabled:
      typeof hasContentChanged === 'boolean' ? !hasContentChanged : false,
    ...buttonProps,
  }

  return (
    <span tabIndex={-1} ref={buttonWrapperRef} className="dnb-no-focus">
      {showConfirmDialog ? (
        <Dialog
          variant="confirmation"
          title={confirmResetText}
          triggerAttributes={triggerAttributes}
          onConfirm={handleClick}
        />
      ) : (
        <Button
          {...triggerAttributes}
          onClick={(args: Record<string, unknown>) => handleClick(args)}
          {...buttonProps}
        >
          {resetButton}
        </Button>
      )}
    </span>
  )
}
