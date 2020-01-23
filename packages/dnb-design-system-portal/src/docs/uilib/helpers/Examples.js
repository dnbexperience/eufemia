/**
 * UI lib Component Example
 *
 */

import React from 'react'
import styled from '@emotion/styled'
import { Example } from './helper-classes-examples'

const Wrapper = styled.div`
  /*
  *
  * Helper Classes - some of them need
  * visualising to see their effect
  */

  .dnb-nudge--vertical {
    background-color: var(--color-mint-green-50);
  }

  .dnb-nudge--horizontal {
    background-color: var(--color-mint-green-50);
  }
`

export { Example }
export default () => (
  <Wrapper className="dnb-spacing">
    <Example />
  </Wrapper>
)
