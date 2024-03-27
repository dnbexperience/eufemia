/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { FormLabel, Checkbox, Switch, HelpButton } from '@dnb/eufemia/src'

export const Default = () => (
  <ComponentBox data-visual-test="form-label-default">
    <FormLabel forId="alone-1">Default horizontal FormLabel</FormLabel>
    <Checkbox id="alone-1" label="Checkbox" />
  </ComponentBox>
)

export const Vertical = () => (
  <ComponentBox data-visual-test="form-label-vertical">
    <FormLabel forId="alone-2" vertical>
      Vertical FormLabel
    </FormLabel>
    <Checkbox id="alone-2" label="Checkbox" />
  </ComponentBox>
)

export const NoForId = () => (
  <ComponentBox>
    <FormLabel vertical>Without forId (select me)</FormLabel>
    <Checkbox label="Checkbox" />
  </ComponentBox>
)

export const LinkedLabel = () => (
  <ComponentBox>
    <form>
      <div>
        <div>
          <FormLabel forId="switch-1" text="Form Label (click me):" />
        </div>
        <div>
          <Switch id="switch-1" value="Value of switch" />
        </div>
      </div>
    </form>
  </ComponentBox>
)

export const WithHelp = () => (
  <ComponentBox>
    <form>
      <div>
        <div>
          <FormLabel
            forId="with-help-1"
            vertical
            help={{
              contentId: 'with-help-1-element',
              content: 'Very helpful text',
            }}
          >
            Vertical label
          </FormLabel>
          <Checkbox id="with-help-1" label="Checkbox" />
        </div>
        <hr />
        <div>
          <FormLabel
            forId="with-help-2"
            help={{
              contentId: 'with-help-2-element',
            }}
          >
            Horizontal label
          </FormLabel>
          <Checkbox id="with-help-2" label="Checkbox" />
          <HelpButton.Content contentId="with-help-2-element">
            Another very helpful text
          </HelpButton.Content>
        </div>
      </div>
    </form>
  </ComponentBox>
)
