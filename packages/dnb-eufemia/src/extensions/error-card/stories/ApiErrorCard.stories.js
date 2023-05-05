/**
 * @dnb/eufemia Element Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'

import ErrorCard from '..'

import '../../../style/extensions'
import '../style'
import '../style/themes/ui'

export default {
  title: 'Eufemia/Extensions/ErrorCard',
}

export const ErrorCards = () => (
  <>
    <Wrapper className="dnb-spacing">
      <Box>
        <ErrorCard
          title="title"
          message="this is the message"
          onTryAgainClick={() => {}}
        />
      </Box>

      <Box>
        <ErrorCard
          variant="centered"
          title="variant centered"
          message="this is the message"
          onTryAgainClick={() => {}}
        />
      </Box>

      <Box>
        <ErrorCard
          size="small"
          title="variant slim"
          message="this is the message"
          onTryAgainClick={() => {}}
        />
      </Box>
    </Wrapper>
  </>
)
