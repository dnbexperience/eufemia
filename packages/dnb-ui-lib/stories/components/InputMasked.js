/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import { Input, InputMasked } from '../../src/components'

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
            label="Amount:"
            currency_mask="kr"
            on_change={(e) => {
              console.log('on_change', e)
            }}
            right
            bottom
          />
          <InputMasked
            label="Amount:"
            currency_mask={{ currency: 'NOK' }}
            align="left"
            on_change={(e) => {
              console.log('on_change', e)
            }}
            on_focus={(e) => {
              console.log('on_focus', e)
            }}
            on_blur={(e) => {
              console.log('on_blur', e)
            }}
          />
        </Box>
        <Box>
          <InputMasked
            label="Email:"
            // DOMException: Failed to execute 'setSelectionRange' on 'HTMLInputElement'
            // The input element's type ('email') does not support selection.
            // type="email"
            placeholder="@."
            autocomplete="on"
            keep_placeholder
            mask={emailMask}
            right
            bottom
          />
          <Input label="Email:" type="email" autocomplete="on" />
        </Box>
      </Wrapper>
    </CustomStyle>
  )
]
