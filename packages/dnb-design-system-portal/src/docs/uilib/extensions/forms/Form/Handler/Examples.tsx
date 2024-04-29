import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Form, Field, Value } from '@dnb/eufemia/src/extensions/forms'
import { stop as stopIcon } from '@dnb/eufemia/src/icons'
import { Button, Card, Flex, P, Section } from '@dnb/eufemia/src'
import { debounceAsync } from '@dnb/eufemia/src/shared/helpers/debounce'
import { createRequest } from '../SubmitIndicator/Examples'

export const AsyncSubmit = () => {
  return (
    <ComponentBox>
      <Form.Handler
        onSubmit={async (data) => console.log('onSubmit', data)}
      >
        <Card stack>
          <Field.Email path="/email" />
          <Form.ButtonRow>
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const AsyncSubmitComplete = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Form.Handler
        data={{ myField: 'Some value' }}
        onSubmit={async (data) => {
          console.log('onSubmit', data)

          // Wait for 2 seconds
          await new Promise((resolve) => setTimeout(resolve, 2000))

          // e.g. go to new location

          // Optionally, you can return e.g. the "pending" status with an additional info
          return {
            info: 'Redirecting to a new location',

            // Force the form to stay in pending state
            status: 'pending',
          }
        }}
        asyncSubmitTimeout={10000}
      >
        <Flex.Stack>
          <Form.MainHeading>Heading</Form.MainHeading>
          <Card>
            <Value.String label="Summary" path="/myField" />
          </Card>
          <Form.ButtonRow>
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const AsyncChangeAndValidation = () => {
  return (
    <ComponentBox scope={{ debounceAsync, createRequest, stopIcon }}>
      {() => {
        const validator = debounceAsync(async function secondValidator(
          value: string,
        ) {
          try {
            const request = createRequest()
            const wasCanceled = this.addCancelEvent(request.cancel)
            await request(2000) // Simulate a request

            if (wasCanceled()) {
              throw new Error('Validation request canceled')
            }
          } catch (error) {
            return error
          }

          if (value !== 'valid') {
            return new Error('Custom error with invalid value: ' + value) // Show this message
          }
        })

        const cancelRequest = () => {
          validator.cancel()
        }

        const onSubmit = async (data) => {
          console.log('onSubmit', data)

          // Wait for 2 seconds
          await new Promise((resolve) => setTimeout(resolve, 2000))

          // For demo purposes, we show a message
          return { info: 'Message from onSubmit return' }
        }

        const onChangeForm = async (data) => {
          console.log('onChangeForm', data)

          // Wait for 2 seconds
          await new Promise((resolve) => setTimeout(resolve, 2000))

          // For demo purposes, we show a message
          return { warning: 'Warning message' }
        }

        const onChangeField = async (data) => {
          console.log('onChangeField', data)

          // Wait for 2 seconds
          await new Promise((resolve) => setTimeout(resolve, 2000))

          // For demo purposes, we show a message
          return { info: 'Info message' }
        }

        const MyForm = () => {
          const { data } = Form.useData('unique-id')
          console.log('data', data)
          return (
            <Form.Handler
              id="unique-id"
              onSubmit={onSubmit}
              onChange={onChangeForm}
            >
              <Flex.Stack>
                <Field.String
                  label='Type "valid" to validate the field'
                  path="/myField"
                  required
                  validator={validator}
                  onChange={onChangeField}
                  autoComplete="off"
                />
                <Form.ButtonRow>
                  <Form.SubmitButton text="Save" />
                  <Button
                    text="Stop async operations"
                    variant="tertiary"
                    icon={stopIcon}
                    icon_position="left"
                    disabled={false}
                    onClick={cancelRequest}
                  />
                </Form.ButtonRow>
              </Flex.Stack>
            </Form.Handler>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}

export const SessionStorage = () => {
  return (
    <ComponentBox>
      <Form.Handler
        onSubmit={(data, { resetForm, clearData }) => {
          console.log('onSubmit', data)

          // Docs: https://eufemia.dnb.no/uilib/extensions/forms/DataContext/Provider/events/#onsubmit-parameters
          resetForm()
          clearData()
        }}
        sessionStorageId="session-key"
      >
        <Card stack>
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
        <Flex.Stack>
          <Form.MainHeading>Delivery address</Form.MainHeading>

          <Card stack>
            <Form.SubHeading>Your name</Form.SubHeading>

            <Field.String label="First name" path="/firstName" required />
            <Field.String label="Last name" path="/lastName" required />
          </Card>

          <Card stack>
            <Form.SubHeading>Your address</Form.SubHeading>

            <Field.Composition width="large">
              <Field.String
                label="Street"
                width="stretch"
                path="/streetName"
                required
              />
              <Field.Number
                label="Nr."
                width="small"
                path="/streetNr"
                required
              />
            </Field.Composition>

            <Field.PostalCodeAndCity
              postalCode={{ required: true, path: '/postalCode' }}
              city={{ required: true, path: '/city' }}
            />
          </Card>

          <Card stack>
            <P>More information about this form.</P>
            <Form.ButtonRow>
              <Form.SubmitButton />
            </Form.ButtonRow>
          </Card>
        </Flex.Stack>
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
            myField: 'Value',
          })

          return (
            <Form.Handler
              id={id}
              onSubmit={(data) => console.log('onSubmit', data)}
              filterSubmitData={filterDataHandler}
            >
              <Flex.Stack spacing="medium">
                <Field.Boolean label="Disabled" path="/disabled" />
                <Field.String
                  label="My Field"
                  path="/myField"
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
