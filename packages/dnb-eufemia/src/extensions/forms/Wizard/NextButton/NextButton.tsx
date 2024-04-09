import React, { useContext } from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../../types'
import { ButtonProps } from '../../../../components/button/Button'
import WizardContext from '../Context/WizardContext'
import ButtonRow from '../../Form/ButtonRow'
import SubmitButton from '../../Form/SubmitButton'
import useTranslation from '../../hooks/useTranslation'

export type Props = ComponentProps & ButtonProps

function NextButton(props: Props) {
  const translations = useTranslation().Step

  const {
    className,
    variant = 'primary',
    icon_position = 'right',
    icon = 'chevron_right',
    children = translations.next,
  } = props
  const wizardContext = useContext(WizardContext)

  return (
    <ButtonRow>
      {/* Use SubmitButton to inherit the indicator functionality */}
      <SubmitButton
        type="button"
        className={classnames('dnb-forms-next-button', className)}
        onClick={wizardContext?.handleNext}
        variant={variant}
        icon_position={icon_position}
        icon={icon}
        {...props}
      >
        {children}
      </SubmitButton>
    </ButtonRow>
  )
}

NextButton._supportsSpacingProps = true
export default NextButton
