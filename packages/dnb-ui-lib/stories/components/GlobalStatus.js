/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { Input, GlobalStatus, Section } from '../../src/components'
import { H2, Link } from '../../src/elements'

const CustomStatus = () => (
  <>
    <H2>Custom Status</H2>
    <Link href="/">Goto</Link> more text
  </>
)
export default [
  'GlobalStatus',
  () => (
    <Wrapper>
      <Box>
        <Section spacing>
          Content 1
          <Section spacing style_type="mint-green">
            Content 2
            <GlobalStatus show title={'Title 1'}>
              Sem montes dictum suscipit eget aliquam a ante curabitur diam
            </GlobalStatus>
          </Section>
        </Section>
        <GlobalStatus show title={'Title 2'}>
          Sem montes dictum suscipit eget aliquam a ante curabitur diam
        </GlobalStatus>
      </Box>
      <Box>
        <GlobalStatus show state="info">
          Long info text Ipsum habitant enim ullamcorper elit sit elementum
          platea rutrum eu condimentum erat risus lacinia viverra magnis
          lobortis nibh mollis suspendisse
        </GlobalStatus>
      </Box>
      <Box>
        <GlobalStatus show state="info" title={<>Custom Title</>}>
          <CustomStatus />
        </GlobalStatus>
      </Box>
      <Box>
        <Input status={'Error Message'} right="small">
          Value
        </Input>
        <Input status={<CustomStatus />}>Value</Input>
      </Box>
    </Wrapper>
  )
]
