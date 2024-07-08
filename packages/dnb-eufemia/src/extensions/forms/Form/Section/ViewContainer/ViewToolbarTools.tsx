import React, { useCallback, useContext } from 'react'
import { Button, Flex } from '../../../../../components'
import useTranslation from '../../../hooks/useTranslation'
import SectionContainerContext from '../containers/SectionContainerContext'
import { edit } from '../../../../../icons'

export default function ViewToolbarTools() {
  const sectionContainerContext = useContext(SectionContainerContext)
  const { switchContainerMode } = sectionContainerContext ?? {}

  const translation = useTranslation().SectionViewContainer

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
    </Flex.Horizontal>
  )
}
