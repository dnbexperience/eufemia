/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'

import { HelpButton, Modal, Button, Section } from '../../src/components'

export default {
  title: 'Eufemia/Components/HelpButton'
}

export const HelpButtonSandbox = () => (
  <Wrapper>
    <Box>
      <HelpButton
        text="Help"
        on_click={(e) => {
          console.log(e)
        }}
      />
    </Box>

    <Box>
      <HelpButton>
        <Button variant="tertiary" text="Button" />
        <Section>
          <Button variant="tertiary" text="Button" />
        </Section>
      </HelpButton>
    </Box>

    <Box>
      <Modal>
        <Button variant="tertiary" text="Button" />
        <Section>
          <Button variant="tertiary" text="Button" />
        </Section>
      </Modal>
    </Box>
  </Wrapper>
)
