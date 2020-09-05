/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import Section from '../../src/components/section/web-component'

export default [
  'Section',
  () => (
    <Wrapper>
      <Box>
        <Section spacing>content</Section>
        {/* <Buttons></Buttons> */}
        {/* <DatePicker></DatePicker> */}
      </Box>
    </Wrapper>
  )
]
