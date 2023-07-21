import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'
import { FormError } from '@dnb/eufemia/src/extensions/forms/types'

export const Empty = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Select onChange={(value) => console.log('onChange', value)}>
        <Field.Option value="foo" title="Foo!" />
        <Field.Option value="bar" title="Baar!" />
      </Field.Select>
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Select
        placeholder="Select something...."
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option value="foo" title="Foo!" />
        <Field.Option value="bar" title="Baar!" />
      </Field.Select>
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Select
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const OptionSelected = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Select
        value="bar"
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option value="foo" title="Foo!" />
        <Field.Option value="bar" title="Baar!" />
      </Field.Select>
    </ComponentBox>
  )
}

export const LabelAndOptionSelected = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Select
        value="bar"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option value="foo" title="Foo!" />
        <Field.Option value="bar" title="Baar!" />
      </Field.Select>
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Select
        value="bar"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        disabled
      >
        <Field.Option value="foo" title="Foo!" />
        <Field.Option value="bar" title="Baar!" />
      </Field.Select>
    </ComponentBox>
  )
}

export const Error = () => {
  return (
    <ComponentBox scope={{ Field, FormError }}>
      <Field.Select
        value="bar"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new FormError('This is what is wrong...')}
      >
        <Field.Option value="foo" title="Foo!" />
        <Field.Option value="bar" title="Baar!" />
      </Field.Select>
    </ComponentBox>
  )
}

export const HighNumberOfOptions = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Select
        value="option-15"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option value="option-1" title="One" />
        <Field.Option value="option-2" title="Two" />
        <Field.Option value="option-3" title="Three" />
        <Field.Option value="option-4" title="Four" />
        <Field.Option value="option-5" title="Five" />
        <Field.Option value="option-6" title="Six" />
        <Field.Option value="option-7" title="Seven" />
        <Field.Option value="option-8" title="Eight" />
        <Field.Option value="option-9" title="Nine" />
        <Field.Option value="option-10" title="Ten" />
        <Field.Option value="option-11" title="Eleven" />
        <Field.Option value="option-12" title="Twelve" />
        <Field.Option value="option-13" title="Thirteen" />
        <Field.Option value="option-14" title="Fourteen" />
        <Field.Option value="option-15" title="Fifteen" />
        <Field.Option value="option-16" title="Sixteen" />
        <Field.Option value="option-17" title="Seventeen" />
        <Field.Option value="option-18" title="Eighteen" />
        <Field.Option value="option-19" title="Nineteen" />
        <Field.Option value="option-20" title="Twenty" />
        <Field.Option value="option-21" title="Twentyone" />
        <Field.Option value="option-22" title="Twentytwo" />
        <Field.Option value="option-23" title="Twentythree" />
        <Field.Option value="option-24" title="Twentyfour" />
        <Field.Option value="option-25" title="Twentyfive" />
      </Field.Select>
    </ComponentBox>
  )
}

export const ValidationRequired = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Select
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        required
        validateInitially
        validateUnchanged
      >
        <Field.Option value="foo" title="Foo!" />
        <Field.Option value="bar" title="Baar!" />
      </Field.Select>
    </ComponentBox>
  )
}
