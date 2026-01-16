---
title: 'InfoOverlay'
description: '`Form.InfoOverlay` is used to display an informational message that fully covers the available space.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Form/InfoOverlay/metadata.json
---

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.InfoOverlay />)
```

## Description

`Form.InfoOverlay` is used to display an informational message that fully covers the available space. It can show a custom message or content, a `success` message as a receipt, or an `error` message to indicate an issue.

## Usage

By default the given children will be shown.
This can also be achieved by setting `content={undefined}` or by `Form.InfoOverlay.setContent(myId, undefined)`.

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Form.InfoOverlay>visible content</Form.InfoOverlay>
  </Form.Handler>,
)
```

## Display a message

There are two ways to display a message:

- Using the `Form.InfoOverlay.setContent` method.
- Using the `content` property.

### Using the `Form.InfoOverlay.setContent` method

You can show the success or error message by using the `Form.InfoOverlay.setContent` method:

```tsx
Form.InfoOverlay.setContent(myId, <>info content</>)
// or
Form.InfoOverlay.setContent(myId, 'success')
// or
Form.InfoOverlay.setContent(myId, 'error')
// or to display the fallback content
Form.InfoOverlay.setContent(myId, undefined)
```

And render the component with an `id` property:

```tsx
<Form.InfoOverlay id={myId}>content</Form.InfoOverlay>
```

You can call it whenever you need to show the success message. Here is an example of how to use it.

**Note:** the `id` property is inherited from the `Form.Handler` component in this example.

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'

// myFormId can be anything, as long as it's a unique instance
const myFormId = () => null

render(
  <Form.Handler
    id={myFormId}
    onSubmit={async () => {
      // 1. Send the request

      // 2. Show the success message
      Form.InfoOverlay.setContent(myFormId, 'success')
    }}
  >
    <Form.InfoOverlay>fallback content</Form.InfoOverlay>
  </Form.Handler>,
)
```

### Using the `content` property

You can show the success or error message by using the `content` property:

```tsx
<Form.InfoOverlay content={<>info content</>}>fallback content</Form.InfoOverlay>
<Form.InfoOverlay content="success">fallback content</Form.InfoOverlay>
<Form.InfoOverlay content="error">fallback content</Form.InfoOverlay>
```

## Customization of the `success` and `error` messages

You can customize the `success` and `error` messages by using the `success` and `error` properties.

```tsx
<Form.InfoOverlay
  success={{
    title: 'Custom title',
    description: 'Custom description',
    buttonText: 'Custom button text',
    buttonHref: 'http://custom',
    buttonClickHandler: () => {},
  }}
  error={{
    title: 'Custom title',
    description: 'Custom description',
    cancelButton: 'Custom cancel',
    retryButton: 'Custom retry',
    retryingText: 'Custom retrying text',
  }}
>
  fallback content
</Form.InfoOverlay>
```

## Accessibility

The component will manage focus handling, which is important for screen readers and users using keyboard navigation.

## Demos

### Error message

```tsx
// myFormId can be anything, as long as it's a unique instance
const myFormId = () => null
render(
  <Form.Handler
    id={myFormId}
    onSubmit={async () => {
      await request(1000) // Simulate a request

      Form.InfoOverlay.setContent(myFormId, 'error')
    }}
  >
    <Form.InfoOverlay>
      <Form.Card>
        <Field.Email />
        <Form.ButtonRow>
          <Form.SubmitButton variant="send" />
          <Button
            variant="secondary"
            onClick={() => {
              Form.InfoOverlay.setContent(myFormId, 'error')
            }}
          >
            Show error
          </Button>
        </Form.ButtonRow>
      </Form.Card>
    </Form.InfoOverlay>
  </Form.Handler>,
)
```

### Success message

```tsx
// myFormId can be anything, as long as it's a unique instance
const myFormId = () => null
render(
  <Form.Handler
    id={myFormId}
    onSubmit={async () => {
      await request(1000) // Simulate a request

      Form.InfoOverlay.setContent(myFormId, 'success')
    }}
  >
    <Form.InfoOverlay>
      <Form.Card>
        <Field.Email />
        <Form.SubmitButton variant="send" />
      </Form.Card>
    </Form.InfoOverlay>
  </Form.Handler>,
)
```

### With a Wizard

```tsx
// myFormId can be anything, as long as it's a unique instance
const myFormId = () => null
render(
  <Form.Handler
    id={myFormId}
    onSubmit={async () => {
      await request(1000)
      Form.InfoOverlay.setContent(myFormId, 'success')
    }}
  >
    <Form.InfoOverlay>
      <Wizard.Container
        onStepChange={async () => {
          await request(1000)
        }}
      >
        <Wizard.Step title="Step 1">
          <Form.Card>
            <Field.String path="/someInfo" label="Some information" />
          </Form.Card>
          <Wizard.NextButton />
        </Wizard.Step>
        <Wizard.Step title="Step 2">
          <Form.Card>
            <Field.String path="/more" label="More information" />
          </Form.Card>
          <Form.SubmitButton variant="send" />
        </Wizard.Step>
      </Wizard.Container>
    </Form.InfoOverlay>
  </Form.Handler>,
)
```
