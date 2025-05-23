/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import DateFormat from '../'
import Card from '../../Card'
import { H2 } from '../../../elements'

export default {
  title: 'Eufemia/Components/DateFormat',
}

export function DateFormatExample() {
  return (
    <Card stack>
      <Card stack bottom="large">
        <H2>Date styles</H2>
        <DateFormat date="2025-08-01" dateStyle="full" />
        <DateFormat date="2025-08-01" dateStyle="long" />
        <DateFormat date="2025-08-01" dateStyle="medium" />
        <DateFormat date="2025-08-01" dateStyle="short" />
      </Card>

      <Card stack>
        <H2>Weekday styles</H2>
        <DateFormat date="2025-08-01" weekday="long" />
        <DateFormat date="2025-08-01" weekday="short" />
        <DateFormat date="2025-08-01" weekday="narrow" />
      </Card>

      <Card stack>
        <H2>Day styles</H2>
        <DateFormat date="2025-08-01" day="2-digit" />
        <DateFormat date="2025-08-01" day="numeric" />
      </Card>

      <Card stack>
        <H2>Day styles</H2>
        <DateFormat date="2025-08-01" day="2-digit" />
        <DateFormat date="2025-08-01" day="numeric" />
      </Card>

      <Card stack>
        <H2>Month styles</H2>
        <DateFormat date="2025-08-01" month="long" />
        <DateFormat date="2025-08-01" month="short" />
        <DateFormat date="2025-08-01" month="narrow" />
        <DateFormat date="2025-08-01" month="2-digit" />
        <DateFormat date="2025-08-01" month="numeric" />
      </Card>

      <Card stack>
        <H2>Year styles</H2>
        <DateFormat date="2025-08-01" year="2-digit" />
        <DateFormat date="2025-08-01" year="numeric" />
      </Card>
    </Card>
  )
}
