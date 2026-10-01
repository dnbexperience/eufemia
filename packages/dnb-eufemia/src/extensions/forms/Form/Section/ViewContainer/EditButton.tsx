import { useCallback, useContext } from 'react'
import SectionContainerContext from '../containers/SectionContainerContext'
import ToolbarContext from '../Toolbar/ToolbarContext'
import { useTranslation } from '../../../hooks'
import { Button } from '../../../../../components'
import { edit } from '../../../../../icons'
import type { ButtonProps } from '../../../../../components/button/Button'

export type FormSectionEditButtonProps = ButtonProps

export default function EditButton(props: FormSectionEditButtonProps) {
  const { onClick, ...rest } = props
  const sectionContainerContext = useContext(SectionContainerContext)
  const { onEdit } = useContext(ToolbarContext) || {}
  const { switchContainerMode, disableEditing } =
    sectionContainerContext || {}

  const translation = useTranslation().SectionViewContainer

  const editHandler = useCallback(
    (args) => {
      onClick?.(args)
      switchContainerMode?.('edit')
      onEdit?.()
    },
    [onClick, onEdit, switchContainerMode]
  )

  if (disableEditing === true) {
    return null
  }

  return (
    <Button
      variant="tertiary"
      icon={edit}
      iconPosition="left"
      onClick={editHandler}
      {...rest}
    >
      {translation.editButton}
    </Button>
  )
}
