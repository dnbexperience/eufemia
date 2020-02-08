/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
// import CodeBlock from 'Src/shared/tags/ComponentBox'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox
          hideCode
          caption="Default Section"
          data-dnb-test="section-default"
        >
          {/* @html */ `
<Section>
  Visual DNB Section: <code className="dnb-code">default</code>
</Section>
        `}
        </ComponentBox>
        <ComponentBox
          hideCode
          caption="Default Section with large spacing"
          data-dnb-test="section-spacing"
        >
          {/* @html */ `
<Section spacing="large">
  Visual DNB Section: <code className="dnb-code">default with spacing</code>
</Section>
        `}
        </ComponentBox>
        <ComponentBox
          hideCode
          caption="White Section"
          data-dnb-test="section-white"
        >
          {/* @html */ `
<Section spacing="true" style_type="white">
  Visual DNB Section: <code className="dnb-code">white</code>
</Section>
        `}
        </ComponentBox>
        <ComponentBox
          hideCode
          caption="Divider Section"
          data-dnb-test="section-divider"
        >
          {/* @html */ `
<Section spacing="true" style_type="divider">
  Visual DNB Section: <code className="dnb-code">divider</code>
</Section>
        `}
        </ComponentBox>
        <ComponentBox
          hideCode
          caption="Mint-Green Section"
          data-dnb-test="section-mint-green"
        >
          {/* @html */ `
<Section spacing="true" style_type="mint-green">
  Visual DNB Section: <code className="dnb-code">mint-green</code>
</Section>
        `}
        </ComponentBox>
        <ComponentBox
          hideCode
          caption="Emerald-Green Section"
          data-dnb-test="section-emerald-green"
        >
          {/* @html */ `
<Section spacing="true" style_type="emerald-green">
  Visual DNB Section: <code className="dnb-code">emerald-green</code>
</Section>
        `}
        </ComponentBox>
        <ComponentBox
          caption="Lavender Section"
          data-dnb-test="section-lavender"
        >
          {/* @html */ `
<Section spacing="true" style_type="lavender">
  Visual DNB Section: <code className="dnb-code">lavender</code>
</Section>
        `}
        </ComponentBox>
        <ComponentBox
          caption="Sand-Yellow Section"
          data-dnb-test="section-sand-yellow"
        >
          {/* @html */ `
<Section spacing="true" style_type="sand-yellow">
  Visual DNB Section: <code className="dnb-code">sand-yellow</code>
</Section>
        `}
        </ComponentBox>
        <ComponentBox
          caption="Pistachio Section"
          data-dnb-test="section-pistachio"
        >
          {/* @html */ `
<Section spacing="true" style_type="pistachio">
  Visual DNB Section: <code className="dnb-code">pistachio</code>
</Section>
        `}
        </ComponentBox>
        <ComponentBox
          caption="Fire-Red Section"
          data-dnb-test="section-fire-red"
        >
          {/* @html */ `
<Section spacing="true" style_type="fire-red">
  Visual DNB Section: <code className="dnb-code">fire-red</code>
</Section>
        `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export default Example
