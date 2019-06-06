/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
// import CodeBlock from '../../../../shared/tags/ComponentBox'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox
          hideCode
          caption="Default FormSection"
          data-dnb-test="form-section-default"
        >
          {/* @html */ `
<FormSection>
  Visual DNB Section: <code className="dnb-code">default</code>
</FormSection>
        `}
        </ComponentBox>
        <ComponentBox
          hideCode
          caption="Default FormSection with large spacing"
          data-dnb-test="form-section-spacing"
        >
          {/* @html */ `
<FormSection spacing="large">
  Visual DNB Section: <code className="dnb-code">default with spacing</code>
</FormSection>
        `}
        </ComponentBox>
        <ComponentBox
          hideCode
          caption="White FormSection"
          data-dnb-test="form-section-white"
        >
          {/* @html */ `
<FormSection spacing="true" style="white">
  Visual DNB Section: <code className="dnb-code">white</code>
</FormSection>
        `}
        </ComponentBox>
        <ComponentBox
          hideCode
          caption="Divider FormSection"
          data-dnb-test="form-section-divider"
        >
          {/* @html */ `
<FormSection spacing="true" style="divider">
  Visual DNB Section: <code className="dnb-code">divider</code>
</FormSection>
        `}
        </ComponentBox>
        <ComponentBox
          hideCode
          caption="Mint-Green FormSection"
          data-dnb-test="form-section-mint-green"
        >
          {/* @html */ `
<FormSection spacing="true" style="mint-green">
  Visual DNB Section: <code className="dnb-code">mint-green</code>
</FormSection>
        `}
        </ComponentBox>
        <ComponentBox
          hideCode
          caption="Emerald-Green FormSection"
          data-dnb-test="form-section-emerald-green"
        >
          {/* @html */ `
<FormSection spacing="true" style="emerald-green">
  Visual DNB Section: <code className="dnb-code">emerald-green</code>
</FormSection>
        `}
        </ComponentBox>
        <ComponentBox
          caption="Signal-Orange FormSection"
          data-dnb-test="form-section-signal-orange"
        >
          {/* @html */ `
<FormSection spacing="true" style="signal-orange">
  Visual DNB Section: <code className="dnb-code">signal-orange</code>
</FormSection>
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
