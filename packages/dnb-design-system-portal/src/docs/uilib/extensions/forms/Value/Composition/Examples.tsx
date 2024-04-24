import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Card } from '@dnb/eufemia/src'
import { Form, Value } from '@dnb/eufemia/src/extensions/forms'
import Composition from '@dnb/eufemia/src/extensions/forms/Value/Composition'

export const DefaultLayout = () => {
  return (
    <ComponentBox
      scope={{ Value, Composition }}
      data-visual-test="forms-value-summary-list-default"
    >
      <Form.Handler
        data={{
          firstName: 'John',
          lastName: 'Doe',
        }}
      >
        <Card stack>
          <Form.SubHeading>Subheading</Form.SubHeading>

          <Value.Composition>
            <Value.String label="First name" path="/firstName" />
            <Value.String label="Last name" path="/lastName" />
          </Value.Composition>
        </Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const GridLayout = () => {
  return (
    <ComponentBox
      scope={{ Value, Composition }}
      data-visual-test="forms-value-summary-list-grid"
    >
      <Form.Handler
        data={{
          firstName: 'John',
          lastName: 'Doe',
        }}
      >
        <Card stack>
          <Form.SubHeading>Subheading</Form.SubHeading>

          <Value.Composition layout="grid">
            <Value.String label="First name" path="/firstName" />
            <Value.String label="Last name" path="/lastName" />
          </Value.Composition>
        </Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const CombinedLayout = () => {
  return (
    <ComponentBox
      scope={{ Value, Composition }}
      data-visual-test="forms-value-summary-list-combined"
    >
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

          <Value.Composition>
            <Value.String label="First name" path="/firstName" />
            <Value.String label="Last name" path="/lastName" />

            <Value.Composition layout="grid">
              <Value.String label="Street" path="/streetName" />
              <Value.Number label="Nr." path="/streetNr" />

              <Value.String label="Postalc." path="/postalCode" />
              <Value.String label="City" path="/city" />
            </Value.Composition>
          </Value.Composition>
        </Card>
      </Form.Handler>
    </ComponentBox>
  )
}
