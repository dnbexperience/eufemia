---
title: 'Input'
description: 'The Input component is an umbrella component for all inputs which share the same style as the classic text input field.'
version: 11.1.1
generatedAt: 2026-05-05T18:42:12.388Z
checksum: 586895425dda6bc218565357fa56efb68214cf4323eae985f68cedbf626594c6
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
render(<Field.Currency label="Amount" value={1234} onChange={value => console.log('onChange', value)} />)
```


### Browser autofill styling

When users insert values using autofill in their browser, the browser applies its own background and text colors that override Eufemia's styling.

Different browsers use different color schemes. However, Eufemia does not currently overwrite the `:autofill` background color. We only ensure the border (outline) is styled correctly in all states.

### Accessibility

Please avoid using the `maxlength` attribute when possible, as it may reduce accessibility. You can instead use the [TextCounter](/uilib/components/fragments/text-counter/) component.

You may also consider using a multiline input with a `characterCounter`:


```tsx
render(<Field.String label="Label text" placeholder="Enter your text" multiline rows={1} characterCounter={40} />)
```


## Demos

### Placeholder text


```tsx
render(<Input label="Label" placeholder="Placeholder text" />)
```


### Search text placeholder


```tsx
render(<Input label="Search" type="search" placeholder="Search text placeholder" onChange={({
  value
}) => {
  console.log('onChange', value);
}} onSubmit={({
  value
}) => {
  console.log('Submit:', value);
}} />)
```


### Medium and stretched search input


```tsx
render(<Input size="medium" type="search" stretch={true} value="Medium search value" onChange={({
  value
}) => {
  console.log('onChange', value);
}} />)
```


### Input with icon

With left / right aligned text


```tsx
<Input label="Input with icon" placeholder="Input" icon="check" bottom />
<Input label="Input with icon" labelSrOnly placeholder="Input with a placeholder" iconPosition="right" icon="check" align="right" />
```


### Disabled input


```tsx
render(<Input disabled label="Disabled input" placeholder="Disabled Input with a placeholder" />)
```


### With FormStatus


```tsx
render(<Flex.Vertical>
      <section data-visual-test="input-error">
        <Input label="With FormStatus" status="You have to fill in this field" value="Input value with error" />
      </section>
      <section data-visual-test="input-error-button">
        <Input label="With button" status="You have to fill in this field" value="Input value with error" type="search" />
      </section>
    </Flex.Vertical>)
```


### Input with suffix and custom label component


```tsx
render(<Input label={<Lead>Fødselsnummer</Lead>} autocomplete="on" placeholder="Placeholder text" suffix={<HelpButton title="Info" size="large">
          Some content
        </HelpButton>} onChange={({
  value
}) => {
  console.log('onChange', value);
}} />)
```


### Stretched `Input` in horizontal flex and a long label


```tsx
render(<FieldBlock label="Long label labwl Adipiscing mauris dis proin nec" forId="input-id">
      <Input id="input-id" value="I stretch ..." stretch status="Status message" statusState="warning" />
    </FieldBlock>)
```


### Numbers are using DNB Mono (monospace)

Also, this example manipulates the value during typing.


```tsx
render(<Input label="Label" autocomplete="on" placeholder="Placeholder text" status="Numbers are using DNB Mono (monospace)" statusState="information" value="1234567890" onChange={({
  value
}) => {
  console.log('onChange', value);
  return String(value).toUpperCase();
}} />)
```


### Submit Form with Input

Pressing the enter key will trigger a submit.


```tsx
render(<Form.Handler onSubmit={event => {
  console.log(event);
}}>
      <FormLabel forId="search">Label</FormLabel>
      <Flex.Horizontal align="baseline">
        <Input id="search" type="search" value="Input ..." selectAll={true} onSubmit={event => {
      console.log('Input.onSubmit', event);
    }} onChange={({
      value
    }) => {
      console.log('onChange:', value);
    }} />
        <Form.SubmitButton />
      </Flex.Horizontal>
    </Form.Handler>)
```


### Input with clear button

Pushing the clear button will clear the input.


```tsx
render(<Flex.Vertical>
      <Input showClearButton={true} value="Value ..." size="medium" />
      <Input showClearButton={true} value="Value ..." type="search" />
      <Input showClearButton={true} value="Value ..." icon="loupe" type="search" />
    </Flex.Vertical>)
