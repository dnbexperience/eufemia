import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Form, Field, FieldBlock } from '@dnb/eufemia/src/extensions/forms'
import { Card, Flex, P } from '@dnb/eufemia/src'

export const Default = () => {
  return (
    <ComponentBox>
      <Form.Handler
        data={{ email: '' }}
        onSubmit={(data) => console.log('onSubmit', data)}
      >
        <Card spacing="medium">
          <Field.Email path="/email" />
          <Form.ButtonRow>
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const SessionStorage = () => {
  return (
    <ComponentBox>
      <Form.Handler
        onSubmit={(data, { resetForm, clearData }) => {
          console.log('onSubmit', data)

          // Docs: https://eufemia.dnb.no/uilib/extensions/forms/extended-features/DataContext/Provider/events/#onsubmit-parameters
          resetForm()
          clearData()
        }}
        sessionStorageId="session-key"
      >
        <Card spacing="medium">
          <Field.String label="Name" path="/name" />
          <Field.Email path="/email" />
          <Form.ButtonRow>
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const Autofill = () => {
  return (
    <ComponentBox>
      <Form.Handler
        onSubmit={(data) => console.log('onSubmit', data)}
        autoComplete
      >
        <Form.MainHeading>Delivery address</Form.MainHeading>

        <Card stack>
          <Form.SubHeading>Your name</Form.SubHeading>

          <Field.String label="First name" path="/firstName" required />
          <Field.String label="Last name" path="/lastName" required />
        </Card>

        <Card stack>
          <Form.SubHeading>Your address</Form.SubHeading>

          <FieldBlock label="Address">
            <Flex.Horizontal>
              <Field.String
                label="Street"
                width="medium"
                path="/streetName"
                required
              />
              <Field.Number
                label="Nr."
                width="small"
                path="/streetNr"
                required
              />
            </Flex.Horizontal>
          </FieldBlock>

          <Field.PostalCodeAndCity
            postalCode={{ required: true, path: '/postalCode' }}
            city={{ required: true, path: '/city' }}
          />
        </Card>

        <Card spacing="medium">
          <P>More information about this form.</P>
          <Form.ButtonRow>
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Card>
      </Form.Handler>
    </ComponentBox>
  )
}
