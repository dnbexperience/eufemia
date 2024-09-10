import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { Button } from '../../../../components'
import useTranslation from '../../hooks/useTranslation'
import IterateItemContext from '../IterateItemContext'
import FieldBoundaryContext from '../../DataContext/FieldBoundary/FieldBoundaryContext'
import PushContainerContext from '../PushContainer/PushContainerContext'
import { check } from '../../../../icons'
import { ButtonProps } from '../../../../components/Button'

type Props = ButtonProps

export default function DoneButton(props: Props) {
  const { switchContainerMode, containerMode, arrayValue, index } =
    useContext(IterateItemContext) || {}
  const { hasError, setShowBoundaryErrors } =
    useContext(FieldBoundaryContext) || {}
  const { commitHandleRef } = useContext(PushContainerContext) || {}

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
    } else {
      setShowBoundaryErrors?.(false)
      if (commitHandleRef) {
        commitHandleRef.current?.()
      } else {
        switchContainerMode?.('view')
      }
    }
  }, [
    commitHandleRef,
    hasError,
    setShowBoundaryErrors,
    switchContainerMode,
  ])

  return (
    <Button
      variant="tertiary"
      icon={check}
      icon_position="left"
      on_click={doneHandler}
      {...props}
    >
      {doneButton}
    </Button>
  )
}
