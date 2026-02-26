import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import { Flex } from '../../..'
import Stat from '../../Stat'

export default {
  title: 'Eufemia/Components/Stat',
}

export function Currency() {
  return (
    <Wrapper>
      <Box>
        <Flex.Stack>
          <Stat.Currency value={123} currency="USD" suffix="/mnd" />
          <Stat.Currency
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
          <Stat.Percent value={12.3} />
          <Stat.Percent value={-12.3} signDisplay="always" />
        </Flex.Stack>
      </Box>
    </Wrapper>
  )
}
