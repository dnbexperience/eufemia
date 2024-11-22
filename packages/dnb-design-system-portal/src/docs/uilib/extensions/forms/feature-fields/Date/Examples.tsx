import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'

export const LabelAndValue = () => {
  return (
    <ComponentBox data-visual-test="date-label">
      <Field.Date
        label="Label text"
        value="2023-01-16"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const HorizontalLayout = () => {
  return (
    <ComponentBox data-visual-test="date-horizontal-layout">
      <Field.Date
        label="Label with a long text that will wrap"
        layout="horizontal"
        layoutOptions={{
          width: 'medium', // can be a rem value
        }}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Field.Date
        label="Label text"
        value="2023-01-16"
        help={{
          title: 'Help is available',
          content:
            'Kindness and helping others will return to you when you least expect it, and maybe when you need it.',
        }}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox>
      <Field.Date
        label="Label text"
        value="2023-01-16"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const WithError = () => {
  return (
    <ComponentBox data-visual-test="date-error">
      <Field.Date
        value="2023-01-16"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new Error('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ValidationRequired = () => {
  return (
    <ComponentBox>
      <Field.Date
        label="Label text"
        value="2023-01-16"
        onChange={(value) => console.log('onChange', value)}
        required
      />
    </ComponentBox>
  )
}

export const Range = () => {
  return (
    <ComponentBox>
      <Field.Date label="Label text" value="2023-01-16|2023-04-01" range />
    </ComponentBox>
  )
}

export const AutoClose = () => {
  return (
    <ComponentBox>
      <Field.Date label="Automatically Close" showCancelButton={false} />
    </ComponentBox>
  )
}
