import React from 'react'
import RemoveButton, { Props as RemoveButtonProps } from '../RemoveButton'
import useTranslation from '../../hooks/useTranslation'

export default function ViewContainerRemoveButton(
  props: RemoveButtonProps
) {
  const { removeButton } = useTranslation().IterateViewContainer

  return <RemoveButton text={removeButton} {...props} />
}
