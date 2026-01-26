---
title: 'Tabs'
description: 'Tabs are a set of buttons which allow navigation between content that is related and on the same level of hierarchy.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.546Z
checksum: 050a6426a7c98e9b5a1c95124f81416b828b9b0017858283e3018a5b6393c5c0
---

# Tabs

## Import

```tsx
import { Tabs } from '@dnb/eufemia'
```

## Description

Tabs are a set of buttons that allow navigation between content that is related and on the same level of hierarchy.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4243-1498)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/tabs)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/tabs)

## Demos

### Tabs where content is provided from outside

As this may be a more common use case, we still have to ensure our tabs content is linked together with the tabs – because of accessibility.

You have to provide an `id` to both of the components.

**NB:** You do not need to use a function inside `Tabs.Content` – it can contain any element you need, as long as it is a React Node.

```tsx
render(
  <Wrapper>
    <ComponentBox>
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

      <Tabs.Content id="unique-linked-id" key="unique-linked-key">
        {({ key }) => {
          return <H2>{key}</H2>
        }}
      </Tabs.Content>
    </ComponentBox>
  </Wrapper>
)
```

### Tabs using 'data' property and content object

```tsx
render(
  <Wrapper>
    <ComponentBox
      scope={{
        exampleContent,
      }}
      data-visual-test="tabs-tablist"
    >
      <Tabs
        data={[
          {
            title: 'First',
            key: 'first',
          },
          {
            title: 'Second',
            key: 'second',
          },
          {
            title: 'Third',
            key: 'third',
            disabled: true,
          },
          {
            title: 'Fourth',
            key: 'fourth',
          },
        ]}
      >
        {exampleContent /* See Example Content below */}
      </Tabs>
    </ComponentBox>
  </Wrapper>
)
```

### Tabs using 'data' property only

```tsx
render(
  <Wrapper>
    <ComponentBox
      data-visual-test="tabs-clickhandler"
      scope={{
        exampleContent,
      }}
    >
      <Tabs
        data={{
          first: {
            title: 'First',
            // See Example Content below
            content: exampleContent.first,
          },
          second: {
            title: 'Second',
            // See Example Content below
            content: exampleContent.second,
          },
        }}
        // Only use "on_click" if you really have to
        on_click={({ selected_key }) => {
          console.log('on_click', selected_key)
        }}
        // Preferred way to listen on changes
        on_change={({ selected_key }) => {
          console.log('on_change', selected_key)
        }}
      />
    </ComponentBox>
  </Wrapper>
)
```

### Tabs using React Components only

Also, this is an example of how to define a different content background color, by providing `content_style`.

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="tabs-section-styles">
      <Tabs tabs_style="info" content_style="info">
        <Tabs.Content title="First" key="first">
          <Section spacing top bottom style_type="white">
            <H2 top={0} bottom>
              First
            </H2>
          </Section>
        </Tabs.Content>
        <Tabs.Content title="Second" key="second">
          <Section spacing top bottom style_type="white">
            <H2 top={0} bottom>
              Second
            </H2>
          </Section>
        </Tabs.Content>
      </Tabs>
    </ComponentBox>
  </Wrapper>
)
```

### Tabs without bottom border

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="tabs-no-border">
      <Tabs no_border={true}>
        <Tabs.Content title="First" key="first">
          <H2 top={0} bottom>
            First
          </H2>
        </Tabs.Content>
        <Tabs.Content title="Second" key="second">
          <H2 top={0} bottom>
            Second
          </H2>
        </Tabs.Content>
      </Tabs>
    </ComponentBox>
  </Wrapper>
)
```

### Tabs without breakout

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="tabs-no-breakout">
      <Tabs breakout={false}>
        <Tabs.Content title="First" key="first">
          <H2 top={0} bottom>
            First
          </H2>
        </Tabs.Content>
        <Tabs.Content title="Second" key="second">
          <H2 top={0} bottom>
            Second
          </H2>
        </Tabs.Content>
      </Tabs>
    </ComponentBox>
  </Wrapper>
)
```

### Tabs and `prerender`

By using `prerender={true}` the content is kept inside the DOM.

Also, when switching the tabs, the height is animated.

```tsx
render(
  <Wrapper>
    <ComponentBox>
      <>
        <Tabs prerender content_style="info">
          <Tabs.Content title="Tab 1" key="first">
            <H2>Content 1</H2>
          </Tabs.Content>
          <Tabs.Content title="Tab 2" key="second">
            <div
              style={{
                height: '10rem',
                display: 'flex',
                alignItems: 'flex-end',
              }}
            >
              <H2>Content 2</H2>
            </div>
          </Tabs.Content>
          <Tabs.Content title="Tab 3" key="third">
            <div
              style={{
                height: '20rem',
                display: 'flex',
                alignItems: 'flex-end',
              }}
            >
              <H2>Content 3</H2>
            </div>
          </Tabs.Content>
        </Tabs>
        <P top>Smile at me 📸</P>
      </>
    </ComponentBox>
  </Wrapper>
)
```

### Tabs optimized for narrow screens

Navigation buttons will be shown and the tabs-list will be scrollable.

```tsx
render(
  <Wrapper>
    <ComponentBox
      data-visual-test="tabs-tablist-scrollable"
      scope={{
        manyTabs,
        manyTabsContent,
      }}
    >
      <Tabs selected_key="second" data={manyTabs}>
        {manyTabsContent}
      </Tabs>
    </ComponentBox>
  </Wrapper>
)
```

### Horizontal aligned tabs

```tsx
const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
`
const LeftArea = styled.div`
  /* Ensure no-wrap */
  flex-shrink: 0;
