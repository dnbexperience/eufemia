---
title: 'Timeline'
description: 'The Timeline component shows events in chronological order and gives a great overview of the overall process.'
metadata: https://eufemia.dnb.no/uilib/components/timeline/metadata.json
---

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
  />,
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
  </Timeline>,
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
  />,
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
  />,
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
  />,
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
  />,
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
  />,
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
  />,
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
  </Timeline>,
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
  />,
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
  />,
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
  />,
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
  />,
)
```
