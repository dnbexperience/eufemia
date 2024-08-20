import React, { useCallback, useContext } from 'react'
import { Button, Flex } from '../../../../components'
import RemoveButton from '../RemoveButton'
import useTranslation from '../../hooks/useTranslation'
import IterateItemContext from '../IterateItemContext'
import { edit } from '../../../../icons'

export default function ViewToolbarTools() {
  const iterateElementContext = useContext(IterateItemContext)
  const { switchContainerMode } = iterateElementContext ?? {}

  const translation = useTranslation().IterateViewContainer

  const editHandler = useCallback(() => {
    switchContainerMode?.('edit')
  }, [switchContainerMode])

  return (
    <Flex.Horizontal gap="large">
      <Button
        variant="tertiary"
        icon={edit}
        icon_position="left"
        on_click={editHandler}
      >
        {translation.editButton}
      </Button>

      <RemoveButton text={translation.removeButton} />
    </Flex.Horizontal>
  )
}
