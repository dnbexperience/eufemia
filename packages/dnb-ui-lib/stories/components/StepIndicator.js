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
          active_url="?d"
          data={[
            {
              title: 'Om din nye bolig',
              url: '?a'
            },
            {
              title: 'Ditt lån og egenkapital',
              url: '?b'
            },
            {
              title: 'Oppsummering',
              url: '?c',
              url_future: ''
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
