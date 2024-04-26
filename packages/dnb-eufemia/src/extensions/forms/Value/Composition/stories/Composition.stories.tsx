import React from 'react'
import { Value } from '../../..'
import { Flex } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Value/Composition',
}

export function Composition() {
  return (
    <>
      <Flex.Stack>
        <Value.String
          label="With a long label"
          value="Nam sed aliquet nunc. Pellentesque condimentum enim arcu."
        />

        <Value.Composition>
          <Value.String
            label="With a long label"
            value="Nam sed aliquet nunc. Pellentesque condimentum enim arcu."
          />
          <Value.String label="Label" value="second value" />
        </Value.Composition>

        <Value.Composition maxWidth="large">
          <Value.String
            label="With a long label"
            value="Nam sed aliquet nunc. Pellentesque condimentum enim arcu."
          />
          <Value.String label="Label" value="second value" />
        </Value.Composition>
      </Flex.Stack>

      <hr />

      <Value.SummaryList>
        <Value.String label="Basic" value="value" />

        <Value.Composition>
          <Value.String label="First" value="value" />
          <Value.String label="Second" value="value" />
        </Value.Composition>

        <Value.Composition label="Composition Label">
          <Value.String value="But without a value" />
          <Value.String value="label" />
        </Value.Composition>

        <Value.Composition label="Composition Label">
          <Value.String label="First" value="value" />
          <Value.String label="Second" value="value" />
        </Value.Composition>

        <Value.Composition>
          <Value.String value="With" />
          <Value.String value="only a" />
          <Value.String value="value" />
        </Value.Composition>
      </Value.SummaryList>

      <hr />

      <Value.SummaryList layout="grid">
        <Value.String label="Basic" value="value" />

        <Value.Composition label="Composition Label">
          <Value.String label="First" value="value" />
          <Value.String label="Second" value="value" />
        </Value.Composition>

        <Value.Composition label="Composition Label">
          <Value.String value="But without a value" />
          <Value.String value="label" />
        </Value.Composition>

        <Value.Composition label="Composition Label">
          <Value.String label="First" value="value" />
          <Value.String label="Second" value="value" />
        </Value.Composition>

        <Value.Composition>
          <Value.String value="With" />
          <Value.String value="only a" />
          <Value.String value="value" />
        </Value.Composition>
      </Value.SummaryList>
    </>
  )
}