`
const RightArea = styled.div`
  /* Ensure the tab bar is hidden outside this area */
  overflow: hidden;

  /* Ensure the focus ring is visible! (because of overflow: hidden) */
  margin: -2px;
  padding: 2px;
`
function TabsHorizontalAligned() {
  return (
    <FlexWrapper>
      <LeftArea>
        <ToggleButton.Group value="first">
          <ToggleButton text="first" value="first" />
          <ToggleButton text="second" value="second" />
        </ToggleButton.Group>
      </LeftArea>

      <RightArea>
        <Tabs
          left
          no_border
          selected_key="first"
          id="unique-tabs-row"
          data={manyTabs}
        />
      </RightArea>
    </FlexWrapper>
  )
}
render(<TabsHorizontalAligned />)
```

### max-width usage

```tsx
const MaxWidthWrapper = styled.div`
  max-width: 30rem;
  background: var(--color-white);
`
function TabsMaxWidth() {
  return (
    <MaxWidthWrapper>
      <Tabs
        top
        no_border
        selected_key="fifth"
        id="unique-tabs-max-width"
        data={manyTabs}
      />
    </MaxWidthWrapper>
  )
}
render(<TabsMaxWidth />)
```

### Router integration

This demo uses `@reach/router`. More [examples on CodeSandbox](https://codesandbox.io/embed/8z8xov7xyj).

<TabsExampleReachRouterNavigation />

### Example Content

```jsx
const exampleContent = {
  first: () => <H2>First</H2>,
  second: () => <Input label="Label:">Focus me with next Tab key</Input>,
  third: () => (
    <>
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
    </>
  ),
  fourth: 'Fourth as a string only',
}
```

### Tabs with badge notification

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="tabs-badge-notification">
      <Tabs
        data={[
          {
            title: (
              <>
                Transaksjoner{' '}
                <Badge
                  content={1}
                  label="Transaksjoner"
                  variant="notification"
                  vertical="top"
                />
              </>
            ),
            key: 'one',
          },
          {
            title: 'Second',
            key: 'second',
          },
          {
            title: 'Third',
            key: 'third',
          },
        ]}
      />
    </ComponentBox>
  </Wrapper>
)
```

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="tabs-single-children-react-element">
      <Tabs>
        <Tabs.Content title="First" key="first">
          <div>hello1</div>
        </Tabs.Content>
      </Tabs>
    </ComponentBox>
  </Wrapper>
)
```

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="tabs-single-element-data">
      <Tabs
        data={[
          {
            title: 'First',
            key: 1,
            content: <div>hello1</div>,
          },
        ]}
      />
    </ComponentBox>
  </Wrapper>
)
```

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="tabs-align-property">
      <Tabs
        align="left"
        data={[
          {
            title: 'Left',
            key: 1,
            content: <H2>Content</H2>,
          },
        ]}
      />
      <Tabs
        align="center"
        data={[
          {
            title: 'Center',
            key: 1,
            content: <H2>Content</H2>,
          },
        ]}
      />

      <Tabs
        align="right"
        data={[
          {
            title: 'Right',
            key: 1,
            content: <H2>Content</H2>,
          },
        ]}
      />
    </ComponentBox>
  </Wrapper>
)
```

## Properties

