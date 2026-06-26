/**
 * UI lib Component Example
 *
 */

import styled from '@emotion/styled'
import ComponentBox from '../../../shared/tags/ComponentBox'
import {
  Code,
  Heading,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Lead,
  P,
  Span,
} from '@dnb/eufemia/src'
import { Typography } from '@dnb/eufemia/src/elements'

import { useTheme } from '@dnb/eufemia/shared'

import { TypographyBox } from '../../../shared/parts/TypographyBox'

const MarginReset = styled.div`
  .dnb-heading,
  [class^='dnb-h'],
  [class*=' dnb-h'] {
    display: block;
    margin: 0 !important;
  }
`

const Wrapper = styled.div`
  margin-bottom: 3rem;
`

const FontUsageExample = ({ typoClass, fontFamily }) => (
  <TypographyBox>
    <h3 className={typoClass}>{fontFamily}</h3>
    <p className={typoClass}>
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
          fontFamily="Roboto Regular"
          typoClass="dnb-t__weight--regular"
        />

        {/* Medium */}
        <FontUsageExample
          fontFamily="Roboto Medium"
          typoClass="dnb-t__weight--medium"
        />

        {/* Bold */}
        <FontUsageExample
          fontFamily="Roboto Bold"
          typoClass="dnb-t__weight--bold"
        />

        {/* Mono Regular */}
        <FontUsageExample
          fontFamily="Monospace Regular"
          typoClass="dnb-t__weight--regular dnb-t__family--monospace"
        />
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      {/* Regular */}
      <FontUsageExample
        fontFamily="DNB Regular"
        typoClass="dnb-t__weight--regular"
      />

      {/* Medium */}
      <FontUsageExample
        fontFamily="DNB Medium"
        typoClass="dnb-t__weight--medium"
      />

      {/* Bold */}
      <FontUsageExample
        fontFamily="DNB Bold"
        typoClass="dnb-t__weight--bold"
      />

      {/* Mono Regular */}
      <FontUsageExample
        fontFamily="DNB Mono Regular"
        typoClass="dnb-t__weight--regular dnb-t__family--monospace"
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

export const ResponsiveTypographyExample = () => (
  <ComponentBox scope={{ Typography }}>
    <H2>Fixed H2</H2>
    <Span size="medium">Fixed Span</Span>
    <Heading level="3">Fixed Heading</Heading>
    <P>Fixed P</P>

    <Typography.Context responsive>
      <H2>Responsive H2</H2>
      <Span size="medium">Responsive Span</Span>
      <Heading level="3">Responsive Heading</Heading>
      <P>Responsive P</P>
    </Typography.Context>
  </ComponentBox>
)

export const ResponsiveTypographyFullExample = () => (
  <MarginReset>
    <ComponentBox
      scope={{ Typography }}
      data-visual-test="typography-responsive"
    >
      <Typography.Context responsive>
        <H1>H1</H1>
        <H2>H2</H2>
        <H3>H3</H3>
        <H4>H4</H4>
        <H5>H5</H5>
        <H6>H6</H6>

        <Heading level="1">Heading 1</Heading>
        <Heading level="2">Heading 2</Heading>
        <Heading level="3">Heading 3</Heading>
        <Heading level="4">Heading 4</Heading>
        <Heading level="5">Heading 5</Heading>
        <Heading level="6">Heading 6</Heading>

        <Span>Span default</Span>
        <br />
        <Span size="x-small">Span x-small</Span>
        <br />
        <Span size="small">Span small</Span>
        <br />
        <Span size="basis">Span basis</Span>
        <br />
        <Span size="medium">Span medium</Span>
        <br />
        <Span size="large">Span large</Span>
        <br />
        <Span size="x-large">Span x-large</Span>
        <br />
        <Span size="xx-large">Span xx-large</Span>

        <P>P default</P>
        <P size="x-small">P x-small</P>
        <P size="small">P small</P>
        <P size="basis">P basis</P>
        <P size="medium">P medium</P>
        <P size="large">P large</P>
        <P size="x-large">P x-large</P>
        <P size="xx-large">P xx-large</P>
      </Typography.Context>
    </ComponentBox>
  </MarginReset>
)
