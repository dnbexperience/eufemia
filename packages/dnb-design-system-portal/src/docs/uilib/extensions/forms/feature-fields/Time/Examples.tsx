import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, Form, Tools } from '@dnb/eufemia/src/extensions/forms'
import type { TimeValidator } from '@dnb/eufemia/src/extensions/forms/Field/Time'

export const Empty = () => {
  return (
    <ComponentBox data-visual-test="time-empty">
      <Field.Time onChange={(time) => console.log('onChange', time)} />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox data-visual-test="time-with-value">
      <Field.Time
        value="14:30"
        label="Label text"
        onChange={(time) => console.log('onChange', time)}
      />
    </ComponentBox>
  )
}

export const HorizontalLayout = () => {
  return (
    <ComponentBox data-visual-test="time-horizontal-layout">
      <Field.Time
        value="14:30"
        layout="horizontal"
        layoutOptions={{
          width: 'medium',
        }}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox data-visual-test="time-with-help">
      <Field.Time
        label="Label text"
        help={{
          title: 'Help is available',
          content: 'Enter the time using hours and minutes.',
        }}
        onChange={(time) => console.log('onChange', time)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox data-visual-test="time-disabled">
      <Field.Time
        value="14:30"
        label="Label text"
        onChange={(time) => console.log('onChange', time)}
        disabled
      />
    </ComponentBox>
  )
}

export const WithError = () => {
  return (
    <ComponentBox data-visual-test="time-error">
      <Field.Time
        value="14:30"
        label="Label text"
        onChange={(time) => console.log('onChange', time)}
        error={new Error('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ValidationRequired = () => {
  return (
    <ComponentBox>
      <Field.Time
        label="Label text"
        onChange={(time) => console.log('onChange', time)}
        required
        validateInitially
      />
    </ComponentBox>
  )
}

export const WithSeconds = () => {
  return (
    <ComponentBox data-visual-test="time-with-seconds">
      <Field.Time
        value="14:30:45"
        label="With seconds"
        withSeconds
        onChange={(time) => console.log('onChange', time)}
      />
    </ComponentBox>
  )
}

export const TransformInAndOut = () => {
  return (
    <ComponentBox>
      {() => {
        const transformOut = (internal, additionalArgs) => {
          const { hours, minutes } = additionalArgs
          return { hours, minutes }
        }

        const transformIn = (external) => {
          if (external) {
            const { hours, minutes } = external
            return { hours, minutes }
          }
        }

        return (
          <Form.Handler
            defaultData={{
              myField: {
                hours: '14',
                minutes: '30',
              },
            }}
          >
            <Form.Card>
              <Field.Time
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
        const noMidnight = (value: string) => {
          if (value === '00:00') {
            return new Error('Midnight is not allowed')
          }
        }

        const myOnBlurValidator: TimeValidator = (
          value: string,
          { validators }
        ) => {
          const { timeValidator } = validators

          return [noMidnight, timeValidator]
        }

        return (
          <Field.Time
            value="00:00"
            // @ts-expect-error -- strictFunctionTypes
            onBlurValidator={myOnBlurValidator}
          />
        )
      }}
    </ComponentBox>
  )
}
