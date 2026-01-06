import { Value } from '@dnb/eufemia/src/extensions/forms'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, Form, Tools } from '@dnb/eufemia/src/extensions/forms'
import type { DateOfBirthValidator } from '@dnb/eufemia/src/extensions/forms/Field/DateOfBirth'

export const Empty = () => {
  return (
    <ComponentBox data-visual-test="date-of-birth-default">
      <Field.DateOfBirth
        onChange={(value, additionalArgs) => {
          {
            const { day, month, year } = additionalArgs || {}
            console.log('onChange', value, {
              day,
              month,
              year,
            })
          }
        }}
        onDayChange={(day) => console.log('onDayChange', day)}
        onMonthChange={(month) => console.log('onMonthChange', month)}
        onYearChange={(year) => console.log('onYearChange', year)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Field.DateOfBirth
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox data-visual-test="date-of-birth-label-and-value">
      <Field.DateOfBirth
        label="Label text"
        value="2000-05-17"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox data-visual-test="date-of-birth-help">
      <Field.DateOfBirth
        label="Label text"
        value="2000-05-17"
        help={{
          title: 'Help is available',
          content:
            'The real point is that we all need help somewhere along life’s path whether we think we will or not. And, if you are the one giving and helping, just remember this: no matter what happens later, you will always be secure in the fact knowing that you have remained strong and true to assist those that need your help.',
        }}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox data-visual-test="date-of-birth-disabled">
      <Field.DateOfBirth
        value="2000-05-17"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const WithError = () => {
  return (
    <ComponentBox data-visual-test="date-of-birth-error">
      <Field.DateOfBirth
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
      <Field.DateOfBirth
        value="2000-05-17"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        required
      />
    </ComponentBox>
  )
}

export const ValidationExtendValidator = () => {
  return (
    <ComponentBox>
      {() => {
        const firstDigitIs1Validator = (value: string) => {
          if (value.substring(0, 4) !== '1990') {
            return new Error('Has to be born in the year 1990!')
          }
        }

        // Keep the default validator and add a custom year rule.
        const myValidator: DateOfBirthValidator = (
          value,
          { validators },
        ) => {
          const { dateOfBirthValidator } = validators

          return [dateOfBirthValidator, firstDigitIs1Validator]
        }

        return (
          <Field.DateOfBirth
            required
            value="2000-05-17"
            onBlurValidator={myValidator}
            validateInitially
          />
        )
      }}
    </ComponentBox>
  )
}

export const Width = () => {
  return (
    <ComponentBox data-visual-test="date-of-birth-width">
      <Form.Card>
        <Field.String width="stretch" />
        <Field.DateOfBirth label="default" />
        <Field.DateOfBirth width="large" label="large" />
        <Field.DateOfBirth width="stretch" label="stretch" />
      </Form.Card>
    </ComponentBox>
  )
}

export const InForm = () => {
  return (
    <ComponentBox data-visual-test="date-of-birth-in-form">
      <Form.Handler
        onSubmit={console.log}
        data={{
          dob: '2000-05-17',
        }}
      >
        <Form.Card>
          <Field.DateOfBirth path="/dob" />

          <Value.DateOfBirth path="/dob" showEmpty />

          <Tools.Log />
        </Form.Card>
        <Form.SubmitButton />
      </Form.Handler>
    </ComponentBox>
  )
}

export const TransformInAndOut = () => {
  return (
    <ComponentBox>
      {() => {
        const transformOut = (internal, additionalArgs) => {
          if (additionalArgs) {
            const { year, month, day } = additionalArgs
            return { year, month, day }
          }
        }

        const transformIn = (external) => {
          if (external) {
            const { year, month, day } = external
            return `${year}-${month}-${day}`
          }
        }

        return (
          <Form.Handler
            defaultData={{
              myField: {
                year: '1990',
                month: '05',
                day: '15',
              },
            }}
          >
            <Form.Card>
              <Field.DateOfBirth
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
