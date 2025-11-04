/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import {
  FormStatus,
  Input,
  Switch,
  GlobalStatus,
  Autocomplete,
  NumberFormat,
} from '../..'
import { Link } from '../../..'
import { format } from '../../number-format/NumberUtils'
import { DrawerListDataArray } from '../../../fragments/DrawerList'

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

export const FormStatusSandbox = () => {
  return (
    <Wrapper>
      <Box>
        <Input
          label="Input with custom status:"
          status={<CustomStatus />}
          statusState="info"
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
          statusState="warn"
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
        <FormStatus state="info" size="large" stretch iconSize="small">
          Long info text Ipsum habitant enim ullamcorper elit sit elementum
          platea rutrum eu condimentum erat risus lacinia viverra magnis
          lobortis nibh mollis suspendisse
        </FormStatus>
        <FormStatus state="marketing" size="large" stretch>
          Long info text Ipsum habitant enim ullamcorper elit sit elementum
          platea rutrum eu condimentum erat risus lacinia viverra magnis
          lobortis nibh mollis suspendisses
        </FormStatus>
      </Box>
      <Box>
        <FormStatus>
          <CustomStatus />
        </FormStatus>
      </Box>
      <Box>
        <Input label="Input label:" status={<CustomStatus />}>
          Value
        </Input>
      </Box>

      <Box>
        <Switch
          label="Switch label"
          status="Long text with status vitae tortor metus nulla nunc habitasse adipiscing purus porttitor viverra"
        />
      </Box>
    </Wrapper>
  )
}

export const GlobalStatusExample = () => {
  return (
    <>
      <GlobalStatus id="my-id" />
      <FormStatus
        globalStatus={{ id: 'my-id', message: 'my message' }}
        state="error"
      >
        Some text
      </FormStatus>
    </>
  )
}

export const SuffixAndStretchedStatus = () => {
  const ban = format(21001234567, { ban: true }) as string

  const numbers: DrawerListDataArray = [
    {
      selectedValue: `Brukskonto (${ban})`,
      suffixValue: (
        <NumberFormat lang="nb" currency srLabel="Total:">
          {12345678}
        </NumberFormat>
      ),
      content: ['Brukskonto', ban],
    },
    {
      selectedValue: `BSU (${ban})`,
      suffixValue: (
        <NumberFormat currency srLabel="Total:">
          {2223}
        </NumberFormat>
      ),
      content: ['BSU', ban],
    },
    {
      selectedValue: `Sparekonto (${ban})`,
      suffixValue: (
        <NumberFormat currency srLabel="Total:">
          {876555.5}
        </NumberFormat>
      ),
      content: ['Sparekonto', ban],
    },
    {
      selectedValue: `Brukskonto (${ban})`,
      suffixValue: (
        <NumberFormat currency srLabel="Total:">
          {34999.2}
        </NumberFormat>
      ),
      content: ['Brukskonto', ban],
    },
  ]

  return (
    <Box>
      <Autocomplete
        statusState="warn"
        statusProps={{ stretch: true }}
        status="This is a long text to check whether statusProps stretch works or not"
        label="Autocomplete with suffix and stretched status"
        data={numbers}
        size="medium"
        showSubmitButton
        skipPortal
        stretch
        value={1}
      />
    </Box>
  )
}
