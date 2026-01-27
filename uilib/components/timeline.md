---
title: 'Timeline'
description: 'The Timeline component shows events in chronological order and gives a great overview of the overall process.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.996Z
checksum: 7b8327863bd09751fb094d8efa78a85dcf8d2f99cefe1dcb7c58b31fe65c37d9
---

# Timeline

## Import

```tsx
import { Timeline } from '@dnb/eufemia'
```

## Description

A timeline shows events in chronological order and gives a great overview of the overall process. The component itself has interchangeable icons, additional info messages when needed, and each step has three states (completed, current, or upcoming).

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=19517-7350)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/timeline)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/timeline)

## Demos

### Timeline with multiple [timeline items](/uilib/components/timeline/properties#timelineitem-properties):

We can pass down a list of [timeline items](/uilib/components/timeline/properties#timelineitem-properties) as a variable to `data`.

It's also possible to pass down [timeline items](/uilib/components/timeline/properties#timelineitem-properties) as `children`, see [example](/uilib/components/timeline/#timeline-with-multiple-timeline-items-passed-down-as-children).

```tsx
render(
  <Timeline
    data={[
      {
        title: 'Completed event',
        subtitle: '10. september 2021',
        state: 'completed',
      },
      {
        title: 'Current event',
        infoMessage: 'Additional information about this step if needed.',
        state: 'current',
      },
      {
        title: 'Upcoming event',
        state: 'upcoming',
      },
    ]}
  />
)
```

### Timeline with multiple [timeline items](/uilib/components/timeline/properties#timelineitem-properties) passed down as children:

Passing down [timeline items](/uilib/components/timeline/properties#timelineitem-properties) as children

```tsx
render(
  <Timeline>
    <Timeline.Item
      title="Completed event"
      subtitle="10. september 2021"
      state="completed"
    />
    <Timeline.Item
      title="Current event"
      infoMessage="Additional information about this step if needed."
      state="current"
    />
    <Timeline.Item title="Upcoming event" state="upcoming" />
  </Timeline>
)
```

### Examples of Timelines with one [timeline item](/uilib/components/timeline/properties#timelineitem-properties):

#### Completed [timeline item](/uilib/components/timeline/properties#timelineitem-properties):

```tsx
render(
  <Timeline
    data={[
      {
        title: 'Completed event',
        state: 'completed',
      },
    ]}
  />
)
```

#### Current [timeline item](/uilib/components/timeline/properties#timelineitem-properties):

```tsx
render(
  <Timeline
    data={[
      {
        title: 'Current event',
        state: 'current',
      },
    ]}
  />
)
```

#### Upcoming [timeline item](/uilib/components/timeline/properties#timelineitem-properties):

```tsx
render(
  <Timeline
    data={[
      {
        title: 'Upcoming event',
        state: 'upcoming',
      },
    ]}
  />
)
```

### Setting property `state` of [timeline item](/uilib/components/timeline/properties#timelineitem-properties):

Property `state` changes styling of icon, border, and font of the [timeline item](/uilib/components/timeline/properties#timelineitem-properties)

```tsx
render(
  <Timeline
    data={[
      {
        title: 'Completed event',
        subtitle: '10. september 2021',
        infoMessage: 'Additional information about this step if needed.',
        state: 'completed',
      },
      {
        title: 'Current event',
        subtitle: '10. september 2021',
        infoMessage: 'Additional information about this step if needed.',
        state: 'current',
      },
      {
        title: 'Upcoming event',
        subtitle: '10. september 2021',
        infoMessage: 'Additional information about this step if needed.',
        state: 'upcoming',
      },
    ]}
  />
)
```

### Setting property `icon` of [timeline items](/uilib/components/timeline/properties#timelineitem-properties):

Property `icon` is by default set based on the value of `state` property, but can be overwritten by passing a `icon`, see how to [import icons](/uilib/components/icon#importing-icons).

See default icons based on value of `state` property in documentation for `icon` property of the [timeline item](/uilib/components/timeline/properties#timelineitem-properties)

```tsx
render(
  <Timeline
    data={[
      {
        title: 'Completed event',
        state: 'completed',
        icon: Confetti,
        iconAlt: 'Celebration',
      },
      {
        title: 'Current event',
        state: 'current',
        icon: Card,
        iconAlt: 'Bank card',
      },
      {
        title: 'Upcoming event',
        state: 'upcoming',
        icon: AccountCard,
        iconAlt: 'Money bag & card',
      },
    ]}
  />
)
```

### Timeline skeleton:

```tsx
render(
  <Timeline
    skeleton
    data={[
      {
        title: 'Upcoming',
        subtitle: '10. september 2021',
        state: 'upcoming',
      },
      {
        title: 'Current',
        subtitle: '11. september 2021',
        state: 'current',
      },
      {
        title: 'Completed',
        subtitle: '12. september 2021',
        state: 'completed',
      },
    ]}
  />
)
```

### Timeline as children skeleton:

```tsx
render(
  <Timeline skeleton>
    <Timeline.Item
      title="Upcoming"
      subtitle="10. september 2021"
      state="upcoming"
    />
    <Timeline.Item
      title="Current"
      subtitle="11. september 2021"
      state="current"
    />
    <Timeline.Item
      title="Completed"
      subtitle="11. september 2021"
      state="completed"
    />
  </Timeline>
)
```

### [Timeline item](/uilib/components/timeline/properties#timelineitem-properties) skeleton:

```tsx
render(
  <Timeline
    data={[
      {
        title: 'Completed event#1',
        subtitle: '10. september 2021',
        state: 'completed',
        skeleton: true,
      },
      {
        title: 'Completed event#2',
        subtitle: '11. september 2021',
        infoMessage: 'Additional information about this step if needed.',
        state: 'completed',
      },
    ]}
  />
)
```

### Timeline with multiple completed [timeline items](/uilib/components/timeline/properties#timelineitem-properties):

```tsx
render(
  <Timeline
    data={[
      {
        title: 'Completed event#1',
        infoMessage: 'Additional information about this step if needed.',
        subtitle: '10. september 2021',
        state: 'completed',
      },
      {
        title: 'Completed event#2',
        infoMessage: 'Additional information about this step if needed.',
        state: 'completed',
      },
      {
        title: 'Completed event#3',
        subtitle: '10. september 2021',
        state: 'completed',
      },
    ]}
  />
)
```

### Timeline with multiple current [timeline items](/uilib/components/timeline/properties#timelineitem-properties):

```tsx
render(
  <Timeline
    data={[
      {
        title: 'Current event#1',
        infoMessage: 'Additional information about this step if needed.',
        subtitle: '10. september 2021',
        state: 'current',
      },
      {
        title: 'Current event#2',
        infoMessage: 'Additional information about this step if needed.',
        state: 'current',
      },
      {
        title: 'Current event#3',
        subtitle: '10. september 2021',
        state: 'current',
      },
    ]}
  />
)
```

### Timeline with multiple upcoming [timeline items](/uilib/components/timeline/properties#timelineitem-properties):

```tsx
render(
  <Timeline
    data={[
      {
        title: 'Upcoming event#1',
        infoMessage: 'Additional information about this step if needed.',
        subtitle: '10. september 2021',
        state: 'upcoming',
      },
      {
        title: 'Upcoming event#2',
        infoMessage: 'Additional information about this step if needed.',
        state: 'upcoming',
      },
      {
        title: 'Upcoming event#3',
        subtitle: '10. september 2021',
        state: 'upcoming',
      },
    ]}
  />
)
```

## Properties

### `Timeline` properties

```json
{
  "props": {
    "data": {
      "doc": "List of [timeline items](/uilib/components/timeline/properties#timelineitem-properties) to render. Each object in data can include all properties from [Timeline.Item properties](/uilib/components/timeline/properties#timelineitem-properties).",
      "type": "Array<TimelineItemProps>",
      "status": "optional"
    },
    "children": {
      "doc": "Content of the component. Can be used instead of property `data`, by adding [Timeline Item](/uilib/components/timeline/properties#timelineitem-properties) as children `<Timeline.Item {...props} />`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

### `Timeline.Item` properties

```json
{
  "props": {
    "title": {
      "doc": "Title of the Timeline item.",
      "type": "React.ReactNode",
      "status": "required"
    },
    "state": {
      "doc": "The component state. Options: `completed` | `current` | `upcoming`.",
      "type": ["completed", "current", "upcoming"],
      "status": "required"
    },
    "subtitle": {
      "doc": "Subtitle of the Timeline item, displayed below the `title`. Also supports passing an array of subtitles. The subtitle is usually a date of the timeline item.",
      "type": ["React.ReactNode", "React.ReactNode[]"],
      "status": "optional"
    },
    "infoMessage": {
      "doc": "Info message, displayed in a [FormStatus of state info](/uilib/components/form-status#displaying-info-status), below the `subtitle` if it exists.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "icon": {
      "doc": "Override icon displaying on the left side (Not recommended). Default: `check` for state `completed`, `pin` for state `current`, and `calendar` for state `upcoming`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "iconAlt": {
      "doc": "Alt label describing the icon provided.",
      "type": "string",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    }
  }
}
```

### `Timeline.Item` translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "TimelineItem.alt_label_completed": {
      "nb-NO": "Utført",
      "en-GB": "Completed",
      "sv-SE": "Utförd",
      "da-DK": "Udført"
    },
    "TimelineItem.alt_label_current": {
      "nb-NO": "Nåværende",
      "en-GB": "Current",
      "sv-SE": "Nuvarande",
      "da-DK": "Nuværende"
    },
    "TimelineItem.alt_label_upcoming": {
      "nb-NO": "Kommende",
      "en-GB": "Upcoming",
      "sv-SE": "Kommande",
      "da-DK": "Kommende"
    }
  }
}
```
