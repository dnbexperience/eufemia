import React, { useContext } from 'react'
import clsx from 'clsx'
import { ComponentProps } from '../../types'
import ButtonRow from '../../Form/ButtonRow'
import NextButton from '../NextButton'
import PreviousButton from '../PreviousButton'
import WizardContext from '../Context'
import DataContext from '../../DataContext/Context'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

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
    return null as React.JSX.Element
  }

  if (!showPreviousButton && !showNextButton) {
    return null as React.JSX.Element
  }

  return (
    <ButtonRow className={clsx('dnb-forms-buttons', className)} {...props}>
      {showPreviousButton && <PreviousButton />}
      {showNextButton && <NextButton />}
    </ButtonRow>
  )
}

export default withComponentMarkers(Buttons, {
  _supportsSpacingProps: true,
})
