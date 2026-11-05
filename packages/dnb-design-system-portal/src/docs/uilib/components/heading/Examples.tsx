/**
 * UI lib Component Example
 *
 */

import { useState } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'
import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia/src'
import { Typography } from '@dnb/eufemia/src/elements'

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

export const HeadingCustomElement = () => (
  <Style>
    <ComponentBox data-visual-test="heading-custom-element">
      <Heading.Level reset={2}>
        <Heading element="span">Heading rendered as a span</Heading>
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
        <Typography.Context proseMaxWidth={40}>
          <Heading>
            This heading is inside a Typography.Context with proseMaxWidth=
            {40}
          </Heading>
          <Heading proseMaxWidth={20}>
            This heading overrides the provider with proseMaxWidth={20}
          </Heading>
        </Typography.Context>
      </Heading.Level>
    </ComponentBox>
  )
}

/**
 * One example per row of the plan.md "Initial/original findings" tables.
 * The debug prefix ([hN]) shows the actual rendered level.
 * The heading text is the expected level; a trailing "X" marks a mismatch.
 */

// ---- Group A: explicit `level` vs reset baseline ----

export const HeadingRowA1 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading level={2}>h2</Heading>
        <Heading level={5}>h3</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowA2 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading level={2}>h2 X</Heading>
        <Heading level={5}>h3 X</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowA3 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug>
        <Heading level={2}>h2 X</Heading>
        <Heading level={5}>h3 X</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowA4 = () => (
  <Style>
    <ComponentBox>
      <>
        <Heading debug>h1</Heading>
        <Heading.Level debug reset={1}>
          <Heading level={2}>h2</Heading>
          <Heading level={5}>h3</Heading>
        </Heading.Level>
      </>
    </ComponentBox>
  </Style>
)

export const HeadingRowA5 = () => (
  <Style>
    <ComponentBox>
      <>
        <Heading debug>h1</Heading>
        <Heading.Level debug reset={2}>
          <Heading level={2}>h2</Heading>
          <Heading level={5}>h3</Heading>
        </Heading.Level>
      </>
    </ComponentBox>
  </Style>
)

// ---- Group B: level={1} demotion ----

export const HeadingRowBRef = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading level={2}>h2</Heading>
        <Heading level={1}>h2</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowB1 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading level={3}>h3</Heading>
        <Heading level={1}>h2 X</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowB2 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading level={3}>h3</Heading>
        <Heading level={1}>h2 X</Heading>
        <Heading level={1}>h2 X</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowB3 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading level={2}>h2</Heading>
        <Heading level={1}>h2</Heading>
        <Heading level={3}>h3</Heading>
        <Heading level={1}>h2 X</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowB4 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading level={3}>h3 X</Heading>
        <Heading level={1}>h2</Heading>
        <Heading level={1}>h2</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

// ---- Group C: inherit ----

export const HeadingRowCRef = () => (
  <Style>
    <ComponentBox>
      <>
        <Heading debug level={1}>
          h1
        </Heading>
        <Heading debug level={2} inherit>
          h2
        </Heading>
      </>
    </ComponentBox>
  </Style>
)

export const HeadingRowC1 = () => (
  <Style>
    <ComponentBox>
      <>
        <Heading debug>h1</Heading>
        <Heading debug inherit>
          h2 X
        </Heading>
      </>
    </ComponentBox>
  </Style>
)

export const HeadingRowC1Reset = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading inherit>h2 X</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowC2 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>
        <Heading.Increase>
          <Heading>h3</Heading>
        </Heading.Increase>
        <Heading inherit>h3</Heading>
        <Heading increase>h4 X</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowC2Contrast = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>
        <Heading.Increase>
          <Heading>h3</Heading>
        </Heading.Increase>
        <Heading level={3}>h3</Heading>
        <Heading increase>h4</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowC3 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading level={3}>h3</Heading>
        <Heading inherit down>
          h2
        </Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowC4 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading level={2}>h2</Heading>
        <Heading inherit down>
          h2
        </Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowC4Contrast = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>
        <Heading down>h2</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowC5 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading inherit>h2</Heading>
        <Heading>h2</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowC6 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading level={2}>h2</Heading>
        <Heading inherit>h2</Heading>
        <Heading>h2</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowC7 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading level={2}>h2</Heading>
        <Heading level={3} inherit>
          h3
        </Heading>
        <Heading>h3</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

// ---- Group D: string vs number level ----

export const HeadingRowD1 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading level="2">h2</Heading>
        <Heading level="5">h3 X</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowD2 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading level={2}>h2</Heading>
        <Heading level={5}>h3</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowD3 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading level="2">h2</Heading>
        <Heading level={5}>h3</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowD4 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading level="5">h3 X</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowD5 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading level={5}>h3</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

