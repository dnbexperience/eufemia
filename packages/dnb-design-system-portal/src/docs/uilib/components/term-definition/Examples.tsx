import React from 'react'
import { H2, Lead, P, TermDefinition } from '@dnb/eufemia/src'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'
import ComponentBox from '../../../../shared/tags/ComponentBox'

export function TermDefinitionBasic() {
  return (
    <ComponentBox
      data-visual-test="term-definition-basic"
      background="white"
      hideCode
    >
      <P>
        A text with{' '}
        <TermDefinition content="Unusual words are words that are not commonly used or that many people might not know the meaning of.">
          unusual words (yeah)
        </TermDefinition>{' '}
        lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </P>
    </ComponentBox>
  )
}

export function TermDefinitionLead() {
  return (
    <ComponentBox
      data-visual-test="term-definition-typography"
      background="white"
    >
      <Lead>
        As a lead with{' '}
        <TermDefinition content="Unusual words are words that are not commonly used or that many people might not know the meaning of.">
          unusual words (yeah)
        </TermDefinition>
        .
      </Lead>
      <H2 top={false}>
        As a heading with{' '}
        <TermDefinition content="Unusual words are words that are not commonly used or that many people might not know the meaning of.">
          unusual words (yeah)
        </TermDefinition>
        .
      </H2>
    </ComponentBox>
  )
}

export function TermDefinitionHelp() {
  return (
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
          <Field.Boolean
            variant="radio"
            label="Consent"
            help={{
              title: 'Data processing help',
              content: (
                <>
                  I consent to{' '}
                  <TermDefinition content="Data processing refers to any operation performed on personal data, such as collection, storage, use, or disclosure.">
                    data processing
                  </TermDefinition>
                </>
              ),
            }}
          />
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export function TermDefinitionLabel() {
  return (
    <ComponentBox>
      <Form.Handler>
        <Form.Card>
          <Form.SubHeading>My form</Form.SubHeading>
          <Field.Email
            label={
              <>
                Enter your{' '}
                <TermDefinition content="Email is a method of exchanging messages between people using electronic devices.">
                  email
                </TermDefinition>{' '}
                address
              </>
            }
          />
          <Field.Boolean
            variant="checkbox"
            label={
              <>
                I consent to{' '}
                <TermDefinition content="Data processing refers to any operation performed on personal data, such as collection, storage, use, or disclosure.">
                  data processing
                </TermDefinition>
              </>
            }
          />
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}
