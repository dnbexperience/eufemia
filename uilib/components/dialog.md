---
title: 'Dialog'
description: 'The Dialog component is a Modal variation that appears at the center of the screen.'
version: 11.2.2
generatedAt: 2026-05-11T08:17:54.741Z
checksum: f91afb853f928a3457a9c398609a83c641460bd09d60035d0979063b35d264b0
---

# Dialog

## Import

```tsx
import { Dialog } from '@dnb/eufemia'
```

## Description

The Dialog component is a [Modal](/uilib/components/modal) variation that appears at the center of the screen. The Dialog has similar functionality to a traditional popup window. Similar to Modal, it has to be triggered by the user to appear. Typical usage would be to read an explanation, then close it.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=21007-9783)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/dialog)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/dialog)

### Variants

There are two variants of the Dialog component: `information` and `confirmation`.

<InlineImg
  height="230"
  width="auto"
  src={DialogInformExample}
  caption="Example of an informational Dialog"
/>
<InlineImg
  height="230"
  width="auto"
  src={DialogConfirmExample}
  caption="Example of a confirmation Dialog"
/>

The informational variant (`information`) is used for informational purposes, for example explaining a word or something on the page. It has to be triggered by the user to appear. Typical usage would be to read an explanation, then close it.

The confirmation variant (`confirmation`) is used when some action is needed, or if we need to inform the user of something without them triggering it. A couple of examples would be a scenario where the user confirms deleting something, or if the user has been logged out automatically and we need to inform them, or a cookie consent dialog.

### Parts in Dialog

To provide custom content to parts of the Dialog, a set of component parts are provided:

- `<Dialog.Navigation>`: The navigation field at the top of the component, default with a close button (Equal to the property `navContent`).
- `<Dialog.Header>`: The header field of the component, where the `title` will appear (Equal to the property `headerContent`).
- `<Dialog.Action>`: An optional field for buttons at the bottom of the component. This field will appear by default for variant `confirmation`.

### More detailed information

For more details regarding the component functionality, check out the [Modal documentation](/uilib/components/modal).


## Table of contents

