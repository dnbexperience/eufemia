import { useCallback, useContext } from 'react'
import type { JSX } from 'react'
import type { ComponentProps } from '../../types'
import type { ButtonProps } from '../../../../components/button/Button'
import WizardContext from '../Context/WizardContext'
import DataContext from '../../DataContext/Context'
import ButtonRow from '../../Form/ButtonRow'
import SubmitButton from '../../Form/SubmitButton'
import useTranslation from '../../hooks/useTranslation'
import mergeProps from '../../../../shared/helpers/mergeProps'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type WizardNextButtonProps = ComponentProps &
  Omit<ButtonProps, 'variant'>

function NextButton(props: WizardNextButtonProps) {
  const translations = useTranslation().WizardNextButton

  const {
    iconPosition = 'right',
    icon = 'chevron_right',
    children = translations.text,
  } = props
  const { handleNext } = useContext(WizardContext) || {}

  const handleClick = useCallback(() => {
    handleNext?.()

    // Skips the SubmitButton's own click handling, which would submit as well
    return false
  }, [handleNext])

  const { prerenderFieldProps } = useContext(DataContext)
  if (prerenderFieldProps) {
    return null as JSX.Element
  }

  return (
    <ButtonRow>
      {/* Use SubmitButton to inherit the indicator functionality */}
      <SubmitButton
        type="button"
        iconPosition={iconPosition}
        icon={icon}
        {...mergeProps(
          { className: 'dnb-forms-next-button', onClick: handleClick },
          props
        )}
      >
        {children}
      </SubmitButton>
    </ButtonRow>
  )
}

withComponentMarkers(NextButton, {
  _supportsSpacingProps: true,
})

export default NextButton
