/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'

import { Checkbox, FormLabel } from '../..'

export default {
  title: 'Eufemia/Components/FormLabel',
}

export const FormLabelSandbox = () => (
  <Wrapper>
    <Box>
      <FormLabel forId="alone-1">Default horizontal FormLabel:</FormLabel>
      <Checkbox id="alone-1" label="Unchecked" />
    </Box>
    <Box>
      <FormLabel forId="alone-2" vertical disabled>
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
