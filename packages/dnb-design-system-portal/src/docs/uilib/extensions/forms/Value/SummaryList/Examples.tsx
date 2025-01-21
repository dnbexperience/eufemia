import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, Form, Value } from '@dnb/eufemia/src/extensions/forms'
import { Flex } from '@dnb/eufemia/src/components'

export const DefaultLayout = () => {
  return (
    <ComponentBox data-visual-test="forms-value-summary-list-default">
      <Form.Handler
        data={{
          firstName: 'John',
          lastName: 'Doe',
        }}
      >
        <Form.Card>
          <Form.SubHeading>Subheading</Form.SubHeading>

          <Value.SummaryList>
            <Value.Name.First path="/firstName" />
            <Value.Name.Last path="/lastName" />
          </Value.SummaryList>
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const GridLayout = () => {
  return (
    <ComponentBox data-visual-test="forms-value-summary-list-grid">
      <Form.Handler
        data={{
          firstName: 'John',
          lastName: 'Doe',
        }}
      >
        <Form.Card>
          <Form.SubHeading>Subheading</Form.SubHeading>

          <Value.SummaryList layout="grid">
            <Value.Name.First path="/firstName" />
            <Value.Name.Last path="/lastName" />
          </Value.SummaryList>
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const HorizontalLayout = () => {
  return (
    <ComponentBox data-visual-test="forms-value-summary-list-horizontal">
      <Form.Handler
        data={{
          firstName: 'John',
          lastName: 'Doe',
        }}
      >
        <Form.Card>
          <Form.SubHeading>Subheading</Form.SubHeading>

          <Value.SummaryList layout="horizontal">
            <Value.Name.First path="/firstName" />
            <Value.Name.Last path="/lastName" />
          </Value.SummaryList>
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const CombinedLayout = () => {
  return (
    <ComponentBox data-visual-test="forms-value-summary-list-combined">
      <Form.Handler
        data={{
          firstName: 'John',
          lastName: 'Doe',
          streetName: 'Osloveien',
          streetNr: 12,
          postalCode: '1234',
          city: 'Oslo',
        }}
      >
        <Form.Card>
          <Form.SubHeading>Subheading</Form.SubHeading>

          <Value.SummaryList>
            <Value.Name.First path="/firstName" />
            <Value.Name.Last path="/lastName" />

            <Value.Composition label="Street">
              <Value.String path="/streetName" />
              <Value.Number path="/streetNr" />
            </Value.Composition>

            <Value.Composition label="City">
              <Value.String path="/postalCode" />
              <Value.String path="/city" />
            </Value.Composition>
          </Value.SummaryList>
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export function InheritVisibility() {
  return (
    <ComponentBox>
      <Form.Handler>
        <Form.Card>
          <Field.Boolean
            variant="button"
            path="/isVisible"
            defaultValue={true}
          />

          <Form.Visibility pathTrue="/isVisible" animate>
            <Field.Name.First path="/foo" defaultValue="foo" />
            <Field.Name.Last path="/bar" defaultValue="bar" />
          </Form.Visibility>

          <Value.SummaryList inheritVisibility>
            <Value.Name.First path="/foo" />
            <Value.Name.First path="/bar" />
          </Value.SummaryList>
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export function InheritLabel() {
  return (
    <ComponentBox>
      <Form.Handler>
        <Form.Card>
          <Field.String path="/foo" defaultValue="foo" label="foo label" />
          <Field.String path="/bar" defaultValue="bar" label="bar label" />

          <Value.SummaryList inheritLabel>
            <Value.String path="/foo" />
            <Value.String path="/bar" />
          </Value.SummaryList>
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const HorizontalLayoutWithoutLabel = () => (
  <ComponentBox data-visual-test="forms-value-summary-empty-label">
    <Value.SummaryList layout="horizontal">
      <Value.String value="foo" label="Foo" />
      <Value.String value="bar" />
      <Value.String value="baz" label="Baz" />
    </Value.SummaryList>
  </ComponentBox>
)

export function AnimatedVisibility() {
  return (
    <ComponentBox>
      <Form.Handler>
        <Flex.Stack>
          <Field.Boolean
            label="Make second field visible when toggled"
            path="/toggleValue"
            variant="checkbox"
          />

          <Form.Card>
            <Value.SummaryList>
              <Value.String label="Label" value="First field" />

              <Form.Visibility pathTrue="/toggleValue" animate>
                <Value.String label="Label" value="Second field" />
              </Form.Visibility>
            </Value.SummaryList>
          </Form.Card>
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}
