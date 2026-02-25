import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import { Flex } from '../../..'
import Spotlight from '../../Spotlight'

export default {
  title: 'Eufemia/Components/Spotlight',
}

export function Amount() {
  return (
    <Wrapper>
      <Box>
        <Flex.Stack>
          <Spotlight.Amount value={123} currency="USD" suffix="/mnd" />
          <Spotlight.Amount
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
