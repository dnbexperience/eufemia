/**
 * Storybook Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { Radio, FormLabel } from '../../src/components'

export default [
  'Radio',
  () => (
    <Wrapper>
      <Box>
        <p className="dnb-p">
          Text: <FormLabel for_id="radio">Unchecked:</FormLabel>
          <Radio id="radio" />
        </p>
      </Box>
      <Box>
        <Radio
          label="Checked:"
          checked
          on_change={({ checked }) => {
            console.log('on_change', checked)
          }}
        />
      </Box>
      <Box>
        <Radio
          label="Unchecked:"
          on_change={({ checked }) => {
            console.log('on_change', checked)
          }}
        />
      </Box>
      <Box>
        <Radio label="Unchecked disabled:" checked={false} disabled />
      </Box>
      <Box>
        <Radio label="Checked disabled:" checked disabled />
      </Box>
      <Box>
        <Radio
          label="Unchecked status error:"
          checked={false}
          status="error"
        />
      </Box>
      <Box>
        <Radio
          label="Checked status message:"
          checked
          status="Error message"
        />
      </Box>
    </Wrapper>
  )
]