// ---- Group E/F: first heading & provider entry (baseline-relative) ----

export const HeadingRowE1 = () => (
  <Style>
    <ComponentBox>
      <Heading debug level={3}>
        h1
      </Heading>
    </ComponentBox>
  </Style>
)

export const HeadingRowF1 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading level={4}>h3</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowF2 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={3}>
        <Heading level={4}>h4</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowF3 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={4}>
        <Heading level={4}>h4</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowF4 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading level={4}>h2</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowF5 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>
        <Heading level={4}>h3</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowF6 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>
        <Heading increase>h3</Heading>
        <Heading level={6}>h4</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowF7 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>
        <Heading.Level level={4}>
          <Heading>h3</Heading>
        </Heading.Level>
        <Heading>h2</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

// ---- Group G: confirmed normal ----

export const HeadingRowG1 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading increase>h2</Heading>
        <Heading increase>h3</Heading>
        <Heading decrease>h2</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowG2 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading>h2</Heading>
        <Heading decrease>h2</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowG3 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading level={3}>h3</Heading>
        <Heading decrease>h2</Heading>
        <Heading decrease>h2</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowG4 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading increase>h2</Heading>
        <Heading increase>h3</Heading>
        <Heading increase>h4</Heading>
        <Heading level={2}>h2</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowG5 = () => (
  <Style>
    <ComponentBox>
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
        </Heading.Decrease>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowG6 = () => (
  <Style>
    <ComponentBox>
      <>
        <Heading debug>h1</Heading>
        <Heading debug reset>
          h2
        </Heading>
      </>
    </ComponentBox>
  </Style>
)

export const HeadingRowG7 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1} skipCorrection>
        <Heading level={4}>h4</Heading>
        <Heading increase>h5</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

// ================================================================
// Group H — context, reset & skipCorrection interactions
// Heading text = the ACTUAL rendered level (matches the [hN] debug
// prefix). See each demo's description for what is surprising.
// ================================================================

// ---- H: heading <-> context ----

export const HeadingRowH1 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>
        <Heading.Level>
          <Heading increase>h3</Heading>
        </Heading.Level>
        <Heading>h2</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowH2 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>
        <Heading.Increase>
          <Heading>h3</Heading>
        </Heading.Increase>
        <Heading inherit>h3</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowH3 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>
        <Heading.Level skipCorrection>
          <Heading level={5}>h5</Heading>
        </Heading.Level>
        <Heading>h2</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowH4 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>
        <Heading.Level skipCorrection>
          <Heading level={5}>h5</Heading>
        </Heading.Level>
        <Heading inherit>h5</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowH5 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading increase>h2</Heading>
        <Heading.Level>
          <Heading>h2</Heading>
        </Heading.Level>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

// ---- H: Increase/Decrease isolation & chaining ----

export const HeadingRowH6 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading.Increase>
          <Heading>h2</Heading>
        </Heading.Increase>
        <Heading>h2</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowH7 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading.Increase>
          <Heading>h2</Heading>
        </Heading.Increase>
        <Heading.Increase>
          <Heading>h3</Heading>
        </Heading.Increase>
        <Heading>h2</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowH8 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading.Level>
          <Heading increase>h3</Heading>
        </Heading.Level>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

// ---- H: nesting accumulate & boundary ----

export const HeadingRowH9 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading.Increase>
          <Heading>h2</Heading>
          <Heading.Increase>
            <Heading>h3</Heading>
          </Heading.Increase>
        </Heading.Increase>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowH10 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading increase>h2</Heading>
        <Heading increase>h3</Heading>
        <Heading increase>h4</Heading>
        <Heading increase>h5</Heading>
        <Heading.Increase>
          <Heading>h6</Heading>
          <Heading.Increase>
            <Heading>h6</Heading>
          </Heading.Increase>
        </Heading.Increase>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowH11 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading increase>h2</Heading>
        <Heading increase>h3</Heading>
        <Heading increase>h4</Heading>
        <Heading increase>h5</Heading>
        <Heading increase>h6</Heading>
        <Heading.Decrease>
          <Heading>h5</Heading>
          <Heading.Decrease>
            <Heading>h4</Heading>
          </Heading.Decrease>
        </Heading.Decrease>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowH12 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>
        <Heading increase>h3</Heading>
        <Heading.Decrease>
          <Heading>h2</Heading>
          <Heading.Decrease>
            <Heading>h2</Heading>
          </Heading.Decrease>
        </Heading.Decrease>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowH13 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>
        <Heading.Level inherit>
          <Heading>h2</Heading>
          <Heading.Level inherit>
            <Heading>h2</Heading>
          </Heading.Level>
        </Heading.Level>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowH14 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>
        <Heading.Increase inherit>
          <Heading>h3</Heading>
          <Heading.Increase inherit>
            <Heading>h4</Heading>
          </Heading.Increase>
        </Heading.Increase>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

