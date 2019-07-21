/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { Button } from '../../src/components'

export default [
  'Buttons',
  () => (
    <Wrapper>
      <Box>
        <Button text="Primary" icon="add" />
      </Box>
      <Box>
        <Button text="Primary" icon="add" disabled />
      </Box>
      <Box>
        <Button
          text="Secondary"
          variant="secondary"
          icon="add"
          right="small"
        />
        <Button
          variant="secondary"
          text="Secondary button with href"
          href="?no-cache=1"
          icon="add"
          onClick={e => e.preventDefault()}
        />
      </Box>
      <Box>
        <Button text="Signal" variant="signal" icon="add" />
      </Box>
      <Box>
        <Button
          text="Tertiary"
          variant="tertiary"
          icon_position="left"
          icon="add"
        />
      </Box>
    </Wrapper>
  )
]
