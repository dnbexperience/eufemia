import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { DataInput } from '@dnb/eufemia/src/extensions/forms'
import { FormError } from '@dnb/eufemia/src/extensions/forms/types'

export const Empty = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Select
        onChange={(value) => console.log('onChange', value)}
      >
        <DataInput.Option value="foo" title="Foo!" />
        <DataInput.Option value="bar" title="Baar!" />
      </DataInput.Select>
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Select
        placeholder="Select something...."
        onChange={(value) => console.log('onChange', value)}
      >
        <DataInput.Option value="foo" title="Foo!" />
        <DataInput.Option value="bar" title="Baar!" />
      </DataInput.Select>
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Select
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const OptionSelected = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Select
        value="bar"
        onChange={(value) => console.log('onChange', value)}
      >
        <DataInput.Option value="foo" title="Foo!" />
        <DataInput.Option value="bar" title="Baar!" />
      </DataInput.Select>
    </ComponentBox>
  )
}

export const LabelAndOptionSelected = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Select
        value="bar"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      >
        <DataInput.Option value="foo" title="Foo!" />
        <DataInput.Option value="bar" title="Baar!" />
      </DataInput.Select>
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Select
        value="bar"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        disabled
      >
        <DataInput.Option value="foo" title="Foo!" />
        <DataInput.Option value="bar" title="Baar!" />
      </DataInput.Select>
    </ComponentBox>
  )
}

export const Error = () => {
  return (
    <ComponentBox scope={{ DataInput, FormError }}>
      <DataInput.Select
        value="bar"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new FormError('This is what is wrong...')}
      >
        <DataInput.Option value="foo" title="Foo!" />
        <DataInput.Option value="bar" title="Baar!" />
      </DataInput.Select>
    </ComponentBox>
  )
}

export const HighNumberOfOptions = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Select
        value="option-15"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      >
        <DataInput.Option value="option-1" title="One" />
        <DataInput.Option value="option-2" title="Two" />
        <DataInput.Option value="option-3" title="Three" />
        <DataInput.Option value="option-4" title="Four" />
        <DataInput.Option value="option-5" title="Five" />
        <DataInput.Option value="option-6" title="Six" />
        <DataInput.Option value="option-7" title="Seven" />
        <DataInput.Option value="option-8" title="Eight" />
        <DataInput.Option value="option-9" title="Nine" />
        <DataInput.Option value="option-10" title="Ten" />
        <DataInput.Option value="option-11" title="Eleven" />
        <DataInput.Option value="option-12" title="Twelve" />
        <DataInput.Option value="option-13" title="Thirteen" />
        <DataInput.Option value="option-14" title="Fourteen" />
        <DataInput.Option value="option-15" title="Fifteen" />
        <DataInput.Option value="option-16" title="Sixteen" />
        <DataInput.Option value="option-17" title="Seventeen" />
        <DataInput.Option value="option-18" title="Eighteen" />
        <DataInput.Option value="option-19" title="Nineteen" />
        <DataInput.Option value="option-20" title="Twenty" />
        <DataInput.Option value="option-21" title="Twentyone" />
        <DataInput.Option value="option-22" title="Twentytwo" />
        <DataInput.Option value="option-23" title="Twentythree" />
        <DataInput.Option value="option-24" title="Twentyfour" />
        <DataInput.Option value="option-25" title="Twentyfive" />
      </DataInput.Select>
    </ComponentBox>
  )
}

export const ValidationRequired = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Select
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        required
        validateInitially
        validateUnchanged
      >
        <DataInput.Option value="foo" title="Foo!" />
        <DataInput.Option value="bar" title="Baar!" />
      </DataInput.Select>
    </ComponentBox>
  )
}
