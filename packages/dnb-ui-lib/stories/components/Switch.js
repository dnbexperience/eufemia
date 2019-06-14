/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { Switch, FormLabel } from '../../src/components'

export default [
  'Switch',
  () => (
    <Wrapper>
      <Box>
        Text: <FormLabel for_id="switch">Unchecked:</FormLabel>
        <Switch id="switch" checked={false} />
      </Box>
      <Box>
        <p className="dnb-p">
          <Switch label="Checked:" checked />
        </p>
      </Box>
      <Box>
        Text:{' '}
        <Switch label="Unchecked disabled:" checked={false} disabled />
      </Box>
      <Box>
        Text:{' '}
        <Switch
          label="Checked disabled"
          label_position="right"
          checked
          disabled
        />
      </Box>
      <Box>
        <Switch
          label="Unchecked status error:"
          checked={false}
          status="error"
        />
      </Box>
      <Box>
        <Switch
          label="Label:"
          checked
          status="Error message Vulputate consequat pellentesque senectus conubia proin sapien felis inceptos eu"
          status_state="info"
        />
      </Box>
      <Box>
        <Switch
          label="Label"
          checked
          status="Error message Vulputate consequat pellentesque senectus conubia proin sapien felis inceptos eu"
          label_position="right"
        />
      </Box>
    </Wrapper>
  )
]
