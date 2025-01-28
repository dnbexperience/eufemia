import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import {
  Field,
  Form,
  Tools,
  Value,
} from '@dnb/eufemia/src/extensions/forms'

export const OptionSelected = () => {
  return (
    <ComponentBox data-visual-test="select-country-vertical-layout">
      <Field.SelectCountry
        value="NO"
        onChange={(value, obj) => console.log('onChange', value, obj)}
      />
    </ComponentBox>
  )
}

export const HorizontalLayout = () => {
  return (
    <ComponentBox data-visual-test="select-country-horizontal-layout">
      <Field.SelectCountry
        value="NO"
        layout="horizontal"
        layoutOptions={{ width: '6rem' }}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Field.SelectCountry
        value="NO"
        label="Label text"
        help={{
          title: 'Help is available',
          content:
            'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
        }}
        onChange={(value, obj) => console.log('onChange', value, obj)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox>
      <Field.SelectCountry
        value="NO"
        label="Label text"
        onChange={(value, obj) => console.log('onChange', value, obj)}
        disabled
      />
    </ComponentBox>
  )
}

export const WithError = () => {
  return (
    <ComponentBox>
      <Field.SelectCountry
        value="NO"
        label="Label text"
        onChange={(value, obj) => console.log('onChange', value, obj)}
        error={new Error('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ValidationRequired = () => {
  return (
    <ComponentBox>
      <Field.SelectCountry
        label="Label text"
        onChange={(value, obj) => console.log('onChange', value, obj)}
        required
        validateInitially
        validateUnchanged
      />
    </ComponentBox>
  )
}

export function FilterCountries() {
  return (
    <ComponentBox>
      <Field.SelectCountry
        countries="Scandinavia"
        filterCountries={({ iso }) => iso !== 'DK'}
      />
    </ComponentBox>
  )
}

export function TransformInAndOut() {
  return (
    <ComponentBox>
      {() => {
        // From the Field (internal value) to the data context or event parameter
        const transformOut = (value, country) => {
          if (value) {
            return country
          }
        }

        // To the Field (from e.g. defaultValue)
        const transformIn = (country) => {
          return country?.iso
        }

        const MyForm = () => {
          return (
            <Form.Handler onSubmit={console.log}>
              <Form.Card>
                <Field.SelectCountry
                  path="/country"
                  transformIn={transformIn}
                  transformOut={transformOut}
                  defaultValue="NO"
                />

                <Value.SelectCountry
                  path="/country"
                  transformIn={transformIn}
                  placeholder="(Select a country)"
                  showEmpty
                />

                <Form.SubHeading>Data Context</Form.SubHeading>
                <Tools.Log />
              </Form.Card>
              <Form.SubmitButton />
            </Form.Handler>
          )
        }
        return <MyForm />
      }}
    </ComponentBox>
  )
}
