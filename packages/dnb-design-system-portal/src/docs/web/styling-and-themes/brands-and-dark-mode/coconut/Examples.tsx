import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { H1, P } from '@dnb/eufemia/src'
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
