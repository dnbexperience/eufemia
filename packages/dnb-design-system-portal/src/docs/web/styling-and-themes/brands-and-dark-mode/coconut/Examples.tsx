import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { H1, Heading, P, Span } from '@dnb/eufemia/src'
import TypographyRebels from '@dnb/eufemia/src/elements/TypographyRebels'

export const RebelsExample = () => (
  <ComponentBox
    scope={{ TypographyRebels, H1, P }}
    data-visual-test="coconut-rebels"
  >
    <TypographyRebels maxPerHeading={0}>
      <P>Default</P>
      <H1>En enklere hverdag for alle!</H1>
    </TypographyRebels>
    <TypographyRebels maxPerHeading={2}>
      <P>At most two Rebels per heading</P>
      <H1>En enklere hverdag for alle!</H1>
      <H1 top>Spare litt. Leve mer!</H1>
    </TypographyRebels>
  </ComponentBox>
)

export const InlineRebelsExample = () => (
  <ComponentBox scope={{ TypographyRebels, Heading, Span }}>
    <TypographyRebels>
      <Heading size="x-large">Velkommen til oss</Heading>
      <Heading size="x-large" top>
        V<Span>elkommen</Span> til <em>oss</em>
      </Heading>
      <Heading size="x-large" top>
        Ta kontakt med oss
      </Heading>
      <Heading size="x-large" top>
        Bytt
      </Heading>
    </TypographyRebels>
  </ComponentBox>
)
