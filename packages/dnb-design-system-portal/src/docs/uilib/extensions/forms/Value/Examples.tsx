import React from 'react'
import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Value } from '@dnb/eufemia/src/extensions/forms'

export const SummaryList = () => {
  return (
    <ComponentBox>
      <Value.SummaryList>
        <Value.String label="Foo" value="value" />
        <Value.Number label="Bar" value={123} />
      </Value.SummaryList>
    </ComponentBox>
  )
}

export const Composition = () => {
  return (
    <ComponentBox>
      <Value.SummaryList>
        <Value.String label="Foo" value="value" />
        <Value.Composition label="Label">
          <Value.String value="value" />
          <Value.Number value={123} />
        </Value.Composition>
      </Value.SummaryList>
    </ComponentBox>
  )
}
