import { useCallback, useContext } from 'react'
import type { JSX } from 'react'
import { clsx } from 'clsx'
import type { ComponentProps } from '../../types'
import { Button } from '../../../../components'
import type { ButtonProps } from '../../../../components/button/Button'
import WizardContext from '../Context/WizardContext'
import DataContext from '../../DataContext/Context'
import ButtonRow from '../../Form/ButtonRow'
import useTranslation from '../../hooks/useTranslation'
import mergeProps from '../../../../shared/helpers/mergeProps'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type WizardPreviousButtonProps = ComponentProps & ButtonProps

function PreviousButton(props: WizardPreviousButtonProps) {
  const translations = useTranslation().WizardPreviousButton

  const {
    className,
    variant = 'tertiary',
    iconPosition = 'left',
    icon = 'chevron_left',
    children = translations.text,
  } = props
  const { activeIndex, handlePrevious } = useContext(WizardContext) || {}

  const handleClick = useCallback(() => {
    handlePrevious?.()
  }, [handlePrevious])

  const { prerenderFieldProps } = useContext(DataContext)
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
        className={clsx('dnb-forms-previous-button', className)}
        variant={variant}
        iconPosition={iconPosition}
        icon={icon}
        {...params}
        {...mergeProps({ onClick: handleClick }, props)}
      >
        {children}
      </Button>
    </ButtonRow>
  )
}

withComponentMarkers(PreviousButton, {
  _supportsSpacingProps: true,
})

export default PreviousButton
