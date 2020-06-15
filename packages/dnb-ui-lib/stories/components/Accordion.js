/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import Provider from '../../src/shared/Provider'
import {
  Accordion,
  // Button,
  // FormSet,
  FormRow
} from '../../src/components'

// import { H2 } from '../../src/elements'

export default [
  'Accordion',
  () => (
    <Wrapper>
      <Box>
        <Provider formRow={{ vertical: true }}>
          <FormRow disabled>
            <Accordion.Group>
              <Accordion
                text="First"
                value="first"
                suffix="123"
                status="error message"
                disabled={false}
              />
              <Accordion text="Second" value="second" disabled={false} />
              <Accordion text="Third A" value="thirdA" />
              <Accordion text="Third B" value="thirdB" />
              <Accordion text="Third C" value="thirdC" />
              <Accordion text="Third D" value="thirdD" />
              <Accordion text="Third E" value="thirdE" />
              <Accordion text="Third F" value="thirdF" />
              <Accordion text="Third G" value="thirdG" />
              <Accordion text="Third H" value="thirdH" />
              <Accordion text="Third I" value="thirdI" />
              <Accordion text="Third J" value="thirdJ" />
              <Accordion text="Third K" value="thirdK" />
              <Accordion text="Third L" value="thirdL" />
              <Accordion text="Third M" value="thirdM" />
              <Accordion text="Third N" value="thirdN" />
              <Accordion text="Last" value="last" />
            </Accordion.Group>
          </FormRow>
        </Provider>
      </Box>
    </Wrapper>
  )
]
