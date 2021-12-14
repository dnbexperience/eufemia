/**
 * @dnb/eufemia Component Story
 *
 */

import React, { useState } from 'react'
import { Tag } from '@dnb/eufemia/src/components'
import { Provider } from '@dnb/eufemia/src/shared'
import { Box, Wrapper } from '../helpers'
import { account, bell, car_1, chip, send } from '@dnb/eufemia/src/icons'

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
        <Tag icon={account} text={'Icon'} />
      </Box>
    </Wrapper>
  )
}

export const TagMultiple = () => {
  return (
    <Wrapper>
      <Box>
        <Default /> <Tag icon={send} text={'First'} />{' '}
        <Tag icon={bell} text={'Second'} />{' '}
        <Tag icon={car_1} text={'Third'} />{' '}
        <Tag icon={chip} text={'Fourth'} />{' '}
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

export const TagWithSkeleton = () => {
  return (
    <Provider>
      <Tag icon={account} text={'Icon'} skeleton />
    </Provider>
  )
}

export const TagWithSpace = () => {
  return (
    <Provider>
      <Tag icon={account} text={'Space'} space={{ top: 'small' }} />
    </Provider>
  )
}
