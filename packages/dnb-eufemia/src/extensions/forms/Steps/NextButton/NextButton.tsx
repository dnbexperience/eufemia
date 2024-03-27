import React, { useContext } from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../../types'
import { ButtonProps } from '../../../../components/button/Button'
import StepsContext from '../Context/StepsContext'
import ButtonRow from '../../Form/ButtonRow'
import SubmitButton from '../../Form/SubmitButton'
import useLocale from '../../hooks/useLocale'

export type Props = ComponentProps & ButtonProps

function NextButton(props: Props) {
  const translations = useLocale().Step

  const {
    className,
    variant = 'primary',
    icon_position = 'right',
    icon = 'chevron_right',
    children = translations.next,
  } = props
  const stepsContext = useContext(StepsContext)

  return (
    <ButtonRow>
      {/* Use SubmitButton to inherit the indicator functionality */}
      <SubmitButton
        type="button"
        className={classnames('dnb-forms-next-button', className)}
        onClick={stepsContext?.handleNext}
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
