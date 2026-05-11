---
version: 11.2.2
generatedAt: 2026-05-11T08:17:54.734Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

```json
{
  "props": {
    "variant": {
      "doc": "The dialog variant. Can either be `information` or `confirmation`. Defaults to `information`.",
      "type": [
        "\"information\"",
        "\"confirmation\""
      ],
      "status": "optional"
    },
    "title": {
      "doc": "The dialog title. Displays on the very top of the content.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "minWidth": {
      "doc": "The minimum Dialog content width, defined by a CSS width value like `50vw` (50% of the viewport). Be careful on using fixed `minWidth` so you don't break responsiveness. Defaults to `30rem` (average width is set to `60vw`).",
      "type": [
        "string",
        "number"
      ],
      "status": "optional"
    },
    "maxWidth": {
      "doc": "The maximum Dialog content width, defined by a CSS width value like `20rem`. Defaults to `60rem` (average width is set to `60vw`).",
      "type": [
        "string",
        "number"
      ],
      "status": "optional"
    },
    "className": {
      "doc": "Give the Dialog content a class name (maps to `dnb-dialog`).",
      "type": "string",
      "status": "optional"
    },
    "spacing": {
      "doc": "If set to `false` then the dialog content will be shown without any spacing. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "preventCoreStyle": {
      "doc": "By default the dialog content gets added the core style class `dnb-core-style`. Use `false` to disable this behavior.",
      "type": "boolean",
      "status": "optional"
    },
    "navContent": {
      "doc": "The content which will appear in the navigation, above the header, and side-by-side the close button.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "headerContent": {
      "doc": "The content which will appear in the header of the dialog.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "modalContent": {
      "doc": "The content which will appear when triggering the dialog.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "description": {
      "doc": "A description will be positioned below the title, but before the content. Used for Dialog variant `confirmation` to further describe what the actions will do.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "verticalAlignment": {
      "doc": "Define the vertical alignment of the container. Can be set to `top` or `center`. Defaults to `center`.",
      "type": [
        "\"top\"",
        "\"center\""
      ],
      "status": "optional"
    },
    "alignContent": {
      "doc": "Define the inner horizontal alignment of the content. Can be set to `left`, `center`, `right` and `centered`. If `centered`, then the content will also be centered vertically. Defaults to `left`.",
      "type": [
        "\"left\"",
        "\"center\"",
        "\"centered\"",
        "\"right\""
      ],
      "status": "optional"
    },
    "fullscreen": {
      "doc": "If set to `true` then the dialog content will be shown as fullscreen, without showing the original content behind. Can be set to `false` to omit the auto fullscreen. Defaults to `auto`.",
      "type": [
        "boolean",
        "\"auto\""
      ],
      "status": "optional"
    },
    "icon": {
      "doc": "An icon to display at the top of the component. Should be of size medium, so make sure you import the `_medium` version of the Eufemia icon.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "confirmType": {
      "doc": "For variant confirmation, the dialog is either an informational (`information`) or a warning (`warning`) message. Defaults to `information`.",
      "type": [
        "\"information\"",
        "\"warning\""
      ],
      "status": "optional"
    },
    "declineText": {
      "doc": "For dialog actions, give a custom text for the decline button.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "confirmText": {
      "doc": "For dialog actions, give a custom text for the confirmation button.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "hideDecline": {
      "doc": "For variant confirmation, hide the default decline button and only show the confirmation button.",
      "type": "boolean",
      "status": "optional"
    },
    "hideConfirm": {
      "doc": "For variant confirmation, hide the default confirm button and only show the decline button.",
      "type": "boolean",
      "status": "optional"
    },
    "scrollRef": {
      "doc": "To get the scroll Element, pass in your own React ref.",
      "type": "React.RefObject",
      "status": "optional"
    },
    "scrollbarGutter": {
      "doc": "Reserves space for the scrollbar gutter, preventing layout shifts when content overflows. By default, it enables `stable` for the `information` variant with spacing. Set to `false` to disable.",
      "type": [
        "\"stable\"",
        "false"
      ],
      "status": "optional"
    },
    "contentRef": {
      "doc": "To get the inner content Element, pass in your own React ref.",
      "type": "React.RefObject",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```

## Properties


