/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import { H2 } from '../../src/elements'
import AllComponents from '../../src/components/form-row/AllComponents'

import Provider from '../../src/shared/Provider'
import {
  Checkbox,
  Radio,
  Input,
  FormLabel,
  FormRow
} from '../../src/components'

const Center = styled.div`
  display: flex;
  justify-content: center;
  > div {
    max-width: 60rem;
  }
`

export default [
  'FormRow',
  () => (
    <Center>
      <Wrapper showOverflow>
        <H2 bottom="small">Combine vertical and horizontal</H2>
        <Box>
          <Provider
            formRow={{
              vertical: true,
              label: 'Vertical input B'
            }}
          >
            <Input />
          </Provider>

          <FormRow
            label={
              <H2 top={false} bottom="large">
                Custom vertical legend:
              </H2>
            }
            vertical
            top="medium"
            // no_fieldset
          >
            <Input label="Vertical input A" />
            <Input label="Vertical input B" top="medium" />
            <FormRow
              // label="Horizontal legend:"
              // direction="horizontal"
              // indent
              // indent_offset="medium"

              vertical="false"
              label_direction="horizontal"
              top="medium"
            >
              <Input label="Horizontal input A" right="small" />
              <Input label="Horizontal input B" />
            </FormRow>
            <Input label="Vertical input C" top="medium" />
          </FormRow>
        </Box>

        <H2 bottom="small">Plain</H2>
        <Box>
          <AllComponents showText horizontal vertical />
        </Box>

        <H2 bottom="small">Horizontal label</H2>
        <Box>
          <FormRow
            // indent
            // indent_offset="large"
            label="Horizontal Legend Aptent maecenas non pharetra libero massa auctor pretium vulputate vivamus:"
            direction="horizontal"
          >
            <AllComponents showText horizontal />
          </FormRow>
        </Box>

        <H2 bottom="small">Vertical direction</H2>
        <Box>
          <FormRow label="Vertical direction:" direction="vertical">
            <AllComponents showText />
          </FormRow>
        </Box>

        <H2 bottom="small">Vertical everything</H2>
        <Box>
          <FormRow label="Vertical everything:" vertical="true">
            <AllComponents showText />
          </FormRow>
        </Box>

        <H2 bottom="small">Vertical label</H2>
        <Box>
          <FormRow label="Vertical Legend:" label_direction="vertical">
            <AllComponents showText horizontal />
          </FormRow>
        </Box>

        <Box>
          <FormRow label="Inputs legend:">
            <Input value="Input value A ..." right="small" />
            <Input value="Input value B ..." />
          </FormRow>
        </Box>
        <Box>
          <FormRow direction="horizontal" indent="default">
            <FormLabel for_id="alone-1">
              A long horizontal FormLabel with a lot of informative text
              and a default indent:
            </FormLabel>
            <Checkbox id="alone-1" label="Checkbox" />
          </FormRow>
        </Box>
        <Box>
          <FormRow
            direction="horizontal"
            indent
            section_style="mint-green"
            section_spacing="large"
          >
            <FormLabel for_id="alone-2">
              A long horizontal FormLabel with a lot of informative text
              and a default indent:
            </FormLabel>
            <Radio.Group
              id="alone-2"
              // label="Group:"
              // label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:"
              title="Give me a Title"
              on_change={({ value }) => {
                console.log('on_change', value)
              }}
              value="first"
              // disabled
              // name="MyGroup" // The Group Name
            >
              <Radio label="First" value="first" />
              <Radio label="Second" value="second" />
              <Radio
                label="Third"
                value="third"
                // checked
              />
            </Radio.Group>
          </FormRow>
        </Box>
      </Wrapper>
    </Center>
  )
]
