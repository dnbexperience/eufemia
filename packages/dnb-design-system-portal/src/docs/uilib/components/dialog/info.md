---
showTabs: true
---

## Description

The Dialog component is a [Modal](/uilib/components/modal) variation that appears at the center of the screen. The Dialog has similar functionality to a traditional popup window and is mostly used for informational purposes (for example explaining a word on the page). Similar to Modal, it has to be triggered by the user to appear. Typical usage would be to read an explanation, then closing it.

### Parts in Dialog

To provide custom content to parts of the Dialog, a set of component parts are provided:

- `<Dialog.Navigation>`: The navigation field at the top of the component, default with a close button (Equal to the prop `navContent`).
- `<Dialog.Header>`: The header field of the component, where the `title` will appear (Equal to the prop `headerContent`).

### More detailed information

For more details regarding the component functionality, check out the [Modal documentation](/uilib/components/modal).

#### Converting from Modal

If you are converting from `<Modal />` to `<Dialog />`, there are a few differences you need to take into consideration:

- All `trigger_*` props are not supported for Dialog, use `triggerAttributes` instead to pass in props for the trigger button.
- Only camelCase props are supported for Dialog, so you will need to update the prop names.
- `Modal.Inner`/`Modal.Content` converts to `Dialog.Body`.
- `Modal.Bar` converts to `Dialog.Navigaton`.
- `Modal` was a class component and `Dialog` is a functional component.
