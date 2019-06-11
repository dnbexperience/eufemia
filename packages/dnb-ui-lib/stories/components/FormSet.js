/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { Radio, FormSet, FormRow, FormLabel } from '../../src/components'

import { H2 } from '../../src/elements'

export default [
  'FormSet',
  () => (
    <Wrapper>
      <Box>
        <FormSet size>
          <FormRow size>
            <FormLabel aria-hidden />
            <H2>A h2 in a FormRow without a label</H2>
          </FormRow>
          <FormRow
            size
            label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:"
          >
            <Radio.Group
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
          <FormRow
            size
            label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:"
          >
            <Radio.Group
              label="Group label:"
              title="Give me a Title"
              on_change={({ value }) => {
                console.log('on_change', value)
              }}
              // disabled
              // name="First" // Custom Group Name
            >
              <Radio label="First" value="First" />
              <Radio
                label="Second"
                value="Second"
                status="Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
              />
              <Radio
                label="Third"
                value="Third"
                checked
                status="Info message"
                status_state="info"
              />
            </Radio.Group>
          </FormRow>
          <FormRow>
            <Radio.Group label="Vertical group:" layout_direction="column">
              <Radio label="First" value="First" />
              <Radio label="Second" value="Second" />
              <Radio label="Third" value="Third" checked />
            </Radio.Group>
          </FormRow>
          <FormRow>
            <Radio.Group
              label="Vertical group with error:"
              layout_direction="column"
              vertical="true"
              status="Error message Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
            >
              <Radio label="First" value="First" />
              <Radio label="Second" value="Second" />
              <Radio label="Third" value="Third" checked />
            </Radio.Group>
          </FormRow>
          <FormRow>
            <Radio.Group
              label="Group with error:"
              status="Error message Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
            >
              <Radio label_position="left" label="First" value="First" />
              <Radio label_position="left" label="Second" value="Second" />
              <Radio
                label_position="left"
                label="Third"
                value="Third"
                checked
              />
            </Radio.Group>
          </FormRow>
        </FormSet>
      </Box>
    </Wrapper>
  )
]
