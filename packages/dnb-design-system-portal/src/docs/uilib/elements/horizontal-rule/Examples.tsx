/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Hr } from '@dnb/eufemia/src'

export const HorizontalRuleDefaultExample = () => (
  <ComponentBox background="white" hideCode data-visual-test="hr-default">
    Something
    <Hr space={{ top: '0.5rem', bottom: '0.5rem' }} />
    Something
  </ComponentBox>
)

export const HorizontalRuleBreakoutExample = () => (
  <ComponentBox background="white" hideCode data-visual-test="hr-breakout">
    Something
    <Hr breakout space={{ top: '0.5rem', bottom: '0.5rem' }} />
    Something
  </ComponentBox>
)

export const HorizontalRuleDashedExample = () => (
  <ComponentBox background="white" hideCode data-visual-test="hr-dashed">
    Something
    <Hr dashed space={{ top: '0.5rem', bottom: '0.5rem' }} />
    Something
  </ComponentBox>
)
