/**
 * UI lib Component Example
 *
 */

import styled from '@emotion/styled'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  Button,
  Heading,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  Span,
} from '@dnb/eufemia/src'
import { Typography } from '@dnb/eufemia/src/elements'
import GlobalResponsiveTypography from '@dnb/eufemia/src/extensions/global-responsive-typography/GlobalResponsiveTypography'
import '@dnb/eufemia/src/extensions/global-responsive-typography/style/dnb-global-responsive-typography.scss'

const MarginReset = styled.div`
  .dnb-heading,
  [class^='dnb-h'],
  [class*=' dnb-h'] {
    display: block;
    margin: 0 !important;
  }
`

export const ResponsiveTypographyFullExample = () => (
  <MarginReset>
    <ComponentBox scope={{ Typography, GlobalResponsiveTypography }}>
      <GlobalResponsiveTypography>
        <H1>H1</H1>
        <H2>H2</H2>
        <H3>H3</H3>
        <H4>H4</H4>
        <H5>H5</H5>
        <H6>H6</H6>

        <Button>Button</Button>

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
      </GlobalResponsiveTypography>
    </ComponentBox>
  </MarginReset>
)

export const ResponsiveTypographyScreenshotExample = () => (
  <ComponentBox
    scope={{ Typography, GlobalResponsiveTypography }}
    data-visual-test="global-typography-responsive"
  >
    <GlobalResponsiveTypography>
      <P
        style={{
          backgroundColor: 'var(--token-color-decorative-first-subtle)',
        }}
      >
        Paragraph text
      </P>
      <Button>Button</Button>
    </GlobalResponsiveTypography>
  </ComponentBox>
)
