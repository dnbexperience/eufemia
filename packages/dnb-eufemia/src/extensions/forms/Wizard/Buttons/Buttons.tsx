import React, { useContext } from 'react'
import classnames from 'classnames'
import { ComponentProps } from '../../types'
import ButtonRow from '../../Form/ButtonRow'
import NextButton from '../NextButton'
import PreviousButton from '../PreviousButton'
import WizardContext from '../Context'

export type Props = ComponentProps & {
  children?: string
}

function Buttons(props: Props) {
  const { className } = props
  const wizardContext = useContext(WizardContext)
  const showPreviousButton = wizardContext?.activeIndex > 0
  const showNextButton =
    wizardContext?.activeIndex < wizardContext?.totalSteps - 1

  return (
    <ButtonRow
      className={classnames('dnb-forms-buttons', className)}
      {...props}
    >
      {showPreviousButton && <PreviousButton />}
      {showNextButton && <NextButton />}
    </ButtonRow>
  )
}

Buttons._supportsSpacingProps = true
export default Buttons
