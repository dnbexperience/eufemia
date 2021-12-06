/**
 * @dnb/eufemia Component Story
 *
 */

import React, { useState } from 'react'
// import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { Tag } from '@dnb/eufemia/src/components'
import { Provider } from '@dnb/eufemia/src/shared'
import { Box, Wrapper } from '../helpers'
import { account } from '@dnb/eufemia/src/icons'

export default {
  title: 'Eufemia/Components/Tag',
}

export const Default = () => {
  return (
    <Provider>
      <Tag>Default</Tag>
    </Provider>
  )
}

export const TagSandbox = () => {
  return (
    <Wrapper>
      <Box>
        <Default />
      </Box>
      <Box>
        <Tag icon={account} text={'Default'} />
      </Box>
    </Wrapper>
  )
}

export const TagWithIcon = () => {
  return (
    <Provider>
      <Tag icon={account} text={'Icon'} />
    </Provider>
  )
}
