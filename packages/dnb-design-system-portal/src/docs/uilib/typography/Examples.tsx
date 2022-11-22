/**
 * UI lib Component Example
 *
 */

import React from 'react'
import styled from '@emotion/styled'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import { Code, H4, Lead, P } from '@dnb/eufemia/src'

const Wrapper = styled.div`
  margin-bottom: 3rem;
`

const FontUsageExample = ({ typo_class, font_family }) => (
  <div className="typography-box">
    <h3 className={typo_class}>{font_family}</h3>
    <p className={typo_class}>
      Here is a paragraph with some nonsense{' '}
      <a href="/" className="dnb-anchor">
        Lorem Ipsum
      </a>{' '}
      comes from <b>sections</b> 1.10.32 and 1.10.33 of "de
      <i>Finibus Bonorum</i> et <u>Malorum</u>" (
      <strong>The Extremes</strong> of Good and Evil) by Cicero, written in
      45 BC.
    </p>
  </div>
)

export function FontWeightExample() {
  return (
    <Wrapper>
      {/* Regular */}
      <FontUsageExample
        font_family="DNB Regular"
        typo_class="dnb-typo-regular"
      />

      {/* Medium */}
      <FontUsageExample
        font_family="DNB Medium"
        typo_class="dnb-typo-medium"
      />

      {/* Bold */}
      <FontUsageExample
        font_family="DNB Bold"
        typo_class="dnb-typo-bold"
      />

      {/* Mono Regular */}
      <FontUsageExample
        font_family="DNB Mono Regular"
        typo_class="dnb-typo-mono-regular"
      />
    </Wrapper>
  )
}

export function TypographyVariants() {
  return (
    <ComponentBox data-visual-test="typography-variants" hideCode>
      <div style={{ maxWidth: '30rem' }}>
        <Code>Heading xx-large</Code>
        <H4 size="xx-large" space={0}>
          Dette er en heading på over to linjer
        </H4>
        <Code top="large">Heading x-large</Code>
        <H4 size="x-large" space={0}>
          Og dette er en heading small tittel som også går over to linjer,
          nei vent, tre linjer.
        </H4>
        <Code top="large">Heading large</Code>
        <H4 size="large" space={0}>
          Hva har vi her, en liten heading som mot alle odds går over flere
          linjer.
        </H4>
        <Code top="large">Text Lead</Code>
        <Lead space={0}>
          Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei,
          appetere oporteat eam te.
        </Lead>
        <Code top="large">Text basis</Code>
        <P space={0}>
          Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei,
          appetere oporteat eam te. Vel in deleniti sensibus, officiis
          menandri efficiantur no cum. Per et habemus gubergren. Mundi
          copiosae pertinax ea pro, vidit fierent mentitum in est, ex
          fabellas senserit inciderint vim.
        </P>
        <Code top="large">Text basis (Medium)</Code>
        <P modifier="medium" space={0}>
          Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei,
          appetere oporteat eam te. Vel in deleniti sensibus, officiis
          menandri efficiantur no cum. Per et habemus gubergren. Mundi
          copiosae pertinax ea pro, vidit fierent mentitum in est, ex
          fabellas senserit inciderint vim.
        </P>
        <Code top="large">Text small</Code>
        <P size="small" space={0}>
          Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei,
          appetere oporteat eam te. Vel in deleniti sensibus, officiis
          menandri efficiantur no cum. Per et habemus gubergren. Mundi
          copiosae pertinax ea pro, vidit fierent mentitum in est, ex
          fabellas senserit inciderint vim.
        </P>
        <Code top="large">Text small (Medium)</Code>
        <P size="small" modifier="medium" space={0}>
          Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei,
          appetere oporteat eam te. Vel in deleniti sensibus, officiis
          menandri efficiantur no cum. Per et habemus gubergren. Mundi
          copiosae pertinax ea pro, vidit fierent mentitum in est, ex
          fabellas senserit inciderint vim.
        </P>
        <Code top="large">Text x-small</Code>
        <P size="x-small" space={0}>
          Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei.
        </P>
        <Code top="large">Text x-small (Medium)</Code>
        <P size="x-small" modifier="medium" space={0}>
          Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei.
        </P>
      </div>
    </ComponentBox>
  )
}
