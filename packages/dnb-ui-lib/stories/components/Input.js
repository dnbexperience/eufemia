/**
 * dnb-ui-lib Component Story
 *
 */

import React, { useState, useEffect } from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import {
  Input,
  InputMasked,
  Button,
  FormSet,
  FormRow,
  FormLabel
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
          <CustomInput />
        </Box>
        <Box>
          <FormSet>
            <FormRow
              indent
              indent_offset="x-large"
              wrap
              label="Long label labwl Adipiscing mauris dis proin nec Condimentum egestas class blandit netus non a suscipit id urna:"
            >
              <Input label="Input A:" top="small" right="small" />
              <Input label="Input B:" top="small" right="small" />
              <Input label="Input C:" top="small" right="small" />
            </FormRow>
          </FormSet>
        </Box>
        <Box>
          <FormRow
            label="Vertical label:"
            label_direction="vertical"
            // vertical
          >
            <Input label="Input label A:" right="small" />
            <Input label="Input label B:" />
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
          Text
          <FormLabel>FormLabel:</FormLabel>
          <Input>Input ...</Input>
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
            label="Search:"
            size="large"
            type="search"
            align="right"
            stretch
            placeholder="Large input with right aligned text"
          />
          <Input
            label="Search:"
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
              // console.log('onSubmit', event)
              event.preventDefault()
              // event.persist()
            }}
          >
            <InputUpdate />
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

const InputUpdate = () => {
  const [initValue, setNewValue] = useState('Input ...')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setNewValue('')
    }, 1e3)
    return () => clearTimeout(timeoutId)
  })

  return (
    <Input
      label="Label:"
      on_change={({ value }) => {
        console.log('on_change', value)
      }}
      onChange={({ value }) => {
        console.log('onChange', value)
      }}
      on_submit={({ value }) => {
        console.log('on_submit', value)
      }}
      onSubmit={({ value }) => {
        console.log('onSubmit', value)
      }}
      value={initValue}
    />
  )
}

const CustomInput = () => {
  const [value, setValue] = useState('2019-02-15')
  return (
    <>
      <Input
        value={value}
        on_change={({ value }) => {
          console.log('on_change', value)
          setValue(value)
        }}
        on_state_update={({ value }) => {
          console.warn('on_state_update', value)
          setValue(value)
        }}
        right
      />
      <Button
        text="Reset"
        on_click={() => {
          setValue('123')
        }}
      />
    </>
  )
}
