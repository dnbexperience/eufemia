import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex } from '@dnb/eufemia/src'
import {
  Field,
  Form,
  Tools,
  Value,
} from '@dnb/eufemia/src/extensions/forms'

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Field.String
        label="Label text"
        placeholder="Enter a text..."
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Field.String
        label="Label text"
        defaultValue="foo"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const LabelAndDescription = () => {
  return (
    <ComponentBox data-visual-test="string-label-description">
      <Form.Card>
        <Field.String
          label="Label text"
          labelDescription="Description text"
          placeholder="Enter a text..."
        />
        <Field.String
          label="Label text"
          labelDescription="\nDescription text with new line using \\n"
          placeholder="Enter a text..."
        />
      </Form.Card>
    </ComponentBox>
  )
}

export const WithStatus = () => {
  return (
    <ComponentBox data-visual-test="string-status">
      <Form.Card>
        <Field.String
          label="Label text"
          defaultValue="foo"
          warning="Short warning."
          required
        />
        <Field.String
          label="Label text"
          placeholder="Enter a text..."
          info="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et."
          required
        />
        <Field.String
          label="Label text"
          defaultValue="foo"
          width="small"
          warning="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et. Velit incididunt exercitation est magna ex irure dolore nisi eiusmod ea exercitation."
        />
        <Field.String
          label="Label text"
          error={[
            new Error('Error message A'),
            new Error('Error message B'),
          ]}
          warning={['Warning message A', 'Warning message B']}
          info={['Info message A', 'Info message B']}
        />
      </Form.Card>
    </ComponentBox>
  )
}

