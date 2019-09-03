/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { StepIndicator } from '../../src/components'

export default [
  'StepIndicator',
  () => (
    <Wrapper>
      <Box>
        <StepIndicator
          use_navigation
          active_item={0}
          on_change={({ currentItem }) => {
            console.log('on_change', currentItem)
          }}
          on_item_render={({ StepItem }) => {
            return (
              <StepItem
                onClick={e => {
                  console.log('on_item_render.onClick', e)
                }}
              />
            )
          }}
          data={[
            {
              title: 'First',
              on_click: ({ currentItem }) =>
                console.log('on_click', currentItem)
              // on_render: ({ StepItem }) => (
              //   <StepItem
              //     onClick={e => {
              //       console.log('on_render.onClick', e)
              //     }}
              //   />
              // )
            },
            {
              title: 'Second',
              on_click: ({ currentItem }) =>
                console.log('on_click', currentItem)
              // is_active: true
              // is_current: true
            },
            {
              title: 'Third',
              on_click: ({ currentItem }) =>
                console.log('on_click', currentItem)
            }
          ]}
        />
      </Box>
      <Box>
        <StepIndicator
          hide_numbers
          active_url="?path=/story/components--stepindicator&current"
          data={[
            {
              title: 'First',
              url_passed: '?path=/story/components--stepindicator&passed',
              url: '?path=/story/components--stepindicator'
            },
            {
              title: 'Second',
              // url_passed: '?path=/story/components--stepindicator&passed',
              url: '?path=/story/components--stepindicator&current'
            },
            {
              title: 'Third',
              url: '?path=/story/components--stepindicator'
              // url_future: '?path=/story/components--stepindicator&future'
            }
          ]}
        />
      </Box>
      <Box>
        <StepIndicator
          active_item="2"
          data={[
            {
              title: 'First'
            },
            {
              title: 'Second'
            },
            {
              title: 'Third'
            }
          ]}
        />
      </Box>
    </Wrapper>
  )
]
