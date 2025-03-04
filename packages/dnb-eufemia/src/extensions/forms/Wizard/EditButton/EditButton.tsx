import React, { useCallback } from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../../types'
import Button, { ButtonProps } from '../../../../components/button/Button'
import ButtonRow from '../../Form/ButtonRow'
import type { StepIndex } from '../Context/types'
import useTranslation from '../../hooks/useTranslation'
import useStep from '../hooks/useStep'
import { edit } from '../../../../icons'
import Hr from '../../../../elements/Hr'
import {
  omitSpacingProps,
  pickSpacingProps,
} from '../../../../components/flex/utils'

export type Props = ComponentProps & ButtonProps & { toStep?: StepIndex }

function EditButton(props: Props) {
  const translations = useTranslation().WizardEditButton
  const { setActiveIndex } = useStep()

  const {
    className,
    variant = 'tertiary',
    icon_position = 'left',
    icon,
    toStep,
    children = translations.text,
    ...rest
  } = props

  const handleClick = useCallback(() => {
    if (toStep > -1) {
      setActiveIndex(toStep)
    }
  }, [toStep, setActiveIndex])

  return (
    <ButtonRow {...pickSpacingProps(props)}>
      <Hr space={0} />
      <Button
        className={classnames('dnb-forms-edit-button', className)}
        variant={variant}
        icon_position={icon_position}
        icon={edit || icon}
        on_click={handleClick}
        {...omitSpacingProps(rest)}
      >
        {children}
      </Button>
    </ButtonRow>
  )
}

EditButton._supportsSpacingProps = true
export default EditButton
