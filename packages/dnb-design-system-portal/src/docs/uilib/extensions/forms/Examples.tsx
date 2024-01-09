import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Input, Slider, Card, Flex } from '@dnb/eufemia/src'
import {
  Form,
  StepsLayout,
  Field,
  Value,
  Visibility,
  FieldBlock,
  useDataValue,
  DataContext,
} from '@dnb/eufemia/src/extensions/forms'

export const CreateBasicFieldComponent = () => {
  return (
    <ComponentBox
      scope={{
        useDataValue,
      }}
      hideCode
    >
      {() => {
        const MyCustomField = (props) => {
          const fromInput = React.useCallback(({ value }) => value, [])

          const preparedProps = {
            ...props,
            fromInput,
            validator: (value) => {
              return value === 'secret'
                ? new Error('Do not reveal the secret!')
                : undefined
            },
          }

          const {
            id,
            info,
            warning,
            error,
            value,
            handleChange,
            handleFocus,
            handleBlur,
          } = useDataValue(preparedProps)

          return (
            <FieldBlock
              forId={id}
              label="What is the secret of the custom field?"
              info={info}
              warning={warning}
              error={error}
            >
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
          <MyCustomField
            value="Nothing to see here"
            onChange={(value) => console.log('onChange', value)}
          />
        )
      }}
    </ComponentBox>
  )
}

export const CreateComposedFieldComponent = () => {
  return (
    <ComponentBox
      scope={{
        DataContext,
        useDataValue,
      }}
      hideCode
    >
      {() => {
        const MyComposedField = (props) => {
          const birthYear = useDataValue({
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
        StepsLayout,
        Value,
        Visibility,
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
        StepsLayout,
        Value,
        Visibility,
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
        StepsLayout,
        Value,
        Visibility,
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
        StepsLayout,
        Value,
        Visibility,
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
        <Visibility pathTrue="/advanced">
          <Flex.Stack>
            <Card stack>
              <Form.SubHeading>More information</Form.SubHeading>

              <Field.NationalIdentityNumber value="20058512345" />
              <Field.Email value="john@smith.email" />
              <Field.PhoneNumber value="+47 98765432" />
            </Card>
          </Flex.Stack>
        </Visibility>
      </Form.Handler>
    </ComponentBox>
  )
}

export const UsingFormHandler = () => {
  return (
    <ComponentBox
      scope={{
        StepsLayout,
        Value,
        Visibility,
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
        StepsLayout,
        Value,
        Visibility,
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

export const WithSteps = () => {
  return (
    <ComponentBox
      scope={{
        StepsLayout,
        Value,
        Visibility,
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
        <StepsLayout mode="loose">
          <StepsLayout.Step title="Name">
            <Form.MainHeading>Profile</Form.MainHeading>

            <Card stack>
              <Form.SubHeading>Name</Form.SubHeading>

              <Field.String path="/firstName" label="Fornavn" required />
              <Field.String path="/lastName" label="Etternavn" required />
            </Card>

            <Form.ButtonRow>
              <StepsLayout.NextButton />
            </Form.ButtonRow>
          </StepsLayout.Step>

          <StepsLayout.Step title="More information">
            <Form.MainHeading>Profile</Form.MainHeading>

            <Card stack>
              <Form.SubHeading>More information</Form.SubHeading>

              <Field.NationalIdentityNumber path="/ssn" />
              <Field.Email path="/email" />
              <Field.PhoneNumber path="/phone" />
            </Card>

            <Form.ButtonRow>
              <StepsLayout.PreviousButton />
              <StepsLayout.NextButton />
            </Form.ButtonRow>
          </StepsLayout.Step>

          <StepsLayout.Step title="Summary">
            <Form.MainHeading>Profile</Form.MainHeading>

            <Card stack>
              <Flex.Container>
                <Value.String path="/firstName" label="Fornavn" />
                <Value.String path="/lastName" label="Etternavn" />
              </Flex.Container>

              <Value.NationalIdentityNumber path="/ssn" />
              <Value.Email path="/email" />
              <Value.PhoneNumber path="/phone" />
            </Card>

            <Form.ButtonRow>
              <StepsLayout.PreviousButton />
              <Form.SubmitButton />
            </Form.ButtonRow>
          </StepsLayout.Step>
        </StepsLayout>
      </Form.Handler>
    </ComponentBox>
  )
}
