import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { Button, Flex } from '../../../../components'
import useTranslation from '../../hooks/useTranslation'
import IterateElementContext from '../IterateElementContext'
import { check, close } from '../../../../icons'
import RemoveButton from '../RemoveButton'
import { ContainerMode } from '../Array/types'

export default function EditToolbarTools() {
  const iterateElementContext = useContext(IterateElementContext)
  const {
    restoreOriginalValue,
    switchContainerMode,
    containerMode,
    arrayValue,
    index,
    isNew,
  } = iterateElementContext ?? {}

  const translation = useTranslation().Iterate
  const valueBackupRef = useRef<unknown>()
  const wasNew = useWasNew({ isNew, containerMode })

  useEffect(() => {
    if (containerMode === 'edit' && !valueBackupRef.current) {
      valueBackupRef.current = arrayValue?.[index]
    }
    if (containerMode === 'view') {
      valueBackupRef.current = null
    }
  }, [arrayValue, containerMode, index])

  const cancelHandler = useCallback(() => {
    if (valueBackupRef.current) {
      restoreOriginalValue?.(valueBackupRef.current)
    }
    switchContainerMode?.('view')
  }, [restoreOriginalValue, switchContainerMode])
  const doneHandler = useCallback(() => {
    switchContainerMode?.('view')
  }, [switchContainerMode])

  return (
    <Flex.Horizontal spacing="large">
      <Button
        variant="tertiary"
        icon={check}
        icon_position="left"
        on_click={doneHandler}
      >
        {translation.done}
      </Button>

      {wasNew ? (
        <RemoveButton />
      ) : (
        <Button
          variant="tertiary"
          icon={close}
          icon_position="left"
          on_click={cancelHandler}
        >
          {translation.cancel}
        </Button>
      )}
    </Flex.Horizontal>
  )
}

export function useWasNew({
  isNew,
  containerMode,
}: {
  isNew: boolean
  containerMode: ContainerMode
}) {
  const wasNewRef = useRef<unknown>(isNew)

  useEffect(() => {
    if (containerMode === 'view') {
      wasNewRef.current = false
    }
  }, [isNew, containerMode])

  return wasNewRef.current
}
