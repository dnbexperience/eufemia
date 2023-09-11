import React from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../types'
import ButtonRow from '../Layout/ButtonRow'
import NextButton from './NextButton'
import PreviousButton from './PreviousButton'
import { forwardSpaceProps } from '../utils'

export type Props = ComponentProps & {
  children?: string
}

function Buttons(props: Props) {
  const { className } = props
  return (
    <ButtonRow
      className={classnames('dnb-forms-buttons', className)}
      {...forwardSpaceProps(props)}
    >
      <PreviousButton />
      <NextButton />
    </ButtonRow>
  )
}

Buttons._supportsEufemiaSpacingProps = true
export default Buttons
