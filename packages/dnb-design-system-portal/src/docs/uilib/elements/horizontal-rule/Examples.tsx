/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Hr, Dl, Dt, Dd, Div } from '@dnb/eufemia/src/elements'

export const HorizontalRuleDefaultExample = () => (
  <ComponentBox hideCode data-visual-test="hr-default">
    <Div>
      Something
      <Hr />
      Something
    </Div>
  </ComponentBox>
)

export const HorizontalRuleFullscreenExample = () => (
  <ComponentBox hideCode data-visual-test="hr-fullscreen">
    <Div>
      Something
      <Hr fullscreen />
      Something
    </Div>
  </ComponentBox>
)

export const HorizontalRuleThicknessExample = () => (
  <ComponentBox hideCode data-visual-test="hr-thickness">
    <Div>
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
    </Div>
  </ComponentBox>
)
