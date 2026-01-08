import React, { useCallback, useContext } from 'react'
import SectionContainerContext from '../containers/SectionContainerContext'
import ToolbarContext from '../Toolbar/ToolbarContext'
import { useTranslation } from '../../../hooks'
import { Button } from '../../../../../components'
import { edit } from '../../../../../icons'
import type { ButtonProps } from '../../../../../components/button/Button'

export type Props = ButtonProps

export default function EditButton(props: Props) {
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
      icon_position="left"
      on_click={editHandler}
      {...props}
    >
      {translation.editButton}
    </Button>
  )
}
