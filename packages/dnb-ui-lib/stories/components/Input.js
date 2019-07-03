/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import { Input, InputMasked, Button } from '../../src/components'

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
          <Input
            selectall
            label="Label:"
            on_change={event => {
              console.log('on_change', event)
            }}
          >
            Input ...
          </Input>
        </Box>
        <Box>
          <p className="dnb-p">
            <Input label="ReadOnly:" value="Placeholder ..." readOnly />
          </p>
        </Box>
        <Box>
          <Input
            label="Search:"
            type="search"
            submit_button_title="Search"
            placeholder="Search text placeholder"
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
