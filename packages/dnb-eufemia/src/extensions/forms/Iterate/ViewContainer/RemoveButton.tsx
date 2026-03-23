import React from 'react'
import type { IterateRemoveButtonProps as RemoveButtonProps } from '../RemoveButton'
import RemoveButton from '../RemoveButton'
import useTranslation from '../../hooks/useTranslation'

export default function ViewContainerRemoveButton(
  props: RemoveButtonProps
) {
  const { removeButton } = useTranslation().IterateViewContainer

  return <RemoveButton text={removeButton} {...props} />
}
