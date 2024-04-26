import React, { useContext } from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../../types'
import { Button } from '../../../../components'
import { ButtonProps } from '../../../../components/button/Button'
import WizardContext from '../Context/WizardContext'
import ButtonRow from '../../Form/ButtonRow'
import useTranslation from '../../hooks/useTranslation'

export type Props = ComponentProps & ButtonProps

function PreviousButton(props: Props) {
  const translations = useTranslation().Step

  const {
    className,
    variant = 'tertiary',
    icon_position = 'left',
    icon = 'chevron_left',
    children = translations.previous,
  } = props
  const { activeIndex, handlePrevious } = useContext(WizardContext) || {}

  const params: Props = {}
  if (activeIndex === 0) {
    params.disabled = true
  }

  return (
    <ButtonRow>
      <Button
        className={classnames('dnb-forms-previous-button', className)}
        onClick={handlePrevious}
        variant={variant}
        icon_position={icon_position}
        icon={icon}
        {...params}
        {...props}
      >
        {children}
      </Button>
    </ButtonRow>
  )
}

PreviousButton._supportsSpacingProps = true
export default PreviousButton
