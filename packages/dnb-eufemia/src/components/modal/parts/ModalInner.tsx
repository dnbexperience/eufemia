/**
 * Web Modal Component
 *
 */

import type { HTMLProps } from 'react'
import Section from '../../section/Section'
import type { SectionAllProps } from '../../Section'

export type ModalInnerProps = SectionAllProps

function ModalInner(props: ModalInnerProps & HTMLProps<HTMLElement>) {
  const { className = null, ref, ...restProps } = props

  return <Section className={className} {...restProps} />
}

export default ModalInner
