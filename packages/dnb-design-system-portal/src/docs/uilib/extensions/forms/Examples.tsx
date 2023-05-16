import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  DataContext,
  Layout,
  StepsLayout,
  DataInput,
  DataValue,
  Visibility,
} from '@dnb/eufemia/src/extensions/forms'

export const BaseFieldComponents = () => {
  return (
    <ComponentBox
      scope={{
        DataContext,
        Layout,
        StepsLayout,
        DataInput,
        DataValue,
        Visibility,
      }}
    >
      <DataInput.String
        label="Text field"
        value="Lorem Ipsum"
        onChange={(value) => console.log('onChange', value)}
      />
      <DataInput.Number
        label="Number Field"
        value={789}
        onChange={(value) => console.log('onChange', value)}
      />
      <DataInput.Boolean
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
        DataInput,
        DataValue,
        Visibility,
      }}
    >
      <DataInput.FirstName value="John" />
      <DataInput.LastName value="Smith" />
      <DataInput.NationalIdentityNumber value="20058512345" />
      <DataInput.Email value="john@smith.email" />
      <DataInput.PhoneNumber value="+4798765432" />
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
        DataInput,
        DataValue,
        Visibility,
      }}
    >
      <Layout.Section>
        <Layout.MainHeading>Profile</Layout.MainHeading>

        <Layout.Card stack>
          <Layout.SubHeading>Name</Layout.SubHeading>

          <DataInput.FirstName value="John" />
          <DataInput.LastName value="Smith" />
        </Layout.Card>

        <Layout.Card stack>
          <Layout.SubHeading>More information</Layout.SubHeading>

          <DataInput.NationalIdentityNumber value="20058512345" />
          <DataInput.Email value="john@smith.email" />
          <DataInput.PhoneNumber value="+4798765432" />
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
        DataInput,
        DataValue,
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
          phone: '+4798765432',
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

            <DataInput.FirstName value="John" />
            <DataInput.LastName value="Smith" />
          </Layout.Card>
        </Layout.Section>
        <DataInput.Boolean
          path="/advanced"
          variant="toggle-checkbox"
          label="More fields"
        />
        <Visibility pathTrue="/advanced">
          <Layout.Section>
            <Layout.Card stack>
              <Layout.SubHeading>More information</Layout.SubHeading>

              <DataInput.NationalIdentityNumber value="20058512345" />
              <DataInput.Email value="john@smith.email" />
              <DataInput.PhoneNumber value="+4798765432" />
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
        DataInput,
        DataValue,
        Visibility,
      }}
    >
      <DataContext.Provider
        data={{
          firstName: 'John',
          lastName: 'Smith',
          ssn: '20058512345',
          email: 'john@smith.email',
          phone: '+4798765432',
        }}
        onChange={(data) => console.log('onChange', data)}
        onPathChange={(path, value) =>
          console.log('onPathChange', path, value)
        }
        onSubmit={(data) => console.log('onSubmit', data)}
      >
        <Layout.MainHeading>Profile</Layout.MainHeading>

        <Layout.Card stack>
          <DataInput.FirstName path="/firstName" />
          <DataInput.LastName path="/lastName" />
          <DataInput.NationalIdentityNumber path="/ssn" />
          <DataInput.Email path="/email" />
          <DataInput.PhoneNumber path="/phone" />

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
        DataInput,
        DataValue,
        Visibility,
      }}
    >
      <DataContext.Provider
        data={{
          firstName: undefined,
          lastName: 'Smith',
          ssn: '123',
          email: '@smith.email',
          phone: '+4798765432',
        }}
        onChange={(data) => console.log('onChange', data)}
        onPathChange={(path, value) =>
          console.log('onPathChange', path, value)
        }
        onSubmit={(data) => console.log('onSubmit', data)}
      >
        <Layout.MainHeading>Profile</Layout.MainHeading>

        <Layout.Card stack>
          <DataInput.FirstName path="/firstName" required />
          <DataInput.LastName path="/lastName" required />
          <DataInput.NationalIdentityNumber
            path="/ssn"
            validateInitially
          />
          <DataInput.Email path="/email" validateInitially />
          <DataInput.PhoneNumber path="/phone" validateInitially />
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
        DataInput,
        DataValue,
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
          phone: '+4798765432',
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

              <DataInput.FirstName path="/firstName" required />
              <DataInput.LastName path="/lastName" required />
            </Layout.Card>

            <Layout.ButtonRow>
              <StepsLayout.NextButton />
            </Layout.ButtonRow>
          </StepsLayout.Step>

          <StepsLayout.Step title="More information">
            <Layout.MainHeading>Profile</Layout.MainHeading>

            <Layout.Card stack>
              <Layout.SubHeading>More information</Layout.SubHeading>

              <DataInput.NationalIdentityNumber path="/ssn" />
              <DataInput.Email path="/email" />
              <DataInput.PhoneNumber path="/phone" />
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
                <DataValue.FirstName path="/firstName" />
                <DataValue.LastName path="/lastName" />
              </Layout.FlexContainer>

              <DataValue.NationalIdentityNumber path="/ssn" />
              <DataValue.Email path="/email" />
              <DataValue.PhoneNumber path="/phone" />
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
