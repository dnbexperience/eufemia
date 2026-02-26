import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import { Flex } from '../../..'
import Spotlight from '../../Spotlight'

export default {
  title: 'Eufemia/Components/Spotlight',
}

export function Currency() {
  return (
    <Wrapper>
      <Box>
        <Flex.Stack>
          <Spotlight.Currency value={123} currency="USD" suffix="/mnd" />
          <Spotlight.Currency
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

export function Percent() {
  return (
    <Wrapper>
      <Box>
        <Flex.Stack>
          <Spotlight.Percent value={12.3} />
          <Spotlight.Percent value={-12.3} signDisplay="always" />
        </Flex.Stack>
      </Box>
    </Wrapper>
  )
}