```


### Prevent typing of invalid characters

You can check out the [Field.String](/uilib/extensions/forms/base-fields/String/#prevent-typing-of-invalid-characters) example for more information using `onInput` event handler property.

### Input password type

The password component has to ensure that there is still room for password managers to inject the input with their UX functionality.

Read more about it in [Field.Password](/uilib/extensions/forms/feature-fields/more-fields/Password/).


  
```tsx
<FieldBlock label="Left aligned">
      <Flex.Vertical>
        <Input value="Plain" />
        <Input value="Search" type="search" />
        <Input value="Search" size="medium" type="search" />
        <Input value="Search" size="large" type="search" />
        <Input value="Value Eu pretium sit magnis suscipit cursus dis proin rutrum elementum" icon="calendar" />
        <Input placeholder="Placeholder Eu pretium sit magnis suscipit cursus dis proin rutrum elementum" iconPosition="right" icon="calendar" />
        <Input size="medium" value="Value" icon="calendar" />
        <Input size="medium" placeholder="Placeholder" iconPosition="right" icon="calendar" />
        <Input size="large" value="Value" icon="calendar" />
        <Input size="large" placeholder="Placeholder" iconPosition="right" icon="calendar" />
      </Flex.Vertical>
    </FieldBlock>
<FieldBlock top label="Right aligned">
      <Flex.Vertical>
        <Input value="Plain" align="right" />
        <Input value="Search" type="search" align="right" />
        <Input value="Search" size="medium" type="search" align="right" />
        <Input value="Search" size="large" type="search" align="right" />
        <Input value="Value Eu pretium sit magnis suscipit cursus dis proin rutrum elementum" icon="calendar" align="right" />
        <Input placeholder="Placeholder Eu pretium sit magnis suscipit cursus dis proin rutrum elementum" iconPosition="right" icon="calendar" align="right" />
        <Input size="medium" value="Value" icon="calendar" align="right" />
        <Input size="medium" placeholder="Placeholder" iconPosition="right" icon="calendar" align="right" />
        <Input size="large" value="Value" icon="calendar" align="right" />
        <Input size="large" placeholder="Placeholder" iconPosition="right" icon="calendar" align="right" />
      </Flex.Vertical>
    </FieldBlock>
