---
title: 'SkipContent'
description: 'Use SkipContent to help keyboard users jump past large or repeated content.'
version: 11.8.1
generatedAt: 2026-06-29T11:30:03.471Z
checksum: 3827157a79b6b2af94d3f748ae7c4f7340cbd8ad13ed17fded2eb8c769066ec7
---

# SkipContent

## Import

```tsx
import { SkipContent } from '@dnb/eufemia'
```

## Description

`SkipContent` gives users – using their keyboard for navigation – the option to skip over content that contains a large amount of interactive elements.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4314-726)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/skip-content)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/skip-content)

**When is it desired?**

Typical when an action button, such as a save button, is placed below the content.

**What are interactive elements?**

- Text links/anchors
- Buttons
- Inputs and other form elements
- Basically, every focusable element

**What is considered large content?**

- Tables with interactive elements
- Lists with interactive elements
- Articles with interactive elements
- Parts of a form

**How does it work?**

1. An initially hidden button will reveal when the `tab` key is used.
2. The user can then press this button or continue tabbing when desired.
3. When the user decides to continue using the `tab` key, the button will disappear again.
4. When the button is pressed, the focus will be set to another defined HTML class selector and the browser will scroll to the element.

**Good description**

The revealing button needs a clear message to let the user easily understand the intention.

### Placement

Ensure you put a header or a section before the `SkipContent` component. It should describe the content, so the user understands the context.

#### Example with a section landmark (section) and header + `SkipContent.Return`:


```tsx
<section aria-labelledby="heading-id">
    <H2 id="heading-id">Description of table</H2>
     <SkipContent selector="#my-selector" text="Skip table content" />
     <Table aria-labelledby="heading-id">table content</Table>
  </section>
<section id="my-selector" aria-label="Submit">
    <div id="submit-form" />
  </section>
```


#### Example using a section landmark (section) and table caption:


```tsx
render(<section aria-labelledby="table-id">
      <SkipContent selector=".my-selector">Skip table content</SkipContent>

      <Table id="table-id">
        <caption>Description of table</caption>
      </Table>

      <div className="my-selector">
        <SkipContent.Return selector=".my-selector" // same as SkipContent
    text="Back to beginning of table" />

        <div id="submit-form" />
      </div>
    </section>)
```


### Return button

Optionally, you should consider including the `SkipContent.Return` utility as well. It lets the user jump back to where they came from (before the large content). This button is only focusable when the enter action via the skip button was performed.

### Screen readers and landmarks

The `SkipContent` helper component is mainly dedicated to keyboard navigation.

In order to let screen readers skip large parts of content, you need to ensure your HTML has [logical landmarks and regions](/uilib/usage/accessibility/checklist/#landmark--and-semantics-example).


## Related components

SkipContent is part of the [Navigation](/uilib/components/overview/#navigation) category. Other components for similar needs:

- [Breadcrumb](/uilib/components/breadcrumb/) – to show where someone is and let them move back up the path.
- [InfinityScroller](/uilib/components/pagination/infinity-scroller/) – to load more content automatically as people scroll.
- [Pagination](/uilib/components/pagination/) – to split long content into pages or load more content as people move through it.
- [StepIndicator](/uilib/components/step-indicator/) – to show progress through a process with several steps.
- [Tabs](/uilib/components/tabs/) – to let people switch between related views on the same page.


## Demos

### SkipContent with section


```tsx
<section aria-labelledby="table-with-caption heading">
    <H4 id="heading" space={0}>
      This table has many focusable elements
    </H4>
     <SkipContent selector="#submit-area" text="Skip table content" top />
     <LargeTableWithInteractiveElements id="table-with-caption" />
  </section>
<Section id="submit-area" innerSpace={{
block: 'small'
}} variant="divider" top>
    <SkipContent.Return selector="#submit-area" bottom>
      Back to beginning of table
    </SkipContent.Return>
     <Button>Submit</Button>
  </Section>
```

## Properties

The following properties applies to `SkipContent.Return` as well.


```json
{
  "props": {
    "selector": {
      "doc": "Define an existing HTML element selector to focus when the inner button got pressed.",
      "type": "string",
      "status": "required"
    },
    "text": {
      "doc": "Define a clear message describing the choices the user has.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "children": {
      "doc": "Define a clear message describing the choices the user has.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "focusDelay": {
      "doc": "Defines the delay after the enter key has been pressed.",
      "type": "number",
      "status": "optional"
    }
  }
}
```
