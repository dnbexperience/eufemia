/**
 * @dnb/eufemia Component Story
 *
 */

import React /* , { useState, useEffect } */, { useState } from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import {
  FormStatus,
  Input,
  FormSet,
  FormRow,
  DatePicker,
  Modal,
  Switch,
  Button,
  Space,
} from '@dnb/eufemia/src/components'
import { Link } from '@dnb/eufemia/src/elements'

export default {
  title: 'Eufemia/Components/FormStatus',
}

const CustomStatus = () => (
  <>
    {/* <H2>Custom Status</H2> */}
    <Link href="/">Goto</Link> more text itae tortor metus nulla nunc
    habitasse
  </>
)

const SmallWidth = styled(Input)`
  /* .dnb-form-status {
      max-width: 16rem;
    } */
  .dnb-input__input {
    width: 4rem;
    text-align: center;
  }
`
// const CustomStatuSandbox = () => (
//   <>
//     My info <Link href="/">with a link</Link> and more text
//   </>
// )

export const FormStatuseSandbox = () => {
  const [showError, setShowError] = useState(false)
  return (
    <Wrapper>
      <Box>
        <Input
          label="Input with custom status:"
          status={<CustomStatus />}
          status_state="info"
          value="Input value"
        />
      </Box>
      <Box>
        <SmallWidth
          label="Small width input:"
          value="4"
          status="Adipiscing etiam laoreet et egestas dis massa quis dapibus nam diam est non curae ad hac dictumst"
        />
      </Box>
      <Box>
        <SmallWidth
          label="Warning:"
          value="4"
          size={3}
          status="Adipiscing etiam laoreet et egestas dis massa quis dapibus nam diam est non curae ad hac dictumst"
          status_state="warn"
        />
      </Box>
      <Box>
        <FormStatus>Status</FormStatus>
      </Box>
      <Box>
        <FormStatus state="info" size="large">
          Long info text Ipsum habitant enim ullamcorper elit sit elementum
          platea rutrum eu condimentum erat risus lacinia viverra magnis
          lobortis nibh mollis suspendisse
        </FormStatus>
        <FormStatus state="info" size="large" stretch>
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
      <Box>
        <FormSet
          label_direction="vertical"
          prevent_submit
          on_submit={(event) => {
            setShowError((v) => !v)
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
              status={
                showError &&
                'Long text with status vitae tortor metus nulla nunc habitasse adipiscing purus porttitor viverra'
              }
            />
            <Modal right="small">Modal Content</Modal>
            <Button text="Submit" type="submit" />
          </FormRow>
        </FormSet>
      </Box>
    </Wrapper>
  )
}
