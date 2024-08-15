import React from 'react'
import Copy from '../Copy'
import { Box, Wrapper } from 'storybook-utils/helpers'


export default {
  title: 'Eufemia/Components/Copy',
}

export const CopySandbox = () => (
  <Wrapper>
    <Box>
      <Copy>
        <span className="dnb-p">Text to be copied</span>
      </Copy>
    </Box>
    <Box>
      <Copy disabled>
        <span className="dnb-p">Text to be copy is disabled</span>
      </Copy>
    </Box>
    <Box>
      <Copy showCursor={false}>
        <span className="dnb-p">Copy cursor is disabled</span>
      </Copy>
    </Box>
  </Wrapper>
)
