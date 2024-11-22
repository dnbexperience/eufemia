/**
 * UI lib Component Example
 *
 */

import React from 'react'
import styled from '@emotion/styled'
import ComponentBox from '../../../shared/tags/ComponentBox'
import { Code, H4, Lead, P } from '@dnb/eufemia/src'
import { useTheme } from '@dnb/eufemia/shared'

import { TypographyBox } from '../../../shared/parts/TypographyBox'

const Wrapper = styled.div`
  margin-bottom: 3rem;
`

const FontUsageExample = ({ typo_class, font_family }) => (
  <TypographyBox>
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
  </TypographyBox>
)

export function FontWeightByThemeExample() {
  const theme = useTheme()

  if (theme?.name === 'sbanken') {
    return (
      <Wrapper>
        {/* Regular */}
        <FontUsageExample
          font_family="Roboto Regular"
          typo_class="dnb-t__weight--regular"
        />

        {/* Medium */}
        <FontUsageExample
          font_family="Roboto Medium"
          typo_class="dnb-t__weight--medium"
        />

        {/* Bold */}
        <FontUsageExample
          font_family="Roboto Bold"
          typo_class="dnb-t__weight--bold"
        />

        {/* Mono Regular */}
        <FontUsageExample
          font_family="Monospace Regular"
          typo_class="dnb-t__weight--regular dnb-t__family--monospace"
        />
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      {/* Regular */}
      <FontUsageExample
        font_family="DNB Regular"
        typo_class="dnb-t__weight--regular"
      />

      {/* Medium */}
      <FontUsageExample
        font_family="DNB Medium"
        typo_class="dnb-t__weight--medium"
      />

      {/* Bold */}
      <FontUsageExample
        font_family="DNB Bold"
        typo_class="dnb-t__weight--bold"
      />

      {/* Mono Regular */}
      <FontUsageExample
        font_family="DNB Mono Regular"
        typo_class="dnb-t__weight--regular dnb-t__family--monospace"
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
        <P weight="medium" space={0}>
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
        <P size="small" weight="medium" space={0}>
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
        <P size="x-small" weight="medium" space={0}>
          Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei.
        </P>
      </div>
    </ComponentBox>
  )
}
