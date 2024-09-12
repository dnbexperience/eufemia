import React from 'react'
import RemoveButton from '../RemoveButton'
import useTranslation from '../../hooks/useTranslation'

export default function ViewContainerRemoveButton() {
  const { removeButton } = useTranslation().IterateViewContainer

  return <RemoveButton text={removeButton} />
}
