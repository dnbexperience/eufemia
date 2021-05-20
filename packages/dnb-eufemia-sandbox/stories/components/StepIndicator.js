/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { StepIndicator } from '@dnb/eufemia/src/components'

export default {
  title: 'Eufemia/Components/StepIndicator',
}

export const StepIndicatorSandbox = () => (
  <Wrapper>
    <Box>
      <StepIndicator
        enable_navigation={true}
        current_step={0}
        on_change={({ currentItem }) => {
          console.log('on_change', currentItem)
        }}
        on_item_render={({ StepItem }) => {
          return (
            <StepItem
              onClick={(e) => {
                console.log('on_item_render.onClick', e)
              }}
            />
          )
        }}
        data={[
          {
            title: 'First',
            on_click: ({ currentItem }) =>
              console.log('on_click', currentItem),
            // on_render: ({ StepItem }) => (
            //   <StepItem
            //     onClick={e => {
            //       console.log('on_render.onClick', e)
            //     }}
            //   />
            // )
          },
          {
            title:
              'Second Sapien vivamus convallis fermentum euismod quam platea tellus nullam mollis',
            on_click: ({ currentItem }) =>
              console.log('on_click', currentItem),
            // is_active: true
            // is_current: true
          },
          {
            title:
              'Third Sapien vivamus convallis fermentum euismod quam platea tellus nullam mollis',
            on_click: ({ currentItem }) =>
              console.log('on_click', currentItem),
          },
        ]}
      />
    </Box>
    <Box>
      <h1>Deprecated</h1>
      <StepIndicator
        hide_numbers
        active_url="?path=/story/components--stepindicator&current"
        data={[
          {
            title: 'First',
            url_passed: '?path=/story/components--stepindicator&passed',
            url: '?path=/story/components--stepindicator',
          },
          {
            title: 'Second',
            // url_passed: '?path=/story/components--stepindicator&passed',
            url: '?path=/story/components--stepindicator&current',
          },
          {
            title: 'Third',
            url: '?path=/story/components--stepindicator',
            // url_future: '?path=/story/components--stepindicator&future'
          },
        ]}
      />
    </Box>
    <Box>
      <StepIndicator
        // current_step={1}
        data={[
          {
            title: 'First',
          },
          {
            title: 'Second',
            is_current: true,
          },
          {
            title: 'Third',
          },
        ]}
      />
    </Box>
    <Box>
      <StepIndicator
        current_step="2"
        data={['First', 'Second', 'Third']}
      />
    </Box>
  </Wrapper>
)
