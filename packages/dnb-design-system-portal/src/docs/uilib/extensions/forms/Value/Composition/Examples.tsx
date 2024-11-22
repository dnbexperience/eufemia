import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Form, Value } from '@dnb/eufemia/src/extensions/forms'

export const Basic = () => {
  return (
    <ComponentBox>
      <Value.Composition>
        <Value.String label="Label A" value="value" />
        <Value.Number label="Label B" value={123} />
      </Value.Composition>
    </ComponentBox>
  )
}

export const WidthComparison = () => {
  return (
    <ComponentBox data-visual-test="forms-value-composition-default">
      <Value.Composition gap="large">
        <Value.String
          maxWidth="medium"
          label="Medium maxWidth"
          value="Nam sed aliquet nunc. Pellentesque condimentum enim arcu."
        />
        <Value.String
          label="Without a width"
          value="Nam sed aliquet nunc. Pellentesque condimentum enim arcu."
        />
      </Value.Composition>
    </ComponentBox>
  )
}

export const CombineValuesInSummaryList = () => {
  return (
    <ComponentBox data-visual-test="forms-value-composition-summary-list-combined">
      <Value.SummaryList>
        <Value.Composition label="Label">
          <Value.String value="value" />
          <Value.Number value={123} />
        </Value.Composition>
      </Value.SummaryList>
    </ComponentBox>
  )
}

export const WithSummaryList = () => {
  return (
    <ComponentBox data-visual-test="forms-value-composition-summary-list">
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
            <Value.Composition label="Name">
              <Value.String path="/firstName" />
              <Value.String path="/lastName" />
            </Value.Composition>

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

export const WithSummaryListGridLayout = () => {
  return (
    <ComponentBox data-visual-test="forms-value-composition-summary-list-grid">
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

          <Value.SummaryList layout="grid">
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
