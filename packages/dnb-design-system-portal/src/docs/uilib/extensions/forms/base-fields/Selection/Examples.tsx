import * as React from 'react'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Button, Card, Flex, Section } from '@dnb/eufemia/src'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'

// - Dropdown

export const DropdownEmpty = () => (
  <ComponentBox>
    <Field.Selection
      onFocus={(value) => console.log('onFocus', value)}
      onBlur={(value) => console.log('onBlur', value)}
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const DropdownPlaceholder = () => (
  <ComponentBox>
    <Field.Selection
      placeholder="Select something..."
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const DropdownLabel = () => (
  <ComponentBox>
    <Field.Selection
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const DropdownOptionSelected = () => (
  <ComponentBox>
    <Field.Selection
      value="bar"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const DropdownLabelAndOptionSelected = () => (
  <ComponentBox data-visual-test="selection-dropdown-default">
    <Field.Selection
      value="bar"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const WithHelp = () => {
  return (
    <ComponentBox data-visual-test="selection-dropdown-help">
      <Field.Selection
        value="bar"
        label="Label text"
        help={{
          title: 'Help is available',
          content:
            'Somewhere along the way, we must learn that there is nothing greater than to do something for others.',
        }}
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option value="foo" title="Foo!" />
        <Field.Option value="bar" title="Baar!" />
      </Field.Selection>
    </ComponentBox>
  )
}

export const HorizontalLayout = () => {
  return (
    <ComponentBox data-visual-test="selection-dropdown-horizontal">
      <Field.Selection
        value="bar"
        label="Label text"
        layout="horizontal"
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option value="foo" title="Foo!" />
        <Field.Option value="bar" title="Baar!" />
      </Field.Selection>
    </ComponentBox>
  )
}

export const Widths = () => {
  return (
    <ComponentBox hideCode data-visual-test="selection-dropdown-widths">
      <Flex.Stack>
        <Field.Selection
          label="Default width (property omitted)"
          value="bar"
        >
          <Field.Option value="foo" title="Foo!" />
          <Field.Option value="bar" title="Baar!" />
        </Field.Selection>
        <Field.Selection label="Small" value="bar" width="small">
          <Field.Option value="foo" title="Foo!" />
          <Field.Option value="bar" title="Baar!" />
        </Field.Selection>
        <Field.Selection label="Medium" value="bar" width="medium">
          <Field.Option value="foo" title="Foo!" />
          <Field.Option value="bar" title="Baar!" />
        </Field.Selection>
        <Field.Selection label="Large" value="bar" width="large">
          <Field.Option value="foo" title="Foo!" />
          <Field.Option value="bar" title="Baar!" />
        </Field.Selection>
        <Field.Selection label="Stretch" value="bar" width="stretch">
          <Field.Option value="foo" title="Foo!" />
          <Field.Option value="bar" title="Baar!" />
        </Field.Selection>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const DropdownDisabled = () => (
  <ComponentBox>
    <Field.Selection
      value="bar"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      disabled
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const DropdownDisabledOptions = () => (
  <ComponentBox>
    {() => {
      const Example = () => {
        return (
          <Field.Selection label="Label text">
            <Field.Option value="foo" title="Foo!" disabled />
            <Field.Option value="bar" title="Baar!" />
          </Field.Selection>
        )
      }

      return <Example />
    }}
  </ComponentBox>
)

export const DropdownError = () => (
  <ComponentBox>
    <Field.Selection
      value="bar"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      error={new Error('This is what is wrong...')}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const DropdownDynamicOptions = () => (
  <ComponentBox>
    {() => {
      const Example = () => {
        const [numOptions, setNumOptions] = React.useState(3)

        return (
          <>
            <Field.Selection
              value="option-15"
              label="Label text"
              onChange={(value) => console.log('onChange', value)}
            >
              {Array.from(Array(numOptions).keys()).map((key) => (
                <Field.Option
                  key={key}
                  value={key}
                  title={'Option ' + (key + 1)}
                />
              ))}
            </Field.Selection>

            <p>
              {[3, 4, 5].map((num, i) => (
                <Button
                  key={i}
                  size="medium"
                  right="x-small"
                  variant={numOptions === num ? 'primary' : 'secondary'}
                  on_click={() => setNumOptions(num)}
                >
                  {num} options
                </Button>
              ))}
            </p>
          </>
        )
      }

      return <Example />
    }}
  </ComponentBox>
)

export const DropdownHighNumberOfOptions = () => (
  <ComponentBox>
    <Field.Selection
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
      <Field.Option value="option-21" title="Twenty-one" />
      <Field.Option value="option-22" title="Twenty-two" />
      <Field.Option value="option-23" title="Twenty-three" />
      <Field.Option value="option-24" title="Twenty-four" />
      <Field.Option value="option-25" title="Twenty-five" />
    </Field.Selection>
  </ComponentBox>
)

export const DropdownValidationRequired = () => (
  <ComponentBox>
    <Field.Selection
      value="foo"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      onFocus={(value) => console.log('onFocus', value)}
      onBlur={(value) => console.log('onBlur', value)}
      required
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const DropdownWithData = () => (
  <ComponentBox>
    <Field.Selection
      label="Label text"
      data={[
        { title: 'One', value: 'one' },
        { title: 'Two', value: 'two' },
      ]}
    />
  </ComponentBox>
)

export const DropdownWithAPath = () => (
  <ComponentBox>
    <Form.Handler
      data={{
        example: {
          list: [
            { title: 'One', value: 'one' },
            { title: 'Two', value: 'two' },
          ],
        },
        selection: 'two',
      }}
    >
      <Field.Selection
        label="Label text"
        path="/selection"
        dataPath="/example/list"
      >
        <Field.Option value="foo">Fooo</Field.Option>
      </Field.Selection>
    </Form.Handler>
  </ComponentBox>
)

// - Autocomplete

export const AutocompleteLabel = () => (
  <ComponentBox>
    <Field.Selection
      variant="autocomplete"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const AutocompleteValidationRequired = () => (
  <ComponentBox>
    <Field.Selection
      variant="autocomplete"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      onFocus={(value) => console.log('onFocus', value)}
      onBlur={(value) => console.log('onBlur', value)}
      required
      validateInitially
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

// - Radio

export const RadioEmpty = () => (
  <ComponentBox>
    <Field.Selection
      variant="radio"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const RadioLabel = () => (
  <ComponentBox data-visual-test="selection-radio-options-vertical">
    <Field.Selection
      variant="radio"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const RadioOptionSelected = () => (
  <ComponentBox data-visual-test="selection-radio-vertical">
    <Field.Selection
      variant="radio"
      label="Label text"
      value="bar"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const RadioHorizontalLayout = () => (
  <ComponentBox data-visual-test="selection-radio-horizontal">
    <Field.Selection
      variant="radio"
      label="Label text"
      value="bar"
      layout="horizontal"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const RadioHorizontalOptionsLayout = () => (
  <ComponentBox data-visual-test="selection-radio-options-horizontal">
    <Field.Selection
      variant="radio"
      label="Label text"
      value="bar"
      optionsLayout="horizontal"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const RadioHorizontalLayoutAndHorizontalOptionsLayout = () => (
  <ComponentBox>
    <Field.Selection
      variant="radio"
      label="Label text"
      value="bar"
      layout="horizontal"
      optionsLayout="horizontal"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const RadioDisabled = () => (
  <ComponentBox>
    <Field.Selection
      variant="radio"
      value="bar"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      disabled
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const RadioDisabledOptions = () => (
  <ComponentBox>
    {() => {
      const Example = () => {
        return (
          <Field.Selection label="Label text" variant="radio">
            <Field.Option value="foo" title="Foo!" disabled />
            <Field.Option value="bar" title="Baar!" />
          </Field.Selection>
        )
      }

      return <Example />
    }}
  </ComponentBox>
)

export const RadioError = () => (
  <ComponentBox>
    <Field.Selection
      variant="radio"
      value="bar"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      error={new Error('This is what is wrong...')}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const RadioWithData = () => (
  <ComponentBox>
    <Field.Selection
      variant="radio"
      label="Label text"
      data={[
        { title: 'One', value: 'one' },
        { title: 'Two', value: 'two' },
      ]}
    />
  </ComponentBox>
)

export const RadioWithAPath = () => (
  <ComponentBox>
    <Form.Handler
      data={{
        example: {
          list: [
            { title: 'One', value: 'one' },
            { title: 'Two', value: 'two' },
          ],
        },
        selection: 'two',
      }}
    >
      <Field.Selection
        variant="radio"
        label="Label text"
        path="/selection"
        dataPath="/example/list"
      >
        <Field.Option value="foo">Fooo</Field.Option>
      </Field.Selection>
    </Form.Handler>
  </ComponentBox>
)

export const RadioNestingWithLogic = () => (
  <ComponentBox hideCode data-visual-test="selection-radio-nesting-logic">
    <Form.Handler onSubmit={console.log}>
      <Card stack>
        <Field.Selection
          variant="radio"
          label="Make a selection"
          path="/mySelection"
          required
        >
          <Field.Option value="nothing" title="Nothing" />
          <Field.Option value="showInput" title="Show an input" />
          <Form.Visibility
            visibleWhen={{ path: '/mySelection', hasValue: 'showInput' }}
            animate
            compensateForGap="auto" // makes animation smooth
          >
            <Section variant="info" innerSpace>
              <Field.String placeholder="Enter some value" required />
            </Section>
          </Form.Visibility>
          <Field.Option
            value="showAdditionalOption"
            title="Show additional option"
          />
          <Form.Visibility
            visibleWhen={{
              path: '/mySelection',
              hasValue: (value) =>
                value === 'showAdditionalOption' || value === 'showMeMore',
            }}
            animate
            compensateForGap="auto" // makes animation smooth
          >
            <Field.Option
              value="showMeMore"
              title="Show even more"
              bottom="x-small"
            />
            <Form.Visibility
              animate
              visibleWhen={{
                path: '/mySelection',
                hasValue: 'showMeMore',
              }}
            >
              <Section variant="info" innerSpace>
                <Field.String placeholder="Enter more info" required />
              </Section>
            </Form.Visibility>
          </Form.Visibility>
        </Field.Selection>
      </Card>

      <Form.SubmitButton />
    </Form.Handler>
  </ComponentBox>
)

export const RadioNestingAdvanced = () => (
  <ComponentBox
    hideCode
    data-visual-test="selection-radio-advanced-nesting-logic"
  >
    <Form.Handler
      defaultData={{ mySelection: 'first', firstSelection: 'first' }}
      onSubmit={console.log}
    >
      <Card stack>
        <Field.Selection path="/mySelection" variant="radio">
          <Field.Option value="first" title="First" />
          <Form.Visibility
            visibleWhen={{ path: '/mySelection', hasValue: 'first' }}
            animate
            compensateForGap="auto" // makes animation smooth
          >
            <Card stack top bottom>
              <Field.Number
                path="/firstNumber"
                label="First number"
                value={1}
                allowNegative={false}
                required
                exclusiveMinimum={900}
                exclusiveMaximum={1000}
              />
              <Field.String
                path="/firstString"
                label="First String"
                value="foo"
                pattern="bar"
                minLength={4}
              />
              <Field.Boolean
                path="/firstBoolean"
                label="First boolean"
                variant="checkbox"
                required
              />
              <Field.Selection
                path="/firstSelection"
                variant="radio"
                required
                label="First selection"
              >
                <Field.Option value="first" title="First nested" />
                <Form.Visibility
                  visibleWhen={{
                    path: '/firstSelection',
                    hasValue: 'first',
                  }}
                  animate
                  compensateForGap="auto" // makes animation smooth
                >
                  <Card stack top bottom>
                    <Field.Number
                      path="/firstNestedNumber"
                      label="First nested number"
                      required
                    />
                  </Card>
                </Form.Visibility>
                <Field.Option value="second" title="Second nested" />
              </Field.Selection>
            </Card>
          </Form.Visibility>

          <Field.Option value="second" title="Second" />
          <Field.Option value="third" title="Third" />
        </Field.Selection>
      </Card>

      <Form.SubmitButton />
    </Form.Handler>
  </ComponentBox>
)

// - Button

export const ButtonEmpty = () => (
  <ComponentBox>
    <Field.Selection
      variant="button"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const ButtonLabel = () => (
  <ComponentBox data-visual-test="selection-button-options-vertical">
    <Field.Selection
      variant="button"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const ButtonHorizontalOptionsLayout = () => (
  <ComponentBox data-visual-test="selection-button-options-horizontal">
    <Field.Selection
      variant="button"
      label="Label text"
      optionsLayout="horizontal"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const ButtonOptionSelected = () => (
  <ComponentBox data-visual-test="selection-button-vertical">
    <Field.Selection
      variant="button"
      label="Label text"
      value="bar"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const ButtonDisabled = () => (
  <ComponentBox>
    <Field.Selection
      variant="button"
      value="bar"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      disabled
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const ButtonDisabledOptions = () => (
  <ComponentBox>
    {() => {
      const Example = () => {
        return (
          <Field.Selection label="Label text" variant="button">
            <Field.Option value="foo" title="Foo!" disabled />
            <Field.Option value="bar" title="Baar!" />
          </Field.Selection>
        )
      }

      return <Example />
    }}
  </ComponentBox>
)

export const ButtonError = () => (
  <ComponentBox>
    <Field.Selection
      variant="button"
      value="bar"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      error={new Error('This is what is wrong...')}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const ButtonWithData = () => (
  <ComponentBox>
    <Field.Selection
      variant="button"
      label="Label text"
      data={[
        { title: 'One', value: 'one' },
        { title: 'Two', value: 'two' },
      ]}
    />
  </ComponentBox>
)

export const ButtonWithAPath = () => (
  <ComponentBox>
    <Form.Handler
      data={{
        example: {
          list: [
            { title: 'One', value: 'one' },
            { title: 'Two', value: 'two' },
          ],
        },
        selection: 'two',
      }}
    >
      <Field.Selection
        variant="button"
        label="Label text"
        path="/selection"
        dataPath="/example/list"
      >
        <Field.Option value="foo">Fooo</Field.Option>
      </Field.Selection>
    </Form.Handler>
  </ComponentBox>
)

export const ButtonNestingWithLogic = () => (
  <ComponentBox data-visual-test="selection-button-nesting-logic">
    <Form.Handler>
      <Card stack>
        <Field.Selection
          variant="button"
          label="Make a selection"
          path="/mySelection"
        >
          <Field.Option value="nothing" title="Nothing" />

          <Field.Option value="showInput" title="Show an input" />
          <Form.Visibility
            animate
            visibleWhen={{ path: '/mySelection', hasValue: 'showInput' }}
          >
            <Section variant="info" innerSpace>
              <Field.String placeholder="Enter some value" />
            </Section>
          </Form.Visibility>

          <Field.Option
            value="showAdditionalOption"
            title="Show additional option"
          />
          <Form.Visibility
            animate
            visibleWhen={{
              path: '/mySelection',
              hasValue: (value) =>
                value === 'showAdditionalOption' || value === 'showMeMore',
            }}
          >
            <Field.Option
              value="showMeMore"
              title="Show even more"
              bottom="x-small"
            />
            <Form.Visibility
              animate
              visibleWhen={{
                path: '/mySelection',
                hasValue: 'showMeMore',
              }}
            >
              <Section variant="info" innerSpace>
                <Field.String placeholder="Enter more info" />
              </Section>
            </Form.Visibility>
          </Form.Visibility>
        </Field.Selection>
      </Card>
    </Form.Handler>
  </ComponentBox>
)
