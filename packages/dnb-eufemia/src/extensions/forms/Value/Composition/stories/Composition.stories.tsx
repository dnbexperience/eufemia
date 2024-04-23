import React from 'react'
import { Value } from '../../..'

export default {
  title: 'Eufemia/Extensions/Forms/Value/Composition',
}

export function Composition() {
  return (
    <>
      <Value.Composition label="DT Composition" width="stretch">
        <Value.String
          label="With a long label"
          value="Long value Nam sed aliquet nunc. Aenean non arcu elit. Integer volutpat sit amet tortor gravida tempus. Pellentesque condimentum enim arcu."
        />
        <Value.String label="Label" value="bar" />
      </Value.Composition>

      <hr />

      <Value.SummaryList>
        <Value.String label="DT A" value="DD foo" />
        <Value.String label="DT B" value="DD bar" />

        <Value.Composition>
          <Value.String value="DD without " />
          <Value.String value="a " />
          <Value.String value="label Long value Nam sed aliquet nunc. Aenean non arcu elit. Integer volutpat sit amet tortor gravida tempus. Pellentesque condimentum enim arcu." />
        </Value.Composition>

        <Value.Composition label="DT Composition">
          <Value.String value="DD without " />
          <Value.String value="a " />
          <Value.String value="label Long value Nam sed aliquet nunc. Aenean non arcu elit. Integer volutpat sit amet tortor gravida tempus. Pellentesque condimentum enim arcu." />
        </Value.Composition>

        <Value.Composition label="DT Composition">
          <Value.String label="DT in nested list A" value="DD foo" />
          <Value.String label="DT in nested list B" value="DD bar" />
        </Value.Composition>
      </Value.SummaryList>

      <hr />

      <Value.SummaryList layout="grid">
        <Value.String label="DT A" value="DD foo" />
        <Value.String label="DT B" value="DD bar" />

        <Value.Composition label="DT Composition">
          <Value.String value="DD without " />
          <Value.String value="a " />
          <Value.String value="label Long value Nam sed aliquet nunc. Aenean non arcu elit. Integer volutpat sit amet tortor gravida tempus. Pellentesque condimentum enim arcu." />
        </Value.Composition>

        <Value.Composition label="DT Composition">
          <Value.String label="DT A" value="DD foo" />
          <Value.String label="DT B" value="DD bar" />
        </Value.Composition>
      </Value.SummaryList>
    </>
  )
}
