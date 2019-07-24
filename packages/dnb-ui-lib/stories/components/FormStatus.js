/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { Input, FormStatus } from '../../src/components'
import { H2, Link } from '../../src/elements'

const CustomStatus = () => (
  <>
    <H2>Custom Status</H2>
    <Link href="/">Goto</Link> more text
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
        <Input status={<CustomStatus />}>Value</Input>
      </Box>
    </Wrapper>
  )
]
