import React from 'react'
import { Field, Form, FormError, Tools } from '../../..'
import { Button, Flex, ToggleButton } from '../../../../../components'
import { Provider } from '../..'

export default {
  title: 'Eufemia/Extensions/Forms/String',
}
export const StringAndLabelStretch = () => {
  return (
    <Form.Card>
      <Form.SubHeading>Subheading</Form.SubHeading>
      <Field.String
        help={{ title: 'Help title', content: 'Help content' }}
        path="/moreInfo"
        label="Her kan du gi oss andre opplysninger som du tror kan være relevante for søknaden. Ønsker du for eksempel fastrente eller rammelån, kan du skrive det her."
        multiline
        autoResize
        maxLength={250}
        characterCounter={{
          max: 250,
          variant: 'down',
        }}
      />
      <Field.Number
        label="Her kan du gi oss andre opplysninger som du tror kan være relevante for søknaden. Ønsker du for eksempel fastrente eller rammelån, kan du skrive det her."
        placeholder="Enter a number..."
        size="large"
        width="stretch"
      />
    </Form.Card>
  )
}

export const StringExample = () => {
  return (
    <Flex.Stack>
      <Field.String label="Label" />
      <Field.String label="Label" multiline />

      <Field.String label="Label" width="small" />
      <Field.String label="Label" multiline width="small" />

      <Field.String label="Label" width="medium" />
      <Field.String label="Label" multiline width="medium" />

      <Field.String label="Label" width="large" />
      <Field.String label="Label" multiline width="large" />

      <Field.String
        label="Label"
        error={[
          new Error('Error message A'),
          new Error('Error message B'),
        ]}
        warning={['Warning message A', 'Warning message B']}
        info={['Info message A', 'Info message B']}
      />
    </Flex.Stack>
  )
}

export const Transform = () => {
  const transformIn = (external: unknown) => {
    return String(external)?.toUpperCase()
  }
  const transformOut = (internal: string) => {
    return internal?.toLowerCase()
  }
  return (
    <Form.Handler onChange={console.log}>
      <Field.String
        label="Ønsket lånebeløp"
        path="/myField"
        transformIn={transformIn}
        // @ts-expect-error -- strictFunctionTypes
        transformOut={transformOut}
      />
    </Form.Handler>
  )
}

export const TransformInOnFormHandler = () => {
  const transformIn = ({ value }) => {
    if (value === undefined) {
      return ''
    }
    return value
  }
  return (
    <Form.Handler
      transformIn={transformIn}
      defaultData={{
        myPath: '',
      }}
    >
      <Field.String label="Ønsket lånebeløp" path="/myPath" />
      <Tools.Log />
    </Form.Handler>
  )
}

export function TransformObject() {
  const defaultData = {
    myLabel: { value: 'Some value', test: 'test' },
  }

  return (
    <Form.Handler
      defaultData={defaultData}
      onSubmit={(data) => console.log('onSubmit', data)}
      onChange={(data) => console.log('onChange', data)}
    >
      <Field.Name.First
        path="/myLabel"
        transformOut={(value) => {
          return { value, test: 'test' }
        }}
        // @ts-expect-error -- strictFunctionTypes
        transformIn={(data: typeof defaultData.myLabel) => {
          return data?.value
        }}
      />

      <Form.SubmitButton top />
    </Form.Handler>
  )
}

export function ErrorMessages() {
  return (
    <Form.Handler locale="en-GB">
      <Flex.Stack>
        <Field.PhoneNumber
          value="abc"
          validateInitially
          onChangeValidator={() => {
            return new FormError('OrganizationNumber.errorRequired')
          }}
          errorMessages={{
            'OrganizationNumber.errorRequired':
              'Display me, instead of the default message',
          }}
        />
        <Field.String
          validateInitially
          required
          value="abc"
          minLength={4}
        />
      </Flex.Stack>
    </Form.Handler>
  )
}

export function OnStatusChange() {
  return (
    <Field.String
      label="Label"
      onStatusChange={({ info, warning, error }) => {
        console.log('Status changed:', { info, warning, error })
      }}
      // error={new Error('Some error')}
      // warning="Some warning"
      // info="Some info"
      // validateInitially
      required
    />
  )
}

export const UpdateLocaleInProviderForAllFields = () => {
  const [locale, setLocale] = React.useState('nb-NO')
  return (
    <Form.Handler>
      <ToggleButton.Group
        value={locale}
        onChange={({ value }) => {
          setLocale(value as string)
        }}
      >
        <ToggleButton value="nb-NO" className="nb-NO">
          Norsk
        </ToggleButton>
        <ToggleButton value="en-GB" className="en-GB">
          GB
        </ToggleButton>
      </ToggleButton.Group>
      <Provider locale={locale}>
        <Field.String required />
        <Field.Number required />
        <Field.Currency required />
        <Field.BankAccountNumber required />
        <Field.Date required />
        <Field.Email required />
        <Field.Upload required />
        <Field.Expiry required />
        <Field.NationalIdentityNumber required />
        <Field.OrganizationNumber required />
        <Field.PhoneNumber required />
        <Field.PostalCodeAndCity
          postalCode={{ required: true }}
          city={{ required: true }}
        />
        <Field.SelectCountry required />
        <Button type="submit">Submit</Button>
      </Provider>
    </Form.Handler>
  )
}
