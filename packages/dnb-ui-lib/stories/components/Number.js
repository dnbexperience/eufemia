/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'
import { Number } from '../../src/components'
import Provider from '../../src/shared/Provider'

const CustomStyle = styled.div`
  .dnb-number {
    ${'' /* display: block; */}
    ${'' /* color: hotpink; */}
  }
`

export default [
  'Number',
  () => (
    <CustomStyle>
      <Provider locale={null}>
        <Wrapper>
          <Box>
            random number <Number value="12345678" /> random number{' '}
            <Number value={-12345678} />
          </Box>
          <Box>
            random currency <Number value={-12345678} currency /> random
            currency <Number value="-12345678" currency selectable />{' '}
            random currency{' '}
            <Number value="12345678" currency locale="en-US" selectable />
          </Box>
          <Box>
            random currency <Number currency>12 345 678</Number> random
            currency <Number currency>12345,68</Number>
          </Box>
          <Box>
            random phone number <Number value="99999999" phone /> random
            phone number <Number value="4799999999" phone /> random phone
            number <Number value="++4799999999" phone /> random phone
            number <Number value="004780022222" phone anchor="sms" />{' '}
            random phone number <Number value="+47116000" phone /> random
            text <Number value="+4702000" phone />
          </Box>
          <Box>
            bank account number <Number value="20001234567" ban /> random
            account number
          </Box>
          <Box>
            national identification number{' '}
            <Number value="18089212345" nin /> random identification number
          </Box>
        </Wrapper>
      </Provider>
    </CustomStyle>
  )
]
