---
title: 'Input'
description: 'The Input component is an umbrella component for all inputs which share the same style as the classic text input field.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.806Z
checksum: d4e0105ff52d99ebc19fd8699b68ec6b4c20fa81c4d9cbf5c8049278ad3d11dd
---

# Input

## Import

```tsx
import { Input } from '@dnb/eufemia'
```

## Description

The Input component is an umbrella component for all inputs that share the same style as the classic `text` input field.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4243-1495)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/input)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/input)

### Formatted input fields (masked values)

You may consider using [InputMasked](/uilib/components/input-masked/) for formatted strings and [Eufemia Forms](/uilib/extensions/forms/) fields like [Field.Number](/uilib/extensions/forms/base-fields/Number/) and [Field.Currency](/uilib/extensions/forms/feature-fields/Currency/) for formatted numbers:

```tsx
render(
  <Field.Currency
    label="Amount"
    value={1234}
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Browser autofill styling

When users insert values using autofill in their browser, the browser applies its own background and text colors that override Eufemia's styling.

Different browsers use different color schemes. However, Eufemia does not currently overwrite the `:autofill` background color. We only ensure the border (outline) is styled correctly in all states.

### Accessibility

Please avoid using the `maxlength` attribute when possible, as it may reduce accessibility. You can instead use the [TextCounter](/uilib/components/fragments/text-counter/) component.

You may also consider using a multiline input with a `characterCounter`:

```tsx
render(
  <Field.String
    label="Label text"
    placeholder="Enter your text"
    multiline
    rows={1}
    characterCounter={40}
  />
)
```

## Demos

### Placeholder text

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="input-placeholder">
      <Input label="Label" placeholder="Placeholder text" />
    </ComponentBox>
  </Wrapper>
)
```

### Search text placeholder

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="input-search">
      <Input
        label="Search"
        type="search"
        placeholder="Search text placeholder"
        on_change={({ value }) => {
          console.log('on_change', value)
        }}
        on_submit={({ value }) => {
          console.log('Submit:', value)
        }}
      />
    </ComponentBox>
  </Wrapper>
)
```

### Medium and stretched search input

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="input-medium">
      <Input
        size="medium"
        type="search"
        stretch={true}
        value="Medium search value"
        on_change={({ value }) => {
          console.log('on_change', value)
        }}
      />
    </ComponentBox>
  </Wrapper>
)
```

### Input with icon

With left / right aligned text

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="input-icon">
      <Input
        label="Input with icon"
        placeholder="Input"
        label_direction="vertical"
        icon="check"
        bottom
      />
      <Input
        label="Input with icon"
        label_sr_only
        placeholder="Input with a placeholder"
        icon_position="right"
        icon="check"
        align="right"
      />
    </ComponentBox>
  </Wrapper>
)
```

### Disabled input

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="input-disabled">
      <Input
        disabled
        label="Disabled input"
        placeholder="Disabled Input with a placeholder"
      />
    </ComponentBox>
  </Wrapper>
)
```

### With FormStatus

```tsx
render(
  <Wrapper>
    <ComponentBox>
      <Provider
        formElement={{
          label_direction: 'vertical',
        }}
      >
        <Flex.Vertical>
          <div data-visual-test="input-error">
            <Input
              label="With FormStatus"
              status="You have to fill in this field"
              value="Input value with error"
            />
          </div>
          <div data-visual-test="input-error-button">
            <Input
              label="With button"
              status="You have to fill in this field"
              value="Input value with error"
              type="search"
            />
          </div>
        </Flex.Vertical>
      </Provider>
    </ComponentBox>
  </Wrapper>
)
```

### Input with suffix and custom label component

```tsx
render(
  <Wrapper>
    <ComponentBox>
      <Input
        label={<Span className="dnb-p--lead">Fødselsnummer</Span>}
        label_direction="vertical"
        autocomplete="on"
        placeholder="Placeholder text"
        suffix={
          <HelpButton title="Info" size="large">
            Some content
          </HelpButton>
        }
        on_change={({ value }) => {
          console.log('on_change', value)
        }}
      />
    </ComponentBox>
  </Wrapper>
)
```

