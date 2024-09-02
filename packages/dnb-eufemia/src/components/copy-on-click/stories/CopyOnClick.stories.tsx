import React from 'react'
import CopyOnClick from '../CopyOnClick'
import { Box, Wrapper } from 'storybook-utils/helpers'

export default {
  title: 'Eufemia/Components/CopyOnClick',
}

export const CopyOnClickSandbox = () => (
  <Wrapper>
    <Box>
      <CopyOnClick>
        <span className="dnb-p">Text to be copied</span>
      </CopyOnClick>
    </Box>
    <Box>
      <CopyOnClick disabled>
        <span className="dnb-p">Text to be copy is disabled</span>
      </CopyOnClick>
    </Box>
    <Box>
      <CopyOnClick showCursor={false}>
        <span className="dnb-p">CopyOnClick cursor is disabled</span>
      </CopyOnClick>
    </Box>
  </Wrapper>
)
