import { Card } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import {
  Field,
  Form,
  Tools,
  Value,
} from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox>
      <Field.SelectCountry
        onChange={(value, obj) => console.log('onChange', value, obj)}
        onBlur={(value, obj) => console.log('onBlur', value, obj)}
        onFocus={(value, obj) => console.log('onFocus', value, obj)}
      />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Field.SelectCountry
        placeholder="Select something...."
        onChange={(value, obj) => console.log('onChange', value, obj)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Field.SelectCountry
        label="Label text"
        onChange={(value, obj) => console.log('onChange', value, obj)}
      />
    </ComponentBox>
  )
}

export const OptionSelected = () => {
  return (
    <ComponentBox>
      <Field.SelectCountry
        value="NO"
        onChange={(value, obj) => console.log('onChange', value, obj)}
      />
    </ComponentBox>
  )
}

export const LabelAndOptionSelected = () => {
  return (
    <ComponentBox>
      <Field.SelectCountry
        value="NO"
        label="Label text"
        onChange={(value, obj) => console.log('onChange', value, obj)}
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

export function TransformInAndOut() {
  return (
    <ComponentBox scope={{ Tools }}>
      {() => {
        const transformOut = (value, country) => {
          if (value) {
            return country
          }
        }
        const transformIn = (country) => {
          return country?.iso
        }

        const MyForm = () => {
          return (
            <Form.Handler onSubmit={console.log}>
              <Card stack>
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

                <Tools.Log />
              </Card>
              <Form.SubmitButton />
            </Form.Handler>
          )
        }
        return <MyForm />
      }}
    </ComponentBox>
  )
}
