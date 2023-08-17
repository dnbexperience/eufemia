import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  DataContext,
  Layout,
  StepsLayout,
  Field,
  Value,
  Visibility,
} from '@dnb/eufemia/src/extensions/forms'

export const BaseFieldComponents = () => {
  return (
    <ComponentBox
      scope={{
        DataContext,
        Layout,
        StepsLayout,
        Field,
        Value,
        Visibility,
      }}
    >
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
    </ComponentBox>
  )
}

export const FeatureFields = () => {
  return (
    <ComponentBox
      scope={{
        DataContext,
        Layout,
        StepsLayout,
        Field,
        Value,
        Visibility,
      }}
    >
      <Field.FirstName value="John" />
      <Field.LastName value="Smith" />
      <Field.NationalIdentityNumber value="20058512345" />
      <Field.Email value="john@smith.email" />
      <Field.PhoneNumber value="+47 98765432" />
    </ComponentBox>
  )
}

export const LayoutComponents = () => {
  return (
    <ComponentBox
      scope={{
        DataContext,
        Layout,
        StepsLayout,
        Field,
        Value,
        Visibility,
      }}
    >
      <Layout.Section>
        <Layout.MainHeading>Profile</Layout.MainHeading>

        <Layout.Card stack>
          <Layout.SubHeading>Name</Layout.SubHeading>

          <Field.FirstName value="John" />
          <Field.LastName value="Smith" />
        </Layout.Card>

        <Layout.Card stack>
          <Layout.SubHeading>More information</Layout.SubHeading>

          <Field.NationalIdentityNumber value="20058512345" />
          <Field.Email value="john@smith.email" />
          <Field.PhoneNumber value="+47 98765432" />
        </Layout.Card>
      </Layout.Section>
    </ComponentBox>
  )
}

export const VisibilityBasedOnData = () => {
  return (
    <ComponentBox
      scope={{
        DataContext,
        Layout,
        StepsLayout,
        Field,
        Value,
        Visibility,
      }}
    >
      <DataContext.Provider
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
        <Layout.Section>
          <Layout.MainHeading>Profile</Layout.MainHeading>

          <Layout.Card stack>
            <Layout.SubHeading>Name</Layout.SubHeading>

            <Field.FirstName path="/firstName" />
            <Field.LastName path="/lastName" />
          </Layout.Card>
        </Layout.Section>
        <Field.Boolean
          path="/advanced"
          variant="checkbox-button"
          label="More fields"
        />
        <Visibility pathTrue="/advanced">
          <Layout.Section>
            <Layout.Card stack>
              <Layout.SubHeading>More information</Layout.SubHeading>

              <Field.NationalIdentityNumber value="20058512345" />
              <Field.Email value="john@smith.email" />
              <Field.PhoneNumber value="+47 98765432" />
            </Layout.Card>
          </Layout.Section>
        </Visibility>
      </DataContext.Provider>
    </ComponentBox>
  )
}

export const UsingDataContextProvider = () => {
  return (
    <ComponentBox
      scope={{
        DataContext,
        Layout,
        StepsLayout,
        Field,
        Value,
        Visibility,
      }}
    >
      <DataContext.Provider
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
        <Layout.MainHeading>Profile</Layout.MainHeading>

        <Layout.Card stack>
          <Field.FirstName path="/firstName" />
          <Field.LastName path="/lastName" />
          <Field.NationalIdentityNumber path="/ssn" />
          <Field.Email path="/email" />
          <Field.PhoneNumber path="/phone" />

          <Layout.ButtonRow>
            <DataContext.SubmitButton />
          </Layout.ButtonRow>
        </Layout.Card>
      </DataContext.Provider>
    </ComponentBox>
  )
}

export const Validation = () => {
  return (
    <ComponentBox
      scope={{
        DataContext,
        Layout,
        StepsLayout,
        Field,
        Value,
        Visibility,
      }}
    >
      <DataContext.Provider
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
        <Layout.MainHeading>Profile</Layout.MainHeading>

        <Layout.Card stack>
          <Field.FirstName path="/firstName" required />
          <Field.LastName path="/lastName" required />
          <Field.NationalIdentityNumber path="/ssn" validateInitially />
          <Field.Email path="/email" validateInitially />
          <Field.PhoneNumber path="/phone" validateInitially />
        </Layout.Card>
      </DataContext.Provider>
    </ComponentBox>
  )
}

export const WithSteps = () => {
  return (
    <ComponentBox
      scope={{
        DataContext,
        Layout,
        StepsLayout,
        Field,
        Value,
        Visibility,
      }}
    >
      <DataContext.Provider
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
        <StepsLayout>
          <StepsLayout.Step title="Name">
            <Layout.MainHeading>Profile</Layout.MainHeading>

            <Layout.Card stack>
              <Layout.SubHeading>Name</Layout.SubHeading>

              <Field.FirstName path="/firstName" required />
              <Field.LastName path="/lastName" required />
            </Layout.Card>

            <Layout.ButtonRow>
              <StepsLayout.NextButton />
            </Layout.ButtonRow>
          </StepsLayout.Step>

          <StepsLayout.Step title="More information">
            <Layout.MainHeading>Profile</Layout.MainHeading>

            <Layout.Card stack>
              <Layout.SubHeading>More information</Layout.SubHeading>

              <Field.NationalIdentityNumber path="/ssn" />
              <Field.Email path="/email" />
              <Field.PhoneNumber path="/phone" />
            </Layout.Card>

            <Layout.ButtonRow>
              <StepsLayout.PreviousButton />
              <StepsLayout.NextButton />
            </Layout.ButtonRow>
          </StepsLayout.Step>

          <StepsLayout.Step title="Summary">
            <Layout.MainHeading>Profile</Layout.MainHeading>

            <Layout.Card stack>
              <Layout.FlexContainer direction="row">
                <Value.FirstName path="/firstName" />
                <Value.LastName path="/lastName" />
              </Layout.FlexContainer>

              <Value.NationalIdentityNumber path="/ssn" />
              <Value.Email path="/email" />
              <Value.PhoneNumber path="/phone" />
            </Layout.Card>

            <Layout.ButtonRow>
              <StepsLayout.PreviousButton />
              <DataContext.SubmitButton />
            </Layout.ButtonRow>
          </StepsLayout.Step>
        </StepsLayout>
      </DataContext.Provider>
    </ComponentBox>
  )
}
