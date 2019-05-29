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
          <label htmlFor="hendrerit">Label for the textarea:</label>
          <Textarea
            id="hendrerit"
            rows="5"
            cols="33"
            value="Nec litora inceptos vestibulum id interdum donec gravida
              nostra lacinia bibendum hendrerit porttitor volutpat nam duis
              nisl scelerisque sapien erat"
          />
        </div>
        <p className="dnb-p">I have to be on the grid!</p>
      </Box>
      <Box>
        <div className="dnb-form-group">
          <label htmlFor="litora">Label for the textarea:</label>
          <Textarea
            id="litora"
            // label="Label for the textarea:"
            placeholder="Nec litora inceptos vestibulum id interdum donec gravida nostra
              lacinia bibendum hendrerit porttitor volutpat nam duis nisl
              scelerisque sapien erat"
          />
        </div>
        <p className="dnb-p">I have to be on the grid!</p>
      </Box>
      <Box>
        <Textarea
          rows="5"
          cols="33"
          minLength="10"
          maxLength="20"
          required
          value="Nec litora inceptos vestibulum id interdum donec gravida nostra
              lacinia bibendum hendrerit porttitor volutpat nam duis nisl
              scelerisque sapien erat"
        />
        <p className="dnb-p">I have to be on the grid!</p>
      </Box>
      <Box>
        <div className="dnb-form-group dnb-form-group__position--vertical">
          <label htmlFor="vestibulum">Label:</label>
          <Textarea
            id="vestibulum"
            // className="dnb-textarea status--error"
            cols="33"
            value="Nec litora inceptos vestibulum id interdum donec gravida nostra
              lacinia bibendum hendrerit porttitor volutpat nam duis nisl
              scelerisque sapien erat"
            status="Message to the user"
          />
          {/* <FormStatus text="Message to the user" /> */}
        </div>
        <p className="dnb-p">I have to be on the grid!</p>
      </Box>
      <Box>
        <div className="dnb-form-group">
          <label htmlFor="volutpat">Label:</label>
          <Textarea
            id="volutpat"
            disabled
            readOnly
            cols="33"
            value="Nec litora inceptos vestibulum id interdum donec gravida nostra
              lacinia bibendum hendrerit porttitor volutpat nam duis nisl
              scelerisque sapien erat"
          />
        </div>
        <p className="dnb-p">I have to be on the grid!</p>
      </Box>
    </Wrapper>
  )
]
