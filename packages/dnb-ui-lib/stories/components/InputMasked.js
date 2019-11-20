/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import {
  // Input,
  InputMasked
} from '../../src/components'

// import emailMask from 'text-mask-addons/dist/emailMask'
import emailMask from '../../src/components/input-masked/addons/emailMask'

const CustomStyle = styled.div`
  p {
    background-color: rgba(213, 30, 149, 0.25);
  }
`

export default [
  'InputMasked',
  () => (
    <CustomStyle>
      <Wrapper>
        <Box>
          <InputMasked
            label="Email:"
            type="email"
            placeholder="@."
            keep_placeholder
            mask={emailMask}
          />
        </Box>
      </Wrapper>
    </CustomStyle>
  )
]
