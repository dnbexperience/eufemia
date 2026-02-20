import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import { Flex } from '../../..'
import HeroFormat from '../../HeroFormat'

export default {
  title: 'Eufemia/Components/HeroFormat',
}

export function Amount() {
  return (
    <Wrapper>
      <Box>
        <Flex.Stack>
          <HeroFormat.Amount value={123} currency="USD" suffix="/mnd" />
          <HeroFormat.Amount
            value={350234.678}
            currency="USD"
            suffix="/mnd"
            signDisplay="always"
          />
        </Flex.Stack>
      </Box>
    </Wrapper>
  )
}
