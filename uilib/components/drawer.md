---
title: 'Drawer'
description: 'The Drawer component is a Modal variation that appears as a side panel at any chosen side of the page.'
version: 11.0.4
generatedAt: 2026-04-29T19:30:10.684Z
checksum: 81d2fd74236351b8fe0315805263344b8c22fd30effa05c50ee9683818ab648c
---

# Drawer

## Import

```tsx
import { Drawer } from '@dnb/eufemia'
```

## Description

The Drawer component is a [Modal](/uilib/components/modal) variation that appears as a side panel at any chosen side of the page: top, bottom, left, or right (default `right`). A Drawer is typically used to show additional information. It can also be used for easy/quick tasks while staying in context.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=12331-4011)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/drawer)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/drawer)

### Parts in Drawer

To provide custom content to parts of the Drawer, a set of component parts are provided:

- `<Drawer.Navigation>`: The navigation field at the top of the component, default with a close button (Equal to the property `navContent`).
- `<Drawer.Header>`: The header field of the component, where the `title` will appear (Equal to the property `headerContent`).
- `<Drawer.Body>`: The body of the Drawer, provided with a section background color, default `black-3` (Equal to the property `modalContent`).

### More detailed information

For more details regarding the component functionality, check out the [Modal documentation](/uilib/components/modal).

### Root Element (React Portal)

The Drawer component uses [PortalRoot](/uilib/components/portal-root) internally to render its content. See the [PortalRoot documentation](/uilib/components/portal-root) for information on how to control where the portal content appears in the DOM.

## Demos

### Basic Drawer

```tsx
render(
  <Drawer
    title="Drawer title"
    triggerAttributes={{
      text: 'Open drawer',
    }}
  >
    <P top>Some informational content</P>
    <P top>
      Elementum eu suspendisse sit platea elit porttitor magna laoreet ad
      ultrices tempus urna curae parturient conubia quisque viverra eget
      vestibulum neque pulvinar semper vulputate id dis varius pellentesque
      nunc egestas risus amet mus aptent luctus imperdiet netus natoque
      cubilia mattis nostra proin ornare scelerisque sodales faucibus
      placerat sem bibendum pretium rutrum vitae sociis ligula inceptos
      morbi quam mi sed pharetra fermentum tortor ullamcorper ipsum tellus
      eros euismod volutpat nisl dui lectus fames suscipit phasellus
      praesent justo mollis montes velit taciti gravida
    </P>
  </Drawer>
)
```

### Basic Drawer left placement

```tsx
render(
  <Drawer title="Drawer title" containerPlacement="left">
    <P top>Some informational content</P>
    <P top>
      Elementum eu suspendisse sit platea elit porttitor magna laoreet ad
      ultrices tempus urna curae parturient conubia quisque viverra eget
      vestibulum neque pulvinar semper vulputate id dis varius pellentesque
      nunc egestas risus amet
    </P>
  </Drawer>
)
```

### Basic Drawer in fullscreen

```tsx
render(
  <Drawer
    fullscreen
    title="Drawer title"
    triggerAttributes={{
      text: 'Open drawer',
    }}
  >
    <P top>Some informational content</P>
    <P top>
      Elementum eu suspendisse sit platea elit porttitor magna laoreet ad
      ultrices tempus urna curae parturient conubia quisque viverra eget
      vestibulum neque pulvinar semper vulputate id dis varius pellentesque
      nunc egestas risus amet
    </P>
  </Drawer>
)
```

### Drawer with custom content

```tsx
render(
  <Drawer title="Custom title">
    <Drawer.Navigation>
      <Breadcrumb onClick={handleBack} />
    </Drawer.Navigation>
    <Drawer.Header>
      <P bottom>This is a lorem ipsum dolor</P>
      <Button bottom size="large">
        Lorem ipsum
      </Button>
      <Button bottom size="large" variant="secondary">
        Dolor sit
      </Button>
      <FormStatus state="information">
        This is a lorem ipsum dolor
      </FormStatus>
      <Tabs
        id="unique-linked-id"
        data={[
          {
            title: 'One',
            key: 'one',
          },
          {
            title: 'Two',
            key: 'two',
          },
        ]}
      />
    </Drawer.Header>
    <Drawer.Body>
      <Tabs.Content id="unique-linked-id" key="contentKey">
        {({ title }) => {
          return (
            <>
              <H2>{title}</H2>
              <P top>This is a left aligned Drawer content.</P>
              <P top>
                Elementum eu suspendisse sit platea elit porttitor magna
                laoreet ad ultrices tempus urna curae parturient conubia
                quisque viverra eget vestibulum neque pulvinar semper
                vulputate id dis varius pellentesque nunc egestas risus
                amet mus aptent luctus imperdiet netus natoque cubilia
                mattis nostra proin ornare scelerisque sodales faucibus
                placerat sem bibendum pretium rutrum vitae sociis ligula
                inceptos morbi quam mi sed pharetra fermentum tortor
                ullamcorper ipsum tellus eros euismod volutpat nisl dui
                lectus fames suscipit phasellus praesent justo mollis
                montes velit taciti gravida lacus commodo senectus feugiat
                lorem etiam consequat penatibus cum hendrerit accumsan orci
                potenti purus nulla
              </P>
            </>
          )
        }}
      </Tabs.Content>
    </Drawer.Body>
  </Drawer>
)
```

