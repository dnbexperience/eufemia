---
showTabs: true
---

import {
ModalExampleStandard,
ModalExampleStateOnly,
ModalExampleCloseByHandler
} from 'Docs/uilib/components/modal/Examples'

## Demos

The following examples are to demonstrate the functionality of Modal. Please go to [Drawer demos](/uilib/components/drawer/demos) or [Dialog demos](/uilib/components/dialog/demos) for complete component demos.

### Example

<ModalExampleStandard />

### Open Modal by the state only

Use a custom trigger button and state handling by setting `omitTriggerButton` to Modal.

<ModalExampleStateOnly />

### Close Modal by handlers

Use the `close_modal` prop to set another close handler, like a timeout for when the modal should close.

<ModalExampleCloseByHandler />
