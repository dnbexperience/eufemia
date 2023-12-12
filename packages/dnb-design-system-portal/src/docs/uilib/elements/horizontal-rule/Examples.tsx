/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Hr, Dl, Dt, Dd } from '@dnb/eufemia/src'

export const HorizontalRuleDefaultExample = () => (
  <ComponentBox hideCode data-visual-test="hr-default">
    Something
    <Hr />
    Something
  </ComponentBox>
)

export const HorizontalRuleFullscreenExample = () => (
  <ComponentBox hideCode data-visual-test="hr-fullscreen">
    Something
    <Hr fullscreen />
    Something
  </ComponentBox>
)

export const HorizontalRuleThicknessExample = () => (
  <ComponentBox hideCode data-visual-test="hr-thickness">
    <Dl>
      <Dt>Light 0.5px</Dt>
      <Dd>
        <Hr light />
      </Dd>
    </Dl>
    <Dl>
      <Dt>Default 1px</Dt>
      <Dd>
        <Hr />
      </Dd>
    </Dl>
    <Dl>
      <Dt>Medium 1.5px</Dt>
      <Dd>
        <Hr medium />
      </Dd>
    </Dl>
  </ComponentBox>
)
