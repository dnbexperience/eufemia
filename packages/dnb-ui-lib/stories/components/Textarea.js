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
        <div className="dnb-form-group dnb-form-group__position--vertical">
          <Textarea
            label="Vertical:"
            rows="5"
            cols="33"
            value="Nec litora inceptos vestibulum id interdum donec gravida
              nostra lacinia bibendum hendrerit porttitor volutpat nam duis
              nisl scelerisque sapien erat"
          />
        </div>
      </Box>
      <Box>
        <div className="dnb-form-group">
          <Textarea
            label="Placeholder:"
            rows="3"
            placeholder="Nec litora inceptos vestibulum id interdum donec gravida nostra
              lacinia bibendum hendrerit porttitor volutpat nam duis nisl
              scelerisque sapien erat"
          />
        </div>
      </Box>
      <Box>
        <Textarea
          label="Max Length 20:"
          rows="5"
          cols="33"
          maxLength="20"
          required
          value="Nec litora inceptos vestibulum id interdum donec gravida nostra
              lacinia bibendum hendrerit porttitor volutpat nam duis nisl
              scelerisque sapien erat"
        />
      </Box>
      <Box>
        <div className="dnb-form-group dnb-form-group__position--vertical">
          <Textarea
            label="Error Message:"
            cols="33"
            value="Nec litora inceptos vestibulum id interdum donec gravida nostra
              lacinia bibendum hendrerit porttitor volutpat nam duis nisl
              scelerisque sapien erat"
            status="Message to the user"
          />
        </div>
      </Box>
      <Box>
        <div className="dnb-form-group">
          <Textarea
            label="Disabled:"
            disabled
            value="Nec litora inceptos vestibulum id interdum donec gravida nostra
              lacinia bibendum hendrerit porttitor volutpat nam duis nisl
              scelerisque sapien erat"
          />
        </div>
        <p className="dnb-p">I have still to be on the grid!</p>
      </Box>
    </Wrapper>
  )
]
