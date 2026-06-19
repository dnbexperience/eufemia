/**
 * UI lib Component Example
 *
 */

import { useState } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'
import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia/src'
import Typography from '@dnb/eufemia/src/elements/typography/Typography'

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
        <Heading skipCorrection level={4}>
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
          const [showHeading, setShowHeading] = useState(false)

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

export const HeadingInfo = () => (
  <ComponentBox hidePreview>
    <Heading.Level reset={1}>
      <Heading>h1</Heading>
      <Heading>h2</Heading>
      <Heading increase>h3</Heading>
      <Heading>still h3</Heading>
      <Heading increase>h4</Heading>
      <Heading increase>h5</Heading>
      <Heading decrease>h4</Heading>
      <Heading level={2}>back to h2</Heading>
      <Heading increase>h3</Heading>
    </Heading.Level>
  </ComponentBox>
)

export const HeadingInfoSize = () => (
  <ComponentBox hidePreview>
    <Heading.Level reset={2}>
      <Heading increase size="xx-large">
        h3, but looks like h1
      </Heading>
    </Heading.Level>
  </ComponentBox>
)

export const HeadingInfoLevel = () => (
  <ComponentBox hidePreview>
    <Heading.Level reset={1}>
      <Heading>h1</Heading>
      <Heading.Level level="2">
        <Heading>h2</Heading>
        <Heading increase>h3</Heading>
        <Heading>still h3</Heading>
        <Heading.Increase>
          <Heading>h4</Heading>
          <Heading>still h4</Heading>
        </Heading.Increase>
      </Heading.Level>
    </Heading.Level>
  </ComponentBox>
)

export const HeadingInfoBasic = () => (
  <ComponentBox hidePreview>
    <article>
      <H1 size="large">h1</H1>
      <H2 size="xx-large">h2</H2>
    </article>
  </ComponentBox>
)

export const HeadingProseMaxWidthExample = () => (
  <ComponentBox data-visual-test="heading-prose-max-width">
    <Heading.Level reset={3}>
      <Heading>
        This is a regular heading without any width constraints. It will
        extend to the full width of its container.
      </Heading>
      <Heading proseMaxWidth={40}>
        This heading uses proseMaxWidth={40} to limit its width to
        approximately 40 characters.
      </Heading>
      <Heading proseMaxWidth={20}>
        This heading uses proseMaxWidth={20} for an even narrower reading
        width.
      </Heading>
      <Heading proseMaxWidth>
        This heading uses proseMaxWidth with its default value.
      </Heading>
    </Heading.Level>
  </ComponentBox>
)

export function HeadingProseMaxWidthProvider() {
  return (
    <ComponentBox hideCode scope={{ Typography }}>
      <Heading.Level reset={3}>
        <Typography.Provider proseMaxWidth={40}>
          <Heading>
            This heading is inside a Typography.Provider with
            proseMaxWidth=
            {40}
          </Heading>
          <Heading proseMaxWidth={20}>
            This heading overrides the provider with proseMaxWidth={20}
          </Heading>
        </Typography.Provider>
      </Heading.Level>
    </ComponentBox>
  )
}
