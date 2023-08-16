import React from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../component-types'
import ButtonRow from '../Layout/ButtonRow'
import NextButton from './NextButton'
import PreviousButton from './PreviousButton'
import { forwardSpaceProps } from '../utils'

export type Props = ComponentProps & {
  children?: string
}

export default function Buttons(props: Props) {
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
