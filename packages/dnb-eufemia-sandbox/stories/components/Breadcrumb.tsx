/**
 * @dnb/eufemia Component Story
 *
 */

import React, { useState } from 'react'
// import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import {
  Breadcrumb,
  Skeleton,
  // ToggleButton,
  // Button,
} from '@dnb/eufemia/src/components'
import { Provider } from '@dnb/eufemia/src/shared'
import {
  // BreadcrumbItem,
  BreadcrumbItemProps,
} from '@dnb/eufemia/src/components/breadcrumb/Breadcrumb'
import { Box, Wrapper } from '../helpers'
// import BreadcrumbItem from '@dnb/eufemia/src/components/breadcrumb/BreadcrumbItem'

export default {
  title: 'Eufemia/Components/Breadcrumb',
}

const breadcrumbItems: BreadcrumbItemProps[] = [
  {
    href: '/',
  },
  {
    text: 'Components',
    href: '/',
  },
  {
    text: 'Breadcrumbs',
    href: '/',
  },
  {
    text: 'Items',
    href: '/',
  },
  {
    text: 'Button',
    href: '/',
  },
]

export const Multiple = () => {
  const [showHome, makeHomeVisible] = React.useState(false)
  return (
    <Provider>
      {/* <ToggleButton
        on_change={() => {
          makeHomeVisible((s) => !s)
        }}
      >
        Toggle Home
      </ToggleButton>
      <br /> */}
      <Skeleton>
        <Breadcrumb data={breadcrumbItems} />
      </Skeleton>
    </Provider>
  )
}

export const Single = () => {
  return (
    <Provider locale="en-GB">
      <Skeleton>
        <Breadcrumb
          variant="single"
          onClick={() => {
            console.log('Going back!')
          }}
        />
      </Skeleton>
    </Provider>
  )
}

export const BreadcrumbSandbox = () => {
  return (
    <Wrapper>
      <Box>
        <Single />
      </Box>
      <Box>
        <Multiple />
      </Box>
      <Box>
        <Breadcrumb data={breadcrumbItems} styleType="sea-green" />
      </Box>
      <Box>
        <Breadcrumb data={breadcrumbItems} spacing styleType="sea-green" />
      </Box>
      <Box>
        <Breadcrumb data={breadcrumbItems} spacing styleType="fire-red" />
      </Box>
      <Box>
        <Breadcrumb
          data={breadcrumbItems}
          spacing
          styleType="emerald-green"
        />
      </Box>
      <Box>
        <Breadcrumb
          data={breadcrumbItems}
          styleType="mint-green"
          spacing
          variant="collapse"
        />
      </Box>
    </Wrapper>
  )
}

export const CustomCollapsedBreadcrumb = () => {
  const [collapsed, setCollapsed] = useState(true)
  return (
    <Provider>
      <Breadcrumb
        data={breadcrumbItems}
        isCollapsed={collapsed}
        onClick={() => {
          console.log('Collapsing')
          // ... doing other stuff
          setCollapsed(!collapsed)
        }}
        variant="collapse"
      />
    </Provider>
  )
}

export const CollapsedBreadcrumbWithSpacing = () => {
  return (
    <Provider>
      <Breadcrumb data={breadcrumbItems} variant="collapse" spacing />
    </Provider>
  )
}
