/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
// import Heading, {
//   resetLevels
// } from 'dnb-ui-lib/src/components/heading/Heading'
// import { H2 } from 'dnb-ui-lib/src/elements'
import styled from '@emotion/styled'

const Style = styled.div`
  .dnb-heading {
    display: block;
    margin: 0 !important;
  }
`

class Example extends React.PureComponent {
  render() {
    // resetLevels()
    return (
      <Style>
        <ComponentBox
          title="Default headings"
          data-dnb-test="heading-default"
        >
          {
            /* @jsx */ `
<Heading.Level debug reset={1}>
  <Heading>Heading #1</Heading>
  <Heading>Heading #2</Heading>
  <Heading>Heading #3</Heading>
  <Heading skip_correction level={4}>Heading #4</Heading>
</Heading.Level>
      `
          }
        </ComponentBox>
        {/* <H2>Heading level context</H2> */}
        <ComponentBox
          title="Heading level context"
          data-dnb-test="heading-context"
        >
          {
            /* @jsx */ `
<Heading.Level debug reset={1}>
  <Heading>h1</Heading>
  <Heading>h2</Heading>

  <Heading.Increase>
    <Heading>h3</Heading>
    <Heading>h3</Heading>
  </Heading.Increase>

  <Heading.Decrease>
    <Heading>h2</Heading>
    <Heading>h2</Heading>
  </Heading.Decrease>
</Heading.Level>
        `
          }
        </ComponentBox>
      </Style>
    )
  }
}

export default Example
