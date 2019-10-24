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
          caption="Signal-Orange Section"
          data-dnb-test="section-signal-orange"
        >
          {/* @html */ `
<Section spacing="true" style_type="signal-orange">
  Visual DNB Section: <code className="dnb-code">signal-orange</code>
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

/* <CodeBlock
  reactLive
  hideCode
  caption="All sections - `.dnb-section`"
  data-dnb-test="helper-classes-section"
  >
    <div className="dnb-section">
      Visual DNB Section, declared with <code className="dnb-code">.dnb-section</code>
    </div>
    <div className="dnb-section dnb-section--spacing">
      Visual DNB Section, declared with <code className="dnb-code">.dnb-section--spacing</code>
    </div>
    <div className="dnb-section dnb-section--spacing dnb-section--white">
      Visual DNB Section, declared with <code className="dnb-code">.dnb-section--white</code>
    </div>
    <div className="dnb-section dnb-section--spacing-small dnb-section--divider">
      Visual DNB Section, declared with <code className="dnb-code">.dnb-section--divider</code>
    </div>
    <div className="dnb-section dnb-section--spacing-large dnb-section--mint-green">
      Visual DNB Section, declared with <code className="dnb-code">.dnb-section--mint-green</code>
    </div>
    <div className="dnb-section dnb-section--spacing dnb-section--emerald-green">
      Visual DNB Section, declared with <code className="dnb-code">.dnb-section--emerald-green</code>
    </div>
    <div className="dnb-section dnb-section--spacing dnb-section--signal-orange">
      Visual DNB Section, declared with <code className="dnb-code">.dnb-section--signal-orange</code>
    </div>
  </CodeBlock> */

export { Example }
export default () => <Example />
