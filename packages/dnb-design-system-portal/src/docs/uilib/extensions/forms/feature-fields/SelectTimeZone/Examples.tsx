import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import {
  Field,
  Form,
  Tools,
  Value,
} from '@dnb/eufemia/src/extensions/forms'

export const OptionSelected = () => {
  return (
    <ComponentBox data-visual-test="select-timezone-vertical-layout">
      <Field.SelectTimeZone
        value="Europe/Oslo"
        onChange={(value, obj) => console.log('onChange', value, obj)}
      />
    </ComponentBox>
  )
}

export const HorizontalLayout = () => {
  return (
    <ComponentBox data-visual-test="select-timezone-horizontal-layout">
      <Field.SelectTimeZone
        value="Europe/Oslo"
        layout="horizontal"
        layoutOptions={{ width: '6rem' }}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Field.SelectTimeZone
        value="Europe/Oslo"
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
      <Field.SelectTimeZone
        value="Europe/Oslo"
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
      <Field.SelectTimeZone
        value="Europe/Oslo"
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
      <Field.SelectTimeZone
        label="Label text"
        onChange={(value, obj) => console.log('onChange', value, obj)}
        required
        validateInitially
        validateUnchanged
      />
    </ComponentBox>
  )
}

export function FilterTimeZones() {
  return (
    <ComponentBox>
      <Field.SelectTimeZone
        filterTimeZones={({ timezone }) => timezone.startsWith('Europe/')}
      />
    </ComponentBox>
  )
}

export function TransformInAndOut() {
  return (
    <ComponentBox>
      {() => {
        // From the Field (internal value) to the data context or event parameter
        const transformOut = (value, timezone) => {
          if (value) {
            return timezone
          }
        }

        // To the Field (from e.g. defaultValue)
        const transformIn = (timezone) => {
          return timezone?.timezone
        }

        const MyForm = () => {
          return (
            <Form.Handler onSubmit={console.log}>
              <Form.Card>
                <Field.SelectTimeZone
                  path="/timezone"
                  transformIn={transformIn}
                  transformOut={transformOut}
                  defaultValue="Europe/Oslo"
                />

                <Value.SelectTimeZone
                  path="/timezone"
                  transformIn={transformIn}
                  placeholder="(Select a time zone)"
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

export const Opened = () => (
  <ComponentBox data-visual-test="select-timezone-opened">
    <Field.SelectTimeZone value="Europe/Oslo" htmlAttributes={{ opened: true }} />
  </ComponentBox>
)

