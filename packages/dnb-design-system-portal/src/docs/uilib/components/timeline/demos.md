---
showTabs: true
---

import {
TimelineSingleCompleted,
TimelineSingleCurrent,
TimelineSingleUpcoming,
TimelineMultiple,
TimelineMultipleData,
TimelineMultipleCompletedData,
TimelineMultipleCurrentData,
TimelineMultipleUpcomingData,
TimelineStates,
TimelineIcons,
TimelineSkeleton,
TimelineItemSkeleton
} from 'Docs/uilib/components/timeline/Examples'

## Demos

### Timeline with multiple [timeline items](/uilib/components/timeline/properties#timelineitem-properties):

We can pass down a list of [timeline items](/uilib/components/timeline/properties#timelineitem-properties) as a variable to `data`.

It's also possible to pass down [timeline items](/uilib/components/timeline/properties#timelineitem-properties) as [children in Multiple Timeline](/uilib/components/timeline/#multiple-timeline-with-children).

<TimelineMultipleData />

### Timeline with multiple [timeline items](/uilib/components/timeline/properties#timelineitem-properties) passed down as children:

Passing down [timeline items](/uilib/components/timeline/properties#timelineitem-properties) as children

<TimelineMultiple />

### Examples of Timelines with one [timeline item](/uilib/components/timeline/properties#timelineitem-properties):

#### Completed [timeline item](/uilib/components/timeline/properties#timelineitem-properties):

<TimelineSingleCompleted />

#### Current [timeline item](/uilib/components/timeline/properties#timelineitem-properties):

<TimelineSingleCurrent />

#### Upcoming [timeline item](/uilib/components/timeline/properties#timelineitem-properties):

<TimelineSingleUpcoming />

### Setting property `state` of [timeline item](/uilib/components/timeline/properties#timelineitem-properties):

Property `state` changes styling of icon, border, and font of the [timeline item](/uilib/components/timeline/properties#timelineitem-properties)

<TimelineStates />

### Setting property `icon` of [timeline items](/uilib/components/timeline/properties#timelineitem-properties):

Property `icon` is by default set based on the value of `state` property, but can be overwritten by passing a `icon`, see how to [import icons](/uilib/components/icon#importing-icons).

See default icons based on value of `state` property in documentation for `icon` property of the [timeline item](/uilib/components/timeline/properties#timelineitem-properties)

<TimelineIcons />

### Timeline skeleton:

<TimelineSkeleton />

### [Timeline item](/uilib/components/timeline/properties#timelineitem-properties) skeleton:

<TimelineItemSkeleton />

### Timeline with multiple completed [timeline items](/uilib/components/timeline/properties#timelineitem-properties):

<TimelineMultipleCompletedData />

### Timeline with multiple current [timeline items](/uilib/components/timeline/properties#timelineitem-properties):

<TimelineMultipleCurrentData />

### Timeline with multiple upcoming [timeline items](/uilib/components/timeline/properties#timelineitem-properties):

<TimelineMultipleUpcomingData />
