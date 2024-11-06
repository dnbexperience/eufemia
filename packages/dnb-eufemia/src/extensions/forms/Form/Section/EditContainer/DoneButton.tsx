import React, { useCallback, useContext } from 'react'
import SectionContainerContext from '../containers/SectionContainerContext'
import ToolbarContext from '../Toolbar/ToolbarContext'
import { useTranslation } from '../../../hooks'
import { Button } from '../../../../../components'
import { check } from '../../../../../icons'
import FieldBoundaryContext from '../../../DataContext/FieldBoundary/FieldBoundaryContext'

export default function DoneEditButton() {
  const { onDone, setShowError } = useContext(ToolbarContext) || {}

  const { switchContainerMode } = useContext(SectionContainerContext) || {}
  const { hasError, hasVisibleError, setShowBoundaryErrors } =
    useContext(FieldBoundaryContext) || {}

  const translation = useTranslation().SectionEditContainer

  const doneHandler = useCallback(() => {
    if (hasError) {
      setShowBoundaryErrors?.(true)
      if (hasVisibleError) {
        setShowError(true)
      }
    } else {
      setShowError(false)
      setShowBoundaryErrors?.(false)
      switchContainerMode?.('view')
      onDone?.()
    }
  }, [
    hasError,
    hasVisibleError,
    onDone,
    setShowBoundaryErrors,
    setShowError,
    switchContainerMode,
  ])

  return (
    <Button
      variant="tertiary"
      icon={check}
      icon_position="left"
      on_click={doneHandler}
    >
      {translation.doneButton}
    </Button>
  )
}
