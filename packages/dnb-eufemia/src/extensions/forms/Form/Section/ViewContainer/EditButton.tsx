import React, { useCallback, useContext } from 'react'
import SectionContainerContext from '../containers/SectionContainerContext'
import ToolbarContext from '../Toolbar/ToolbarContext'
import { useTranslation } from '../../../hooks'
import { Button } from '../../../../../components'
import { edit } from '../../../../../icons'

export default function EditButton() {
  const sectionContainerContext = useContext(SectionContainerContext)
  const { onEdit } = useContext(ToolbarContext) || {}
  const { switchContainerMode, disableEditing } =
    sectionContainerContext || {}

  const translation = useTranslation().SectionViewContainer

  const editHandler = useCallback(() => {
    switchContainerMode?.('edit')
    onEdit?.()
  }, [onEdit, switchContainerMode])

  if (disableEditing === true) {
    return null
  }

  return (
    <Button
      variant="tertiary"
      icon={edit}
      iconPosition="left"
      onClick={editHandler}
    >
      {translation.editButton}
    </Button>
  )
}
