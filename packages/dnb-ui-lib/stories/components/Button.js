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
          text="Button text"
          variant="tertiary"
          icon_position="left"
          icon="chevron_left"
        />
        <Button
          text="Button text"
          variant="tertiary"
          icon="chevron_right"
        />
        <Button
          text="Button text"
          variant="tertiary"
          icon_position="left"
          icon="chevron_left"
          icon_size="medium"
        />
        <Button
          text="Button text"
          variant="tertiary"
          icon="chevron_right"
          icon_size="medium"
        />
      </Box>
    </Wrapper>
  )
]
