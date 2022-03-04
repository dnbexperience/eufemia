/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Box, Wrapper } from 'storybook-utils/helpers'

import Tag from '../Tag'
import { Provider } from '../../../shared'
import {
  account,
  bell,
  car_1,
  chip,
  save,
  scooter,
  scissors,
  share_ios,
  save_medium,
  scissors_medium,
  scooter_medium,
  share_ios_medium,
  tag,
} from '../../../icons'

export default {
  title: 'Eufemia/Components/Tag',
}

export const Default = () => {
  return (
    <Provider>
      <Tag.Group label="tags">
        <Tag>Default</Tag>
      </Tag.Group>
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
        <Tag.Group label="tags">
          <Tag icon={account} text={'Icon'} />
        </Tag.Group>
      </Box>
    </Wrapper>
  )
}

export const TagMultiple = () => {
  return (
    <Wrapper>
      <Box>
        <Tag.Group label="tags">
          <Tag icon={bell} text={'Tag 1'} />
          <Tag icon={car_1} text={'Tag 2'} />
          <Tag icon={chip} text={'Tag 3'} />
        </Tag.Group>
      </Box>
    </Wrapper>
  )
}

export const TagWithIcon = () => {
  return (
    <Provider>
      <Tag.Group label="tags">
        <Tag icon={account} text={'Icon'} />
      </Tag.Group>
    </Provider>
  )
}

export const TagWithSkeleton = () => {
  return (
    <Provider>
      <Tag.Group label="skeleton">
        <Tag icon={account} text={'Skeleton'} skeleton />
      </Tag.Group>
    </Provider>
  )
}

export const TagWithSpace = () => {
  return (
    <Provider>
      <Tag.Group label="space">
        <Tag text="Space" space={{ top: true }} />
      </Tag.Group>
      <Tag.Group label="space" space={{ left: true }}>
        <Tag text="Space" />
      </Tag.Group>
    </Provider>
  )
}

export const TagClickable = () => {
  return (
    <Provider>
      <Tag.Group label="clickable">
        <Tag
          icon={account}
          text={'Space'}
          onClick={() => {
            console.log('Tag is clicked!')
          }}
        />
      </Tag.Group>
    </Provider>
  )
}

export const TagMultipleClickable = () => {
  return (
    <Wrapper>
      <Box>
        <Tag.Group label="multiple clickable">
          <Tag
            icon={save}
            onClick={() => {
              console.log('Click1')
            }}
            text={'First'}
          />
          <Tag
            icon={scissors}
            onClick={() => {
              console.log('Click2')
            }}
            text={'Second'}
          />
          <Tag
            icon={scooter}
            onClick={() => {
              console.log('Click3')
            }}
            text={'Third'}
          />
          <Tag
            icon={share_ios}
            onClick={() => {
              console.log('Click4')
            }}
            text={'Fourth'}
          />
        </Tag.Group>
      </Box>
    </Wrapper>
  )
}

export const TagMixed = () => {
  return (
    <Wrapper>
      <Box>
        <Tag.Group label="numbers">
          <Tag icon={save} text={'First'} />
          <Tag
            icon={scissors}
            onClick={() => {
              console.log('Click2')
            }}
            text={'Second'}
          />
          <Tag icon={scooter} text={'Third'} />
          <Tag
            icon={share_ios}
            onClick={() => {
              console.log('Click4')
            }}
            text={'Fourth'}
          />
        </Tag.Group>
      </Box>
    </Wrapper>
  )
}

export const TagWithMediumSizedIcons = () => {
  return (
    <Wrapper>
      <Box>
        <Tag.Group label="medium sized">
          <Tag icon={save_medium} text={'First'} />
          <Tag icon={scissors_medium} text={'Second'} />
          <Tag icon={scooter_medium} text={'Third'} />
          <Tag icon={share_ios_medium} text={'Fourth'} />
        </Tag.Group>
      </Box>
    </Wrapper>
  )
}

export const TagWithoutGroup = () => {
  return (
    <Provider>
      <Tag icon={tag} text="TagWithoutGroup" />
    </Provider>
  )
}
export const TagWithoutLabel = () => {
  return <Tag hasLabel icon={tag} text="Tag.WithoutLabel" />
}

export const TagRemovable = () => {
  return (
    <Wrapper>
      <Box>
        <Tag.Group label="remove">
          <Tag
            icon={tag}
            text={'Removable'}
            onDelete={() => {
              console.log('Removed!')
            }}
          />
        </Tag.Group>
      </Box>
    </Wrapper>
  )
}

export const TagRemovableClickable = () => {
  return (
    <Wrapper>
      <Box>
        <Tag.Group label="remove">
          <Tag
            icon={tag}
            text={'Click/Delete'}
            onClick={() => {
              console.log('Clicked!')
            }}
            onDelete={() => {
              console.log('Removed!')
            }}
          />
        </Tag.Group>
      </Box>
    </Wrapper>
  )
}

export const TagMultipleRemovable = () => {
  return (
    <Wrapper>
      <Box>
        <Tag.Group label="multiple removable">
          <Tag
            icon={save}
            onDelete={() => {
              console.log('Delete1')
            }}
            text={'First'}
          />
          <Tag
            icon={scissors}
            onDelete={() => {
              console.log('Delete2')
            }}
            text={'Second'}
          />
          <Tag
            icon={scooter}
            onDelete={() => {
              console.log('Delete3')
            }}
            text={'Third'}
          />
          <Tag
            icon={share_ios}
            onDelete={() => {
              console.log('Delete4')
            }}
            text={'Fourth'}
          />
        </Tag.Group>
      </Box>
    </Wrapper>
  )
}
