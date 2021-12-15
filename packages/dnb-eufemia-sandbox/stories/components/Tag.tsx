/**
 * @dnb/eufemia Component Story
 *
 */

import React, { useState } from 'react'
import { Tag } from '@dnb/eufemia/src/components'
import { Provider } from '@dnb/eufemia/src/shared'
import { Box, Wrapper } from '../helpers'
import {
  account,
  bell,
  car_1,
  chip,
  send,
  save,
  scooter,
  scissors,
  share_ios,
  save_medium,
  scissors_medium,
  scooter_medium,
  share_ios_medium,
} from '@dnb/eufemia/src/icons'

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
        <Tag icon={send} text={'First'} />{' '}
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

export const TagClickable = () => {
  return (
    <Provider>
      <Tag
        icon={account}
        text={'Space'}
        onClick={() => {
          console.log('Tag is clicked!')
        }}
      />
    </Provider>
  )
}

export const TagMultipleClickable = () => {
  return (
    <Wrapper>
      <Box>
        <Tag
          icon={save}
          onClick={() => {
            console.log('Click1')
          }}
          text={'First'}
        />{' '}
        <Tag
          icon={scissors}
          onClick={() => {
            console.log('Click2')
          }}
          text={'Second'}
        />{' '}
        <Tag
          icon={scooter}
          onClick={() => {
            console.log('Click3')
          }}
          text={'Third'}
        />{' '}
        <Tag
          icon={share_ios}
          onClick={() => {
            console.log('Click4')
          }}
          text={'Fourth'}
        />{' '}
      </Box>
    </Wrapper>
  )
}

export const TagMixed = () => {
  return (
    <Wrapper>
      <Box>
        <Tag icon={save} text={'First'} />{' '}
        <Tag
          icon={scissors}
          onClick={() => {
            console.log('Click2')
          }}
          text={'Second'}
        />{' '}
        <Tag icon={scooter} text={'Third'} />{' '}
        <Tag
          icon={share_ios}
          onClick={() => {
            console.log('Click4')
          }}
          text={'Fourth'}
        />{' '}
      </Box>
    </Wrapper>
  )
}

export const TagWithMediumSizedIcons = () => {
  return (
    <Wrapper>
      <Box>
        <Tag
          icon={save_medium}
          onClick={() => {
            console.log('Click1')
          }}
          text={'First'}
        />{' '}
        <Tag
          icon={scissors_medium}
          onClick={() => {
            console.log('Click2')
          }}
          text={'Second'}
        />{' '}
        <Tag
          icon={scooter_medium}
          onClick={() => {
            console.log('Click3')
          }}
          text={'Third'}
        />{' '}
        <Tag
          icon={share_ios_medium}
          onClick={() => {
            console.log('Click4')
          }}
          text={'Fourth'}
        />{' '}
      </Box>
    </Wrapper>
  )
}
