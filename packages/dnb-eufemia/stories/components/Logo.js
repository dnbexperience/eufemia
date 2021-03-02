/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'

import { Logo } from '../../src/components'

export default {
  title: 'Eufemia/Components/Logo'
}

export const LogoSandbox = () => {
  return (
    <Wrapper>
      <Box>
        <Logo size="80" style={{ color: 'var(--color-fire-red)' }} />
      </Box>
      <Box>
        <h1 className="dnb-h--xx-large">
          H1 with the DNB Logo <Logo size="auto" />
        </h1>
        <p className="dnb-p">
          Text with the DNB Logo <Logo />
        </p>
      </Box>
    </Wrapper>
  )
}
