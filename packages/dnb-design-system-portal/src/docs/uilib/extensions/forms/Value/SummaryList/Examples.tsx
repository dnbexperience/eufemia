import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Card } from '@dnb/eufemia/src'
import { Field, Form, Value } from '@dnb/eufemia/src/extensions/forms'

function createMockFile(name: string, size: number, type: string) {
  const file = new File([], name, { type })
  Object.defineProperty(file, 'size', {
    get() {
      return size
    },
  })
  return file
}

export const DefaultLayout = () => {
  return (
    <ComponentBox data-visual-test="forms-value-summary-list-default">
      <Form.Handler
        data={{
          firstName: 'John',
          lastName: 'Doe',
        }}
      >
        <Card stack>
          <Form.SubHeading>Subheading</Form.SubHeading>

          <Value.SummaryList>
            <Value.Name.First path="/firstName" />
            <Value.Name.Last path="/lastName" />
          </Value.SummaryList>
        </Card>
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
        <Card stack>
          <Form.SubHeading>Subheading</Form.SubHeading>

          <Value.SummaryList layout="grid">
            <Value.Name.First path="/firstName" />
            <Value.Name.Last path="/lastName" />
          </Value.SummaryList>
        </Card>
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
        <Card stack>
          <Form.SubHeading>Subheading</Form.SubHeading>

          <Value.SummaryList layout="horizontal">
            <Value.Name.First path="/firstName" />
            <Value.Name.Last path="/lastName" />
          </Value.SummaryList>
        </Card>
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
        <Card stack>
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
        </Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export function InheritVisibility() {
  return (
    <ComponentBox>
      <Form.Handler>
        <Card stack>
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
        </Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export function InheritLabel() {
  return (
    <ComponentBox scope={{ createMockFile }}>
      <Form.Handler>
        <Card stack>
          <Field.String path="/foo" defaultValue="foo" label="foo label" />
          <Field.String path="/bar" defaultValue="bar" label="bar label" />
          <Field.Upload
            path="/baz"
            defaultValue={[
              {
                file: createMockFile(
                  'fileName-1.png',
                  1000000,
                  'image/png',
                ),
              },
              {
                file: createMockFile(
                  'fileName-2.png',
                  2000000,
                  'image/png',
                ),
              },
            ]}
            label="baz label"
          />

          <Value.SummaryList inheritLabel>
            <Value.String path="/foo" />
            <Value.String path="/bar" />
            <Value.Upload path="/baz" />
          </Value.SummaryList>
        </Card>
      </Form.Handler>
    </ComponentBox>
  )
}
