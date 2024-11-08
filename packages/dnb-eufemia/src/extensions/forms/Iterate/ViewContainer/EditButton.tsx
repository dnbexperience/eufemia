import React, { useCallback, useContext } from 'react'
import { Button } from '../../../../components'
import useTranslation from '../../hooks/useTranslation'
import IterateItemContext from '../IterateItemContext'
import { edit } from '../../../../icons'

export default function EditButton() {
  const iterateItemContext = useContext(IterateItemContext)
  const { switchContainerMode } = iterateItemContext ?? {}
  const { editButton } = useTranslation().IterateViewContainer

  const editHandler = useCallback(() => {
    switchContainerMode?.('edit')
  }, [switchContainerMode])

  return (
    <Button
      variant="tertiary"
      icon={edit}
      icon_position="left"
      on_click={editHandler}
    >
      {editButton}
    </Button>
  )
}
