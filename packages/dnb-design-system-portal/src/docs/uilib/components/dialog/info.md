---
showTabs: true
---

import InlineImg from 'dnb-design-system-portal/src/shared/tags/Img'
import DialogConfirmExample from 'Docs/uilib/components/dialog/assets/dialog_confirm.png'
import DialogInformExample from 'Docs/uilib/components/dialog/assets/dialog_inform.png'

## Description

The Dialog component is a [Modal](/uilib/components/modal) variation that appears at the center of the screen. The Dialog has similar functionality to a traditional popup window. Similar to Modal, it has to be triggered by the user to appear. Typical usage would be to read an explanation, then closing it.

### Variants

There are two variants of the Dialog component: `information` and `confirmation`.

<InlineImg height="230" width="auto" src={DialogInformExample} caption="Example of an informational Dialog" className="mint-green-12" />
<InlineImg height="230" width="auto" src={DialogConfirmExample} caption="Example of a confirmation Dialog" className="mint-green-12" />

The informational variant (`information`) is used for informational purposes, for example explaining a word/something on the page. It has to be triggered by the user to appear. Typical usage for it would be to read an explanation, then closing it.

The confirmation variant (`confirmation`) is used when some action is needed, or if we have to inform of something without the users triggering it. A couple of examples would be a scenario where the user confirms to delete something, or if the user has been logged out automatically, which we would need to inform of, or a cookie consent dialogue.

### Parts in Dialog

To provide custom content to parts of the Dialog, a set of component parts are provided:

- `<Dialog.Navigation>`: The navigation field at the top of the component, default with a close button (Equal to the prop `navContent`).
- `<Dialog.Header>`: The header field of the component, where the `title` will appear (Equal to the prop `headerContent`).
- `<Dialog.Actions>`: An optional field for buttons at the bottom of the component. This field will appear by default for variant `confirmation`.

### More detailed information

For more details regarding the component functionality, check out the [Modal documentation](/uilib/components/modal).

#### Converting from Modal

If you are converting from `<Modal />` to `<Dialog />`, there are a few differences you need to take into consideration:

- All `trigger_*` props are not supported for Dialog, use `triggerAttributes` instead to pass in props for the trigger button.
  - Change prop `trigger_hidden` to `omitTriggerButton` to omit the default trigger button from Modal.
- Only camelCase props are supported for Dialog, so you will need to update the prop names.
- `Modal.Inner`/`Modal.Content` converts to `Dialog.Body`.
- `Modal.Bar` converts to `Dialog.Navigaton`.
- `Modal` was a class component and `Dialog` is a functional component.
