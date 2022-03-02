---
showTabs: true
---

import {
DialogExampleDefault,
DialogExampleHelpButton,
DialogExampleFullscreen,
DialogExampleDelayClose,
DialogExampleCustomTrigger,
DialogExampleProgressIndicator,
FullDialogExample,
DialogConfirmDefault,
DialogConfirmDelete,
DialogConfirmLoggedOut,
DialogConfirmCookies,
} from 'Docs/uilib/components/dialog/Examples'

## Table of contents

1. [Inform demos](/uilib/components/dialog/demos#demos-for-variant-information)
1. [Confirm demos](/uilib/components/dialog/demos#demos-for-variant-confirmation)

## Demos for variant `information`

### Basic Dialog

<DialogExampleDefault />

### Dialog as help button

<DialogExampleHelpButton />

### Dialog with custom trigger

<DialogExampleCustomTrigger />

### Dialog with custom content

<FullDialogExample />

### Fullscreen Dialog

<DialogExampleFullscreen />

### Dialog as progress indicator

<DialogExampleProgressIndicator />

### Dialog with close delay

<DialogExampleDelayClose />

## Demos for variant `confirmation`

### Confirm dialog

<DialogConfirmDefault />

### Deletion Dialog

A `confirmType="warning"` will enhance the context by applying a red color to the icon, as in the deletion scenario.

<DialogConfirmDelete />

### Logged out Dialog

Use the `openState` prop to automatically trigger the Dialog, here demonstrated with a button for simplicity. You can also change the default confirm text and hide the decline button when suited.

<DialogConfirmLoggedOut />

### Cookie concent Dialog

Provide a custom set of buttons, like this cookie concent Dialog that has a `tertiary` "Administrate" button. Notice that the `close` function will be provided for every child of type [Button](/uilib/components/button) given to `Dialog.Actions`.

<DialogConfirmCookies />
