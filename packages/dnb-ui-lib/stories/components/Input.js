/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import {
  Input,
  InputMasked,
  Button,
  FormSet,
  FormRow
  // FormLabel
} from '../../src/components'

const CustomStyle = styled.div`
  p {
    background-color: rgba(213, 30, 149, 0.25);
  }
`

export default [
  'Inputs',
  () => (
    <CustomStyle>
      <Wrapper>
        <Box>
          <FormRow
            label="Vertical label:"
            label_direction="vertical"
            // vertical
          >
            <Input label="Input label A:" />
            <Input label="Input label B:" left="small" />
          </FormRow>
        </Box>
        <Box>
          <FormSet direction="vertical">
            <FormRow label="Legend:">
              <Input label="Vertical 1:" />
              <Input label="Vertical 2:" stretch top="small" />
            </FormRow>
          </FormSet>
        </Box>
        <Box>
          <FormSet vertical>
            <FormRow label="Legend:">
              <Input label="Vertical 1:" />
              <Input label="Vertical 2:" stretch top="small" />
            </FormRow>
          </FormSet>
        </Box>
        <Box>
          <FormSet>
            <FormRow
              indent
              label="Long label labwl Adipiscing mauris dis proin nec Condimentum egestas class blandit netus non a suscipit id urna:"
              // no_fieldset
            >
              <Input label="Input:" value="Stretch me ..." stretch />
              <Input
                left="small"
                label="Input:"
                placeholder="Placeholder 2 ..."
              />
            </FormRow>
          </FormSet>
        </Box>
        <Box>
          <Input
            label="Vertical label:"
            value="Stretch me ..."
            stretch
            label_direction="vertical"
          />
        </Box>
        <Box>
          Text
          <Input
            selectall
            label="Label:"
            on_change={event => {
              console.log('on_change', event)
            }}
          >
            Input ...
          </Input>
          Text
        </Box>
        <Box>
          <p className="dnb-p">
            <Input
              label="ReadOnly:"
              placeholder="Placeholder ..."
              readOnly
            />
          </p>
        </Box>
        <Box>
          <Input
            label="Search:"
            type="search"
            align="right"
            stretch
            submit_button_title="Search"
            placeholder="Search text placeholder"
          />
          <Input
            size="large"
            type="search"
            align="right"
            stretch
            placeholder="Large input with right aligned text"
          />
          <Input
            size="medium"
            type="search"
            align="right"
            stretch
            placeholder="Large input with right aligned text"
          />
        </Box>
        <Box>
          <Input
            disabled
            label="Disabled search:"
            type="search"
            submit_button_title="Search"
            placeholder="Search text placeholder"
          />
        </Box>
        <Box>
          <Input
            label="Input with status:"
            status="Message to the user"
            value="Input value with status"
          />
        </Box>
        <Box>
          <Input
            label="Input with description:"
            description="Description to the user"
            value="Input value with status"
          />
        </Box>
        <Box>
          <InputMasked
            label="Masked:"
            autocomplete="off"
            // value="1000000"
            mask={[
              '+',
              /[4]/, // have to start with 4
              /[5-7]/, // can be 5,6 or 7
              ' ',
              '/',
              ' ',
              /[49]/, // have to start with 4 or 9
              /\d/,
              /\d/,
              ' ',
              /\d/,
              /\d/,
              ' ',
              /\d/,
              /\d/,
              /\d/
            ]}
            show_mask="true"
          />
        </Box>
        <Box>
          <form
            onSubmit={event => {
              console.log('onSubmit', event)
              event.preventDefault()
              // event.persist()
            }}
          >
            <Input
              label="Label:"
              on_change={event => {
                console.log('on_change', event)
              }}
              onChange={event => {
                console.log('onChange', event)
              }}
              on_submit={event => {
                console.log('on_submit', event)
              }}
              onSubmit={event => {
                console.log('on_submit', event)
              }}
              value="Input ..."
            />
            <Button
              text="Submit"
              type="submit"
              on_click={event => {
                console.log('on_click', event)
              }}
              onClick={event => {
                console.log('onClick', event)
              }}
            />
          </form>
        </Box>
      </Wrapper>
    </CustomStyle>
  )
]
