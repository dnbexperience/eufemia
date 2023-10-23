/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'

import Provider from '../../../shared/Provider'
import { Textarea, GlobalStatus, Flex } from '../..'
import { FieldBlock } from '../../../extensions/forms'

export default {
  title: 'Eufemia/Components/Textarea',
}

export const TextareaSandbox = () => (
  <Wrapper className="dnb-spacing">
    <Box>
      <Provider formElement={{ label_direction: 'vertical' }}>
        <Textarea value="Text" label="Label:" suffix="123" />
      </Provider>
    </Box>
    <Box>
      <Textarea
        label="Autogrow:"
        rows={1}
        stretch
        autoresize={true}
        autoresize_max_rows={4}
        placeholder="Placeholder"
        on_key_down={({ rows, event }) => {
          if (rows >= 4 && event.key === 'Enter') {
            event.preventDefault()
          }
        }}
      />
    </Box>
    <Box>
      <Provider formElement={{ label_direction: 'vertical' }}>
        <FieldBlock label="Legend:">
          <Flex.Vertical>
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
          </Flex.Vertical>
        </FieldBlock>
      </Provider>
    </Box>
    <Box>
      <Provider formElement={{ label_direction: 'vertical' }}>
        <FieldBlock label="Legend:">
          <Flex.Vertical>
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
          </Flex.Vertical>
        </FieldBlock>
      </Provider>
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

export const GlobalStatusExample = () => {
  return (
    <>
      <GlobalStatus id="my-id" />
      <Textarea
        label="First"
        value="first"
        globalStatus={{ id: 'my-id', message: 'my message' }}
        status="Message"
      />
    </>
  )
}
