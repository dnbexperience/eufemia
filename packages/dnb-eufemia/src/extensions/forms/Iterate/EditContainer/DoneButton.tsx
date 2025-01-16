import React, { useCallback, useContext, useEffect, useRef } from 'react'
import classnames from 'classnames'
import { Button } from '../../../../components'
import useTranslation from '../../hooks/useTranslation'
import IterateItemContext from '../IterateItemContext'
import ToolbarContext from '../Toolbar/ToolbarContext'
import FieldBoundaryContext from '../../DataContext/FieldBoundary/FieldBoundaryContext'
import PushContainerContext from '../PushContainer/PushContainerContext'
import { check } from '../../../../icons'
import { ButtonProps } from '../../../../components/Button'

type Props = ButtonProps

export default function DoneButton(props: Props) {
  const { className, ...restProps } = props
  const { switchContainerMode, containerMode, arrayValue, index } =
    useContext(IterateItemContext) || {}
  const { hasError, hasVisibleError, setShowBoundaryErrors } =
    useContext(FieldBoundaryContext) || {}
  const { commitHandleRef } = useContext(PushContainerContext) || {}
  const { setShowError } = useContext(ToolbarContext) || {}

  const { doneButton } = useTranslation().IterateEditContainer
  const valueBackupRef = useRef<unknown>()

  useEffect(() => {
    if (containerMode === 'edit' && !valueBackupRef.current) {
      valueBackupRef.current = arrayValue?.[index]
    }
    if (containerMode === 'view') {
      valueBackupRef.current = null
    }
  }, [arrayValue, containerMode, index])

  const doneHandler = useCallback(() => {
    if (hasError) {
      setShowBoundaryErrors?.(true)
      if (hasVisibleError) {
        setShowError(true)
      }
    } else {
      setShowBoundaryErrors?.(false)
      setShowError(false)
      if (commitHandleRef) {
        commitHandleRef.current?.()
      } else {
        switchContainerMode?.('view')
      }
    }
  }, [
    commitHandleRef,
    hasError,
    hasVisibleError,
    setShowBoundaryErrors,
    setShowError,
    switchContainerMode,
  ])

  return (
    <Button
      variant="tertiary"
      className={classnames('dnb-push-container__done-button', className)}
      icon={check}
      icon_position="left"
      on_click={doneHandler}
      {...restProps}
    >
      {doneButton}
    </Button>
  )
}