export const HorizontalLayout = () => {
  return (
    <ComponentBox data-visual-test="string-horizontal-layout">
      <Form.Card>
        <Field.Provider
          layout="horizontal"
          layoutOptions={{
            width: 'medium', // can be a rem value
          }}
          placeholder="Enter a text..."
          required
        >
          <Field.String label="Label text" warning="Short warning." />
          <Field.String
            label="Label with a long text that will wrap"
            placeholder="Enter a text..."
            size="medium"
            info="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et."
          />
          <Field.String
            label="Label with a long text that will wrap"
            placeholder="Enter a text..."
            size="large"
            width="stretch"
          />
        </Field.Provider>
      </Form.Card>
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Field.String
        label="Label text"
        defaultValue="foo"
        help={{
          title: 'Help is available',
          content:
            'Take the time to help other people without expecting a reward or gratitude is definitely important in living an optimistic life.',
        }}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Capitalize = () => {
  return (
    <ComponentBox>
      <Field.String
        label="Label text"
        defaultValue="foo bar"
        capitalize
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Widths = () => {
  return (
    <ComponentBox hideCode data-visual-test="string-widths">
      <Flex.Stack>
        <Field.String
          label="Default width (property omitted)"
          defaultValue="foo"
        />
        <Field.String label="Small" defaultValue="foo" width="small" />
        <Field.String label="Medium" defaultValue="foo" width="medium" />
        <Field.String label="Large" defaultValue="foo" width="large" />
        <Field.String label="Custom" defaultValue="foo" width="8rem" />
        <Field.String label="Stretch" defaultValue="foo" width="stretch" />

        <Field.String
          label="Default width (property omitted)"
          defaultValue="foo"
          multiline
        />
        <Field.String
          label="Small"
          defaultValue="foo"
          width="small"
          multiline
        />
        <Field.String
          label="Medium"
          defaultValue="foo"
          width="medium"
          multiline
        />
        <Field.String
          label="Large"
          defaultValue="foo"
          width="large"
          multiline
        />
        <Field.String
          label="Custom"
          defaultValue="foo"
          width="8rem"
          multiline
        />
        <Field.String
          label="Stretch"
          defaultValue="foo"
          width="stretch"
          multiline
        />
      </Flex.Stack>
    </ComponentBox>
  )
}

export const Icons = () => {
  return (
    <ComponentBox>
      <Form.Card>
        <Field.String
          label="Icon left"
          defaultValue="foo"
          leftIcon="check"
          onChange={(value) => console.log('onChange', value)}
        />
        <Field.String
          label="Icon right"
          defaultValue="foo"
          rightIcon="loupe"
          onChange={(value) => console.log('onChange', value)}
        />
      </Form.Card>
    </ComponentBox>
  )
}

export const Clear = () => {
  return (
    <ComponentBox>
      <Field.String
        defaultValue="foo"
        onChange={(value) => console.log('onChange', value)}
        clear
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox>
      <Field.String
        defaultValue="foo"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const WithMultipleError = () => {
  return (
    <ComponentBox data-visual-test="multiple-errors">
      <Field.String
        label="Multiple errors"
        defaultValue="foo"
        pattern="bar"
        minLength={4}
        validateInitially
      />
    </ComponentBox>
  )
}

export const ValidateRequired = () => {
  return (
    <ComponentBox>
      <Field.String
        defaultValue="foo"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        required
      />
    </ComponentBox>
  )
}

export const ValidateMinimumLength = () => {
  return (
    <ComponentBox>
      <Field.String
        defaultValue="foo"
        label="Label text (minimum 8 characters)"
        onChange={(value) => console.log('onChange', value)}
        minLength={8}
      />
    </ComponentBox>
  )
}

export const ValidateMaximumLengthCustomError = () => {
  return (
    <ComponentBox>
      <Field.String
        defaultValue="foo"
        label="Label text (maximum 8 characters)"
        onChange={(value) => console.log('onChange', value)}
        maxLength={8}
        errorMessages={{
          maxLength: "You can't write THAT long.. Max 8 chars!",
        }}
      />
    </ComponentBox>
  )
}

export const ValidatePattern = () => {
  return (
    <ComponentBox>
      <Field.String
        defaultValue="foo"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        pattern="^foo123"
      />
    </ComponentBox>
  )
}

export const SynchronousExternalChangeValidator = () => {
  return (
    <ComponentBox>
      <Field.String
        defaultValue="foo"
        label="Label text (minimum 4 characters)"
        onChangeValidator={(value) =>
          value.length < 4 ? Error('At least 4 characters') : undefined
        }
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const AsynchronousExternalChangeValidator = () => {
  return (
    <ComponentBox>
      <Field.String
        defaultValue="foo"
        label="Label text (minimum 4 characters)"
        onChangeValidator={(value) =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve(
                  value.length < 5
                    ? Error('At least 5 characters')
                    : undefined,
                ),
              1500,
            ),
          )
        }
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const SynchronousExternalBlurValidator = () => {
  return (
    <ComponentBox>
      <Field.String
        defaultValue="foo"
        label="Label text (minimum 4 characters)"
        onBlurValidator={(value) =>
          value.length < 4 ? Error('At least 4 characters') : undefined
        }
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const AsynchronousExternalBlurValidator = () => {
  return (
    <ComponentBox>
      <Field.String
        defaultValue="foo"
        label="Label text (minimum 4 characters)"
        onBlurValidator={(value) =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve(
                  value.length < 5
                    ? Error('At least 5 characters')
                    : undefined,
                ),
              1500,
            ),
          )
        }
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const MultipleEmpty = () => {
  return (
    <ComponentBox>
      <Field.String
        onChange={(value) => console.log('onChange', value)}
        multiline
      />
    </ComponentBox>
  )
}

export const MultipleOneRow = () => {
  return (
    <ComponentBox>
      <Field.String
        label="Label text"
        placeholder="Enter your text"
        multiline
        rows={1}
        characterCounter={40}
      />
    </ComponentBox>
  )
}

export const MultiplePlaceholder = () => {
  return (
    <ComponentBox>
      <Field.String
        placeholder="Enter text here"
        onChange={(value) => console.log('onChange', value)}
        multiline
      />
    </ComponentBox>
  )
}

export const MultipleLabelAndValue = () => {
  return (
    <ComponentBox>
      <Field.String
        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in tempus odio, nec interdum orci. Integer vehicula ipsum et risus finibus, vitae commodo ex luctus. Nam viverra sollicitudin dictum. Vivamus maximus dignissim lorem, vitae viverra erat dapibus a."
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        multiline
      />
    </ComponentBox>
  )
}

export const MultipleWithHelp = () => {
  return (
    <ComponentBox>
      <Field.String
        label="Label text"
        help={{
          title: 'Help is available',
          content: 'There is more happiness in giving than in receiving.',
        }}
        multiline
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export function TransformInAndOut() {
  return (
    <ComponentBox scope={{ Tools }}>
      {() => {
        // From the Field (internal value) to the data context or event parameter
        const transformOut = (value) => {
          return { value, foo: 'bar' }
        }

        // To the Field (from e.g. defaultValue)
        const transformIn = (data) => {
          if (typeof data === 'string') {
            return data
          }
          return data?.value
        }

        const MyForm = () => {
          return (
            <Form.Handler onSubmit={console.log}>
              <Form.Card>
                <Field.String
                  label="String field"
                  path="/myValue"
                  transformIn={transformIn}
                  transformOut={transformOut}
                  defaultValue="Default value"
                />

                <Value.String
                  label="String value"
                  path="/myValue"
                  transformIn={transformIn}
                  placeholder="(placeholder)"
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
