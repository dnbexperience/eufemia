/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { Checkbox, Radio, FormLabel, FormRow } from '../../src/components'

export default [
  'FormRow',
  () => (
    <Wrapper>
      <Box>
        <FormRow direction="horizontal" size="default">
          <FormLabel for_id="alone-1">
            A long Vertical FormLabel with a lot of informative text and a
            default size:
          </FormLabel>
          <Checkbox id="alone-1" label="Checkbox" />
        </FormRow>
      </Box>
      <Box>
        <FormRow direction="horizontal" size="default">
          <FormLabel for_id="alone-2">
            A long Vertical FormLabel with a lot of informative text and a
            default size:
          </FormLabel>
          <Radio.Group
            id="alone-2"
            // label="Group:"
            // label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:"
            title="Give me a Title"
            on_change={({ value }) => {
              console.log('on_change', value)
            }}
            value="First"
            // disabled
            // name="MyGroup" // The Group Name
          >
            <Radio label="First" value="First" />
            <Radio label="Second" value="Second" />
            <Radio
              label="Third"
              value="Third"
              // checked
            />
          </Radio.Group>
        </FormRow>
      </Box>
    </Wrapper>
  )
]
