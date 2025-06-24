import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex, P } from '@dnb/eufemia/src'
import {
  Form,
  Field,
  Wizard,
  Value,
} from '@dnb/eufemia/src/extensions/forms'

export const BasicUsage = () => {
  return (
    <ComponentBox data-visual-test="forms-card">
      <Flex.Stack>
        <Form.MainHeading>Main heading</Form.MainHeading>
        <Form.Card>
          <Field.String label="Field A" required />
          <Field.String label="Field B" required />
          <Form.Card>
            <P>Nested card</P>
          </Form.Card>
        </Form.Card>
        <Form.SubmitButton />
      </Flex.Stack>
    </ComponentBox>
  )
}

export const Outset = () => {
  return (
    <ComponentBox data-visual-test="forms-card-outset">
      <Flex.Stack>
        <P>Regular content position</P>

        <Form.Card>
          <P>Default outset to preserve content position.</P>
        </Form.Card>

        <Form.Card outset={false}>
          <P>
            Outset turned off, will still breakout (go full width) on small
            screens
          </P>
        </Form.Card>

        <Form.Card.Provider disableCardBreakout>
          <Form.Card>
            <P>
              Told to behave as if inside a parent card. Will stay inside
              the content area of the parent even on small screens.
            </P>
          </Form.Card>
        </Form.Card.Provider>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const UsageInWizard = () => {
  return (
    <ComponentBox data-visual-test="forms-card-in-wizard">
      <Form.Handler>
        <Wizard.Container>
          <Wizard.Step>
            <Form.Card>
              <Form.Section>
                <Form.Section.ViewContainer
                  title="In a Wizard"
                  variant="basic"
                >
                  <Value.String defaultValue="Something" />
                </Form.Section.ViewContainer>
                <Form.Section.EditContainer variant="basic">
                  <Field.String defaultValue="Something" />
                </Form.Section.EditContainer>
              </Form.Section>
            </Form.Card>
          </Wizard.Step>
        </Wizard.Container>
        <Form.SubmitButton text="Happy coding!" />
      </Form.Handler>
    </ComponentBox>
  )
}
