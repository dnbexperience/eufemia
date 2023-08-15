import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'
import { FormError } from '@dnb/eufemia/src/extensions/forms/types'

export const CheckboxEmpty = () => (
  <ComponentBox scope={{ Field }}>
    <Field.ArraySelection
      onChange={(value) => console.log('onChange', value)}
      variant="checkbox"
    >
      <Field.Option value="foo" title="Fooo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const CheckboxLabel = () => (
  <ComponentBox scope={{ Field }}>
    <Field.ArraySelection
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Fooo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const CheckboxOptionSelected = () => (
  <ComponentBox scope={{ Field }}>
    <Field.ArraySelection
      value={['bar']}
      onChange={(values) => console.log('onChange', values)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const CheckboxDisabled = () => (
  <ComponentBox scope={{ Field }}>
    <Field.ArraySelection
      value={['bar']}
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      disabled
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const CheckboxInfo = () => (
  <ComponentBox scope={{ Field, FormError }}>
    <Field.ArraySelection
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      info={new FormError('FYI')}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const CheckboxWarning = () => (
  <ComponentBox scope={{ Field, FormError }}>
    <Field.ArraySelection
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      warning={new FormError("I'm warning you...")}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const CheckboxError = () => (
  <ComponentBox scope={{ Field, FormError }}>
    <Field.ArraySelection
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      error={new FormError('This is what is wrong...')}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.ArraySelection>
  </ComponentBox>
)
