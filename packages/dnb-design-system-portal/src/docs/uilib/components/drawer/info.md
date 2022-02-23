---
showTabs: true
---

## Description

The Drawer component is a [Modal](/uilib/components/modal) variation that appears as a side panel at any chosen side of the page; top, bottom, left or right (default `right`). A Drawer is typically used to show additional information. It can also be used to have easy/quick tasks while being in context.

### Parts in Drawer

To provide custom content to parts of the Drawer, a set of component parts are provided:

- `<Drawer.Navigation>`: The navigation field at the top of the component, default with a close button (Equal to the prop `navContent`).
- `<Drawer.Header>`: The header field of the component, where the `title` will appear (Equal to the prop `headerContent`).
- `<Drawer.Body>`: The body of the Drawer, provided with a section background color, default `black-3` (Equal to the prop `modalContent`).

### More detailed information

For more details regarding the component functionality, check out the [Modal documentation](/uilib/components/modal).

#### Converting from Modal mode drawer

If you are converting from `<Modal mode="drawer" />` to `<Drawer />`, there are a few differences you need to take into consideration:

- All `trigger_*` props are not supported for Drawer, use `triggerAttributes` instead to pass in props for the trigger button.
- Only camelCase props are supported for Drawer, so you will need to update the prop names.
- `Modal.Inner`/`Modal.Content` converts to `Drawer.Body`.
- `Modal.Bar` converts to `Drawer.Navigaton`.
- `Modal` was a class component and `Drawer` is a functional component.
