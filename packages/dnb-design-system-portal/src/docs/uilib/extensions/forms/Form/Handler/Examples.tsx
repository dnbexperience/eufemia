import React from 'react'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import {
  Form,
  Field,
  Value,
  Tools,
} from '@dnb/eufemia/src/extensions/forms'
import { stop as stopIcon } from '@dnb/eufemia/src/icons'
import { Button, Card, Flex, P } from '@dnb/eufemia/src'
import { debounceAsync } from '@dnb/eufemia/src/shared/helpers/debounce'
import { createRequest } from '../SubmitIndicator/Examples'

export const RequiredAndOptionalFields = () => {
  return (
    <ComponentBox data-visual-test="required-and-optional-fields">
      <Form.Handler required>
        <Card stack>
          <Field.Email path="/email" required={false} />
          <Field.String
            path="/custom"
            label="Label"
            labelDescription="\nLabel description"
            required={false}
          />
          <Field.Currency path="/amount" label="Amount" />
          <Form.SubmitButton />
        </Card>
      </Form.Handler>
    </ComponentBox>
  )
}

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
    <ComponentBox>
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
                  onChangeValidator={validator}
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

            <Field.Name.First path="/firstName" required />
            <Field.Name.Last path="/lastName" required />
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

export const Locale = () => {
  return (
    <ComponentBox>
      {() => {
        const myTranslations = {
          'nb-NO': { PhoneNumber: { label: 'Egendefinert 🚀' } },
          'en-GB': { PhoneNumber: { label: 'Custom 🚀' } },
        }

        const MyForm = () => {
          const { data } = Form.useData('my-form', {
            locale: 'en-GB',
          })

          return (
            <Form.Handler
              id="my-form"
              locale={data?.locale}
              translations={myTranslations}
            >
              <Card stack>
                <Field.PhoneNumber />

                <Field.Selection
                  path="/locale"
                  variant="button"
                  optionsLayout="horizontal"
                >
                  <Field.Option value="nb-NO">Norsk</Field.Option>
                  <Field.Option value="en-GB">English</Field.Option>
                </Field.Selection>
              </Card>
            </Form.Handler>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}

export const VisibleData = () => {
  return (
    <ComponentBox>
      <Form.Handler
        defaultData={{
          isVisible: true,
        }}
        onSubmit={(data, { reduceToVisibleFields }) => {
          const myData = reduceToVisibleFields(data, {
            removePaths: ['/isVisible'],
          })
          console.log('Result of reduceToVisibleFields: ', myData)
        }}
      >
        <Flex.Stack>
          <Field.Boolean
            label="Show radio buttons"
            variant="button"
            path="/isVisible"
          />
          <Form.Visibility pathTrue="/isVisible" animate>
            <Field.Selection
              label="Radio buttons"
              variant="radio"
              path="/myValue"
              defaultValue="foo"
            >
              <Field.Option value="foo" title="Foo" />
              <Field.Option value="bar" title="Bar" />
            </Field.Selection>
          </Form.Visibility>
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const FilterData = () => {
  return (
    <ComponentBox scope={{ Tools }}>
      {() => {
        const id = 'my-form'
        const filterDataHandler = ({ props }) => !props.disabled

        const MyForm = () => {
          const { data } = Form.useData(id, {
            disabled: false,
            myField: 'Value',
          })

          return (
            <Form.Handler
              id={id}
              onSubmit={(data, { filterData }) => {
                console.log('onSubmit', filterData(filterDataHandler))
              }}
            >
              <Flex.Stack>
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
          const { hasErrors } = Form.useValidation(id)

          return (
            <>
              <Tools.Log top data={hasErrors()} label="hasErrors:" />
              <Tools.Log top data={filterData(filterDataHandler)} />
            </>
          )
        }

        return (
          <>
            <MyForm />
            <Output />
          </>
        )
      }}
    </ComponentBox>
  )
}

export const TransformData = () => {
  return (
    <ComponentBox scope={{ Tools }}>
      {() => {
        const MyForm = () => {
          const [submitData, setSubmitData] = React.useState({})
          const onSubmit = (data, { transformData }) => {
            const transformedData = transformData(
              data,
              ({ value, displayValue, label }) => {
                return { value, displayValue, label }
              },
            )

            setSubmitData(transformedData)
            console.log('onSubmit', transformedData)
          }

          return (
            <Form.Handler onSubmit={onSubmit}>
              <Flex.Stack>
                <Field.String
                  label="Foo label"
                  path="/myString"
                  defaultValue="foo"
                />

                <Field.Selection
                  label="Bar label"
                  path="/mySelection"
                  defaultValue="bar"
                  variant="dropdown"
                >
                  <Field.Option value="foo" title="Foo Value" />
                  <Field.Option value="bar" title="Bar Value" />
                </Field.Selection>

                <Field.ArraySelection
                  label="Bar label"
                  path="/myArraySelection"
                  defaultValue={['bar']}
                  variant="checkbox"
                >
                  <Field.Option value="foo" title="Foo Value" />
                  <Field.Option value="bar" title="Bar Value" />
                </Field.ArraySelection>

                <Form.SubmitButton />

                <Tools.Log
                  label="Submit Data (press submit to update)"
                  data={submitData}
                />
                <Tools.Log label="Data Context" />
              </Flex.Stack>
            </Form.Handler>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}
