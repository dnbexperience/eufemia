/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import styled from '@emotion/styled'
import { Heading, H3, ToggleButton } from '@dnb/eufemia/src'

const Style = styled.div`
  .dnb-heading {
    display: block;
    margin: 0 !important;
  }
`

export const HeadingDefault = () => (
  <Style>
    <ComponentBox data-visual-test="heading-default">
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>
        <Heading increase>h3</Heading>
        <Heading increase>h4</Heading>
        <Heading decrease>h3</Heading>
        <Heading level="2" size="x-large">
          h2
        </Heading>
        <Heading skip_correction level={4}>
          h4
        </Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingContext = () => (
  <Style>
    <ComponentBox data-visual-test="heading-context">
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
    </ComponentBox>
  </Style>
)

export const HeadingIsolation = () => (
  <Style>
    <ComponentBox>
      {() => {
        const App = () => {
          const [showHeading, setShowHeading] = React.useState(false)

          return (
            <Heading.Level debug reset={1}>
              <Heading>h1</Heading>
              <Heading>h2</Heading>

              <Heading.Increase>
                <ToggleButton
                  text="Toggle h3"
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
        return <App />
      }}
    </ComponentBox>
  </Style>
)

export const HeadingMix = () => (
  <Style>
    <ComponentBox data-visual-test="heading-mixin">
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>

        <H3 level="use">Increase to h3</H3>
        <Heading>h3</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)
