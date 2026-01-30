/**
 * Web Modal Component
 *
 */

import React from 'react'
import Section from '../../section/Section'
import ModalContext from '../ModalContext'
import clsx from 'clsx'
import { SectionProps } from '../../Section'

export type ModalInnerProps = SectionProps

const ModalInner: React.FC<
  ModalInnerProps & React.HTMLProps<HTMLElement>
> = (props) => {
  const context = React.useContext(ModalContext)

  const {
    className = null,
    backgroundColor = 'black-3',
    ref, // eslint-disable-line
    ...restProps
  } = props

  React.useEffect(() => {
    if (backgroundColor) {
      context.setBackgroundColor(backgroundColor)
    }
  }, [backgroundColor, context])

  return (
    <Section
      backgroundColor={backgroundColor}
      className={clsx(className)}
      {...restProps}
    />
  )
}

export default ModalInner
