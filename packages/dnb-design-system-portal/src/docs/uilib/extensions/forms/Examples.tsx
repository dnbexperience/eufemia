import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Input, Slider, Card, Flex, NumberFormat } from '@dnb/eufemia/src'
import {
  Form,
  Field,
  Value,
  FieldBlock,
  useFieldProps,
  DataContext,
  ValueBlock,
  Wizard,
} from '@dnb/eufemia/src/extensions/forms'

export const CreateBasicValueComponent = () => {
  return (
    <ComponentBox scope={{ ValueBlock }} hideCode>
      {() => {
        const MyValue = ({ value, ...props }) => {
          return (
            <ValueBlock {...props}>
              <NumberFormat currency>{value}</NumberFormat>
            </ValueBlock>
          )
        }

        return <MyValue label="Label" value={1234} />
      }}
    </ComponentBox>
  )
}

export const CreateBasicFieldComponent = () => {
  return (
    <ComponentBox
      scope={{
        useFieldProps,
      }}
      hideCode
    >
      {() => {
        const MyField = (props) => {
          const fromInput = React.useCallback(({ value }) => value, [])

          const preparedProps = {
            label: 'What is the secret of this field?',
            fromInput,
            validator: (value) => {
              if (value === 'secret') {
                return new Error('Do not reveal the secret!')
              }
            },
            ...props,
          }

          const {
            id,
            value,
            label,
            handleChange,
            handleFocus,
            handleBlur,
          } = useFieldProps(preparedProps)

          return (
            <FieldBlock forId={id} label={label}>
              <Input
                id={id}
                value={value}
                on_change={handleChange}
                on_focus={handleFocus}
                on_blur={handleBlur}
              />
            </FieldBlock>
          )
        }

        return (
          <MyField
            onChange={(value) => console.log('onChange', value)}
            required
          />
        )
      }}
    </ComponentBox>
  )
}

export const GettingStarted = () => {
  return (
    <ComponentBox hideCode>
      {() => {
        const existingData = {
          companyName: 'DNB',
          companyOrganizationNumber: '123456789',
          postalAddressSelect: 'companyAddress',
        }

        function Component() {
          const { data } = Form.useData('company-form')
          console.log('State:', data)

          return (
            <Form.Handler
              id="company-form"
              data={existingData}
              onChange={console.log}
              onSubmit={console.log}
            >
              <Flex.Stack>
                <Form.MainHeading>Bedrift</Form.MainHeading>
                <Card spacing="medium">
                  <Field.String
                    path="/companyName"
                    label="Bedriftens navn"
                    required
                  />
                  <Field.OrganizationNumber
                    path="/companyOrganizationNumber"
                    required
                  />
                  <Field.Selection
                    path="/postalAddressSelect"
                    label="Ønsket sted for tilsendt post"
                    variant="radio"
                  >
                    <Field.Option
                      value="companyAddress"
                      title="Samme som forretningsadresse"
                    />
                    <Field.Option value="other" title="Annet" />
                  </Field.Selection>
                </Card>
                <Form.ButtonRow>
                  <Form.SubmitButton />
                </Form.ButtonRow>
              </Flex.Stack>
            </Form.Handler>
          )
        }

        return <Component />
      }}
    </ComponentBox>
  )
}

export const CreateComposedFieldComponent = () => {
  return (
    <ComponentBox
      scope={{
        DataContext,
        useFieldProps,
      }}
      hideCode
    >
      {() => {
        const MyComposedField = (props) => {
          const birthYear = useFieldProps({
            path: '/birthYear',
          })

          const handleBirthYearChange = React.useCallback(
            (sliderData) => {
              birthYear.handleChange(sliderData.value)
            },
            [birthYear],
          )

          return (
            <FieldBlock label={props.label ?? 'Name and age'}>
              <Flex.Horizontal>
                <Field.String
                  path="/firstName"
                  label="First name"
                  width="medium"
                  minLength={2}
                />
                <Field.String
                  path="/lastName"
                  label="Last name"
                  width="medium"
                  required
                />
                <FieldBlock width="large">
                  <Slider
                    min={1900}
                    max={new Date().getFullYear()}
                    step={1}
                    label="Birth year"
                    label_direction="vertical"
                    value={parseFloat(String(birthYear.value))}
                    on_change={handleBirthYearChange}
                    on_drag_start={birthYear.handleFocus}
                    on_drag_end={birthYear.handleBlur}
                    status={birthYear.error?.message}
                    tooltip
                  />
                </FieldBlock>
              </Flex.Horizontal>
            </FieldBlock>
          )
        }

        const data = {
          firstName: 'John',
          birthYear: 2000,
        }

        return (
          <DataContext.Provider
            data={data}
            onChange={(data) => console.log('onChange', data)}
          >
            <MyComposedField label="My custom label" />
          </DataContext.Provider>
        )
      }}
    </ComponentBox>
  )
}

