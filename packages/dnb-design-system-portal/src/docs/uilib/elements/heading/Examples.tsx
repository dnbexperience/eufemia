/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { H, H1, H2, H3, H4, H5, H6, P } from '@dnb/eufemia/src'
import styled from '@emotion/styled'

export const HeadingBasicsExample = () => (
  <ComponentBox data-visual-test="heading-basics">
    <H1>Heading 1</H1>
    <H2>Heading 2</H2>
    <H3>Heading 3</H3>
    <H4>Heading 4</H4>
    <H5>Heading 5</H5>
    <H6>Heading 6</H6>
    <P>Regular text</P>
  </ComponentBox>
)

export const HeadingTypographyExample = () => (
  <ComponentBox>
    <H1>Heading 1 (default size 'xx-large')</H1>
    <H1 size="x-large">Heading 1 style 'x-large'</H1>
    <H1 size="small">Heading 1 style small</H1>
  </ComponentBox>
)

export const HeadingTypographyXLargeExample = () => (
  <ComponentBox>
    <H1 size="x-large">Heading style x-large (using 'size')</H1>
    <H1>
      <small>Heading style x-large (using &lt;small&gt;)</small>
    </H1>
  </ComponentBox>
)

export const HeadingVanillaHTMLExample = () => (
  <ComponentBox hideCode data-visual-test="heading-default">
    <h1 className="dnb-h--xx-large">Heading style xx-large</h1>
    <h2 className="dnb-h--x-large">Heading style x-large</h2>
    <h5 className="dnb-h--large">Heading style large</h5>
    <h3 className="dnb-h--small">Heading style small</h3>
    <h3 className="dnb-h--basis">Heading style basis</h3>
  </ComponentBox>
)

export const HeadingModifiersExample = () => (
  <ComponentBox hideCode data-visual-test="heading-additional">
    <article>
      <h1 className="dnb-h--xx-large">
        .dnb-h--xx-large <small>small</small>
      </h1>
      <h2 className="dnb-h--x-large">
        .dnb-h--x-large <small>small</small>
      </h2>
      <h2 className="dnb-h--large">
        .dnb-h--large <small>small</small>
      </h2>
      <h3 className="dnb-h--medium">
        .dnb-h--medium <small>small</small>
      </h3>
      <h3 className="dnb-lead">
        .dnb-lead <small>small</small>
      </h3>
    </article>
  </ComponentBox>
)

export const HeadingMarginCollapsingExample = () => (
  <ComponentBox>
    <H1 size="small" top bottom="small">
      Spacing with bottom margin: small
    </H1>
    <P top="large" bottom="small">
      Spacing with top margin: large
    </P>
  </ComponentBox>
)
export const HeadingRegressionTest = () => {
  const Spacer = styled.div`
    overflow: auto; // prevent margin collapse
  `

  const HWrap = ({ ...props }) => (
    <>
      <Spacer>
        <H1 {...props}>{props.size}</H1>
      </Spacer>
      <Spacer>
        <H2 {...props}>
          <small>
            {'<small>'} {props.size} {'</small>'}
          </small>
        </H2>
      </Spacer>
      <Spacer>
        <H3 {...props}>
          <>Text </>
          <small>
            {'<small>'} {props.size} {'</small>'}
          </small>
        </H3>
      </Spacer>
      <hr />
    </>
  )

  return (
    <>
      <ComponentBox scope={{ HWrap }} data-visual-test="heading-sizes">
        <HWrap size="xx-large" />
        <HWrap size="x-large" />
        <HWrap size="large" />
        <HWrap size="medium" />
        <HWrap size="basis" />
        <HWrap size="small" />
        <HWrap size="x-small" />
      </ComponentBox>
      <ComponentBox scope={{ HWrap }} data-visual-test="heading-base">
        <H>default (h1 - xx-large)</H>
        <H as="h2">custom level (h2 - xx-large)</H>
        <H size="small">custom size (h1 - small)</H>
        <H as="h2" size="small">
          custom level and size (h2 - small)
        </H>
      </ComponentBox>
    </>
  )
}
