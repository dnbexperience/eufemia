import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Form, Field, FieldBlock } from '@dnb/eufemia/src/extensions/forms'
import { Card, Flex, P, Section } from '@dnb/eufemia/src'

export const Default = () => {
  return (
    <ComponentBox>
      <Form.Handler
        data={{}}
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

export const FilterData = () => {
  const id = 'disabled-fields'
  return (
    <ComponentBox scope={{ id, replaceUndefinedValues }}>
      {() => {
        const filterDataHandler = (path, value, props) => !props.disabled

        const MyComponent = () => {
          const { data } = Form.useData(id, {
            disabled: false,
            validate: false,
            myField: 'Value',
          })

          return (
            <Form.Handler
              id={id}
              onSubmit={(data) => console.log('onSubmit', data)}
              filterData={filterDataHandler}
            >
              <Flex.Stack spacing="medium">
                <Field.Boolean label="Disabled" path="/disabled" />
                <Field.Boolean label="Validate" path="/validate" />
                <Field.String
                  label="My Field"
                  path="/myField"
                  required={data.validate}
                  disabled={data.disabled}
                />
                <Form.ButtonRow>
                  <Form.SubmitButton />
                </Form.ButtonRow>
              </Flex.Stack>
            </Form.Handler>
          )
        }

        const Output = () => {
          const { filterData } = Form.useData(id)
          const { hasErrors } = Form.useError(id)

          return (
            <Section
              top
              innerSpace
              backgroundColor="sand-yellow"
              breakout={false}
            >
              <output>
                hasErrors: {JSON.stringify(hasErrors(), null, 2)}
                <pre>
                  {JSON.stringify(
                    replaceUndefinedValues(filterData(filterDataHandler)),
                    null,
                    2,
                  )}
                </pre>
              </output>
            </Section>
          )
        }

        return (
          <>
            <MyComponent />
            <Output />
          </>
        )
      }}
    </ComponentBox>
  )
}

/**
 * Replaces undefined values in an object with a specified replacement value.
 * @param value - The value to check for undefined values.
 * @param replaceWith - The value to replace undefined values with. Default is null.
 * @returns The object with undefined values replaced.
 */
function replaceUndefinedValues(
  value: unknown,
  replaceWith = null,
): unknown {
  if (typeof value === 'undefined') {
    return replaceWith
  } else if (typeof value === 'object' && value !== replaceWith) {
    return {
      ...value,
      ...Object.fromEntries(
        Object.entries(value).map(([k, v]) => [
          k,
          replaceUndefinedValues(v),
        ]),
      ),
    }
  } else {
    return value
  }
}
