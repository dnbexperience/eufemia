import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Heading, P, Span } from '@dnb/eufemia/src'
import TypographyRebels from '@dnb/eufemia/src/elements/TypographyRebels'

export const RebelsExample = () => (
  <ComponentBox
    scope={{ TypographyRebels, Heading, P }}
    data-visual-test="coconut-rebels"
  >
    <TypographyRebels maxPerHeading={0}>
      <P>Default</P>
      <Heading size="xx-large">En enklere hverdag for alle!</Heading>
    </TypographyRebels>
    <TypographyRebels maxPerHeading={2}>
      <P>At most two Rebels per heading</P>
      <Heading size="xx-large">En enklere hverdag for alle!</Heading>
      <Heading size="xx-large" top>
        Spare litt. Leve mer!
      </Heading>
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
