/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'

import {
  HelpButton,
  Dialog,
  Drawer,
  Button,
  Section,
  Input,
  FormLabel,
  Checkbox,
  Space,
} from '../..'
import styled from '@emotion/styled'
import { Hr } from '../../../elements'

export default {
  title: 'Eufemia/Components/HelpButton',
}

const MaxWidth = styled.div`
  max-width: 10rem;
`

export const HelpButtonInput = () => {
  return (
    <>
      <Section innerSpace>
        <>
          <MaxWidth>
            <div>
              <FormLabel
                help={{
                  content: 'My content',
                  contentId: 'unique',
                }}
                forId="myInput"
                // vertical
              >
                Label with more words
              </FormLabel>
              <Input
                id="myInput"
                top="x-small"
                // help={{
                //   content: 'My content',
                //   // contentId: 'unique',
                // }}
                // label="Label"
                // suffix={
                //   <HelpButton displayMethod="inline">content</HelpButton>
                // }
              />
            </div>
          </MaxWidth>

          {/* <HelpButton
          title="Tittel"
          displayMethod="inline"
          contentId="unique"
        >
          Helpe text
        </HelpButton> */}
          {/* <HelpButton.Content id="unique" /> */}
        </>
      </Section>

      <form>
        <Space>
          <FormLabel
            forId="with-help-1"
            help={{
              content: 'This is a very helpful text',
            }}
          >
            Horizontal label
          </FormLabel>
          <Checkbox id="with-help-1" label="Checkbox" />
        </Space>

        <Hr />

        <Space>
          <FormLabel
            forId="with-help-2"
            vertical
            help={{
              content: 'Another very helpful text',
            }}
          >
            Vertical label
          </FormLabel>
          <Checkbox id="with-help-2" label="Checkbox" />
        </Space>
      </form>
    </>
  )
}

export const HelpButtonSandbox = () => (
  <Wrapper>
    <Box>
      <HelpButton
        title="Tittel"
        render={(children, props) => (
          <Drawer triggerAttributes={props}>{children}</Drawer>
        )}
      >
        Help text
      </HelpButton>
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
