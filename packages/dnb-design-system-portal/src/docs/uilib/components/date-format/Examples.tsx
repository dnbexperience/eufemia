/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'
import { DateFormat, P } from '@dnb/eufemia/src'

const Style = styled.div`
  p > .dnb-date-format {
    display: block;
  }
`

export const SupportedFormats = () => {
  return (
    <Style>
      <ComponentBox>
        <P>
          <DateFormat>2025-08-01</DateFormat>
          <DateFormat>01.08.2025</DateFormat>
          <DateFormat>01/08/2025</DateFormat>
          <DateFormat date={new Date('2025-08-01')} />
        </P>
      </ComponentBox>
    </Style>
  )
}

export const DateStyles = () => (
  <Style>
    <ComponentBox>
      <P>
        <DateFormat dateStyle="full">2025-08-01</DateFormat>
        <DateFormat dateStyle="long">2025-08-01</DateFormat>
        <DateFormat dateStyle="medium">2025-08-01</DateFormat>
        <DateFormat dateStyle="short">2025-08-01</DateFormat>
      </P>
    </ComponentBox>
  </Style>
)

export const WeekdayStyles = () => (
  <Style>
    <ComponentBox>
      <P>
        <DateFormat weekday="long">2025-08-01</DateFormat>
        <DateFormat weekday="short">2025-08-01</DateFormat>
        <DateFormat weekday="narrow">2025-08-01</DateFormat>
      </P>
    </ComponentBox>
  </Style>
)

export const DayStyles = () => (
  <Style>
    <ComponentBox>
      <P>
        <DateFormat day="2-digit">2025-08-01</DateFormat>
        <DateFormat day="numeric">2025-08-01</DateFormat>
      </P>
    </ComponentBox>
  </Style>
)

export const MonthStyles = () => (
  <Style>
    <ComponentBox>
      <P>
        <DateFormat month="long">2025-08-01</DateFormat>
        <DateFormat month="short">2025-08-01</DateFormat>
        <DateFormat month="narrow">2025-08-01</DateFormat>
        <DateFormat month="2-digit">2025-08-01</DateFormat>
        <DateFormat month="numeric">2025-08-01</DateFormat>
      </P>
    </ComponentBox>
  </Style>
)

export const YearStyles = () => (
  <Style>
    <ComponentBox>
      <P>
        <DateFormat year="2-digit">2025-08-01</DateFormat>
        <DateFormat year="numeric">2025-08-01</DateFormat>
      </P>
    </ComponentBox>
  </Style>
)
