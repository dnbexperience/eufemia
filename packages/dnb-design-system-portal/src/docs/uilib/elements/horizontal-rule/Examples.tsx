/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Hr, P } from '@dnb/eufemia/src'

export const HorizontalRuleDefaultExample = () => (
  <ComponentBox background="plain" hideCode data-visual-test="hr-default">
    <P>
      Before
      <Hr space={{ top: '0.5rem', bottom: '0.5rem' }} />
      After
    </P>
  </ComponentBox>
)

export const HorizontalRuleBreakoutExample = () => (
  <ComponentBox background="plain" hideCode data-visual-test="hr-breakout">
    <P>
      Before
      <Hr breakout space={{ top: '0.5rem', bottom: '0.5rem' }} />
      After
    </P>
  </ComponentBox>
)

export const HorizontalRuleDashedExample = () => (
  <ComponentBox background="plain" hideCode data-visual-test="hr-dashed">
    <P>
      Before
      <Hr dashed space={{ top: '0.5rem', bottom: '0.5rem' }} />
      After
    </P>
  </ComponentBox>
)
