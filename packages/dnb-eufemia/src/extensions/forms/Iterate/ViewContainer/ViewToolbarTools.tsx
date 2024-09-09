import React, { useCallback, useContext } from 'react'
import { Button, Flex } from '../../../../components'
import RemoveButton from '../RemoveButton'
import useTranslation from '../../hooks/useTranslation'
import IterateItemContext from '../IterateItemContext'
import { edit } from '../../../../icons'

export default function ViewToolbarTools() {
  const iterateItemContext = useContext(IterateItemContext)
  const { switchContainerMode, minimumContainerItems, arrayValue } =
    iterateItemContext ?? {}

  const { editButton, removeButton } =
    useTranslation().IterateViewContainer

  const editHandler = useCallback(() => {
    switchContainerMode?.('edit')
  }, [switchContainerMode])

  let editButtonElement: React.ReactElement = null
  let removeButtonElement: React.ReactElement = null

  editButtonElement = (
    <Button
      variant="tertiary"
      icon={edit}
      icon_position="left"
      on_click={editHandler}
    >
      {editButton}
    </Button>
  )

  if (
    minimumContainerItems > 0
      ? arrayValue?.length > minimumContainerItems
      : true
  ) {
    removeButtonElement = <RemoveButton text={removeButton} />
  }

  return (
    <Flex.Horizontal gap="large">
      {editButtonElement}
      {removeButtonElement}
    </Flex.Horizontal>
  )
}
