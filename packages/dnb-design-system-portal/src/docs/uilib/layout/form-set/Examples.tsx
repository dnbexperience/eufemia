/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  H2,
  FormSet,
  FormRow,
  Radio,
  Space,
  Input,
  Button,
} from '@dnb/eufemia/src'

export const FormSetDefault = () => (
  <ComponentBox>
    <FormSet vertical>
      <FormRow no_label>
        <H2>A semantic h2 in a FormRow without a label</H2>
      </FormRow>
      <FormRow
        section_style="mint-green-12"
        section_spacing
        label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:"
      >
        <Radio.Group value="first">
          <Radio label="First" value="first" />
          <Radio label="Second" value="second" />
          <Radio label="Third" value="third" />
        </Radio.Group>
      </FormRow>
    </FormSet>
  </ComponentBox>
)

export const FormSetVertical = () => (
  <ComponentBox>
    <FormSet direction="vertical">
      <FormRow
        label={
          <Space element="span" className="dnb-h--large">
            Custom Legend:
          </Space>
        }
      >
        <Input label="Label:" bottom />
        <Input label="Label:" />
      </FormRow>
    </FormSet>
  </ComponentBox>
)

export const FormSetSubmit = () => (
  <ComponentBox>
    <FormSet
      direction="horizontal"
      on_submit={({ event }) => console.log('on_submit', event)}
      prevent_submit={true}
    >
      <FormRow>
        <Input
          label="Search Input:"
          type="search"
          value="Search text ..."
          right="small"
        />
        <Button type="submit" text="Trigger submit" />
      </FormRow>
    </FormSet>
  </ComponentBox>
)

export const FormSetInfoVertical = () => (
  <ComponentBox hidePreview hideToolbar>
    <FormSet direction="vertical">
      <FormRow>Components are now vertical aligned</FormRow>
      <FormRow>Components are now vertical aligned</FormRow>
    </FormSet>
  </ComponentBox>
)
