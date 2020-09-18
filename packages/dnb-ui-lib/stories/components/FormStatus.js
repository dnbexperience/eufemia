/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import {
  FormStatus,
  Input,
  FormSet,
  FormRow,
  DatePicker,
  Modal,
  Switch,
  Button,
  Space
} from '../../src/components'
import { H2, Link } from '../../src/elements'

const CustomStatus = () => (
  <>
    <H2>Custom Status</H2>
    <Link href="/">Goto</Link> more text itae tortor metus nulla nunc
    habitasse
  </>
)
export default [
  'FormStatus',
  () => (
    <Wrapper>
      <Box>
        <FormStatus>Status</FormStatus>
      </Box>
      <Box>
        <FormStatus state="info">
          Long info text Ipsum habitant enim ullamcorper elit sit elementum
          platea rutrum eu condimentum erat risus lacinia viverra magnis
          lobortis nibh mollis suspendisse
        </FormStatus>
      </Box>
      <Box>
        <FormStatus>
          <CustomStatus />
        </FormStatus>
      </Box>
      <Box>
        <Input
          label="Input label:"
          // style={{ width: '200px' }}
          status={<CustomStatus />}
        >
          Value
        </Input>
      </Box>
      <Box>
        <Switch
          label="Switch label"
          status="Long text with status vitae tortor metus nulla nunc habitasse adipiscing purus porttitor viverra"
        />
      </Box>
      <Box>
        <FormSet
          label_direction="vertical"
          prevent_submit
          on_submit={(event) => {
            console.log('onSubmit', event)
          }}
        >
          <FormRow
            top="small"
            label={
              <Space element="span" className="dnb-h--large">
                Legend:
              </Space>
            }
          >
            <DatePicker
              show_input
              right="small"
              bottom="small"
              status="Long text with status vitae tortor metus nulla nunc habitasse adipiscing purus porttitor viverra"
            />
            <Modal right="small">Modal Content</Modal>
            <Button text="Submit" type="submit" />
          </FormRow>
        </FormSet>
      </Box>
    </Wrapper>
  )
]
