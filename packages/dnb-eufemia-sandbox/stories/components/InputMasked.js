/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import { Input, InputMasked } from '@dnb/eufemia/src/components'

// import emailMask from 'text-mask-addons/dist/emailMask'
import emailMask from '@dnb/eufemia/src/components/input-masked/addons/emailMask'

export default {
  title: 'Eufemia/Components/InputMasked',
}

const CustomStyle = styled.div`
  p {
    background-color: rgba(213, 30, 149, 0.25);
  }
`

export const InputsMasked = () => (
  <CustomStyle>
    <Wrapper>
      <Box>
        <InputMasked
          // selectall
          label="Amount:"
          currency_mask="kr"
          on_change={({ cleaned_value }) => {
            console.log(cleaned_value)
          }}
          right
          bottom
        />
        <InputMasked
          label="Amount:"
          currency_mask={{ currency: 'NOK' }}
          on_change={({ cleaned_value }) => {
            console.log(cleaned_value)
          }}
          // on_focus={(e) => {
          //   console.log('on_focus', e)
          // }}
          // on_blur={(e) => {
          //   console.log('on_blur', e)
          // }}
        />
      </Box>
      <Box>
        <InputMasked
          // selectall
          label="Amount:"
          currency_mask="kr"
          align="right"
          on_change={({ cleaned_value }) => {
            console.log(cleaned_value)
          }}
          right
          bottom
        />
        <InputMasked
          label="Amount:"
          currency_mask={{ currency: 'NOK' }}
          align="right"
          on_change={({ cleaned_value }) => {
            console.log(cleaned_value)
          }}
          // on_focus={(e) => {
          //   console.log('on_focus', e)
          // }}
          // on_blur={(e) => {
          //   console.log('on_blur', e)
          // }}
        />
      </Box>
      <Box>
        <InputMasked
          label="Currency:"
          as_currency="EUR"
          currency_mask={{ decimalLimit: 1 }}
          // locale="en-GB"
          // align="left"
          value="1234.0"
          right
          bottom
          on_change={({ cleaned_value }) => {
            console.log(cleaned_value)
          }}
        />
        <InputMasked
          label="Number:"
          as_number
          number_mask={{ decimalLimit: 1 }}
          align="right"
          // locale="en-GB"
          value="1234.0"
          right
          bottom
          on_change={({ cleaned_value }) => {
            console.log(cleaned_value)
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
