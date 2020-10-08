/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { Checkbox, FormLabel } from '../../src/components'

export const FormLabels = () => (
  <Wrapper>
    <Box>
      <FormLabel for_id="alone-1">Default horizontal FormLabel:</FormLabel>
      <Checkbox id="alone-1" label="Unchecked" />
    </Box>
    <Box>
      <FormLabel for_id="alone-2" direction="vertical" vertical disabled>
        Vertical FormLabel:
      </FormLabel>
      <Checkbox id="alone-2" label="Unchecked" />
    </Box>
    <Box>
      <FormLabel vertical>Vertical FormLabel:</FormLabel>
      <Checkbox label="Unchecked" />
    </Box>
  </Wrapper>
)
