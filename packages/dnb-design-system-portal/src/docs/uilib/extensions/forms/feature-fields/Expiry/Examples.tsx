import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, Form, Tools } from '@dnb/eufemia/src/extensions/forms'
import type { ExpiryValidator } from '@dnb/eufemia/src/extensions/forms/Field/Expiry'

export const Empty = () => {
  return (
    <ComponentBox data-visual-test="expiry-empty">
      <Field.Expiry
        onChange={(expiry) => console.log('onChange', expiry)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox data-visual-test="expiry-with-value">
      <Field.Expiry
        value="0835"
        label="Label text"
        onChange={(expiry) => console.log('onChange', expiry)}
      />
    </ComponentBox>
  )
}

export const HorizontalLayout = () => {
  return (
    <ComponentBox data-visual-test="expiry-horizontal-layout">
      <Field.Expiry
        value="0835"
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
    <ComponentBox data-visual-test="expiry-with-help">
      <Field.Expiry
        label="Label text"
        help={{
          title: 'Help is available',
          content:
            'Kindness and helping others will return to you when you least expect it, and maybe when you need it.',
        }}
        onChange={(expiry) => console.log('onChange', expiry)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox data-visual-test="expiry-disabled">
      <Field.Expiry
        value="0826"
        label="Label text"
        onChange={(expiry) => console.log('onChange', expiry)}
        disabled
      />
    </ComponentBox>
  )
}

export const WithError = () => {
  return (
    <ComponentBox data-visual-test="expiry-error">
      <Field.Expiry
        value="0326"
        label="Label text"
        onChange={(expiry) => console.log('onChange', expiry)}
        error={new Error('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ValidationRequired = () => {
  return (
    <ComponentBox>
      <Field.Expiry
        value="0826"
        label="Label text"
        onChange={(expiry) => console.log('onChange', expiry)}
        required
      />
    </ComponentBox>
  )
}

export const TransformInAndOut = () => {
  return (
    <ComponentBox>
      {() => {
        const transformOut = (internal, additionalArgs) => {
          const { year, month } = additionalArgs
          return { year, month }
        }

        const transformIn = (external) => {
          if (external) {
            const { year, month } = external
            return { year, month }
          }
        }

        return (
          <Form.Handler
            defaultData={{
              myField: {
                year: '35',
                month: '08',
              },
            }}
          >
            <Form.Card>
              <Field.Expiry
                path="/myField"
                transformOut={transformOut}
                transformIn={transformIn}
                label="Transform in and out"
              />
              <Tools.Log />
            </Form.Card>
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}

export const ValidationExtendValidator = () => {
  return (
    <ComponentBox>
      {() => {
        const myExpiryValidator = (value: string) => {
          if (value?.startsWith('12')) {
            return new Error('Expiry month cannot be december')
          }
        }

        // Keep the built-in validator while banning December.
        const myOnBlurValidator: ExpiryValidator = (
          value: string,
          { validators }
        ) => {
          const { expiryValidator } = validators

          return [myExpiryValidator, expiryValidator]
        }

        return (
          <Field.Expiry value="1225" onBlurValidator={myOnBlurValidator} />
        )
      }}
    </ComponentBox>
  )
}
