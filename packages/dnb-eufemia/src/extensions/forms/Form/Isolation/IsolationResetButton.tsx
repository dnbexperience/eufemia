import React, { useCallback, useContext } from 'react'
import classnames from 'classnames'
import { Button, Dialog } from '../../../../components'
import useTranslation from '../../hooks/useTranslation'
import FieldBoundaryContext from '../../DataContext/FieldBoundary/FieldBoundaryContext'
import { reset } from '../../../../icons'
import type { ButtonProps } from '../../../../components/Button'
import useHasContentChanged from './useHasContentChanged'
import { omitDataValueReadWriteProps } from '../../types'
import useDataContextSnapshot from './useDataContextSnapshot'
import useHandleStatus from './useHandleStatus'
import { isolationError } from './IsolatedContainer'
import IsolationContext from './IsolationContext'

type Props = ButtonProps & {
  showConfirmDialog?: boolean
  showWhen?: 'uncommittedChangeDetected'
}

export default function IsolationResetButton(props: Props) {
  const {
    text,
    children,
    onClick,
    className,
    hidden,
    showConfirmDialog = true,
    showWhen,
    ...restProps
  } = props

  const { outerContext, preventUncommittedChanges } =
    useContext(IsolationContext)
  const { setShowBoundaryErrors } = useContext(FieldBoundaryContext) || {}

  const { handleReset } = useDataContextSnapshot({ enabled: true })
  const { hasContentChanged } = useHasContentChanged()
  const { showStatus: showCommitStatus } = useHandleStatus({
    outerContext,
    preventUncommittedChanges,
    error: isolationError,
    name: 'isolation-reset-button',
  })

  const buttonProps = omitDataValueReadWriteProps(restProps)
  const { resetButton } = useTranslation().IterateEditContainer
  const { confirmResetText } = useTranslation().IterateEditContainer
  const textContent = text || children || resetButton

  const buttonWrapperRef = React.useRef<HTMLButtonElement>(null)
  const handleClick = useCallback(
    ({ close, event }) => {
      close?.()
      onClick?.(event)
      handleReset()
      setShowBoundaryErrors?.(false)
      buttonWrapperRef.current?.focus()
    },
    [onClick, handleReset, setShowBoundaryErrors]
  )

  if (hidden) {
    return null
  }

  const triggerAttributes: ButtonProps = {
    className: classnames('dnb-forms-isolate__reset-button', className),
    text: textContent,
    variant: textContent ? 'tertiary' : 'secondary',
    icon: reset,
    iconPosition: 'left',
    disabled:
      typeof hasContentChanged === 'boolean' ? !hasContentChanged : false,
    ...buttonProps,
  }

  return (
    <span
      tabIndex={-1}
      ref={buttonWrapperRef}
      className="dnb-no-focus"
      hidden={
        !(showWhen === 'uncommittedChangeDetected'
          ? Boolean(showCommitStatus)
          : true)
      }
    >
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
          onClick={handleClick}
          {...buttonProps}
        >
          {resetButton}
        </Button>
      )}
    </span>
  )
}
