import React, { useCallback, useContext } from 'react'
import { Button, Flex } from '../../../../components'
import ArrayRemoveElementButton from '../ArrayRemoveElementButton'
import useTranslation from '../../hooks/useTranslation'
import IterateElementContext from '../IterateElementContext'
import { edit } from '../../../../icons'

export default function ViewToolbarTools() {
  const iterateElementContext = useContext(IterateElementContext)
  const { switchContainerMode } = iterateElementContext ?? {}

  const translation = useTranslation().Iterate

  const editHandler = useCallback(() => {
    switchContainerMode?.('edit')
  }, [switchContainerMode])

  return (
    <Flex.Horizontal spacing="large">
      <Button
        variant="tertiary"
        icon={edit}
        icon_position="left"
        on_click={editHandler}
      >
        {translation.edit}
      </Button>

      <ArrayRemoveElementButton text={translation.remove} />
    </Flex.Horizontal>
  )
}
