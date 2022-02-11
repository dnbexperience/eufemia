---
showTabs: true
---

import {
ModalExampleModeCustom,
ModalExampleStateOnly,
ModalExampleCloseByHandler
} from 'Docs/uilib/components/modal/Examples'

## Demos

The following examples are to demonstrate the functionality of Modal. Please go to [Drawer demos](/uilib/components/drawer/demos) or [Dialog demos](/uilib/components/drawer/demos) for complete component demos.

### Mode custom

Use `mode="custom"` in the Modal component to create other components with overlay.

<ModalExampleModeCustom />

### Open Modal by the state only

Use a custom trigger button and state handling by setting `hidden` for the default trigger button.

<ModalExampleStateOnly />

### Close Modal by handlers

Use the `close_modal` prop to set another close handler, like a timeout for when the modal should close.

<ModalExampleCloseByHandler />
