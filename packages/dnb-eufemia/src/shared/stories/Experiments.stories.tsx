/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import Provider from '../Provider'
import { Input, Dropdown, FormRow } from '../../components'

export default {
  title: 'Eufemia/Components/Experiments',
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
            title="Country code"
            value={0}
            data={['+47', '+48', '+49']}
          />
          <Input placeholder="Your phone number" />
        </PhoneRow>
      </Box>
      <Box>
        <Provider
          FormRow={{
            vertical: true,
            label: 'Vertical input B',
          }}
        >
          <Input />
        </Provider>
      </Box>
    </Wrapper>
  </Center>
)
