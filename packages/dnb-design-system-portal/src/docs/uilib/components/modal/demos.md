---
showTabs: true
---

import {
ModalExampleDefault,
ModalExampleHelpButton,
ModalExampleDrawerHeader,
ModalExampleDrawerBasic,
ModalExampleFullscreen,
ModalExampleDelayClose,
ModalExampleCustomTrigger,
ModalExampleStateOnly,
ModalExampleCloseByCallback,
ModalExampleCloseByHandler,
ModalExampleProgressIndicator,
} from 'Pages/uilib/components/modal/Examples'

## Demos

### Triggered by the help button

<ModalExampleDefault />

### Help button and suffix

Most of the components do have a `suffix` property you can make use of.

<ModalExampleHelpButton />

### Drawer mode

<ModalExampleDrawerBasic />

### Drawer mode with custom header

<ModalExampleDrawerHeader />

### Fullscreen Modal, triggered by a tertiary button

<ModalExampleFullscreen />

### Hide the Close Button and Prevent Close for 1sec

<ModalExampleDelayClose />

### Custom trigger component

<ModalExampleCustomTrigger />

### Open Modal by state only

While the trigger button is not used anymore by using `trigger_hidden`.

<ModalExampleStateOnly />

### Close Modal by callback method

<ModalExampleCloseByCallback />

### Close Modal by handlers

With a `max_width` of `40rem`.

<ModalExampleCloseByHandler />

### ProgressIndicator inside a Modal

Also, `fullscreen` and `spacing` is disabled and the `align_content` is centered.

<ModalExampleProgressIndicator />
