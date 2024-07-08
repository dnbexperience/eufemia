import React, { useContext } from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../../types'
import { ButtonProps } from '../../../../components/button/Button'
import WizardContext from '../Context/WizardContext'
import ButtonRow from '../../Form/ButtonRow'
import SubmitButton from '../../Form/SubmitButton'
import useTranslation from '../../hooks/useTranslation'

export type Props = ComponentProps & Omit<ButtonProps, 'variant'>

function NextButton(props: Props) {
  const translations = useTranslation().WizardNextButton

  const {
    className,
    icon_position = 'right',
    icon = 'chevron_right',
    children = translations.text,
  } = props
  const { handleNext } = useContext(WizardContext) || {}

  return (
    <ButtonRow>
      {/* Use SubmitButton to inherit the indicator functionality */}
      <SubmitButton
        type="button"
        className={classnames('dnb-forms-next-button', className)}
        onClick={handleNext}
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
