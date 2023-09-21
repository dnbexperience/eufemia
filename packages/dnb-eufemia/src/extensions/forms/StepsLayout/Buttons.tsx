import React from 'react'
import classnames from 'classnames'
import { ComponentProps } from '../types'
import ButtonRow from '../Form/ButtonRow'
import NextButton from './NextButton'
import PreviousButton from './PreviousButton'

export type Props = ComponentProps & {
  children?: string
}

function Buttons(props: Props) {
  const { className } = props
  return (
    <ButtonRow
      className={classnames('dnb-forms-buttons', className)}
      {...props}
    >
      <PreviousButton />
      <NextButton />
    </ButtonRow>
  )
}

Buttons._supportsEufemiaSpacingProps = true
export default Buttons
