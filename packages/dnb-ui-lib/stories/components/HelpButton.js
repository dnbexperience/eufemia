/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'

import {
  HelpButton,
  Modal,
  Button,
  Section,
  Input
} from '../../src/components'

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
      <HelpButton text="Help" icon="bell" id="test-help">
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

    <Box>
      <Input
        label="Input"
        placeholder="Placeholder ..."
        suffix={<HelpButton>Help text</HelpButton>}
      />
    </Box>
  </Wrapper>
)
