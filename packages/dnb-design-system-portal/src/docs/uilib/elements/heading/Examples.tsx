/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { H1, H2, P } from '@dnb/eufemia/src'

export const HeadingTypographyExample = () => (
  <ComponentBox>
    <H1 bottom="large">Heading style xx-large</H1>
    <H1 size="x-large">Heading style x-large (one down)</H1>
    <H1 size="small">Heading style small</H1>
    <H2>Heading style large</H2>
  </ComponentBox>
)

export const HeadingTypographyXLargeExample = () => (
  <ComponentBox>
    <H1 size="x-large">Heading style x-large</H1>
    <H1>
      <small>Heading style x-large</small>
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
        <small>dnb-h--x-large</small> Normal dnb-h--xx-large
      </h1>
      <h2 className="dnb-h--large">
        Normal dnb-h--large <small>dnb-h--medium</small>
      </h2>
      <h3 className="dnb-lead">
        Normal dnb-h--medium <small>dnb-h--basis</small>
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
