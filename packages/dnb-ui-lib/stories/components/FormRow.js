/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import PropTypes from 'prop-types'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import { H2 } from '../../src/elements'

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
      <Wrapper>
        <H2 bottom="small">Horizontal label</H2>
        <Box>
          <FormRow
            indent
            label="Horizontal Legend Aptent maecenas non pharetra libero massa auctor pretium vulputate vivamus:"
            no_wrap="true"
            direction="horizontal"
          >
            <AllComponents horizontal />
          </FormRow>
        </Box>

        <H2 bottom="small">Vertical label</H2>
        <Box>
          <FormRow label="Vertical Legend:" direction="vertical">
            <AllComponents />
          </FormRow>
        </Box>

        <H2 bottom="small">Vertical everything</H2>
        <Box>
          <FormRow label="Vertical Legend:" vertical="true">
            <AllComponents />
          </FormRow>
        </Box>

        <Box>
          <FormRow label="Inputs legend:">
            <Input value="Input value A ..." />
            <Input value="Input value B ..." />
          </FormRow>
        </Box>
        <Box>
          <FormRow direction="horizontal" indent="default">
            <FormLabel for_id="alone-1">
              A long horizontal FormLabel with a lot of informative text
              and a default size:
            </FormLabel>
            <Checkbox id="alone-1" label="Checkbox" />
          </FormRow>
        </Box>
        <Box>
          <FormRow
            direction="horizontal"
            size="default"
            section_style="mint-green"
            section_spacing="large"
          >
            <FormLabel for_id="alone-2">
              A long horizontal FormLabel with a lot of informative text
              and a default size:
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

const AllComponents = ({ horizontal }) => {
  return (
    <>
      <Input label="Input label A:" />
      <Input
        label="Input label B:"
        left={horizontal ? 'small' : null}
        top={!horizontal ? 'small' : null}
      />
    </>
  )
}
AllComponents.propTypes = {
  horizontal: PropTypes.bool
}
AllComponents.defaultProps = {
  horizontal: null
}
