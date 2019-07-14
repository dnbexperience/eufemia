/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import {
  Space,
  // Checkbox,
  // Radio,
  Input,
  // FormLabel,
  FormRow
} from '../../src/components'

const CustomStyle = styled.div`
  display: flex;
  flex-direction: column;
  background-color: blue;
`

export default [
  'Space',
  () => (
    <Wrapper>
      <Box>
        <CustomStyle>
          <Space top="large x-small">
            <Input label="Input:" value="Input ..."></Input>
          </Space>
          <Space top="2.5">
            <Input label="Input:" value="Input ..."></Input>
          </Space>
          <Space top="2rem 0.5rem">
            <Input label="Input:" value="Input ..."></Input>
          </Space>
          <Space top="32px">
            <Input label="Input:" value="Input ..."></Input>
          </Space>
          <FormRow top="large x-small">
            <Input label="Input:" value="Input ..."></Input>
          </FormRow>
        </CustomStyle>
      </Box>
    </Wrapper>
  )
]
