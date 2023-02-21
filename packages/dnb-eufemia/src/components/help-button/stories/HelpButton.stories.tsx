/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'

import { HelpButton, Dialog, Button, Section, Input } from '../..'

export default {
  title: 'Eufemia/Components/HelpButton',
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
      <Dialog title="Title">
        <Button variant="tertiary" text="Button" />
        <Section>
          <Button variant="tertiary" text="Button" />
        </Section>
      </Dialog>
    </Box>

    <Box>
      <Input
        label="Input"
        placeholder="Placeholder ..."
        suffix={<Dialog title="Title">Help text</Dialog>}
      />
    </Box>
  </Wrapper>
)
