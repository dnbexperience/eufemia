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
  const { activeIndex, titlesRef } = useContext(WizardContext) || {}

  const totalSteps = Object.keys(titlesRef?.current || {}).length || 0
  const showPreviousButton = activeIndex > 0
  const showNextButton = activeIndex < totalSteps - 1

  if (!showPreviousButton && !showNextButton) {
    return null
  }

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
