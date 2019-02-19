import React from 'react'
import styled from '@emotion/styled'

// const Example = styled.span
const Example = styled.span`
  a.dnb-skip-link {
    position: relative;
    top: 0;
    z-index: 1;
  }
  a.dnb-skip-link:active,
  a.dnb-skip-link:focus {
    margin: 0;
  }
`

export default () => (
  <Example>
    <a className="dnb-skip-link dnb-anchor--focus" href="#dnb-app-content">
      Skip to content
    </a>
  </Example>
)