export const BaseFieldComponents = () => {
  return (
    <ComponentBox
      scope={{
        Value,
      }}
    >
      <Card stack>
        <Field.String
          label="Text field"
          value="Lorem Ipsum"
          onChange={(value) => console.log('onChange', value)}
        />
        <Field.Number
          label="Number Field"
          value={789}
          onChange={(value) => console.log('onChange', value)}
        />
        <Field.Boolean
          label="Boolean Field"
          value={true}
          onChange={(value) => console.log('onChange', value)}
        />
      </Card>
    </ComponentBox>
  )
}

export const FeatureFields = () => {
  return (
    <ComponentBox
      scope={{
        Value,
      }}
    >
      <Card stack>
        <Field.String label="Fornavn" value="John" />
        <Field.String label="Etternavn" value="Smith" />
        <Field.NationalIdentityNumber value="20058512345" />
        <Field.Email value="john@smith.email" />
        <Field.PhoneNumber value="+47 98765432" />
      </Card>
    </ComponentBox>
  )
}

export const LayoutComponents = () => {
  return (
    <ComponentBox
      scope={{
        Value,
      }}
    >
      <Flex.Stack>
        <Form.MainHeading>Profile</Form.MainHeading>

        <Card stack>
          <Form.SubHeading>Name</Form.SubHeading>

          <Field.String label="Fornavn" value="John" />
          <Field.String label="Etternavn" value="Smith" />
        </Card>

        <Card stack>
          <Form.SubHeading>More information</Form.SubHeading>

          <Field.NationalIdentityNumber value="20058512345" />
          <Field.Email value="john@smith.email" />
          <Field.PhoneNumber value="+47 98765432" />
        </Card>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const VisibilityBasedOnData = () => {
  return (
    <ComponentBox
      scope={{
        Value,
      }}
    >
      <Form.Handler
        data={{
          firstName: undefined,
          lastName: 'Smith',
          advanced: false,
          ssn: '123',
          email: '@smith.email',
          phone: '+47 98765432',
        }}
        onChange={(data) => console.log('onChange', data)}
        onPathChange={(path, value) =>
          console.log('onPathChange', path, value)
        }
        onSubmit={(data) => console.log('onSubmit', data)}
      >
        <Flex.Stack>
          <Form.MainHeading>Profile</Form.MainHeading>

          <Card stack>
            <Form.SubHeading>Name</Form.SubHeading>

            <Field.String path="/firstName" label="Fornavn" />
            <Field.String path="/lastName" label="Etternavn" />
          </Card>
        </Flex.Stack>
        <Field.Boolean
          path="/advanced"
          variant="checkbox-button"
          label="More fields"
        />
        <Form.Visibility pathTrue="/advanced">
          <Flex.Stack>
            <Card stack>
              <Form.SubHeading>More information</Form.SubHeading>

              <Field.NationalIdentityNumber value="20058512345" />
              <Field.Email value="john@smith.email" />
              <Field.PhoneNumber value="+47 98765432" />
            </Card>
          </Flex.Stack>
        </Form.Visibility>
      </Form.Handler>
    </ComponentBox>
  )
}

export const UsingFormHandler = () => {
  return (
    <ComponentBox
      scope={{
        Value,
      }}
    >
      <Form.Handler
        data={{
          firstName: 'John',
          lastName: 'Smith',
          ssn: '20058512345',
          email: 'john@smith.email',
          phone: '+47 98765432',
        }}
        onChange={(data) => console.log('onChange', data)}
        onPathChange={(path, value) =>
          console.log('onPathChange', path, value)
        }
        onSubmit={(data) => console.log('onSubmit', data)}
      >
        <Form.MainHeading>Profile</Form.MainHeading>

        <Card stack>
          <Field.String path="/firstName" label="Fornavn" />
          <Field.String path="/lastName" label="Etternavn" />
          <Field.NationalIdentityNumber path="/ssn" />
          <Field.Email path="/email" />
          <Field.PhoneNumber path="/phone" />

          <Form.ButtonRow>
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const Validation = () => {
  return (
    <ComponentBox
      scope={{
        Value,
      }}
    >
      <Form.Handler
        data={{
          firstName: undefined,
          lastName: 'Smith',
          ssn: '123',
          email: '@smith.email',
          phone: '+47 98765432',
        }}
        onChange={(data) => console.log('onChange', data)}
        onPathChange={(path, value) =>
          console.log('onPathChange', path, value)
        }
        onSubmit={(data) => console.log('onSubmit', data)}
      >
        <Form.MainHeading>Profile</Form.MainHeading>

        <Card stack>
          <Field.String path="/firstName" label="Fornavn" required />
          <Field.String path="/lastName" label="Etternavn" required />
          <Field.NationalIdentityNumber path="/ssn" validateInitially />
          <Field.Email path="/email" validateInitially />
          <Field.PhoneNumber path="/phone" validateInitially />
        </Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const WithWizard = () => {
  return (
    <ComponentBox>
      {() => {
        const MyForm = () => {
          // Routers like "react-router" are supported as well
          Wizard.useQueryLocator('my-wizard')
          const { summaryTitle } = Form.useLocale().Step

          return (
            <Form.Handler
              data={{
                firstName: undefined,
                lastName: 'Smith',
                advanced: false,
                ssn: '123',
                email: '@smith.email',
                phone: '+47 98765432',
              }}
              onChange={(data) => console.log('onChange', data)}
              onPathChange={(path, value) =>
                console.log('onPathChange', path, value)
              }
              onSubmit={(data) => console.log('onSubmit', data)}
            >
              <Wizard.Container id="my-wizard" mode="loose">
                <Wizard.Step title="Name">
                  <Form.MainHeading>Profile</Form.MainHeading>

                  <Card stack>
                    <Form.SubHeading>Name</Form.SubHeading>

                    <Field.String
                      path="/firstName"
                      label="Fornavn"
                      required
                    />
                    <Field.String
                      path="/lastName"
                      label="Etternavn"
                      required
                    />
                  </Card>

                  <Wizard.Buttons />
                </Wizard.Step>

                <Wizard.Step title="More information">
                  <Form.MainHeading>Profile</Form.MainHeading>

                  <Card stack>
                    <Form.SubHeading>More information</Form.SubHeading>

                    <Field.NationalIdentityNumber path="/ssn" />
                    <Field.Email path="/email" />
                    <Field.PhoneNumber path="/phone" />
                  </Card>

                  <Wizard.Buttons />
                </Wizard.Step>

                <Wizard.Step title={summaryTitle}>
                  <Form.MainHeading>Profile</Form.MainHeading>

                  <Card stack>
                    <Value.SummaryList layout="grid">
                      <Value.String path="/firstName" label="Fornavn" />
                      <Value.String path="/lastName" label="Etternavn" />

                      <Value.NationalIdentityNumber path="/ssn" />
                      <Value.Email path="/email" />
                      <Value.PhoneNumber path="/phone" />
                    </Value.SummaryList>
                  </Card>

                  <Form.ButtonRow>
                    <Wizard.Buttons />
                    <Form.SubmitButton />
                  </Form.ButtonRow>
                </Wizard.Step>
              </Wizard.Container>
            </Form.Handler>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}

export const Transformers = () => {
  return (
    <ComponentBox hideCode>
      {() => {
        const MyForm = () => {
          const transformToUpper = (value) => {
            return value?.toUpperCase()
          }
          const transformToLower = (value) => {
            return value?.toLowerCase()
          }

          return (
            <Form.Handler onChange={console.log}>
              <Card stack>
                <Field.String
                  width="medium"
                  label="Input value"
                  placeholder="Type letters"
                  path="/myField"
                  transformIn={transformToUpper}
                  transformOut={transformToLower}
                />

                <Value.String label="Output value" path="/myField" />
              </Card>
            </Form.Handler>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}
