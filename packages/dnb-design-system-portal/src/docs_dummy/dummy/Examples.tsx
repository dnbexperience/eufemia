/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import styled from '@emotion/styled'

export const DemoCode = () => {
  const foo = 'bar'
  return (
    <ComponentBox data-visual-test="unique-id" scope={{ foo }}>
      {() => {
        const StyledDiv = styled.div`
          color: red;
        `
        return <StyledDiv>{foo}</StyledDiv>
      }}
    </ComponentBox>
  )
}