### Customize trigger button

```tsx
render(
  <Drawer
    title="Drawer with custom trigger"
    triggerAttributes={{
      text: 'Custom trigger',
      variant: 'primary',
      size: 'large',
      icon: 'loupe',
      iconPosition: 'left',
    }}
  >
    <Drawer.Body
      innerSpace={{
        block: 'large',
      }}
    >
      <P>Opened a Drawer with a custom trigger button!</P>
    </Drawer.Body>
  </Drawer>
)
```

### Close Drawer by callback method

```tsx
render(
  <Drawer
    title="Drawer title"
    triggerAttributes={{
      text: 'Open drawer',
    }}
    hideCloseButton
  >
    {/* @ts-expect-error -- strictFunctionTypes */}
    {({ close }) => (
      <>
        <Button text="Close by callback" onClick={close} />
      </>
    )}
  </Drawer>
)
```

### Remove animation and spacing

```tsx
render(
  <Drawer
    title="No spacing or animation"
    noAnimation
    spacing={false}
    hideCloseButton
  >
    <Drawer.Body>
      <P top bottom>
        This is a lorem ipsum dolor
      </P>
      <Button bottom size="large">
        Lorem ipsum
      </Button>
      <Button bottom size="large" variant="secondary">
        Dolor sit
      </Button>
      <FormStatus state="information">
        This is a lorem ipsum dolor
      </FormStatus>
    </Drawer.Body>
  </Drawer>
)
```

```tsx
const DrawerMock = () => {
  const scrollRef = React.useRef(null)
  const ref = React.useRef(null)
  const [errorMessage, setErrorMessage] = React.useState(null)
  const message = errorMessage
    ? errorMessage
    : 'Yes, the "dnb-scroll-view" is used!'
  return (
    <Drawer
      contentRef={ref}
      scrollRef={scrollRef}
      onOpen={() => {
        const innerOverflowY = window.getComputedStyle(
          ref.current
        ).overflowY
        const contentElem = scrollRef.current.querySelector(
          '.dnb-drawer__content'
        )
        const contentOverflowY =
          window.getComputedStyle(contentElem)?.overflowY
        const scrollOverflowY = window.getComputedStyle(
          scrollRef.current
        ).overflowY
        if (contentOverflowY !== 'visible') {
          setErrorMessage(
            `.dnb-drawer__content was "${contentOverflowY}" and not "visible"`
          )
        } else if (innerOverflowY !== 'visible') {
          setErrorMessage(
            `.dnb-drawer__inner was "${innerOverflowY}" and not "visible"`
          )
        } else if (scrollOverflowY !== 'auto') {
          setErrorMessage('.dnb-scroll-view was not "auto"')
        }
      }}
    >
      <Drawer.Body>
        <div
          style={{
            height: '100rem',
          }}
        >
          <div className="drawer-scroll-view">
            <P size="x-large">{message}</P>
          </div>
        </div>
      </Drawer.Body>
    </Drawer>
  )
}
render(<DrawerMock />)
```

```tsx
render(
  <Drawer title="Drawer title" containerPlacement="top">
    <P top>Some informational content</P>
    <P top>
      Elementum eu suspendisse sit platea elit porttitor magna laoreet ad
      ultrices tempus urna curae parturient conubia quisque viverra eget
      vestibulum neque pulvinar semper vulputate id dis varius pellentesque
      nunc egestas risus amet
    </P>
  </Drawer>
)
```

```tsx
render(
  <Drawer title="Drawer title" containerPlacement="bottom">
    <P top>Some informational content</P>
    <P top>
      Elementum eu suspendisse sit platea elit porttitor magna laoreet ad
      ultrices tempus urna curae parturient conubia quisque viverra eget
      vestibulum neque pulvinar semper vulputate id dis varius pellentesque
      nunc egestas risus amet
    </P>
  </Drawer>
)
```

