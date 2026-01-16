---
title: 'Tabs'
description: 'Tabs are a set of buttons which allow navigation between content that is related and on the same level of hierarchy.'
metadata: https://eufemia.dnb.no/uilib/components/tabs/metadata.json
---

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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
)
```
