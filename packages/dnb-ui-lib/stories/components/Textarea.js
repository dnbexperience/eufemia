/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import Provider from '../../src/shared/Provider'
import { Textarea, FormRow } from '../../src/components'

export default {
  title: 'Eufemia/Components/Textarea'
}

export const TextareaSandbox = () => (
  <Wrapper className="dnb-spacing">
    <Box>
      <Provider FormRow={{ vertical: true }}>
        <FormRow>
          <Textarea value="Text" label="Label:" suffix="123" />
        </FormRow>
      </Provider>
    </Box>
    <Box>
      <FormRow label_direction="vertical" label="Legend:">
        <Textarea
          label="Vertical label:"
          value="Nec litora inceptos vestibulum id interdum donec gravida nostra
            lacinia bibendum hendrerit porttitor volutpat nam duis nisl
            scelerisque sapien erat"
          right="small"
        />
        <Textarea
          label="Vertical label:"
          value="Nec litora inceptos vestibulum id interdum donec gravida nostra
            lacinia bibendum hendrerit porttitor volutpat nam duis nisl
            scelerisque sapien erat"
        />
      </FormRow>
    </Box>
    <Box>
      <FormRow vertical label="Legend:">
        <Textarea
          label="Vertical:"
          value="Nec litora inceptos vestibulum id interdum donec gravida nostra
            lacinia bibendum hendrerit porttitor volutpat nam duis nisl
            scelerisque sapien erat"
        />
        <Textarea
          top="small"
          label="Vertical:"
          value="Nec litora inceptos vestibulum id interdum donec gravida nostra
            lacinia bibendum hendrerit porttitor volutpat nam duis nisl
            scelerisque sapien erat"
        />
      </FormRow>
    </Box>
    <Box>
      <Textarea
        bottom="4"
        label="Label:"
        rows="5"
        cols="33"
        value="Nec litora inceptos vestibulum id interdum donec gravida
              nostra lacinia bibendum hendrerit porttitor volutpat nam duis
              nisl scelerisque sapien erat"
        on_change={({ value }) => {
          console.log('on_change', value)
        }}
        on_focus={() => {
          console.log('on_focus')
        }}
        on_blur={() => {
          console.log('on_blur')
        }}
      />
      <p className="dnb-p">I have still to be on the grid!</p>
    </Box>
    <Box>
      <Textarea
        label="Placeholder:"
        rows="3"
        align="right"
        placeholder="Placeholder litora inceptos vestibulum id interdum donec gravida nostra
              lacinia bibendum hendrerit porttitor volutpat nam duis nisl
              scelerisque sapien erat"
        suffix="Placeholder litora inceptos vestibulum id interdum donec gravida nostra
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
        suffix="Error Message"
      />
      <p className="dnb-p">I have still to be on the grid!</p>
    </Box>
    <Box>
      <Textarea
        stretch
        label="Stretched label:"
        // label_direction="vertical"
        value="Nec litora inceptos vestibulum id interdum donec gravida nostra
              lacinia bibendum hendrerit porttitor volutpat nam duis nisl
              scelerisque sapien erat"
      />
    </Box>
    <Box>
      <Textarea
        stretch
        label="Stretched label:"
        label_direction="vertical"
        value="Nec litora inceptos vestibulum id interdum donec gravida nostra
              lacinia bibendum hendrerit porttitor volutpat nam duis nisl
              scelerisque sapien erat"
      />
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
