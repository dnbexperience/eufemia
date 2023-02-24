import React from 'react'

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import styled from '@emotion/styled'
import { Link } from '@dnb/eufemia/src/elements'

export const StyledComponentsExample = () => (
  <ComponentBox scope={{ Link }}>
    {() => {
      const StyledLink = styled(Link)`
        color: var(--color-fire-red);
      `
      return (
        <StyledLink href="/" target="_blank">
          Styled Link
        </StyledLink>
      )
    }}
  </ComponentBox>
)
