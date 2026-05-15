/**
 * UI lib Component Example
 *
 */

import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Hr, P } from '@dnb/eufemia/src'

export const HorizontalRuleDefaultExample = () => (
  <ComponentBox background="plain" hideCode data-visual-test="hr-default">
    <P>Before</P>
    <Hr space={{ top: '0.5rem', bottom: '0.5rem' }} />
    <P>After</P>
  </ComponentBox>
)

export const HorizontalRuleBreakoutExample = () => (
  <ComponentBox background="plain" hideCode data-visual-test="hr-breakout">
    <P>Before</P>
    <Hr breakout space={{ top: '0.5rem', bottom: '0.5rem' }} />
    <P>After</P>
  </ComponentBox>
)

export const HorizontalRuleDashedExample = () => (
  <ComponentBox background="plain" hideCode data-visual-test="hr-dashed">
    <P>Before</P>
    <Hr dashed space={{ top: '0.5rem', bottom: '0.5rem' }} />
    <P>After</P>
  </ComponentBox>
)
