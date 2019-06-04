/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { Checkbox, FormLabel } from '../../src/components'

export default [
  'Checkbox',
  () => (
    <Wrapper>
      <Box>
        <p className="dnb-p">
          Text: <FormLabel for_id="checkbox">Unchecked:</FormLabel>
          <Checkbox id="checkbox" />
        </p>
      </Box>
      <Box>
        <Checkbox
          label="Checked"
          checked
          on_change={({ checked }) => {
            console.log('on_change', checked)
          }}
        />
      </Box>
      <Box>
        <Checkbox
          label="Unchecked"
          on_change={({ checked }) => {
            console.log('on_change', checked)
          }}
        />
      </Box>
      <Box>
        <Checkbox label="Unchecked disabled" checked={false} disabled />
      </Box>
      <Box>
        <Checkbox label="Checked disabled" checked disabled />
      </Box>
      <Box>
        <Checkbox
          label="Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
          checked={false}
          status="Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        />
      </Box>
      <Box>
        <Checkbox
          label="Unchecked status error:"
          label_position="left"
          checked={false}
          status="Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        />
      </Box>
      <Box>
        <Checkbox
          label="Checked status message"
          checked
          status="Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        />
      </Box>
    </Wrapper>
  )
]
