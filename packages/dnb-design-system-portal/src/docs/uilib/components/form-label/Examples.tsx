/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { FormLabel, Checkbox, Switch } from '@dnb/eufemia/src'

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
            help={{
              contents: 'This is a very helpful text',
            }}
          >
            Horizontal label
          </FormLabel>
          <Checkbox id="with-help-1" label="Checkbox" />
        </div>
        <hr />
        <div>
          <FormLabel
            forId="with-help-2"
            vertical
            help={{
              contents: 'Another very helpful text',
            }}
          >
            Vertical label
          </FormLabel>
          <Checkbox id="with-help-2" label="Checkbox" />
        </div>
      </div>
    </form>
  </ComponentBox>
)

export const WithHelpCustom = () => (
  <ComponentBox>
    <form>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
        }}
      >
        <div>
          <FormLabel
            forId="with-custom-help"
            help={{
              contents: 'Peekaboo!',
              contentId: 'help-content',
            }}
          >
            Field label
          </FormLabel>
          <Checkbox id="with-custom-help" label="Checkbox" />
        </div>
        <div>No help here</div>
        <div id="help-content">
          This is where content will be displayed
        </div>
      </div>
    </form>
  </ComponentBox>
)