### Stretched `Input` in horizontal flex and a long label

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="input-stretch">
      <Provider
        formElement={{
          label_direction: 'vertical',
        }}
      >
        <FieldBlock
          label="Long label labwl Adipiscing mauris dis proin nec"
          forId="input-id"
        >
          <Input
            id="input-id"
            value="I stretch ..."
            stretch
            status="Status message"
            status_state="warn"
          />
        </FieldBlock>
      </Provider>
    </ComponentBox>
  </Wrapper>
)
```

### Numbers are using DNB Mono (monospace)

Also, this example manipulates the value during typing.

```tsx
render(
  <Wrapper>
    <ComponentBox>
      <Input
        label="Label"
        autocomplete="on"
        placeholder="Placeholder text"
        status="Numbers are using DNB Mono (monospace)"
        status_state="info"
        value="1234567890"
        on_change={({ value }) => {
          console.log('on_change', value)
          return String(value).toUpperCase()
        }}
      />
    </ComponentBox>
  </Wrapper>
)
```

### Submit Form with Input

Pressing the enter key will trigger a submit.

```tsx
render(
  <Wrapper>
    <ComponentBox>
      <Form.Handler
        onSubmit={(event) => {
          console.log(event)
        }}
      >
        <FormLabel forId="search">Label</FormLabel>
        <Flex.Horizontal align="baseline">
          <Input
            id="search"
            type="search"
            value="Input ..."
            selectall={true}
            on_submit={(event) => {
              console.log('Input.on_submit', event)
            }}
            on_change={({ value }) => {
              console.log('on_change:', value)
            }}
          />
          <Form.SubmitButton />
        </Flex.Horizontal>
      </Form.Handler>
    </ComponentBox>
  </Wrapper>
)
```

### Input with clear button

Pushing the clear button will clear the input.

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="input-clear">
      <Flex.Vertical>
        <Input clear={true} value="Value ..." size="medium" />
        <Input clear={true} value="Value ..." type="search" />
        <Input clear={true} value="Value ..." icon="loupe" type="search" />
      </Flex.Vertical>
    </ComponentBox>
  </Wrapper>
)
```

### Prevent typing of invalid characters

