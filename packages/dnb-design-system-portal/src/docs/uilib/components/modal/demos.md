---
showTabs: true
---

import {
ModalExampleDefault,
ModalExampleHelpButton,
ModalExampleFullscreen,
ModalExampleDelayClose,
ModalExampleCustomTrigger,
ModalExampleStateOnly,
ModalExampleCloseByHandler,
ModalExampleProgressIndicator,
} from 'Docs/uilib/components/modal/Examples'

## Demos

### Triggered by the help button

<ModalExampleDefault />

### Help button and suffix

Most of the components do have a `suffix` property you can make use of.

<ModalExampleHelpButton />

### Fullscreen Modal, triggered by a tertiary button

<ModalExampleFullscreen />

### Hide the Close Button and Prevent Close for 1sec

<ModalExampleDelayClose />

### Custom trigger component

<ModalExampleCustomTrigger />

### Open Modal by state only

While the trigger button is not used anymore by using `trigger_hidden`.

<ModalExampleStateOnly />

### Close Modal by handlers

With a `max_width` of `40rem`.

<ModalExampleCloseByHandler />

### ProgressIndicator inside a Modal

Also, `fullscreen` and `spacing` is disabled and the `align_content` is centered.

<ModalExampleProgressIndicator />