```json
{
  "props": {
    "variant": {
      "doc": "The dialog variant. Can either be `information` or `confirmation`. Defaults to `information`.",
      "type": [
        "\"information\"",
        "\"confirmation\""
      ],
      "status": "optional"
    },
    "title": {
      "doc": "The dialog title. Displays on the very top of the content.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "minWidth": {
      "doc": "The minimum Dialog content width, defined by a CSS width value like `50vw` (50% of the viewport). Be careful on using fixed `minWidth` so you don't break responsiveness. Defaults to `30rem` (average width is set to `60vw`).",
      "type": [
        "string",
        "number"
      ],
      "status": "optional"
    },
    "maxWidth": {
      "doc": "The maximum Dialog content width, defined by a CSS width value like `20rem`. Defaults to `60rem` (average width is set to `60vw`).",
      "type": [
        "string",
        "number"
      ],
      "status": "optional"
    },
    "className": {
      "doc": "Give the Dialog content a class name (maps to `dnb-dialog`).",
      "type": "string",
      "status": "optional"
    },
    "spacing": {
      "doc": "If set to `false` then the dialog content will be shown without any spacing. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "preventCoreStyle": {
      "doc": "By default the dialog content gets added the core style class `dnb-core-style`. Use `false` to disable this behavior.",
      "type": "boolean",
      "status": "optional"
    },
    "navContent": {
      "doc": "The content which will appear in the navigation, above the header, and side-by-side the close button.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "headerContent": {
      "doc": "The content which will appear in the header of the dialog.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "modalContent": {
      "doc": "The content which will appear when triggering the dialog.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "description": {
      "doc": "A description will be positioned below the title, but before the content. Used for Dialog variant `confirmation` to further describe what the actions will do.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "verticalAlignment": {
      "doc": "Define the vertical alignment of the container. Can be set to `top` or `center`. Defaults to `center`.",
      "type": [
        "\"top\"",
        "\"center\""
      ],
      "status": "optional"
    },
    "alignContent": {
      "doc": "Define the inner horizontal alignment of the content. Can be set to `left`, `center`, `right` and `centered`. If `centered`, then the content will also be centered vertically. Defaults to `left`.",
      "type": [
        "\"left\"",
        "\"center\"",
        "\"centered\"",
        "\"right\""
      ],
      "status": "optional"
    },
    "fullscreen": {
      "doc": "If set to `true` then the dialog content will be shown as fullscreen, without showing the original content behind. Can be set to `false` to omit the auto fullscreen. Defaults to `auto`.",
      "type": [
        "boolean",
        "\"auto\""
      ],
      "status": "optional"
    },
    "icon": {
      "doc": "An icon to display at the top of the component. Should be of size medium, so make sure you import the `_medium` version of the Eufemia icon.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "confirmType": {
      "doc": "For variant confirmation, the dialog is either an informational (`information`) or a warning (`warning`) message. Defaults to `information`.",
      "type": [
        "\"information\"",
        "\"warning\""
      ],
      "status": "optional"
    },
    "declineText": {
      "doc": "For dialog actions, give a custom text for the decline button.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "confirmText": {
      "doc": "For dialog actions, give a custom text for the confirmation button.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "hideDecline": {
      "doc": "For variant confirmation, hide the default decline button and only show the confirmation button.",
      "type": "boolean",
      "status": "optional"
    },
    "hideConfirm": {
      "doc": "For variant confirmation, hide the default confirm button and only show the decline button.",
      "type": "boolean",
      "status": "optional"
    },
    "scrollRef": {
      "doc": "To get the scroll Element, pass in your own React ref.",
      "type": "React.RefObject",
      "status": "optional"
    },
    "scrollbarGutter": {
      "doc": "Reserves space for the scrollbar gutter, preventing layout shifts when content overflows. By default, it enables `stable` for the `information` variant with spacing. Set to `false` to disable.",
      "type": [
        "\"stable\"",
        "false"
      ],
      "status": "optional"
    },
    "contentRef": {
      "doc": "To get the inner content Element, pass in your own React ref.",
      "type": "React.RefObject",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


### More properties

The properties of [Modal](/uilib/components/modal) formatted as camel case are also provided.
See the table below:


```json
{
  "props": {
    "id": {
      "doc": "The id used internal for the trigger button and Modal component.",
      "type": "string",
      "status": "optional"
    },
    "contentId": {
      "doc": "Defines a unique identifier to a modal. Use it in case you have to refer in some way to the modal content.",
      "type": "string",
      "status": "optional"
    },
    "labelledBy": {
      "doc": "The ID of the trigger component, describing the modal content. Defaults to the internal `trigger`, so make sure you define the `title` in `triggerAttributes`.",
      "type": "string",
      "status": "optional"
    },
    "children": {
      "doc": "The content which will appear when triggering open the modal. If a function is given, you get a close method `() => ({ close })` in the arguments.",
      "type": [
        "React.ReactNode",
        "function"
      ],
      "status": "optional"
    },
    "fullscreen": {
      "doc": "If set to `true` then the modal content will be shown as fullscreen, without showing the original content behind. Can be set to `false` to omit the auto fullscreen. Defaults to `auto`.",
      "type": [
        "boolean",
        "string"
      ],
      "status": "optional"
    },
    "open": {
      "doc": "Use this property to control the open/close state by setting `true` / `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "openDelay": {
      "doc": "Forces the modal to delay the opening. The delay is given in `ms`.",
      "type": [
        "number",
        "string"
      ],
      "status": "optional"
    },
    "disabled": {
      "doc": "Will disable the trigger button.",
      "type": "boolean",
      "status": "optional"
    },
    "noAnimation": {
      "doc": "If set to `true`, no open/close animation will be shown. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "noAnimationOnMobile": {
      "doc": "Same as `noAnimation`, but gets triggered only if the viewport width is less than `40em`. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "animationDuration": {
      "doc": "Duration of animation open/close in ms. Defaults to `300ms`.",
      "type": [
        "number",
        "string"
      ],
      "status": "optional"
    },
    "preventClose": {
      "doc": "If set to `true` (boolean or string), then the user can't close the modal.",
      "type": "boolean",
      "status": "optional"
    },
    "preventOverlayClose": {
      "doc": "Disable clicking the background overlay to close the modal. PS! Pressing `esc` key will still close the modal.",
      "type": "boolean",
      "status": "optional"
    },
    "openModal": {
      "doc": "Set a function to call the callback function, once the modal should open: `openModal={(open) => open()}`.",
      "type": "function",
      "status": "optional"
    },
    "closeModal": {
      "doc": "Set a function to call the callback function, once the modal should close: `closeModal={(close) => close()}`.",
      "type": "function",
      "status": "optional"
    },
    "focusSelector": {
      "doc": "The Modal handles the first focus – automatically. However, you can define a custom focus selector the will be used instead `focusSelector=\".css-selector\"`.",
      "type": "string",
      "status": "optional"
    },
    "overlayClass": {
      "doc": "Give the page overlay a custom class name (maps to `dnb-modal__overlay`).",
      "type": "string",
      "status": "optional"
    },
    "contentClass": {
      "doc": "Give the content wrapper a custom class name (maps to `dnb-modal__content`).",
      "type": "string",
      "status": "optional"
    },
    "omitTriggerButton": {
      "doc": "Omits default showing trigger button.",
      "type": "boolean",
      "status": "optional"
    },
    "trigger": {
      "doc": "Provide a custom trigger component. Like `trigger={<Anchor href=\"/\" />}`. It will set the focus on it when the modal gets closed.",
      "type": [
        "React.ReactNode",
        "function"
      ],
      "status": "optional"
    },
    "triggerAttributes": {
      "doc": "Send along with custom HTML attributes or properties to the trigger button.",
      "type": "Various",
      "status": "optional"
    },
    "dialogTitle": {
      "doc": "The aria label of the dialog when no labelledBy and no title is given. Defaults to `Vindu`.",
      "type": "string",
      "status": "optional"
    },
    "directDomReturn": {
      "doc": "If true, the modal will not open in a new DOM but directly in current DOM. Defaults to `false`. Be aware of the side effects of setting this property to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "bypassInvalidationSelectors": {
      "doc": "Define an array with HTML class selectors (`['.element-selector']`) which should not get invalidated when the modal opens/closes. Use this in order to let some parts of your site still be accessible by screen readers.",
      "type": "Array<string>",
      "status": "optional"
    },
    "scrollRef": {
      "doc": "To get the scroll Element, pass in your own React ref.",
      "type": "React.RefObject",
      "status": "optional"
    },
    "contentRef": {
      "doc": "To get the inner content Element, pass in your own React ref.",
      "type": "React.RefObject",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    },
    "spacing": {
      "doc": "If set to `false` then the modal content will be shown without any spacing. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "title": {
      "doc": "The modal/drawer title. Displays on the very top of the content.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "modalContent": {
      "doc": "The content which will appear when triggering the modal/drawer. Alternative to `children`.",
      "type": [
        "React.ReactNode",
        "function"
      ],
      "status": "optional"
    },
    "barContent": {
      "doc": "The content which will appear in the bar, above the header, and side-by-side the close button.",
      "type": [
        "React.ReactNode",
        "function"
      ],
      "status": "optional"
    },
    "headerContent": {
      "doc": "The content which will appear in the header of the modal/drawer.",
      "type": [
        "React.ReactNode",
        "function"
      ],
      "status": "optional"
    },
    "minWidth": {
      "doc": "The minimum Modal content width, defined by a CSS width value like `50vw` (50% of the viewport). Be careful on using fixed `minWidth` so you don't break responsiveness. Defaults to `30rem`.",
      "type": [
        "string",
        "number"
      ],
      "status": "optional"
    },
    "maxWidth": {
      "doc": "The maximum Modal content width, defined by a CSS width value like `20rem`. Defaults to `60rem`.",
      "type": [
        "string",
        "number"
      ],
      "status": "optional"
    },
    "alignContent": {
      "doc": "Define the inner horizontal alignment of the content. Can be set to `left`, `center`, `right` and `centered`. If `centered`, then the content will also be centered vertically. Defaults to `left`.",
      "type": [
        "\"left\"",
        "\"center\"",
        "\"centered\"",
        "\"right\""
      ],
      "status": "optional"
    },
    "containerPlacement": {
      "doc": "For `drawer` mode only. Defines the placement on what side the Drawer should be opened. Defaults to `right`.",
      "type": [
        "\"left\"",
        "\"right\"",
        "\"top\"",
        "\"bottom\""
      ],
      "status": "optional"
    },
    "verticalAlignment": {
      "doc": "Define the vertical alignment of the container. Defaults to `center`.",
      "type": [
        "\"top\"",
        "\"center\""
      ],
      "status": "optional"
    },
    "closeTitle": {
      "doc": "The title of the close button. Defaults to _Lukk_.",
      "type": "string",
      "status": "optional"
    },
    "hideCloseButton": {
      "doc": "If `true`, the close button will not be shown.",
      "type": "boolean",
      "status": "optional"
    }
  }
}
```


## Translations


```json
{
  "locales": [
    "da-DK",
    "en-GB",
    "nb-NO",
    "sv-SE"
  ],
  "entries": {
    "Dialog.confirmText": {
      "nb-NO": "Godta",
      "en-GB": "Confirm",
      "sv-SE": "Godkänn",
      "da-DK": "Godkend"
    },
    "Dialog.declineText": {
      "nb-NO": "Avbryt",
      "en-GB": "Cancel",
      "sv-SE": "Avbryt",
      "da-DK": "Annuller"
    },
    "Modal.closeTitle": {
      "nb-NO": "Lukk",
      "en-GB": "Close",
      "sv-SE": "Stäng",
      "da-DK": "Luk"
    },
    "Modal.dialogTitle": {
      "nb-NO": "Separat Vindu",
      "en-GB": "Dialog Window",
      "sv-SE": "Separat fönster",
      "da-DK": "Separat vindue"
    }
  }
}
```

## Events


```json
{
  "props": {
    "onConfirm": {
      "doc": "For variant confirmation, handle the confirm action click. Provided with the mouse event and the Modal function `close` as arguments.",
      "type": "function",
      "status": "optional"
    },
    "onDecline": {
      "doc": "For variant confirmation, handle the decline action click. Provided with the mouse event and the Modal function `close` as arguments.",
      "type": "function",
      "status": "optional"
    }
  }
}
```


Dialog also includes the same events as [Modal](/uilib/components/modal), only formatted as camel case.


```json
{
  "props": {
    "onOpen": {
      "doc": "This event gets triggered once the modal shows up. Returns the modal id: `{ id }`.",
      "type": "function",
      "status": "optional"
    },
    "onClose": {
      "doc": "This event gets triggered once the modal gets closed. Returns the modal id: `{ id, event, triggeredBy }`.",
      "type": "function",
      "status": "optional"
    },
    "onClosePrevent": {
      "doc": "This event gets triggered once the user tries to close the modal, but `preventClose` is set to `true`. Returns a callback `close` you can call to trigger the close mechanism. More details below. Returns the modal id: `{ id, event, close: Method, triggeredBy }`.",
      "type": "function",
      "status": "optional"
    }
  }
}
```