```tsx
const MockComponent = () => {
  const scrollRef = React.useRef(null)
  return (
    <Drawer
      title="Drawer title"
      scrollRef={scrollRef}
      onOpen={() => {
        scrollRef.current.scrollTop = 50
      }}
    >
      <P top>Some informational content</P>
      <P top>
        Elementum eu suspendisse sit platea elit porttitor magna laoreet ad
        ultrices tempus urna curae parturient conubia quisque viverra eget
        vestibulum neque pulvinar semper vulputate id dis varius
        pellentesque nunc egestas risus amet mus aptent luctus imperdiet
        netus natoque cubilia mattis nostra proin ornare scelerisque
        sodales faucibus placerat sem bibendum pretium rutrum vitae sociis
        ligula inceptos morbi quam mi sed pharetra fermentum tortor
        ullamcorper ipsum tellus eros euismod volutpat nisl dui lectus
        fames suscipit phasellus praesent justo mollis montes velit taciti
        gravida
      </P>
      <P top>
        Elementum eu suspendisse sit platea elit porttitor magna laoreet ad
        ultrices tempus urna curae parturient conubia quisque viverra eget
        vestibulum neque pulvinar semper vulputate id dis varius
        pellentesque nunc egestas risus amet mus aptent luctus imperdiet
        netus natoque cubilia mattis nostra proin ornare scelerisque
        sodales faucibus placerat sem bibendum pretium rutrum vitae sociis
        ligula inceptos morbi quam mi sed pharetra fermentum tortor
        ullamcorper ipsum tellus eros euismod volutpat nisl dui lectus
        fames suscipit phasellus praesent justo mollis montes velit taciti
        gravida
      </P>

      <P top>
        Elementum eu suspendisse sit platea elit porttitor magna laoreet ad
        ultrices tempus urna curae parturient conubia quisque viverra eget
        vestibulum neque pulvinar semper vulputate id dis varius
        pellentesque nunc egestas risus amet mus aptent luctus imperdiet
        netus natoque cubilia mattis nostra proin ornare scelerisque
        sodales faucibus placerat sem bibendum pretium rutrum vitae sociis
        ligula inceptos morbi quam mi sed pharetra fermentum tortor
        ullamcorper ipsum tellus eros euismod volutpat nisl dui lectus
        fames suscipit phasellus praesent justo mollis montes velit taciti
        gravida
      </P>
    </Drawer>
  )
}
render(<MockComponent />)
```

```tsx
const MockComponent = () => {
  const [showMe, setShowMe] = React.useState(false)
  const scrollRef = React.useRef(null)
  return (
    <Drawer
      title="Drawer title"
      scrollRef={scrollRef}
      onOpen={() => {
        setShowMe(!showMe)
        scrollRef.current.scrollTop = 50
      }}
    >
      <Drawer.Navigation>
        {showMe ? (
          <>
            <P bottom>This is a lorem ipsum dolor</P>
            <P bottom>This is a lorem ipsum dolor</P>
            <P bottom>This is a lorem ipsum dolor</P>
            <P bottom>This is a lorem ipsum dolor</P>
          </>
        ) : null}
      </Drawer.Navigation>
      <Drawer.Header>
        <P bottom>This is a lorem ipsum dolor</P>
        <Button bottom size="large">
          Lorem ipsum
        </Button>
        <Button bottom size="large" variant="secondary">
          Dolor sit
        </Button>
        <FormStatus state="information">
          This is a lorem ipsum dolor
        </FormStatus>
        <Tabs
          id="unique-linked-id-x"
          data={[
            {
              title: 'One',
              key: 'one',
            },
            {
              title: 'Two',
              key: 'two',
            },
          ]}
        />
      </Drawer.Header>
      <Drawer.Body>
        <Tabs.Content id="unique-linked-id-x" key="contentKey0">
          {({ title }) => {
            return (
              <>
                <H2>{title}</H2>

                <P top>This is a left aligned Drawer content.</P>
                <P top>
                  Elementum eu suspendisse sit platea elit porttitor magna
                  laoreet ad ultrices tempus urna curae parturient conubia
                  quisque viverra eget vestibulum neque pulvinar semper
                  vulputate id dis
                </P>
                <P top>
                  Elementum eu suspendisse sit platea elit porttitor magna
                  laoreet ad ultrices tempus urna curae parturient conubia
                  quisque viverra eget vestibulum neque pulvinar semper
                  vulputate id dis
                </P>
                <P top>
                  Elementum eu suspendisse sit platea elit porttitor magna
                  laoreet ad ultrices tempus urna curae parturient conubia
                  quisque viverra eget vestibulum neque pulvinar semper
                  vulputate id dis
                </P>
              </>
            )
          }}
        </Tabs.Content>
      </Drawer.Body>
    </Drawer>
  )
}
render(<MockComponent />)
```

## Properties

