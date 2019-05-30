/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { Textarea } from '../../src/components'

export default [
  'Textarea',
  () => (
    <Wrapper className="dnb-spacing">
      <Box>
        <Textarea
          label="Label:"
          rows="5"
          cols="33"
          value="Nec litora inceptos vestibulum id interdum donec gravida
              nostra lacinia bibendum hendrerit porttitor volutpat nam duis
              nisl scelerisque sapien erat"
          on_change={({ value }) => {
            console.log('on_change', value)
          }}
        />
        <p className="dnb-p">I have still to be on the grid!</p>
      </Box>
      <Box>
        <Textarea
          label="Placeholder:"
          rows="3"
          align="right"
          placeholder="Nec litora inceptos vestibulum id interdum donec gravida nostra
              lacinia bibendum hendrerit porttitor volutpat nam duis nisl
              scelerisque sapien erat"
        />
        <p className="dnb-p">I have still to be on the grid!</p>
      </Box>
      <Box>
        <Textarea
          label="Max Length 20:"
          label_position="vertical"
          rows="5"
          cols="33"
          maxLength="20"
          required
          value="Nec litora inceptos vestibulum id interdum donec gravida nostra
              lacinia bibendum hendrerit porttitor volutpat nam duis nisl
              scelerisque sapien erat"
        />
        <p className="dnb-p">I have still to be on the grid!</p>
      </Box>
      <Box>
        <Textarea
          label="Error Message:"
          cols="33"
          value="Nec litora inceptos vestibulum id interdum donec gravida nostra
              lacinia bibendum hendrerit porttitor volutpat nam duis nisl
              scelerisque sapien erat"
          status="Message to the user"
        />
        <p className="dnb-p">I have still to be on the grid!</p>
      </Box>
      <Box>
        <Textarea
          label="Disabled:"
          disabled
          value="Nec litora inceptos vestibulum id interdum donec gravida nostra
              lacinia bibendum hendrerit porttitor volutpat nam duis nisl
              scelerisque sapien erat"
        />
        <p className="dnb-p">I have still to be on the grid!</p>
      </Box>
    </Wrapper>
  )
]
