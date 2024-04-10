import React from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../../types'
import Button, { ButtonProps } from '../../../../components/button/Button'
import ButtonRow from '../../Form/ButtonRow'
import useTranslation from '../../hooks/useTranslation'
import { edit } from '../../../../icons'

export type Props = ComponentProps & ButtonProps

function EditButton(props: Props) {
  const translations = useTranslation().Step

  const {
    className,
    variant = 'tertiary',
    icon_position = 'left',
    icon,
    children = translations.edit,
  } = props

  return (
    <ButtonRow>
      <Button
        className={classnames('dnb-forms-edit-button', className)}
        variant={variant}
        icon_position={icon_position}
        icon={edit || icon}
        {...props}
      >
        {children}
      </Button>
    </ButtonRow>
  )
}

EditButton._supportsSpacingProps = true
export default EditButton
