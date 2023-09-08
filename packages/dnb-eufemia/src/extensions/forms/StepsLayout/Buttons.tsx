import React from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../component-types'
import NextButton from './NextButton'
import PreviousButton from './PreviousButton'
import { forwardSpaceProps } from '../utils'
import ButtonRow from '../../../components/layout/ButtonRow'

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
