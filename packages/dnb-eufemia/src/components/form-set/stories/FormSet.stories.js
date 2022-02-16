/**
 * @dnb/eufemia Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import Provider from '../../../shared/Provider'
import {
  Radio,
  ToggleButton,
  Button,
  Input,
  FormSet,
  FormRow,
} from '../../'

import { H2, P } from '../../../elements'

export default {
  title: 'Eufemia/Components/FormSet',
}

const Center = styled.div`
  display: flex;
  justify-content: center;
  > div {
    max-width: 60rem;
  }
`

export const FormSetSandbox = () => {
  const [disabled, setDisabled] = React.useState(false)
  return (
    <Center>
      <Wrapper>
        <ToggleButton on_change={() => setDisabled((s) => !s)}>
          ToggleButton
        </ToggleButton>
        <Provider FormRow={{ indent: true, vertical: false }}>
          <FormSet
            disabled={disabled}
            skeleton={disabled}
            // indent="true" vertical="false"
          >
            <Box>
              <FormRow no_label>
                <H2>A h2 in a FormRow without a label</H2>
              </FormRow>
            </Box>
            <Box>
              <FormRow label="Paragraph:">
                <P>Paragraph</P>
              </FormRow>
            </Box>
            <Box>
              <FormRow
                // disabled={disabled}
                label="Button:"
                indent_offset="m-large"
              >
                <Button text="Button" />
              </FormRow>
            </Box>
            <Box>
              <Provider FormRow={{ vertical: true }}>
                <FormRow label="Input:" indent_offset="large">
                  <Input value="Value" />
                </FormRow>
              </Provider>
            </Box>
            <Box>
              <FormRow label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:">
                <Radio.Group
                  on_change={({ value }) => {
                    console.log('on_change', value)
                  }}
                  value="first"
                >
                  <Radio label="First" value="first" />
                  <Radio label="Second" value="second" />
                  <Radio label="Third" value="third" />
                </Radio.Group>
              </FormRow>
            </Box>
            <Box>
              <FormRow label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:">
                <Radio.Group
                  // label="Group label:"
                  on_change={({ value }) => {
                    console.log('on_change', value)
                  }}
                >
                  <Radio label="First" value="first" />
                  <Radio
                    label="Second"
                    value="second"
                    status="Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
                  />
                  <Radio
                    label="Third"
                    value="third"
                    checked
                    status="Info message"
                    status_state="info"
                  />
                </Radio.Group>
              </FormRow>
            </Box>
            <Box>
              <FormRow>
                <Radio.Group
                  label="Column group:"
                  layout_direction="column"
                >
                  <Radio label="First" value="first" />
                  <Radio label="Second" value="second" />
                  <Radio label="Third" value="third" checked />
                </Radio.Group>
              </FormRow>
            </Box>
            <Box>
              <FormRow>
                <Radio.Group
                  label="Column group with error:"
                  layout_direction="column"
                  status="Error message Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
                >
                  <Radio label="First" value="first" />
                  <Radio label="Second" value="second" />
                  <Radio label="Third" value="third" checked />
                </Radio.Group>
              </FormRow>
            </Box>
            <Box>
              <FormRow label="Group with error Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:">
                <Radio.Group status="Error message Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum">
                  <Radio
                    label_position="left"
                    label="First"
                    value="first"
                  />
                  <Radio
                    label_position="left"
                    label="Second"
                    value="second"
                  />
                  <Radio
                    label_position="left"
                    label="Third"
                    value="third"
                    checked
                  />
                </Radio.Group>
              </FormRow>
            </Box>
          </FormSet>
        </Provider>
      </Wrapper>
    </Center>
  )
}
