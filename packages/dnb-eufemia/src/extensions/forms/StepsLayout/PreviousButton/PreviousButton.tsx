import React, { useContext } from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../../types'
import { Button } from '../../../../components'
import { ButtonProps } from '../../../../components/button/Button'
import StepsContext from '../StepsContext'
import ButtonRow from '../../Form/ButtonRow'
import useLocale from '../../hooks/useLocale'

export type Props = ComponentProps & ButtonProps

function PreviousButton(props: Props) {
  const translations = useLocale().Step

  const {
    className,
    variant = 'tertiary',
    icon_position = 'left',
    icon = 'chevron_left',
    children = translations.previous,
  } = props
  const stepsContext = useContext(StepsContext)

  const params: Props = {}
  if (stepsContext?.activeIndex === 0) {
    params.disabled = true
  }

  return (
    <ButtonRow>
      <Button
        className={classnames('dnb-forms-previous-button', className)}
        onClick={stepsContext?.handlePrevious}
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
