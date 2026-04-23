/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'

import {
  HelpButton,
  Input,
  Dl,
  Dt,
  Dd,
  Dialog,
  TermDefinition,
} from '@dnb/eufemia/src'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'

export const HelpButtonDefaultExample = () => (
  <ComponentBox data-visual-test="help-button-default">
    <HelpButton>Text</HelpButton>
  </ComponentBox>
)

export const HelpButtonSuffixExample = () => (
  <ComponentBox data-visual-test="help-button-suffix">
    <Input
      size={10}
      placeholder="Input ..."
      suffix={<HelpButton title="Custom title">Text</HelpButton>}
    />
  </ComponentBox>
)

export const HelpButtonFormHelpExample = () => (
  <ComponentBox>
    <Form.Handler>
      <Form.Card>
        <Form.SubHeading>My form</Form.SubHeading>
        <Field.Email
          help={{
            title: 'Email help',
            content: (
              <>
                Enter your{' '}
                <TermDefinition content="Email is a method of exchanging messages between people using electronic devices.">
                  email
                </TermDefinition>{' '}
                address
              </>
            ),
          }}
        />
      </Form.Card>
    </Form.Handler>
  </ComponentBox>
)

export const HelpButtonSizesExample = () => (
  <ComponentBox data-visual-test="help-button-sizes">
    <HelpButton title="Custom title">Text</HelpButton>
    <HelpButton
      size="small"
      left
      onClick={() => {
        console.log('onClick')
      }}
    >
      Text
    </HelpButton>
  </ComponentBox>
)

export const HelpButtonInfoIconExample = () => (
  <ComponentBox>
    <HelpButton icon="information" tooltip="More info">
      <Dl>
        <Dt>Term</Dt>
        <Dd>Description</Dd>
        <Dd>Description</Dd>
        <Dt>Term</Dt>
        <Dd>Description</Dd>
      </Dl>
    </HelpButton>
  </ComponentBox>
)

export const HelpButtonInsideTextExample = () => (
  <ComponentBox data-visual-test="help-button-inline">
    <span>
      Text <HelpButton>Text</HelpButton> Text
    </span>
  </ComponentBox>
)

export const HelpButtonRenderExample = () => (
  <ComponentBox scope={{ Dialog }}>
    <HelpButton
      title="Title"
      render={(children, props) => (
        <Dialog triggerAttributes={props} className="your-class">
          {children}
        </Dialog>
      )}
    >
      Help text
    </HelpButton>
  </ComponentBox>
)