```json
{
  "props": {
    "containerPlacement": {
      "doc": "Defines on what side the Drawer should be opened. Can be set to `left`, `right`, `top` and `bottom`. Defaults to `right`.",
      "type": ["\"left\"", "\"right\"", "\"top\"", "\"bottom\""],
      "status": "optional"
    },
    "title": {
      "doc": "The drawer title. Displays at the very top of the content.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "minWidth": {
      "doc": "The minimum Drawer content width, defined by a CSS width value like `50vw` (50% of the viewport). Be careful on using fixed `minWidth` so you don't break responsiveness. Defaults to `30rem` (average width is set to `60vw`).",
      "type": ["string", "number"],
      "status": "optional"
    },
    "maxWidth": {
      "doc": "The maximum Drawer content width, defined by a CSS width value like `20rem`. Defaults to `60rem` (average width is set to `60vw`).",
      "type": ["string", "number"],
      "status": "optional"
    },
    "className": {
      "doc": "Give the Drawer content a class name (maps to `dnb-drawer`).",
      "type": "string",
      "status": "optional"
    },
    "spacing": {
      "doc": "If set to `false` then the drawer content will be shown without any spacing. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "preventCoreStyle": {
      "doc": "By default the drawer content gets added the core style class `dnb-core-style`. Use `false` to disable this behavior.",
      "type": "boolean",
      "status": "optional"
    },
    "navContent": {
      "doc": "The content which will appear in the navigation, above the header, and side-by-side the close button.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "headerContent": {
      "doc": "The content which will appear in the header of the drawer.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "modalContent": {
      "doc": "The content which will appear when triggering the drawer.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "alignContent": {
      "doc": "Define the inner horizontal alignment of the content. Can be set to `left`, `center`, `centered` and `right`. If `centered`, then the content will also be centered vertically. Defaults to `left`.",
      "type": ["\"left\"", "\"center\"", "\"centered\"", "\"right\""],
      "status": "optional"
    },
    "fullscreen": {
      "doc": "If set to `true` then the drawer content will be shown as fullscreen, without showing the original content behind. Can be set to `false` to omit the auto fullscreen. Defaults to `auto`.",
      "type": ["boolean", "string"],
      "status": "optional"
    },
    "scrollbarGutter": {
      "doc": "Reserves space for the scrollbar gutter, preventing layout shifts when content overflows. By default, it enables `stable` when spacing is enabled. Set to `false` to disable.",
      "type": ["\"stable\"", "false"],
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
      "type": ["React.ReactNode", "function"],
      "status": "optional"
    },
    "fullscreen": {
      "doc": "If set to `true` then the modal content will be shown as fullscreen, without showing the original content behind. Can be set to `false` to omit the auto fullscreen. Defaults to `auto`.",
      "type": ["boolean", "string"],
      "status": "optional"
    },
    "open": {
      "doc": "Use this property to control the open/close state by setting `true` / `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "openDelay": {
      "doc": "Forces the modal to delay the opening. The delay is given in `ms`.",
      "type": ["number", "string"],
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
      "type": ["number", "string"],
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
      "type": ["React.ReactNode", "function"],
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
      "type": ["string", "object"],
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
      "type": ["React.ReactNode", "function"],
      "status": "optional"
    },
    "barContent": {
      "doc": "The content which will appear in the bar, above the header, and side-by-side the close button.",
      "type": ["React.ReactNode", "function"],
      "status": "optional"
    },
    "headerContent": {
      "doc": "The content which will appear in the header of the modal/drawer.",
      "type": ["React.ReactNode", "function"],
      "status": "optional"
    },
    "minWidth": {
      "doc": "The minimum Modal content width, defined by a CSS width value like `50vw` (50% of the viewport). Be careful on using fixed `minWidth` so you don't break responsiveness. Defaults to `30rem`.",
      "type": ["string", "number"],
      "status": "optional"
    },
    "maxWidth": {
      "doc": "The maximum Modal content width, defined by a CSS width value like `20rem`. Defaults to `60rem`.",
      "type": ["string", "number"],
      "status": "optional"
    },
    "alignContent": {
      "doc": "Define the inner horizontal alignment of the content. Can be set to `left`, `center`, `right` and `centered`. If `centered`, then the content will also be centered vertically. Defaults to `left`.",
      "type": ["\"left\"", "\"center\"", "\"centered\"", "\"right\""],
      "status": "optional"
    },
    "containerPlacement": {
      "doc": "For `drawer` mode only. Defines the placement on what side the Drawer should be opened. Defaults to `right`.",
      "type": ["\"left\"", "\"right\"", "\"top\"", "\"bottom\""],
      "status": "optional"
    },
    "verticalAlignment": {
      "doc": "Define the vertical alignment of the container. Defaults to `center`.",
      "type": ["\"top\"", "\"center\""],
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
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
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

### Drawer sizes

The Drawer is responsive with the following properties:

```css
--drawer-width: 40vw;
--drawer-min-width: 384px;
--drawer-max-width: 40rem;
```

## Events

Drawer includes the same events as [Modal](/uilib/components/modal), only formatted as camel case.

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
