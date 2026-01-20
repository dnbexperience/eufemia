import React, { useContext } from 'react'
import clsx from 'clsx'
import { ComponentProps } from '../../types'
import ButtonRow from '../../Form/ButtonRow'
import NextButton from '../NextButton'
import PreviousButton from '../PreviousButton'
import WizardContext from '../Context'
import DataContext from '../../DataContext/Context'

export type Props = ComponentProps & {
  children?: string
}

function Buttons(props: Props) {
  const { className } = props
  const { activeIndex, totalStepsRef } = useContext(WizardContext) || {}

  const totalSteps = totalStepsRef?.current || 0
  const showPreviousButton = activeIndex > 0
  const showNextButton = activeIndex < totalSteps - 1

  const { prerenderFieldProps } = useContext(DataContext)
  if (prerenderFieldProps) {
    return null as JSX.Element
  }

  if (!showPreviousButton && !showNextButton) {
    return null as JSX.Element
  }

  return (
    <ButtonRow className={clsx('dnb-forms-buttons', className)} {...props}>
      {showPreviousButton && <PreviousButton />}
      {showNextButton && <NextButton />}
    </ButtonRow>
  )
}

Buttons._supportsSpacingProps = true
export default Buttons
