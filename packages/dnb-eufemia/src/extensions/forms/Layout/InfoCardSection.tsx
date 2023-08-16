import React from 'react'
import classnames from 'classnames'
import { InfoCard } from '../../../components'
import { InfoCardProps } from '../../../components/info-card/InfoCard'
import { forwardSpaceProps, omitSpaceProps } from '../utils'
import type { ComponentProps } from '../component-types'
import Section from './Section'

export type Props = ComponentProps & InfoCardProps

export default function InfoCardSection(props: Props) {
  const { className } = props
  return (
    <Section
      className={classnames('dnb-forms-info-card-section', className)}
      {...forwardSpaceProps(props)}
    >
      <InfoCard {...omitSpaceProps(props)} />
    </Section>
  )
}
