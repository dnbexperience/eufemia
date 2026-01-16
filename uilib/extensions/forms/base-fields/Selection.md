---
title: 'Selection'
description: '`Field.Selection` is a wrapper component for selecting between options using a dropdown or similar user experiences.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/base-fields/Selection/metadata.json
---

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Selection />)
```

## Description

`Field.Selection` is a component for selecting between options using a dropdown or similar user experiences.

Uses the [Field.Option](/uilib/extensions/forms/base-fields/Option/) pseudo-component to define options.

There is a corresponding [Value.Selection](/uilib/extensions/forms/Value/Selection) component.

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'

render(
  <Field.Selection placeholder="Select something...">
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>,
)
```

You can also use the `dataPath` property to provide the data to the component:

```jsx
import { Field } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler
    data={{
      myDataPath: [
        { title: 'Foo!', value: 'foo' },
        { title: 'Bar!', value: 'bar' },
      ],
    }}
  >
    <Field.Selection dataPath="/myDataPath" />
  </Form.Handler>,
)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/Selection)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/Selection)

## About the Autocomplete variant

The autocomplete variant (`variant="autocomplete"`) is a special easy drop-in version – basically as an replacement for the Dropdown variant, but with a search capability.

The [Autocomplete](/uilib/components/autocomplete/) by itself can be customized and used in various ways. If you need more control, you can use the `autocompleteProps` property to forward any additional properties (camelCase) to the [Autocomplete](/uilib/components/autocomplete/) component.

## Demos

### Variants summary

As there are many variants, they are split into separate sections. Here is a summary of the variants:

#### Dropdown

```tsx
render(
  <Field.Selection
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>,
)
```

#### Autocomplete

```tsx
render(
  <Field.Selection
    variant="autocomplete"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>,
)
```

#### Radio buttons

```tsx
render(
  <Field.Selection
    variant="radio"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>,
)
```

#### Radio button list variant

```tsx
render(
  <Field.Selection
    variant="radio-list"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
  </Field.Selection>,
)
```

#### Toggle buttons

```tsx
render(
  <Field.Selection
    variant="button"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>,
)
```

---

### Dropdown variant (default)

#### Dropdown empty

```tsx
render(
  <Field.Selection
    onFocus={(value) => console.log('onFocus', value)}
    onBlur={(value) => console.log('onBlur', value)}
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>,
)
```

#### Dropdown placeholder

```tsx
render(
  <Field.Selection
    placeholder="Select something..."
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>,
)
```

#### Dropdown with a transformed selection text

```tsx
render(
  <Field.Selection
    label="Label"
    value="bar"
    transformSelection={({ title }) => {
      return title
    }}
  >
    <Field.Option value="foo" title="Foo!" text="Additional text" />
    <Field.Option value="bar" title="Baar!" text="Additional text" />
  </Field.Selection>,
)
```

#### Dropdown label and option selected

```tsx
render(
  <Field.Selection
    value="bar"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>,
)
```

#### Dropdown with help

```tsx
render(
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
  </Field.Selection>,
)
```

### Horizontal layout

```tsx
render(
  <Field.Selection
    value="bar"
    label="Label text"
    layout="horizontal"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>,
)
```

#### Dropdown disabled

```tsx
render(
  <Field.Selection
    value="bar"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    disabled
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>,
)
```

#### Dropdown option disabled

```tsx
const Example = () => {
  return (
    <Field.Selection label="Label text">
      <Field.Option value="foo" title="Foo!" disabled />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  )
}
render(<Example />)
```

#### Dropdown error

```tsx
render(
  <Field.Selection
    value="bar"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    error={new Error('This is what is wrong...')}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>,
)
```

#### Dropdown dynamic options

```tsx
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
            title={`Option ${key + 1}`}
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
render(<Example />)
```

#### Dropdown high number of options

```tsx
render(
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
  </Field.Selection>,
)
```

#### Dropdown validation - Required

```tsx
render(
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
  </Field.Selection>,
)
```

#### Dropdown button with a path to populate the data

```tsx
render(
  <Form.Handler
    data={{
      example: {
        list: [
          {
            title: 'One',
            value: 'one',
          },
          {
            title: 'Two',
            value: 'two',
          },
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
  </Form.Handler>,
)
```

#### Dropdown with the data property

```tsx
render(
  <Field.Selection
    label="Label text"
    data={[
      {
        title: 'One',
        value: 'one',
      },
      {
        title: 'Two',
        value: 'two',
      },
    ]}
  />,
)
```

### Dropdown widths

```tsx
render(
  <Flex.Stack>
    <Field.Selection label="Default width (property omitted)" value="bar">
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
    <Field.Selection
      label="Small selection with a long label"
      value="bar"
      width="small"
    >
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
  </Flex.Stack>,
)
```

### Dropdown groups

```tsx
render(
  <Field.Selection
    label="Label text"
    path="/selection"
    dataPath="/example/list"
    groups={['Foos', 'Bars']}
  >
    <Field.Option value="foo" groupIndex={0}>
      Fooo
    </Field.Option>
    <Field.Option value="bar" groupIndex={1}>
      Bar
    </Field.Option>
  </Field.Selection>,
)
```

---

### Autocomplete variant

```tsx
render(
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
  </Field.Selection>,
)
```

### Autocomplete groups

```tsx
render(
  <Field.Selection
    variant="autocomplete"
    label="Label text"
    path="/selection"
    dataPath="/example/list"
    groups={['Foos', 'Bars']}
  >
    <Field.Option value="foo" groupIndex={0}>
      Fooo
    </Field.Option>
    <Field.Option value="bar" groupIndex={1}>
      Bar
    </Field.Option>
  </Field.Selection>,
)
```

---

### Radio variant

#### Radio empty

```tsx
render(
  <Field.Selection
    variant="radio"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>,
)
```

#### Radio option selected

```tsx
render(
  <Field.Selection
    variant="radio"
    label="Label text"
    value="bar"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>,
)
```

#### Radio horizontal layout

```tsx
render(
  <Field.Selection
    variant="radio"
    label="Label text"
    value="bar"
    layout="horizontal"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>,
)
```

#### Radio horizontal options-layout

```tsx
render(
  <Field.Selection
    variant="radio"
    label="Label text"
    value="bar"
    optionsLayout="horizontal"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>,
)
```

#### Radio horizontal layout and horizontal options-layout

```tsx
render(
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
  </Field.Selection>,
)
```

#### Radio disabled

```tsx
render(
  <Field.Selection
    variant="radio"
    value="bar"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    disabled
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>,
)
```

#### Radio option disabled

```tsx
const Example = () => {
  return (
    <Field.Selection label="Label text" variant="radio">
      <Field.Option value="foo" title="Foo!" disabled />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  )
}
render(<Example />)
```

#### Radio error

```tsx
render(
  <Field.Selection
    variant="radio"
    value="bar"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    error={new Error('This is what is wrong...')}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>,
)
```

#### Radio button with a path to populate the data

```tsx
render(
  <Form.Handler
    data={{
      example: {
        list: [
          {
            title: 'One',
            value: 'one',
          },
          {
            title: 'Two',
            value: 'two',
          },
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
  </Form.Handler>,
)
```

#### Radio with the data property

```tsx
render(
  <Field.Selection
    variant="radio"
    label="Label text"
    data={[
      {
        title: 'One',
        value: 'one',
      },
      {
        title: 'Two',
        value: 'two',
      },
    ]}
  />,
)
```

#### Radio nesting other fields with logic

You can nest other fields and show them based on your desired logic.

```tsx
render(
  <Form.Handler onSubmit={console.log}>
    <Form.Card>
      <Field.Selection
        variant="radio"
        label="Make a selection"
        path="/mySelection"
        required
      >
        <Field.Option value="nothing" title="Nothing" />
        <Field.Option value="showInput" title="Show an input" />
        <Form.Visibility
          visibleWhen={{
            path: '/mySelection',
            hasValue: 'showInput',
          }}
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
    </Form.Card>

    <Form.SubmitButton />
  </Form.Handler>,
)
```

#### Radio nesting advanced

```tsx
render(
  <Form.Handler
    defaultData={{
      mySelection: 'first',
      firstSelection: 'first',
    }}
    onSubmit={console.log}
  >
    <Form.Card>
      <Field.Selection path="/mySelection" variant="radio">
        <Field.Option value="first" title="First" />
        <Form.Visibility
          visibleWhen={{
            path: '/mySelection',
            hasValue: 'first',
          }}
          animate
          compensateForGap="auto" // makes animation smooth
        >
          <Form.Card top bottom>
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
                <Form.Card top bottom>
                  <Field.Number
                    path="/firstNestedNumber"
                    label="First nested number"
                    required
                  />
                </Form.Card>
              </Form.Visibility>
              <Field.Option value="second" title="Second nested" />
            </Field.Selection>
          </Form.Card>
        </Form.Visibility>

        <Field.Option value="second" title="Second" />
        <Field.Option value="third" title="Third" />
      </Field.Selection>
    </Form.Card>

    <Form.SubmitButton />
  </Form.Handler>,
)
```

#### Radio list variant widths

```tsx
render(
  <Flex.Stack>
    <Field.Selection
      label="Default width (property omitted)"
      value="bar"
      variant="radio-list"
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
    <Field.Selection
      label="Small selection with a long label"
      value="bar"
      variant="radio-list"
      width="small"
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
    <Field.Selection
      label="Medium"
      value="bar"
      variant="radio-list"
      width="medium"
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
    <Field.Selection
      label="Large"
      value="bar"
      variant="radio-list"
      width="large"
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
    <Field.Selection
      label="Stretch"
      value="bar"
      variant="radio-list"
      width="stretch"
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </Flex.Stack>,
)
```

---

### Buttons variant

#### ToggleButton empty

```tsx
render(
  <Field.Selection
    variant="button"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>,
)
```

#### ToggleButton option selected

```tsx
render(
  <Field.Selection
    variant="button"
    label="Label text"
    value="bar"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>,
)
```

#### ToggleButton horizontal options-layout

```tsx
render(
  <Field.Selection
    variant="button"
    label="Label text"
    optionsLayout="horizontal"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>,
)
```

#### ToggleButton disabled

```tsx
render(
  <Field.Selection
    variant="button"
    value="bar"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    disabled
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>,
)
```

#### ToggleButton option disabled

```tsx
const Example = () => {
  return (
    <Field.Selection label="Label text" variant="button">
      <Field.Option value="foo" title="Foo!" disabled />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  )
}
render(<Example />)
```

#### ToggleButton error

```tsx
render(
  <Field.Selection
    variant="button"
    value="bar"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    error={new Error('This is what is wrong...')}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>,
)
```

#### ToggleButton nesting other fields with logic

You can nest other fields and show them based on your desired logic.

```tsx
render(
  <Form.Handler>
    <Form.Card>
      <Field.Selection
        variant="button"
        label="Make a selection"
        path="/mySelection"
      >
        <Field.Option value="nothing" title="Nothing" />

        <Field.Option value="showInput" title="Show an input" />
        <Form.Visibility
          animate
          visibleWhen={{
            path: '/mySelection',
            hasValue: 'showInput',
          }}
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
    </Form.Card>
  </Form.Handler>,
)
```

#### ToggleButton with a path to populate the data

```tsx
render(
  <Form.Handler
    data={{
      example: {
        list: [
          {
            title: 'One',
            value: 'one',
          },
          {
            title: 'Two',
            value: 'two',
          },
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
  </Form.Handler>,
)
```

#### ToggleButton with the data property

```tsx
render(
  <Field.Selection
    variant="button"
    label="Label text"
    data={[
      {
        title: 'One',
        value: 'one',
      },
      {
        title: 'Two',
        value: 'two',
      },
    ]}
  />,
)
```

```tsx
render(
  <Field.Selection label="Label" error="This is what is wrong...">
    <Field.Option value="foo">Foo</Field.Option>
    <Field.Option value="bar">Bar</Field.Option>
  </Field.Selection>,
)
```

```tsx
render(
  <Field.Selection label="Label" info="Useful information (?)">
    <Field.Option value="foo">Foo</Field.Option>
    <Field.Option value="bar">Bar</Field.Option>
  </Field.Selection>,
)
```

```tsx
render(
  <Field.Selection label="Label" warning="I'm warning you...">
    <Field.Option value="foo">Foo</Field.Option>
    <Field.Option value="bar">Bar</Field.Option>
  </Field.Selection>,
)
```
