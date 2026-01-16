---
title: 'Input'
description: 'The Input component is an umbrella component for all inputs which share the same style as the classic text input field.'
metadata: https://eufemia.dnb.no/uilib/components/input/metadata.json
---

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
  />,
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
  />,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
)
```
