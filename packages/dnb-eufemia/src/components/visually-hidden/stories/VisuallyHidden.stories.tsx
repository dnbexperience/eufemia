/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Box, Wrapper } from 'storybook-utils/helpers'

import { Provider } from '../../../shared'
import VisuallyHidden from '../VisuallyHidden'

export default {
  title: 'Eufemia/Components/VisuallyHidden',
}

export const Default = () => {
  return (
    <Provider>
      <VisuallyHidden>Default</VisuallyHidden>
    </Provider>
  )
}

export const VisuallyHiddenSandbox = () => {
  return (
    <Wrapper>
      <Box>
        <Default />
      </Box>
      <Box>
        <VisuallyHidden />
      </Box>
    </Wrapper>
  )
}

export const VisuallyHiddenMultiple = () => {
  return (
    <Wrapper>
      <Box>
        <VisuallyHidden />
        <VisuallyHidden />
      </Box>
    </Wrapper>
  )
}

export const VisuallyHiddenWithProvider = () => {
  return (
    <Provider>
      <VisuallyHidden />
    </Provider>
  )
}
