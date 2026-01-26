---
title: 'Form.SubmitConfirmation'
description: '`Form.SubmitConfirmation` can be used to prevent the `Form.Handler` from submitting, and makes it possible to show a confirmation dialog in different scenarios.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.942Z
checksum: 7bf2130a8c9d87f05ba44fb9f83d48ee659850d6119e13e570398d54a7d4d582
---

# Form.SubmitConfirmation

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.SubmitConfirmation />)
```

## Description

`Form.SubmitConfirmation` can be used to prevent the [Form.Handler](/uilib/extensions/forms/Form/Handler/) from submitting, and makes it possible to show a confirmation dialog in different scenarios.

```jsx
import { Dialog } from '@dnb/eufemia'
import { Form } from '@dnb/eufemia/extensions/forms'
render(
  <Form.Handler
    onSubmit={async () => {
      // Your submit request
    }}
  >
    Content...
    <Form.SubmitButton />
    <Form.SubmitConfirmation
      preventSubmitWhen={(submitState) => {
        // Your preventSubmitWhen logic
      }}
      onStateChange={(parameters) => {
        // Your onStateChange logic
      }}
      renderWithState={(parameters) => {
        return 'Your content'
      }}
    />
  </Form.Handler>
)
```

The `renderWithState` function is called whenever the submit confirmation state changes. It receives an object as the first parameter, which contains:

- `connectWithDialog` lets you connect the submit confirmation with a [Dialog](/uilib/components/dialog).
- `submitHandler` is a function that can be called to submit the form.
- `cancelHandler` is a function that can be called to cancel the form.
- `setConfirmationState` is a function that can be called to update the submit state.
- `confirmationState` is a string that can be used to determine the current state of the submit confirmation:
  - `idle`
  - `readyToBeSubmitted`
  - `submitInProgress`
  - `submissionComplete`
- `submitState` is the state of the `onSubmit` form event:
  - `error`
  - `info`
  - `warning`
  - `success`
  - `customStatus` Your custom status.
- `data` is the data that was submitted.

## Connect with a Dialog

You can connect the submit confirmation with a [Dialog](/uilib/components/dialog) by using the `connectWithDialog` property. This property is an object that contains the `openState`, `onConfirm`, `onDecline`, and `onClose` properties, which you can spread to the Dialog component.

```jsx
import { Dialog } from '@dnb/eufemia'
import { Form } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Form.SubmitConfirmation
      renderWithState={({ connectWithDialog }) => {
        return (
          <Dialog
            variant="confirmation"
            title="Dialog confirmation title"
            description="Some content describing the situation."
            {...connectWithDialog}
          />
        )
      }}
    />
  </Form.Handler>
)
```

## Using the submitHandler and cancelHandler

In addition to `connectWithDialog`, there are the `submitHandler` and `cancelHandler` functions, available to handle the submission and cancellation processes:

```jsx
<Form.SubmitConfirmation
  renderWithState={({ submitHandler, cancelHandler }) => {
    return (
      <>
        <Button onClick={submitHandler} text="Submit" />
        <Button onClick={cancelHandler} text="Cancel" />
      </>
    )
  }}
/>
```

## Accessibility

When the `cancelHandler` is called or the `onSubmit` event is completed, the [Form.SubmitButton](/uilib/extensions/forms/Form/SubmitButton/) will regain focus.

## Demos

### With confirmation dialog

```tsx
render(
  <Form.Handler
    locale="en-GB"
    onSubmit={async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }}
  >
    <Flex.Stack>
      <Field.String label="Label" path="/foo" defaultValue="foo" />
      <Form.SubmitButton />
    </Flex.Stack>

    <Form.SubmitConfirmation
      preventSubmitWhen={() => true}
      renderWithState={({ connectWithDialog }) => {
        return (
          <Dialog
            variant="confirmation"
            title="Dialog confirmation title"
            description="Some content describing the situation."
            {...connectWithDialog}
          />
        )
      }}
    />
  </Form.Handler>
)
```

### Enable and disable the confirmation mechanism

This example makes first an ordinary submit request. But when the custom status is returned, the dialog component will be shown.

```tsx
render(
  <Form.Handler
    locale="en-GB"
    onSubmit={async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return {
        customStatus: 'My custom status',
      }
    }}
  >
    <Flex.Stack>
      <Field.String label="Label" path="/foo" defaultValue="foo" />
      <Form.SubmitButton />
    </Flex.Stack>

    <Form.SubmitConfirmation
      onSubmitResult={({ submitState, setConfirmationState }) => {
        if (submitState && submitState.customStatus) {
          setConfirmationState('readyToBeSubmitted')
        }
      }}
      renderWithState={({ connectWithDialog, submitState }) => {
        return (
          <Dialog
            variant="confirmation"
            title="Dialog confirmation title"
            description="Some content describing the situation."
            confirmText="Send"
            {...connectWithDialog}
          >
            <Section
              variant="info"
              innerSpace={{
                top: true,
                bottom: true,
              }}
              top
            >
              <Flex.Stack>
                <Field.String label="Inside the dialog" path="/foo" />
                <Form.Isolation
                  onChange={console.log}
                  data={{
                    bar: submitState ? submitState.customStatus : 'bar',
                  }}
                >
                  <Field.String label="Isolated" path="/bar" />
                </Form.Isolation>
              </Flex.Stack>
            </Section>
          </Dialog>
        )
      }}
    />
  </Form.Handler>
)
```

### Render different content based on the submit state

```tsx
render(
  <Form.Handler
    locale="en-GB"
    onSubmit={async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }}
  >
    <Form.SubmitConfirmation
      preventSubmitWhen={() => true}
      onStateChange={({ confirmationState }) => {
        console.log('onStateChange', confirmationState)
      }}
      renderWithState={({ confirmationState, connectWithDialog }) => {
        let content = null
        switch (confirmationState) {
          case 'readyToBeSubmitted':
            content = <>Is waiting ...</>
            break
          case 'submitInProgress':
            content = <>Submitting...</>
            break
          case 'submissionComplete':
            content = <>Complete!</>
            break
          default:
            content = (
              <Flex.Stack>
                <Field.String
                  label="Label"
                  path="/foo"
                  defaultValue="foo"
                />
                <Form.SubmitButton />
              </Flex.Stack>
            )
            break
        }
        return (
          <>
            {content}
            <Dialog
              variant="confirmation"
              title="Dialog confirmation title"
              description="Some content describing the situation."
              {...connectWithDialog}
            />
          </>
        )
      }}
    />
  </Form.Handler>
)
```

## Properties

```json
{
  "preventSubmitWhen": {
    "doc": "Use this function to prevent the original `onSubmit` from being called. It receives an object as the first parameter. Read more about the parameters in the info section. It should return a boolean value that determines whether the confirmation routine (submit prevention) should be active or not. It defaults to be active by default.",
    "type": "function",
    "status": "optional"
  },
  "renderWithState": {
    "doc": "This function is called whenever the submit confirmation state changes. It receives an object as the first parameter. Read more about the parameters in the info section. The function is expected to return a React Element to render.",
    "type": "function",
    "status": "optional"
  }
}
```

## Events

```json
{
  "onSubmitResult": {
    "doc": "This function is called whenever the `onSubmit` event returns a result. It receives an object as the first parameter, including the `submitState`. Read more about the parameters in the info section.",
    "type": "function",
    "status": "optional"
  },
  "onStateChange": {
    "doc": "This function is called whenever the submit confirmation state changes. It takes an object as the first parameter. Read more about the parameters in the info section.",
    "type": "function",
    "status": "optional"
  }
}
```