// ---- H: two contexts in sequence ----

export const HeadingRowH15 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>
        <Heading.Level>
          <Heading level={3}>h3</Heading>
          <Heading level={4}>h4</Heading>
        </Heading.Level>
        <Heading.Level>
          <Heading>h2</Heading>
        </Heading.Level>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowH16 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>
        <Heading.Level>
          <Heading level={3}>h3</Heading>
          <Heading level={4}>h4</Heading>
        </Heading.Level>
        <Heading.Level inherit>
          <Heading>h4</Heading>
        </Heading.Level>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowH17 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>
        <Heading.Level>
          <Heading>h2</Heading>
          <Heading level={4}>h3</Heading>
        </Heading.Level>
        <Heading inherit>h3</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

// ---- H: reset interactions ----

export const HeadingRowH18 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={3}>
        <Heading>h3</Heading>
        <Heading.Level reset={2}>
          <Heading>h2</Heading>
        </Heading.Level>
        <Heading>h3</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowH19 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading>h2</Heading>
        <Heading.Level reset={3}>
          <Heading>h3</Heading>
        </Heading.Level>
        <Heading>h2</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowH20 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={3}>
        <Heading>h3</Heading>
        <Heading.Level reset={1}>
          <Heading>h1</Heading>
        </Heading.Level>
        <Heading>h3</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowH21 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading.Level reset={3}>
          <Heading>h3</Heading>
        </Heading.Level>
        <Heading>h2</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingRowH22 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>
        <Heading.Level reset={4}>
          <Heading>h4</Heading>
        </Heading.Level>
        <Heading>h2</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

// ---- H: skipCorrection ----

export const HeadingRowH23 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>
        <Heading.Level>
          <Heading level={3}>h3</Heading>
          <Heading level={4}>h4</Heading>
        </Heading.Level>
        <Heading skipCorrection level={6}>
          h6
        </Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

// ---- Confirmed bugs (one example per bug) ----

export const HeadingBug1 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading skipCorrection>never renders</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingBug1Renders = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading>h2</Heading>
        <Heading skipCorrection>h2</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingBug2 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading level={3}>h3</Heading>
        <Heading level={1}>h2 X</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingBug3 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading level={2}>h2 X</Heading>
        <Heading level={3}>h3 X</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)
export const HeadingBug3Honored = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading level={2}>h2</Heading>
        <Heading level={3}>h3</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingBug4 = () => (
  <Style>
    <ComponentBox>
      <>
        <Heading.Level debug reset={1}>
          <Heading>reset=1</Heading>
        </Heading.Level>
        <Heading.Level debug reset={0}>
          <Heading>reset=0 X</Heading>
        </Heading.Level>
        <Heading.Level debug reset={2}>
          <Heading>reset=2</Heading>
        </Heading.Level>
      </>
    </ComponentBox>
  </Style>
)

export const HeadingBug5 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>
        <Heading.Increase>
          <Heading>h3</Heading>
        </Heading.Increase>
        <Heading inherit>h3 (inherit)</Heading>
        <Heading increase>h4 X</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingBug6 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading.Level>
          <Heading increase>h2 X</Heading>
        </Heading.Level>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingBug6Ok = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={2}>
        <Heading>h2</Heading>
        <Heading.Level>
          <Heading increase>h3</Heading>
        </Heading.Level>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingBug7 = () => (
  <Style>
    <ComponentBox>
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading.Level increase>
          <Heading.Level increase>
            <Heading>h2 X</Heading>
          </Heading.Level>
        </Heading.Level>
      </Heading.Level>
    </ComponentBox>
  </Style>
)

export const HeadingBug8 = () => (
  <Style>
    <ComponentBox>
      {() => {
        const App = () => {
          const [n, setN] = useState(0)

          return (
            <Heading.Level debug reset={1}>
              <ToggleButton
                text="Toggle to force a re-render"
                checked={n % 2 === 1}
                onChange={() => setN((c) => c + 1)}
              />
              <Heading up>h1</Heading>
              <Heading up>h2</Heading>
              <Heading key={n}>h2 X</Heading>
            </Heading.Level>
          )
        }
        return <App />
      }}
    </ComponentBox>
  </Style>
)