You can check out the [Field.String](/uilib/extensions/forms/base-fields/String/#prevent-typing-of-invalid-characters) example for more information using `onInput` event handler property.

### Input password type

The password component has to ensure that there is still room for password managers to inject the input with their UX functionality.

In order to get the show/hide button, you may have to import the component like so:

```js
import InputPassword from '@dnb/eufemia/components/input/InputPassword'
```

```tsx
render(
  <Wrapper>
    <ComponentBox
      scope={{
        InputPassword,
      }}
      data-visual-test="input-password"
    >
      <InputPassword
        label="Label"
        placeholder="A placeholder text"
        onChange={(value: string) => {
          console.log('onChange:', value)
        }}
        onShowPassword={() => {
          console.log('onShowPassword')
        }}
        onHidePassword={() => {
          console.log('onHidePassword')
        }}
      />
    </ComponentBox>
  </Wrapper>
)
```

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="input-align">
      <Provider
        formElement={{
          label_direction: 'vertical',
        }}
      >
        <FieldBlock label="Left aligned">
          <Flex.Vertical>
            <Input value="Plain" />
            <Input value="Search" type="search" />
            <Input value="Search" size="medium" type="search" />
            <Input value="Search" size="large" type="search" />
            <Input
              value="Value Eu pretium sit magnis suscipit cursus dis proin rutrum elementum"
              icon="calendar"
            />
            <Input
              placeholder="Placeholder Eu pretium sit magnis suscipit cursus dis proin rutrum elementum"
              icon_position="right"
              icon="calendar"
            />
            <Input size="medium" value="Value" icon="calendar" />
            <Input
              size="medium"
              placeholder="Placeholder"
              icon_position="right"
              icon="calendar"
            />
            <Input size="large" value="Value" icon="calendar" />
            <Input
              size="large"
              placeholder="Placeholder"
              icon_position="right"
              icon="calendar"
            />
          </Flex.Vertical>
        </FieldBlock>
        <FieldBlock top label="Right aligned">
          <Flex.Vertical>
            <Input value="Plain" align="right" />
            <Input value="Search" type="search" align="right" />
            <Input
              value="Search"
              size="medium"
              type="search"
              align="right"
            />
            <Input
              value="Search"
              size="large"
              type="search"
              align="right"
            />
            <Input
              value="Value Eu pretium sit magnis suscipit cursus dis proin rutrum elementum"
              icon="calendar"
              align="right"
            />
            <Input
              placeholder="Placeholder Eu pretium sit magnis suscipit cursus dis proin rutrum elementum"
              icon_position="right"
              icon="calendar"
              align="right"
            />
            <Input
              size="medium"
              value="Value"
              icon="calendar"
              align="right"
            />
            <Input
              size="medium"
              placeholder="Placeholder"
              icon_position="right"
              icon="calendar"
              align="right"
            />
            <Input
              size="large"
              value="Value"
              icon="calendar"
              align="right"
            />
            <Input
              size="large"
              placeholder="Placeholder"
              icon_position="right"
              icon="calendar"
              align="right"
            />
          </Flex.Vertical>
        </FieldBlock>
      </Provider>
    </ComponentBox>
  </Wrapper>
)
```

## Properties

```json
{
  "props": {
    "value": {
      "doc": "The content value of the input.",
      "type": "string",
      "status": "optional"
    },
    "align": {
      "doc": "Defines the text alignment of the input. Can be `left`, `right` or `center`. Defaults to `left`.",
      "type": "string",
      "status": "optional"
    },
    "label": {
      "doc": "Prepends the Form Label component. If no ID is provided, a random ID is created.",
      "type": "React.Node",
      "status": "optional"
    },
    "label_sr_only": {
      "doc": "Use `true` to make the label only readable by screen readers.",
      "type": "boolean",
      "status": "optional"
    },
    "label_direction": {
      "doc": "Use `label_direction=\"vertical\"` to change the label layout direction. Defaults to `horizontal`.",
      "type": "string",
      "status": "optional"
    },
    "status": {
      "doc": "Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.",
      "type": ["error", "info", "boolean"],
      "status": "optional"
    },
    "status_state": {
      "doc": "Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.",
      "type": ["error", "info"],
      "status": "optional"
    },
    "status_props": {
      "doc": "Use an object to define additional FormStatus properties.",
      "type": "object",
      "status": "optional"
    },
    "globalStatus": {
      "doc": "The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).",
      "type": "object",
      "status": "optional"
    },
    "placeholder": {
      "doc": "The placeholder which shows up once the input value is empty.",
      "type": "string",
      "status": "optional"
    },
    "icon": {
      "doc": "Icon to show before or after the input / placeholder. Can be either a string defining a primary icon or a Component using an SVG icon of either 16px or 24px.",
      "type": ["string", "React.Node"],
      "status": "optional"
    },
    "icon_position": {
      "doc": "Defines the position of icon inside the input. Set to `left` or `right`. Defaults to `left` if not set.",
      "type": "string",
      "status": "optional"
    },
    "icon_size": {
      "doc": "The icon size of the icon shows. Defaults to `medium`.",
      "type": "string",
      "status": "optional"
    },
    "keep_placeholder": {
      "doc": "Set to `true` in case the `placeholder` has to be kept during focus. By default, the placeholder disappears on focus.",
      "type": "boolean",
      "status": "optional"
    },
    "input_class": {
      "doc": "In case we have to set a custom input class.",
      "type": "string",
      "status": "optional"
    },
    "type": {
      "doc": "Choose between `text`, `number`, `email`, `password`, `url`, `tel` and `search`.",
      "type": "string",
      "status": "optional"
    },
    "autocomplete": {
      "doc": "Defaults to `off`. Set to `on` or any of [allowed `attributes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autocomplete). Keep in mind, 1. you may have to define a `name`, 2. have the input as a descendant of a `<form>` element, 3. and have a submit button inside the form.",
      "type": "string",
      "status": "optional"
    },
    "submit_button_title": {
      "doc": "Title attribute for the search/submit button. Only relevant when `type=\"search\"`.",
      "type": "string",
      "status": "optional"
    },
    "suffix": {
      "doc": "Text describing the content of the input more than the label. you can also send in a React component, so it gets wrapped inside the Input component.",
      "type": ["string", "React.Node"],
      "status": "optional"
    },
    "size": {
      "doc": "The sizes you can choose is `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`. Also, if you define a number like `size={2}` then it will be forwarded as the input element attribute.",
      "type": ["string", "number"],
      "status": "optional"
    },
    "selectall": {
      "doc": "If set to `true`, then the whole input value gets selected on the entry focus. A second click will place the cursor on the wanted position.",
      "type": "boolean",
      "status": "optional"
    },
    "clear": {
      "doc": "If set to `true`, then a clear button will be shown which lets the user clear any given input value.",
      "type": "boolean",
      "status": "optional"
    },
    "stretch": {
      "doc": "If set to `true`, then the input field will be 100% in `width`.",
      "type": "boolean",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "input_attributes": {
      "doc": "Provide the Input element with any attributes by using an Object `input_attributes={{size:'2'}}` or a JSON Object `input_attributes='{\"size\":\"2\"}'`. **NB:** Keep in mind, that also every not listed component property will be sent along and set as an Input element attribute.",
      "type": "object",
      "status": "optional"
    },
    "input_state": {
      "doc": "Defines a custom visual state of the input. Use it only if you have to simulate a custom state. Currently are three statuses `virgin` , `focus` and `dirty`. Defaults to `null`.",
      "type": "string",
      "status": "optional"
    },
    "submit_element": {
      "doc": "Accepts a React element which will show up like the \"submit button\" would do on `type=\"search\"`.",
      "type": ["string", "React.Element"],
      "status": "optional"
    },
    "inner_ref": {
      "doc": "By providing a React.ref we can get the internally used input element (DOM). E.g. `inner_ref={myRef}` by using `React.createRef()` or `React.useRef()`.",
      "type": "React.RefObject",
      "status": "optional"
    },
    "input_element": {
      "doc": "By providing a new component we can change the internally used element. Also supports a string only, like `input_element=\"input\"`.",
      "type": ["string", "React.Element"],
      "status": "internal"
    },
    "inner_element": {
      "doc": "By providing a new component to be rendered inside the \"shell\" – we can add a freely customizable internal element. Used by the Autocomplete component.",
      "type": ["string", "React.Element"],
      "status": "internal"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "Input.clear_button_title": {
      "nb-NO": "Nullstill",
      "en-GB": "Clear value",
      "sv-SE": "Återställ",
      "da-DK": "Nulstil"
    },
    "Input.submit_button_title": {
      "nb-NO": "Send",
      "en-GB": "Submit button",
      "sv-SE": "Skicka knapp",
      "da-DK": "Send ind knap"
    }
  }
}
```

## Events

```json
{
  "props": {
    "on_change": {
      "doc": "Will be called on value changes made by the user. Returns an object with the value as a string and the native event: `{ value, event }`.",
      "type": "function",
      "status": "optional"
    },
    "on_focus": {
      "doc": "Will be called on focus set by the user. Returns `{ value, event }`.",
      "type": "function",
      "status": "optional"
    },
    "on_key_down": {
      "doc": "Will be called on key down by the user. Returns `{ value, event }`.",
      "type": "function",
      "status": "optional"
    },
    "on_blur": {
      "doc": "Will be called on blur set by the user. Returns `{ value, event }`.",
      "type": "function",
      "status": "optional"
    },
    "on_submit": {
      "doc": "Will be called on enter key press or submit button click. Returns `{ value, event }`.",
      "type": "function",
      "status": "optional"
    },
    "on_submit_focus": {
      "doc": "Will be called on submit button focus. Only relevant when `type=\"search\"`. Returns `{ value, event }`.",
      "type": "function",
      "status": "optional"
    },
    "on_submit_blur": {
      "doc": "Will be called on submit button blur. Only relevant when `type=\"search\"`. Returns `{ value, event }`.",
      "type": "function",
      "status": "optional"
    },
    "on_clear": {
      "doc": "Will be called on a clear button click. Returns `{ value, previousValue, event }`.",
      "type": "function",
      "status": "optional"
    }
  }
}
```

### Manipulate the input value during typing

You have two possibilities to manipulate the value while a user is typing. Either you handle the value with your own state, or you return a modified value in the `on_change` event listener:

```jsx
import { format } from '@dnb/eufemia/components/number-format/NumberUtils'

function Component() {
  const onChangeHandler = ({ value }) => {
    return format(value)
  }

  return <Input on_change={onChangeHandler} />
}
```

### Prevent setting a new value

You can use e.g. `event.preventDefault()` during `on_key_down`, or return false during `on_change`. They are not 100% the same user experience, but can both be useful in different use cases.

```jsx
function Component() {
  const onKeyDownHandler = ({ event }) => {
    event.preventDefault()
  }
  const onChangeHandler = ({ value }) => {
    return false
  }

  return (
    <Input on_key_down={onKeyDownHandler} on_change={onChangeHandler} />
  )
}
```
