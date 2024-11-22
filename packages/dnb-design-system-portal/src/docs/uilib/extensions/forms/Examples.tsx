import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Input, Slider, Flex, NumberFormat } from '@dnb/eufemia/src'
import {
  Form,
  Field,
  Value,
  FieldBlock,
  useFieldProps,
  DataContext,
  ValueBlock,
  Wizard,
  Iterate,
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
            onChangeValidator: (value) => {
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
              defaultData={existingData}
              onChange={console.log}
              onSubmit={console.log}
            >
              <Flex.Stack>
                <Form.MainHeading>Bedrift</Form.MainHeading>
                <Form.Card>
                  <Field.Name.Company path="/companyName" required />
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
                </Form.Card>
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
          const {
            id,
            value,
            hasError,
            handleChange,
            handleFocus,
            handleBlur,
          } = useFieldProps({
            path: '/birthYear',
          })

          const handleBirthYearChange = React.useCallback(
            (sliderData) => {
              handleChange(sliderData.value)
            },
            [handleChange],
          )

          return (
            <FieldBlock id={id} label={props.label ?? 'Name and age'}>
              <Flex.Horizontal>
                <Field.Name.First
                  path="/firstName"
                  width="medium"
                  minLength={2}
                />
                <Field.Name.Last
                  path="/lastName"
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
                    value={parseFloat(String(value))}
                    on_change={handleBirthYearChange}
                    on_drag_start={handleFocus}
                    on_drag_end={handleBlur}
                    status={hasError}
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
            defaultData={data}
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
      <Form.Card>
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
      </Form.Card>
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
      <Form.Card>
        <Field.String label="Fornavn" value="John" />
        <Field.String label="Etternavn" value="Smith" />
        <Field.NationalIdentityNumber value="20058512345" />
        <Field.Email value="john@smith.email" />
        <Field.PhoneNumber value="+47 98765432" />
      </Form.Card>
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

        <Form.Card>
          <Form.SubHeading>Name</Form.SubHeading>

          <Field.String label="Fornavn" value="John" />
          <Field.String label="Etternavn" value="Smith" />
        </Form.Card>

        <Form.Card>
          <Form.SubHeading>More information</Form.SubHeading>

          <Field.NationalIdentityNumber value="20058512345" />
          <Field.Email value="john@smith.email" />
          <Field.PhoneNumber value="+47 98765432" />
        </Form.Card>
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
        defaultData={{
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

          <Form.Card>
            <Form.SubHeading>Name</Form.SubHeading>

            <Field.String path="/firstName" label="Fornavn" />
            <Field.String path="/lastName" label="Etternavn" />
          </Form.Card>

          <Field.Boolean
            path="/advanced"
            variant="checkbox-button"
            label="More fields"
          />
          <Form.Visibility pathTrue="/advanced">
            <Flex.Stack>
              <Form.Card>
                <Form.SubHeading>More information</Form.SubHeading>

                <Field.NationalIdentityNumber value="20058512345" />
                <Field.Email value="john@smith.email" />
                <Field.PhoneNumber value="+47 98765432" />
              </Form.Card>
            </Flex.Stack>
          </Form.Visibility>
        </Flex.Stack>
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
        defaultData={{
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

        <Form.Card>
          <Field.String path="/firstName" label="Fornavn" />
          <Field.String path="/lastName" label="Etternavn" />
          <Field.NationalIdentityNumber path="/ssn" />
          <Field.Email path="/email" />
          <Field.PhoneNumber path="/phone" />

          <Form.ButtonRow>
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Form.Card>
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
        defaultData={{
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

        <Form.Card>
          <Field.String path="/firstName" label="Fornavn" required />
          <Field.String path="/lastName" label="Etternavn" required />
          <Field.NationalIdentityNumber path="/ssn" validateInitially />
          <Field.Email path="/email" validateInitially />
          <Field.PhoneNumber path="/phone" validateInitially />
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const UsingWizard = () => {
  return (
    <ComponentBox>
      {() => {
        const MyForm = () => {
          // Routers like "react-router" are supported as well
          Wizard.useQueryLocator('my-wizard')
          const { summaryTitle } = Form.useLocale().Step

          return (
            <Form.Handler
              defaultData={{
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

                  <Form.Card>
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
                  </Form.Card>

                  <Wizard.Buttons />
                </Wizard.Step>

                <Wizard.Step title="More information">
                  <Form.MainHeading>Profile</Form.MainHeading>

                  <Form.Card>
                    <Form.SubHeading>More information</Form.SubHeading>

                    <Field.NationalIdentityNumber path="/ssn" />
                    <Field.Email path="/email" />
                    <Field.PhoneNumber path="/phone" />
                  </Form.Card>

                  <Wizard.Buttons />
                </Wizard.Step>

                <Wizard.Step title={summaryTitle}>
                  <Form.MainHeading>Profile</Form.MainHeading>

                  <Form.Card>
                    <Value.SummaryList layout="grid">
                      <Value.String path="/firstName" label="Fornavn" />
                      <Value.String path="/lastName" label="Etternavn" />

                      <Value.NationalIdentityNumber path="/ssn" />
                      <Value.Email path="/email" />
                      <Value.PhoneNumber path="/phone" />
                    </Value.SummaryList>
                  </Form.Card>

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

export const UsingFormSection = () => {
  return (
    <ComponentBox>
      {() => {
        const MyEditContainer = () => {
          return (
            <Form.Section.EditContainer variant="basic">
              <Field.Name.First path="/firstName" />
              <Field.Name.Last path="/lastName" />
            </Form.Section.EditContainer>
          )
        }

        const MyViewContainer = () => {
          return (
            <Form.Section.ViewContainer variant="basic">
              <Value.SummaryList>
                <Value.Name.First path="/firstName" />
                <Value.Name.Last path="/lastName" />
              </Value.SummaryList>
            </Form.Section.ViewContainer>
          )
        }

        return (
          <Form.Handler
            onSubmit={async (data) => console.log('onSubmit', data)}
            defaultData={{
              nestedPath: {
                firstName: 'Nora',
                lastName: undefined, // initiate error
              },
            }}
          >
            <Form.Card>
              <Form.SubHeading>Your account</Form.SubHeading>
              <Form.Section path="/nestedPath" required>
                <MyEditContainer />
                <MyViewContainer />
              </Form.Section>
            </Form.Card>
            <Form.SubmitButton />
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}

export const UsingIterate = () => {
  return (
    <ComponentBox>
      {() => {
        const MyEditItemForm = () => {
          return (
            <Field.Composition>
              <Field.Name.First itemPath="/firstName" width="medium" />
              <Field.Name.Last
                itemPath="/lastName"
                width="medium"
                required
              />
            </Field.Composition>
          )
        }

        const MyEditItem = () => {
          return (
            <Iterate.EditContainer
              title="Edit account holder {itemNo}"
              titleWhenNew="New account holder {itemNo}"
            >
              <MyEditItemForm />
            </Iterate.EditContainer>
          )
        }

        const MyViewItem = () => {
          const item = Iterate.useItem()
          console.log('index:', item.index)

          return (
            <Iterate.ViewContainer title="Account holder {itemNo}">
              <Value.SummaryList>
                <Value.Name.First itemPath="/firstName" showEmpty />
                <Value.Name.Last itemPath="/lastName" placeholder="-" />
              </Value.SummaryList>
            </Iterate.ViewContainer>
          )
        }

        const CreateNewEntry = () => {
          return (
            <Iterate.PushContainer
              path="/accounts"
              title="New account holder"
              openButton={
                <Iterate.PushContainer.OpenButton text="Add another account" />
              }
              showOpenButtonWhen={(list) => list.length > 0}
            >
              <MyEditItemForm />
            </Iterate.PushContainer>
          )
        }

        const MyForm = () => {
          return (
            <Form.Handler
              data={{
                accounts: [
                  {
                    firstName: 'Tony',
                    lastName: undefined, // initiate error
                  },
                ],
              }}
              onChange={(data) =>
                console.log('DataContext/onChange', data)
              }
              onSubmit={async (data) => console.log('onSubmit', data)}
            >
              <Flex.Vertical>
                <Form.MainHeading>Accounts</Form.MainHeading>

                <Form.Card>
                  <Iterate.Array path="/accounts">
                    <MyViewItem />
                    <MyEditItem />
                  </Iterate.Array>

                  <CreateNewEntry />
                </Form.Card>

                <Form.SubmitButton variant="send" />
              </Flex.Vertical>
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
              <Form.Card>
                <Field.String
                  width="medium"
                  label="Input value"
                  placeholder="Type letters"
                  path="/myField"
                  transformIn={transformToUpper}
                  transformOut={transformToLower}
                />

                <Value.String label="Output value" path="/myField" />
              </Form.Card>
            </Form.Handler>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}

export const QuickStart = () => {
  return (
    <ComponentBox>
      {() => {
        const MyForm = () => {
          const existingData = { companyName: 'DNB' }
          return (
            <Form.Handler
              defaultData={existingData}
              onChange={console.log}
              onSubmit={console.log}
            >
              <Form.Card>
                <Field.Name.Company path="/companyName" required />
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
                <Form.Visibility
                  visibleWhen={{
                    path: '/postalAddressSelect',
                    hasValue: 'other',
                  }}
                  animate
                >
                  <Field.String
                    path="/postalAddress"
                    label="Sted for tilsendt post"
                    required
                  />
                </Form.Visibility>
              </Form.Card>
            </Form.Handler>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}
