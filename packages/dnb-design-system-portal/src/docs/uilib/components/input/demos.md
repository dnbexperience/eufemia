---
showTabs: true
---

import {
ScreenshotTests,
InputExampleDefault,
InputExampleSearch,
InputExampleMedium,
InputExampleWithIcon,
InputExampleDisabled,
InputExampleFailureStatus,
InputExampleFormStatus,
InputExampleSuffix,
InputExampleStretched,
InputExampleNumbers,
InputExamplePassword,
InputExampleSubmit,
InputExampleClear
} from 'Docs/uilib/components/input/Examples'

## Demos

### Placeholder text

<InputExampleDefault />

### Search text placeholder

<InputExampleSearch />

### Medium and stretched search input

<InputExampleMedium />

### Input with icon

With left / right aligned text

<InputExampleWithIcon />

### Disabled input

<InputExampleDisabled />

### Show failure status

<InputExampleFailureStatus />

### With FormStatus

<InputExampleFormStatus />

### Input with suffix (additional description)

<InputExampleSuffix />

### Stretched `Input` in horizontal wrapping `FormRow` and a long label

<InputExampleStretched />

### Numbers are using DNB Mono (monospace)

Also, this example manipulates the value during typing.

<InputExampleNumbers />

### Submit Form with Input

Pressing the enter key will trigger a submit.

<InputExampleSubmit />

### Input with clear button

Pushing the clear button or pressing the esc key will clear the input.

<InputExampleClear />

### Input password type

The password component have to ensure that there is still room for password managers to inject the input with their UX functionality.

In order to get the show/hide button, you may have to import the component like so:

```js
import InputPassword from '@dnb/eufemia/components/input/InputPassword'
```

<InputExamplePassword />

<ScreenshotTests />
