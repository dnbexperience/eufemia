import React, { useCallback, useContext } from 'react'
import SectionContainerContext from '../containers/SectionContainerContext'
import ToolbarContext from '../Toolbar/ToolbarContext'
import { useTranslation } from '../../../hooks'
import { Button } from '../../../../../components'
import { edit } from '../../../../../icons'

export default function EditButton() {
  const sectionContainerContext = useContext(SectionContainerContext)
  const { onEdit } = useContext(ToolbarContext) || {}
  const { switchContainerMode } = sectionContainerContext || {}

  const translation = useTranslation().SectionViewContainer

  const editHandler = useCallback(() => {
    switchContainerMode?.('edit')
    onEdit?.()
  }, [onEdit, switchContainerMode])

  return (
    <Button
      variant="tertiary"
      icon={edit}
      icon_position="left"
      on_click={editHandler}
    >
      {translation.editButton}
    </Button>
  )
}
