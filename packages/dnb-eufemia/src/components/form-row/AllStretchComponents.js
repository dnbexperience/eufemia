/**
 * UI lib Component Example
 *
 */

import React from 'react'
// import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  FormSet,
  FormRow,
  Space,
  DatePicker,
  Textarea,
  Autocomplete,
  Dropdown,
  Slider,
  Input
} from '../'

export default function AllStretchComponents() {
  return (
    <Wrapper>
      <StretchTemplate element={Input} />
      <StretchTemplate element={Textarea} />
      <StretchTemplate element={Autocomplete} />
      <StretchTemplate element={DatePicker} show_input />
      <StretchTemplate element={Dropdown} />
      <StretchTemplate element={Slider} />
    </Wrapper>
  )
}

function StretchTemplate({ element: Comp, ...props }) {
  return (
    <>
      <Box>
        <FormSet direction="vertical">
          <FormRow>
            <Comp
              label='FormSet direction="vertical"'
              stretch
              {...props}
            />
          </FormRow>
        </FormSet>
      </Box>
      <Box>
        <FormSet vertical>
          <FormRow>
            <Comp label="FormSet vertical" stretch {...props} />
          </FormRow>
        </FormSet>
      </Box>
      <Box>
        <FormRow direction="horizontal">
          <Comp
            label='FormRow direction="horizontal"'
            stretch
            {...props}
          />
        </FormRow>
      </Box>
      <Box>
        <Comp
          label='label_direction="vertical"'
          label_direction="vertical"
          stretch
          {...props}
        />
      </Box>
    </>
  )
}

export const Box = styled(Space)`
  position: relative;

  margin: 0;
  padding: 1rem;

  @media screen and (min-width: 40em) {
    padding: 1rem;
  }

  &::after {
    content: '';
    position: absolute;
    left: -50vw;
    right: -50vw;
    bottom: -1px;
    width: 200vw;
    border-bottom: dashed 1px rgb(0, 200, 200);
  }
`

const Wrapper = styled.div`
  display: block;
`
