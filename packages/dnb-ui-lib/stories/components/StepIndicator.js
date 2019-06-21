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
          active_item={1}
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
              title: 'Om din nye bolig',
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
              title: 'Ditt lån og egenkapital',
              on_click: ({ currentItem }) =>
                console.log('on_click', currentItem)
              // is_active: true
              // is_current: true
            },
            {
              title: 'Oppsummering',
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
              title: 'Om din nye bolig',
              url_passed: '?path=/story/components--stepindicator&passed',
              url: '?path=/story/components--stepindicator'
            },
            {
              title: 'Ditt lån og egenkapital',
              // url_passed: '?path=/story/components--stepindicator&passed',
              url: '?path=/story/components--stepindicator&current'
            },
            {
              title: 'Oppsummering',
              url: '?path=/story/components--stepindicator'
              // url_future: '?path=/story/components--stepindicator&future'
            }
          ]}
        />
      </Box>
      <Box>
        <StepIndicator
          active_item="3"
          data={[
            {
              title: 'Om din nye bolig'
            },
            {
              title: 'Ditt lån og egenkapital'
            },
            {
              title: 'Oppsummering'
            }
          ]}
        />
      </Box>
    </Wrapper>
  )
]