```

## Properties


```json
{
  "props": {
    "value": {
      "doc": "The content value of the input.",
      "type": [
        "string",
        "number"
      ],
      "status": "optional"
    },
    "align": {
      "doc": "Defines the text alignment of the input. Can be `left`, `right` or `center`. Defaults to `left`.",
      "type": [
        "\"left\"",
        "\"center\"",
        "\"right\""
      ],
      "status": "optional"
    },
    "label": {
      "doc": "Prepends the Form Label component. If no ID is provided, a random ID is created.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "labelSrOnly": {
      "doc": "Use `true` to make the label only readable by screen readers.",
      "type": "boolean",
      "status": "optional"
    },
    "labelDirection": {
      "doc": "Use `labelDirection=\"horizontal\"` to change the label layout direction. Defaults to `vertical`.",
      "type": "string",
      "status": "optional"
    },
    "status": {
      "doc": "Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.",
      "type": [
        "\"error\"",
        "\"information\"",
        "boolean"
      ],
      "status": "optional"
    },
    "statusState": {
      "doc": "Defines the state of the status. Currently, there are two statuses `[error, information]`. Defaults to `error`.",
      "type": [
        "\"error\"",
        "\"information\""
      ],
      "status": "optional"
    },
    "statusProps": {
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
      "type": "React.ReactNode",
      "status": "optional"
    },
    "icon": {
      "doc": "Icon to show before or after the input / placeholder. Can be either a string defining a primary icon or a Component using an SVG icon of either 16px or 24px.",
      "type": [
        "string",
        "React.ReactNode"
      ],
      "status": "optional"
    },
    "iconPosition": {
      "doc": "Defines the position of icon inside the input. Set to `left` or `right`. Defaults to `left` if not set.",
      "type": "string",
      "status": "optional"
    },
    "iconSize": {
      "doc": "The icon size of the icon shows. Defaults to `medium`.",
      "type": "string",
      "status": "optional"
    },
    "keepPlaceholder": {
      "doc": "Set to `true` in case the `placeholder` has to be kept during focus. By default, the placeholder disappears on focus.",
      "type": "boolean",
      "status": "optional"
    },
    "inputClassName": {
      "doc": "In case we have to set a custom class on the input element.",
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
    "submitButtonTitle": {
      "doc": "Title attribute for the search/submit button. Only relevant when `type=\"search\"`.",
      "type": "string",
      "status": "optional"
    },
    "suffix": {
      "doc": "Text describing the content of the input more than the label. You can also send in a React component, so it gets wrapped inside the Input component.",
      "type": [
        "string",
        "React.ReactNode"
      ],
      "status": "optional"
    },
    "size": {
      "doc": "The sizes you can choose is `small` (1.5rem), `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`. Also, if you define a number like `size={2}` then it will be forwarded as the input element attribute.",
      "type": [
        "string",
        "number"
      ],
      "status": "optional"
    },
    "selectAll": {
      "doc": "If set to `true`, then the whole input value gets selected on the entry focus. A second click will place the cursor on the wanted position.",
      "type": "boolean",
      "status": "optional"
    },
    "showClearButton": {
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
    "inputAttributes": {
      "doc": "Provide the Input element with any attributes by using an Object `inputAttributes={{size:'2'}}` or a JSON Object `inputAttributes='{\"size\":\"2\"}'`. **NB:** Keep in mind, that also every not listed component property will be sent along and set as an Input element attribute.",
      "type": "object",
      "status": "optional"
    },
    "inputState": {
      "doc": "Defines a custom visual state of the input. Use it only if you have to simulate a custom state. Currently are three statuses `virgin`, `focus` and `dirty`. Defaults to `null`.",
      "type": "string",
      "status": "optional"
    },
    "submitElement": {
      "doc": "Accepts a React element which will show up like the \"submit button\" would do on `type=\"search\"`.",
      "type": [
        "string",
        "React.Element"
      ],
      "status": "optional"
    },
    "ref": {
      "doc": "By providing a `React.Ref` we can get the internally used input element (DOM), e.g. `ref={myRef}` by using `React.useRef(null)`.",
      "type": "React.RefObject",
      "status": "optional"
    },
    "inputElement": {
      "doc": "By providing a new component we can change the internally used element. Also supports a string only, like `inputElement=\"input\"`.",
      "type": [
        "string",
        "React.Element"
      ],
      "status": "internal"
    },
    "innerElement": {
      "doc": "By providing a new component to be rendered inside the \"shell\" – we can add a freely customizable internal element. Used by the Autocomplete component.",
      "type": [
        "string",
        "React.Element"
      ],
      "status": "internal"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## Translations


```json
{
  "locales": [
    "da-DK",
    "en-GB",
    "nb-NO",
    "sv-SE"
  ],
  "entries": {
    "Input.clearButtonTitle": {
      "nb-NO": "Nullstill",
      "en-GB": "Clear value",
      "sv-SE": "Återställ",
      "da-DK": "Nulstil"
    },
    "Input.submitButtonTitle": {
      "nb-NO": "Send",
      "en-GB": "Submit button",
      "sv-SE": "Skicka",
      "da-DK": "Indsend"
    }
  }
}
```

## Events


```json
{
  "props": {
    "onChange": {
      "doc": "Will be called on value changes made by the user. Returns an object with the value as a string and the native event: `{ value, event }`.",
      "type": "function",
      "status": "optional"
    },
    "onFocus": {
      "doc": "Will be called on focus set by the user. Returns `{ value, event }`.",
      "type": "function",
      "status": "optional"
    },
    "onKeyDown": {
      "doc": "Will be called on key down by the user. Returns `{ value, event }`.",
      "type": "function",
      "status": "optional"
    },
    "onBlur": {
      "doc": "Will be called on blur set by the user. Returns `{ value, event }`.",
      "type": "function",
      "status": "optional"
    },
    "onSubmit": {
      "doc": "Will be called on enter key press or submit button click. Returns `{ value, event }`.",
      "type": "function",
      "status": "optional"
    },
    "onSubmitFocus": {
      "doc": "Will be called on submit button focus. Only relevant when `type=\"search\"`. Returns `{ value, event }`.",
      "type": "function",
      "status": "optional"
    },
    "onSubmitBlur": {
      "doc": "Will be called on submit button blur. Only relevant when `type=\"search\"`. Returns `{ value, event }`.",
      "type": "function",
      "status": "optional"
    },
    "onClear": {
      "doc": "Will be called on a clear button click. Returns `{ value, previousValue, event }`.",
      "type": "function",
      "status": "optional"
    }
  }
}
```


### Manipulate the input value during typing

You have two possibilities to manipulate the value while a user is typing. Either you handle the value with your own state, or you return a modified value in the `onChange` event listener:

```jsx
import { formatNumber } from '@dnb/eufemia/components/number-format/NumberUtils'

function Component() {
  const onChangeHandler = ({ value }) => {
    return formatNumber(value)
  }

  return <Input onChange={onChangeHandler} />
}
```

### Prevent setting a new value

You can use e.g. `event.preventDefault()` during `onKeyDown`, or return false during `onChange`. They are not 100% the same user experience, but can both be useful in different use cases.

```jsx
function Component() {
  const onKeyDownHandler = ({ event }) => {
    event.preventDefault()
  }
  const onChangeHandler = ({ value }) => {
    return false
  }

  return <Input onKeyDown={onKeyDownHandler} onChange={onChangeHandler} />
}
```
