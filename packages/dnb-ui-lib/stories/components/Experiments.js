/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

// import { H2, H3 } from '../../src/elements'

import Provider from '../../src/shared/Provider'
import {
  // Checkbox,
  // Radio,
  Input,
  // FormLabel,
  Dropdown,
  FormRow
} from '../../src/components'

const Center = styled.div`
  display: flex;
  justify-content: center;
  > div {
    max-width: 60rem;
  }
`
const PhoneRow = styled(FormRow)`
  .dnb-dropdown__shell {
    width: 6rem; /* custom width */
  }
  .dnb-dropdown__list {
    min-width: 6rem; /* custom width */
  }
`

export default [
  'Experiments',
  () => (
    <Center>
      <Wrapper>
        <Box>
          <PhoneRow
            label="Phone number"
            label_direction="vertical"
            vertical={false}
          >
            <Dropdown
              right="small"
              title="Country code"
              value={0}
              data={['+47', '+48', '+49']}
            />
            <Input placeholder="Your phone number" />
          </PhoneRow>
        </Box>
        <Box>
          <Provider
            formRow={{
              vertical: true,
              label: 'Vertical input B'
            }}
          >
            <Input />
          </Provider>
        </Box>
      </Wrapper>
    </Center>
  )
]
