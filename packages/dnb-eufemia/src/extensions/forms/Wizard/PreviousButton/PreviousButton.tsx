import { useCallback, useContext } from 'react'
import type { JSX } from 'react'
import type { ComponentProps } from '../../types'
import { Button } from '../../../../components'
import type { ButtonProps } from '../../../../components/button/Button'
import WizardContext from '../Context/WizardContext'
import DataContext from '../../DataContext/Context'
import ButtonRow from '../../Form/ButtonRow'
import SubmitIndicator from '../../Form/SubmitIndicator'
import useTranslation from '../../hooks/useTranslation'
import useId from '../../../../shared/helpers/useId'
import mergeProps from '../../../../shared/helpers/mergeProps'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type WizardPreviousButtonProps = ComponentProps & ButtonProps

function PreviousButton(props: WizardPreviousButtonProps) {
  const translations = useTranslation().WizardPreviousButton

  const {
    variant = 'tertiary',
    iconPosition = 'left',
    icon = 'chevron_left',
    children = translations.text,
  } = props
  const {
    id: wizardId,
    activeIndex,
    handlePrevious,
  } = useContext(WizardContext) || {}
  const { prerenderFieldProps, formState, activeSubmitButtonId } =
    useContext(DataContext)
  const previousButtonId = useId()
  const hasIndicator =
    activeSubmitButtonId === previousButtonId ||
    (wizardId !== undefined && activeSubmitButtonId === wizardId)

  const handleClick = useCallback(() => {
    handlePrevious?.(previousButtonId)
  }, [handlePrevious, previousButtonId])

  if (prerenderFieldProps) {
    return null as JSX.Element
  }

  const params: WizardPreviousButtonProps = {}
  if (activeIndex === 0) {
    params.disabled = true
  }

  return (
    <ButtonRow>
      <Button
        variant={variant}
        iconPosition={iconPosition}
        icon={icon}
        {...params}
        {...mergeProps(
          { className: 'dnb-forms-previous-button', onClick: handleClick },
          props
        )}
      >
        {children}

        <SubmitIndicator state={hasIndicator ? formState : undefined} />
      </Button>
    </ButtonRow>
  )
}

withComponentMarkers(PreviousButton, {
  _supportsSpacingProps: true,
})

export default PreviousButton