1. [Inform demos](/uilib/components/dialog/demos#demos-for-variant-information)
1. [Confirm demos](/uilib/components/dialog/demos#demos-for-variant-confirmation)

## Demos for variant `information`

### Basic Dialog


```tsx
render(<Dialog title="What is a Dialog?">
      <P>
        The Dialog component is a Modal variation that appears at the
        center of the screen. The Dialog has similar functionality to a
        traditional popup window and is mostly used for informational
        purposes (for example explaining a word on the page). Similar to
        Modal, it has to be triggered by the user to appear. Typical usage
        would be to read an explanation, then closing it.
      </P>
      <Button variant="secondary" size="large" top="large">
        Read more
      </Button>
    </Dialog>)
```


### Dialog as help button


```tsx
render(<Input label="Input" placeholder="Placeholder ..." suffix={<Dialog>
          <P>Some additional information for the input field.</P>
        </Dialog>} />)
```


### Top aligned Dialog


```tsx
render(<Dialog title="Vertical alignment top" verticalAlignment="top" triggerAttributes={{
  text: 'Vertical alignment'
}} modalContent="The Dialog component is a Modal aligned at the top of the screen. The Dialog has similar functionality to a traditional popup window and is mostly used for informational purposes." />)
```


### Dialog with custom trigger


```tsx
render(<Dialog title="Modal Title" trigger={props => <Button {...props} variant="primary" icon="information">
          Custom trigger button
        </Button>}>
      <P>This Modal was opened by a custom trigger component.</P>
    </Dialog>)
```


### Dialog with custom content


```tsx
const handleBack = () => null;
render(<>
          <Dialog title="Custom title">
            <Dialog.Navigation>
              <Breadcrumb onClick={handleBack} />
            </Dialog.Navigation>
            <Dialog.Header>
              <P bottom>This is in the Dialog header</P>
            </Dialog.Header>
            <Button bottom size="large" right top>
              Read more
            </Button>
            <Button bottom size="large" variant="secondary">
              Open example
            </Button>
            <FormStatus state="information">
              This is a formstatus in a Dialog
            </FormStatus>
          </Dialog>
        </>);
```


### Fullscreen Dialog


```tsx
render(<Dialog title={<span className="dnb-sr-only">"Hidden" Dialog title</span>} fullscreen triggerAttributes={{
  variant: 'tertiary',
  text: 'Open a fullscreen dialog',
  icon: 'bell'
}} modalContent="The Dialog component is a Modal variation that appears at the center of the screen. The Dialog has similar functionality to a traditional popup window and is mostly used for informational purposes." />)
```


### Dialog as progress indicator


```tsx
render(<Dialog spacing={false} fullscreen={false} alignContent="centered" hideCloseButton triggerAttributes={{
  text: 'Show'
}} preventClose={false} maxWidth="12rem">
      <ProgressIndicator showDefaultLabel top="large" bottom="large" />
    </Dialog>)
```


### Dialog with close delay


```tsx
render(<Dialog title=".5s close delay" triggerAttributes={{
  text: 'Click me'
}} focusSelector=".dnb-input__input:first-of-type" preventClose hideCloseButton onOpen={e => console.log('onOpen', e)} onClose={e => console.log('onClose', e)} onClosePrevent={({
  close,
  triggeredBy
}) => {
  console.log('triggeredBy', triggeredBy);
  const timeout = setTimeout(close, 500);
  return () => clearTimeout(timeout); // clear timeout on unmount
}}>
      <P>This is a Dialog with no close button.</P>
      <P>Click outside me, and I will be closed within 1 second.</P>
      <Input label="Focus" top>
        Focus me with Tab key
      </Input>
    </Dialog>)
```


## Demos for variant `confirmation`

### Confirm dialog


```tsx
render(<Dialog variant="confirmation" title="Dialog confirmation title" icon={bell_medium} description="Some content describing the situation." onConfirm={({
  close
}) => close()} triggerAttributes={{
  text: 'Trigger button'
}} />)
```


### Deletion Dialog

A `confirmType="warning"` will enhance the context by applying a red color to the icon, as in the deletion scenario.


```tsx
render(<Dialog variant="confirmation" confirmType="warning" title="Are you sure you want to delete this?" icon={trash_medium} description="This action cannot be undone." confirmText="Delete" declineText="Cancel" onConfirm={({
  close
}) => close()} triggerAttributes={{
  text: 'Delete record',
  icon: trash_medium
}} />)
```


### Logged out Dialog

Use the `open` property to automatically trigger the Dialog, here demonstrated with a button for simplicity. You can also change the default confirm text and hide the decline button when suited.


```tsx
const DemoComponent = () => {
  const [open, setOpen] = useState(false);
  const loginHandler = () => null;
  return <>
              <Button id="custom-triggerer" text="Manually trigger" onClick={() => setOpen(true)} />
              <Dialog variant="confirmation" title="Du har blitt logget ut" icon={log_out_medium} description="For å fortsette må du logge inn igjen." confirmText="Logg inn" hideDecline open={open} onClose={({
      triggeredBy
    }) => {
      console.log('triggeredBy', triggeredBy);
      setOpen(false);
    }} onConfirm={() => {
      setOpen(false);
      loginHandler();
    }} labelledBy="custom-triggerer" />
            </>;
};
render(<DemoComponent />);
```


### Cookie consent Dialog

Provide a custom set of buttons, like this cookie consent Dialog that has a `tertiary` "Administrate" button. Notice that the `close` function will be provided for every child of type [Button](/uilib/components/button) given to `Dialog.Action`.


```tsx
render(<Dialog triggerAttributes={{
  text: 'Show cookie dialog'
}} icon={cookie_medium} variant="confirmation" title="Informasjonskapsler (cookies)">
      Vi bruker cookies for å gi deg den beste opplevelsen i nettbanken
      vår.
      <br />
      <Anchor target="_blank" href="https://www.dnb.no/cookies">
        Les mer om cookies
      </Anchor>
      <Dialog.Action>
        <Button variant="tertiary" text="Administrer" icon={edit} iconPosition="left"
    // @ts-expect-error -- strictFunctionTypes
    onClick={({
      close
    }) => {
      close();
    }} />
        <Button text="Jeg godtar"
    // @ts-expect-error -- strictFunctionTypes
    onClick={({
      close
    }) => {
      close();
    }} />
      </Dialog.Action>
    </Dialog>)
```



  
```tsx
const MockComponent = () => {
  const scrollRef = useRef(null);
  return <Dialog triggerAttributes={{
    text: 'Show cookie dialog'
  }} variant="confirmation" title="Informasjonskapsler (cookies)" scrollRef={scrollRef} onOpen={() => {
    if (document.documentElement.classList.contains('scroll-to-bottom')) {
      scrollRef.current.scrollTop = 100000;
    }
  }}>
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              <br />
              <Anchor target="_blank" href="https://www.dnb.no/cookies">
                Les mer om cookies
              </Anchor>
              <Dialog.Action>
                <Button variant="tertiary" text="Administrer" iconPosition="left"
      // @ts-expect-error -- strictFunctionTypes
      onClick={({
        close
      }) => {
        close();
      }} />
                <Button text="Jeg godtar alle"
      // @ts-expect-error -- strictFunctionTypes
      onClick={({
        close
      }) => {
        close();
      }} />
              </Dialog.Action>
            </Dialog>;
};
render(<MockComponent />);
```

  
```tsx
const MockComponent = () => {
  const scrollRef = useRef(null);
  return <Dialog triggerAttributes={{
    text: 'Show information dialog with sticky header'
  }} variant="information" scrollRef={scrollRef} onOpen={() => {
    if (document.documentElement.classList.contains('scroll-to-bottom-info')) {
      scrollRef.current.scrollTop = 100000;
    }
  }}>
              <Form.Handler>
                <Flex.Stack>
                  <Form.MainHeading>
                    Opprett en bedriftskonto
                  </Form.MainHeading>
                  <P>
                    For å opprette en bedriftskonto trenger vi litt
                    informasjon om virksomheten din. Fyll ut feltene
                    nedenfor, så tar vi kontakt innen to virkedager.
                  </P>

                  <Form.Card>
                    <Form.SubHeading>Kontaktinformasjon</Form.SubHeading>
                    <Field.String label="Fullt navn" path="/name" />
                    <Field.Email path="/email" />
                    <Field.PhoneNumber path="/phone" />
                  </Form.Card>

                  <Form.Card>
                    <Form.SubHeading>Bedriftsinformasjon</Form.SubHeading>
                    <Field.Name.Company path="/companyName" />
                    <Field.OrganizationNumber path="/orgNumber" />
                    <Field.String label="Adresse" path="/address" />
                    <Field.PostalCodeAndCity postalCode={{
            path: '/postalCode'
          }} city={{
            path: '/city'
          }} />
                  </Form.Card>

                  <Form.Card>
                    <Form.SubHeading>Tilleggsinformasjon</Form.SubHeading>
                    <Field.String label="Beskriv behovet ditt" path="/description" multiline rows={3} />
                    <Field.Boolean label="Jeg godtar vilkårene for bruk" path="/terms" variant="checkbox" />
                  </Form.Card>
                </Flex.Stack>
              </Form.Handler>
            </Dialog>;
};
render(<MockComponent />);
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
