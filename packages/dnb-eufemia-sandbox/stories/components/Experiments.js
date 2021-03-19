/**
 * @dnb/eufemia Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

// import { H2, H3 } from '@dnb/eufemia/src/elements'

import Provider from '@dnb/eufemia/src/shared/Provider'
import {
  // Checkbox,
  // Radio,
  Input,
  // FormLabel,
  Dropdown,
  FormRow
} from '@dnb/eufemia/src/components'

export default {
  title: 'Eufemia/Components/Experiments'
}

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

export const ExperimentsSandbox = () => (
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
            // size="large"
            // label="Choose your code"
            // label_sr_only
            title="Country code"
            value={0}
            data={['+47', '+48', '+49']}
          />
          <Input
            // size="medium"
            // label="Phone number"
            // label_sr_only
            placeholder="Your phone number"
          />
        </PhoneRow>
      </Box>
      <Box>
        <Provider
          FormRow={{
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
