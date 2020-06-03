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
  <Heading>h1</Heading>
  <Heading>h2</Heading>
  <Heading increase>h3</Heading>
  <Heading increase>h4</Heading>
  <Heading decrease>h3</Heading>
  <Heading level="2" size="x-large">h2</Heading>
  <Heading skip_correction level={4}>h4</Heading>
</Heading.Level>
      `
          }
        </ComponentBox>
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

  <Heading inherit>h3</Heading>

  <Heading.Decrease inherit>
    <Heading>h2</Heading>
    <Heading>h2</Heading>
    <Heading increase>h3</Heading>
    <Heading>h3</Heading>
  </Heading.Decrease>
</Heading.Level>
        `
          }
        </ComponentBox>
        <ComponentBox
          title="Level isolation"
          useRender
          // data-dnb-test="heading-level-isolation"
        >
          {
            /* @jsx */ `
const App = () => {
  const [showHeading, setShowHeading] = React.useState(false)

  return (
    <Heading.Level debug reset={1}>
      <Heading>h1</Heading>
      <Heading>h2</Heading>

      <Heading.Increase>
        <ToggleButton
          text="Toggle h3"
          size="small"
          checked={showHeading}
          onChange={() => setShowHeading((c) => !c)}
        />
        {showHeading && (
          <>
            <Heading>h3</Heading>
            <Heading>h3</Heading>
            <Heading>h3</Heading>
          </>
        )}
      </Heading.Increase>

      <Heading.Level>
        <Heading>h2</Heading>
      </Heading.Level>
    </Heading.Level>
  )
}
render(<App />)
        `
          }
        </ComponentBox>
        <ComponentBox
          title="Combine with manual heading"
          data-dnb-test="heading-mixin"
        >
          {
            /* @jsx */ `
<Heading.Level debug reset={1}>
  <Heading>h1</Heading>
  <Heading>h2</Heading>

  <H3 level="auto">Increase to h3</H3>
  <Heading>h3</Heading>
</Heading.Level>
        `
          }
        </ComponentBox>
      </Style>
    )
  }
}

export default Example