```json
{
  "selected_key": {
    "doc": "In case one of the tabs should be opened by a `key`.",
    "type": ["string", "number"],
    "status": "optional"
  },
  "align": {
    "doc": "To align the tab list on the right side `align=\"right\"`. Defaults to `left`.",
    "type": ["left", "center", "right"],
    "status": "optional"
  },
  "content_style": {
    "doc": "To enable the visual helper `.dnb-section` on to the content wrapper. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `null`.",
    "type": ["divider", "white", "transparent"],
    "status": "optional"
  },
  "content_spacing": {
    "doc": "To modify the `spacing` onto the content wrapper. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `large`.",
    "type": [
      "boolean",
      "x-small",
      "small",
      "medium",
      "large",
      "x-large",
      "xx-large"
    ],
    "status": "optional"
  },
  "tabs_style": {
    "doc": "To enable the visual helper `.dnb-section` inside the tabs list. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `null`.",
    "type": ["divider", "white", "transparent"],
    "status": "optional"
  },
  "tabs_spacing": {
    "doc": "To modify the `spacing` inside the tab list. Defaults to `null`.",
    "type": "boolean",
    "status": "optional"
  },
  "tab_element": {
    "doc": "Define what HTML element should be used. You can provide e.g. `tab_element={GatsbyLink}` – you may then provide the `to` property inside every entry (`data={[{ to: ';url';, ... }]}`). Defaults to `<button>`.",
    "type": "React.ReactNode",
    "status": "optional"
  },
  "[data](/uilib/components/tabs/properties/#data-object)": {
    "doc": "Defines the data structure to load as an object.",
    "type": "object",
    "status": "required"
  },
  "children": {
    "doc": "The content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`.",
    "type": ["React.ReactNode", "object"],
    "status": "required"
  },
  "content": {
    "doc": "The content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`.",
    "type": ["React.ReactNode", "object"],
    "status": "required"
  },
  "prerender": {
    "doc": "If set to `true`, the Tabs content will pre-render all contents. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "prevent_rerender": {
    "doc": "If set to `true`, the Tabs content will stay in the DOM. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Similar to `prerender`, but in contrast, the content will render once the user is activating a tab. Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "scroll": {
    "doc": "If set to `true`, the content will scroll on tab change, until all tabs will be visible on the upper side of the browser window view. Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "no_border": {
    "doc": "If set to `true`, the default horizontal border line under the tablist will be removed. Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "nav_button_edge": {
    "doc": "If set to `true`, the navigation icons will have a straight border at their outside. This feature is meant to be used when the Tabs component goes all the way to the browser window. Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "skeleton": {
    "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
    "type": "boolean",
    "status": "optional"
  },
  "breakout": {
    "doc": "If set to `false`, the default horizontal border line under the tablist remains inside the parent boundaries. Defaults to `true`.",
    "type": "boolean",
    "status": "optional"
  },
  "[Space](/uilib/layout/space/properties)": {
    "doc": "Spacing properties like `top` or `bottom` are supported.",
    "type": ["string", "object"],
    "status": "optional"
  }
}
```

## Data object

```json
{
  "title": {
    "doc": "The title of the tab.",
    "type": ["string", "React.ReactNode"],
    "status": "required"
  },
  "key": {
    "doc": "The unique key of the tab.",
    "type": ["string", "number"],
    "status": "required"
  },
  "content": {
    "doc": "The content of the tab.",
    "type": "React.ReactNode",
    "status": "optional"
  },
  "selected": {
    "doc": "If set to `true`, the tab will be selected.",
    "type": "boolean",
    "status": "optional"
  },
  "disabled": {
    "doc": "If set to `true`, the tab will be disabled.",
    "type": "boolean",
    "status": "optional"
  }
}
```

## Key

The key can be a string or a number.
But if the key is a number (integer), we have to deliver the content directly in the tab item:

```ts
const tabsDataWithContent = [
  { title: 'First', key: 1, content: <H2>First</H2> },
  { title: 'Second', key: 2, content: () => <H2>Second</H2> },
]
```

## Example Data

```ts
const tabsData = [
  { title: 'First', key: 'first' },
  { title: 'Second', key: 'second' },
  { title: 'Third', key: 'third', disabled: true },
  { title: 'Fourth', key: 'fourth' },
]
```

## Current tab

The current Tab content can be a `string`, a function returning content or a `React component`.

## Events

```json
{
  "on_change": {
    "doc": "(preferred) this event gets triggered once the tab changes its selected key. Returns `{ key, selected_key, focus_key, event }`.",
    "type": "function",
    "status": "optional"
  },
  "on_click": {
    "doc": "This event gets triggered once the tab gets clicked. Returns `{ key, selected_key, focus_key, event }`.",
    "type": "function",
    "status": "optional"
  },
  "on_focus": {
    "doc": "This event gets triggered once the tab changes its focus key. Returns `{ key, selected_key, focus_key, event }`.",
    "type": "function",
    "status": "optional"
  },
  "on_mouse_enter": {
    "doc": "This event gets triggered once the user';s mouse enters a tab (hover). Returns `{ key, selected_key, focus_key, event }`.",
    "type": "function",
    "status": "optional"
  }
}
```

### Prevent a change

You can prevent a change from happening by returning false on the `on_click` event handler:

```tsx
<Tabs
  on_click={() => {
    if (condition === true) {
      return false
    }
  }}
  on_change={() => {
    // Will not get emitted
  }}
/>
```
