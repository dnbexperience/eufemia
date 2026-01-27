---
title: 'AriaLive'
description: 'AriaLive is a React component and hook that helps make your web app more accessible by announcing dynamic changes to screen readers.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.583Z
checksum: 25171b5c8cc76d65c2002c9b7b707ccdd6cfbdd830e63d183abb5919f8888758
---

# AriaLive

## Import

```tsx
import { AriaLive } from '@dnb/eufemia'
```

## Description

AriaLive is a React component and hook that helps make your web app more accessible by adding or defining an ARIA live region that announces dynamic changes to screen readers.

Use it to manually inform users using a screen reader about changes on the screen that are not normally covered by screen readers.

By default, the `AriaLive` component will announce changes to the screen reader in a polite manner. This means that the announcement will wait until the screen reader is idle. This is the recommended way to use the component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/aria-live)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/aria-live)

## Usage

For invisible text content:

```tsx
import { AriaLive } from '@dnb/eufemia'
render(<AriaLive>invisible message to announce</AriaLive>)
```

For content that is visible, but where changes need to be announced:

```tsx
import { AriaLive } from '@dnb/eufemia'
render(
  <AriaLive variant="content">
    <ul>
      <li>item one</li>
      <li>item two</li>
      {/* When item three appears, it will be announced */}
    </ul>
  </AriaLive>
)
```

## Priority

The `priority` property in the `AriaLive` component is used to control the urgency of the announcement. It can be set to `high` (defaults to `low`). This allows you to control how assertive the announcement should be, helping to create a better user experience for users who rely on screen readers.

## AriaLive Hook

The `useAriaLive` hook is a part of the `AriaLive` component. It can be used to make announcements in functional components. In this example `<section>` is turned into an ARIA live region with all the functionality of the `<AriaLive>` component:

```tsx
import useAriaLive from '@dnb/eufemia/components/aria-live/useAriaLive'

function MyCustomAriaLive(props) {
  const ariaAttributes = useAriaLive(props)
  return <section {...ariaAttributes} />
}
```

## Demos

### Playground

```tsx
const priorities = ['low', 'high']
const contents = {
  default: 'This is a default announcement',
  second: 'And a second one',
  third: 'A third one',
  fourth: 'And a fourth one',
}
const priority: 'low' | 'high' = 'low'
const defaultData = {
  enabled: false,
  content: contents.default,
  priority,
}
function AriaLiveExample() {
  const { data } = Form.useData('aria-live-playground', defaultData)
  return (
    <Form.Handler id="aria-live-playground">
      <Flex.Stack>
        <Field.Boolean label="Announcement enabled" path="/enabled" />
        <Field.Selection
          variant="button"
          optionsLayout="horizontal"
          label="Priority"
          path="/priority"
        >
          {priorities.map((content) => {
            return (
              <Field.Option
                key={content}
                title={content}
                value={content}
              />
            )
          })}
        </Field.Selection>

        <Field.Selection
          optionsLayout="horizontal"
          label="Content"
          path="/content"
        >
          {Object.entries(contents).map(([key, value]) => {
            return <Field.Option key={key} title={key} value={value} />
          })}
        </Field.Selection>

        <Field.String
          label="Content as freetext"
          path="/content-as-free-text"
          multiline
        />

        <Flex.Item>
          Output:{' '}
          <AriaLive
            delay={1000}
            disabled={!data.enabled}
            priority={data.priority}
            showAnnouncement
          >
            Message: {data.content}
          </AriaLive>
        </Flex.Item>
      </Flex.Stack>
    </Form.Handler>
  )
}
render(<AriaLiveExample />)
```

### Additions

```tsx
const defaultData = {
  enabled: false,
  content: ['Line 1'],
}
function AriaLiveExample() {
  const { data, update } = Form.useData('aria-live-additions', defaultData)
  return (
    <Form.Handler id="aria-live-additions">
      <Flex.Stack>
        <Field.Boolean label="Announcement enabled" path="/enabled" />

        <FieldBlock label="Content">
          <Form.ButtonRow>
            <Button
              text="Add more content"
              variant="secondary"
              icon="add"
              icon_position="left"
              on_click={() => {
                update('/content', (content) => {
                  const c = content.length + 1
                  content.push(`Line ${c}`)
                  return [...content]
                })
              }}
            />
            <Button
              text="Remove content"
              variant="tertiary"
              icon="subtract"
              icon_position="left"
              on_click={() => {
                update('/content', (content) => {
                  content.pop()
                  return [...content]
                })
              }}
            />
          </Form.ButtonRow>
        </FieldBlock>

        <Flex.Item>
          Output:{' '}
          <AriaLive variant="content" disabled={!data.enabled}>
            Message:{' '}
            {data.content.map((line, i) => {
              return <P key={i}>{line}</P>
            })}
          </AriaLive>
        </Flex.Item>
      </Flex.Stack>
    </Form.Handler>
  )
}
render(<AriaLiveExample />)
```

## Properties

```json
{
  "props": {
    "variant": {
      "doc": "Can be `text` for text messages or `content` for whole application content. Defaults to `text`.",
      "type": "string",
      "status": "optional"
    },
    "priority": {
      "doc": "Priority of the announcement. Can be `low` or `high`. Defaults to `low`.",
      "type": "string",
      "status": "optional"
    },
    "delay": {
      "doc": "Delay in milliseconds before the announcement is made. Defaults to `1000`.",
      "type": "number",
      "status": "optional"
    },
    "disabled": {
      "doc": "If `true`, the announcement will not be made. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "atomic": {
      "doc": "If `true`, assistive technologies will present the entire region as a whole. If `false`, only additions will be announced.",
      "type": "boolean",
      "status": "optional"
    },
    "politeness": {
      "doc": "The politeness setting for the announcement. Can be `polite` or `assertive`.",
      "type": "string",
      "status": "optional"
    },
    "relevant": {
      "doc": "A space-separated list of the types of changes that should be announced. Can be `additions`, `removals`, `text`, or `all`.",
      "type": "string",
      "status": "optional"
    },
    "showAnnouncement": {
      "doc": "Whether to show the children or not. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "children": {
      "doc": "The content that will be announced to the user.",
      "type": "ReactNode",
      "status": "required"
    }
  }
}
```
