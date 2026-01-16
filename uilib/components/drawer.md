---
title: 'Drawer'
description: 'The Drawer component is a Modal variation that appears as a side panel at any chosen side of the page.'
metadata: https://eufemia.dnb.no/uilib/components/drawer/metadata.json
---

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
  </Drawer>,
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
  </Drawer>,
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
  </Drawer>,
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
      <FormStatus state="info">This is a lorem ipsum dolor</FormStatus>
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
  </Drawer>,
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
      icon_position: 'left',
    }}
  >
    <Drawer.Body spacing>
      <P>Opened a Drawer with a custom trigger button!</P>
    </Drawer.Body>
  </Drawer>,
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
    {({ close }) => (
      <>
        <Button text="Close by callback" on_click={close} />
      </>
    )}
  </Drawer>,
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
      <FormStatus state="info">This is a lorem ipsum dolor</FormStatus>
    </Drawer.Body>
  </Drawer>,
)
```

```tsx
const DrawerMock = () => {
  const scrollRef = React.useRef(null)
  const innerRef = React.useRef(null)
  const [errorMessage, setErrorMessage] = React.useState(null)
  const message = errorMessage
    ? errorMessage
    : 'Yes, the "dnb-scroll-view" is used!'
  return (
    <Drawer
      contentRef={innerRef}
      scrollRef={scrollRef}
      onOpen={() => {
        const innerOverflowY = window.getComputedStyle(
          innerRef.current,
        ).overflowY
        const contentElem = scrollRef.current.querySelector(
          '.dnb-drawer__content',
        )
        const contentOverflowY =
          window.getComputedStyle(contentElem)?.overflowY
        const scrollOverflowY = window.getComputedStyle(
          scrollRef.current,
        ).overflowY
        if (contentOverflowY !== 'visible') {
          setErrorMessage(
            `.dnb-drawer__content was "${contentOverflowY}" and not "visible"`,
          )
        } else if (innerOverflowY !== 'visible') {
          setErrorMessage(
            `.dnb-drawer__inner was "${innerOverflowY}" and not "visible"`,
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
  </Drawer>,
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
  </Drawer>,
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
        <FormStatus state="info">This is a lorem ipsum dolor</FormStatus>
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
