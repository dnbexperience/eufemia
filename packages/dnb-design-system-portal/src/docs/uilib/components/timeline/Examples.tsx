/**
 * UI lib Component Example
 *
 */

import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  card as Card,
  account_card as AccountCard,
  confetti as Confetti,
} from '@dnb/eufemia/src/icons'
import Timeline from '@dnb/eufemia/src/components/timeline/Timeline'

export const TimelineSingleCompleted = () => (
  <ComponentBox data-visual-test="timeline-single-completed" hideCode>
    <Timeline
      data={[
        {
          title: 'Completed event',
          state: 'completed',
        },
      ]}
    />
  </ComponentBox>
)

export const TimelineSingleCurrent = () => (
  <ComponentBox data-visual-test="timeline-single-current" hideCode>
    <Timeline
      data={[
        {
          title: 'Current event',
          state: 'current',
        },
      ]}
    />
  </ComponentBox>
)

export const TimelineSingleUpcoming = () => (
  <ComponentBox data-visual-test="timeline-single-upcoming" hideCode>
    <Timeline
      data={[
        {
          title: 'Upcoming event',
          state: 'upcoming',
        },
      ]}
    />
  </ComponentBox>
)

export const TimelineMultipleData = () => (
  <ComponentBox data-visual-test="timeline-multiple" hideCode>
    {() => {
      return (
        <Timeline
          data={[
            {
              title: 'Completed event',
              subtitle: '10. september 2021',
              state: 'completed',
            },
            {
              title: 'Current event',
              infoMessage:
                'Additional information about this step if needed.',
              state: 'current',
            },
            {
              title: 'Upcoming event',
              state: 'upcoming',
            },
          ]}
        />
      )
    }}
  </ComponentBox>
)

export const TimelineMultipleCompletedData = () => (
  <ComponentBox data-visual-test="timeline-multiple-completed" hideCode>
    {() => {
      return (
        <Timeline
          data={[
            {
              title: 'Completed event#1',
              infoMessage:
                'Additional information about this step if needed.',
              subtitle: '10. september 2021',
              state: 'completed',
            },
            {
              title: 'Completed event#2',
              infoMessage:
                'Additional information about this step if needed.',
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
    }}
  </ComponentBox>
)

export const TimelineMultipleUpcomingData = () => (
  <ComponentBox data-visual-test="timeline-multiple-upcoming" hideCode>
    {() => {
      return (
        <Timeline
          data={[
            {
              title: 'Upcoming event#1',
              infoMessage:
                'Additional information about this step if needed.',
              subtitle: '10. september 2021',
              state: 'upcoming',
            },
            {
              title: 'Upcoming event#2',
              infoMessage:
                'Additional information about this step if needed.',
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
    }}
  </ComponentBox>
)

export const TimelineMultipleCurrentData = () => (
  <ComponentBox data-visual-test="timeline-multiple-current" hideCode>
    {() => {
      return (
        <Timeline
          data={[
            {
              title: 'Current event#1',
              infoMessage:
                'Additional information about this step if needed.',
              subtitle: '10. september 2021',
              state: 'current',
            },
            {
              title: 'Current event#2',
              infoMessage:
                'Additional information about this step if needed.',
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
    }}
  </ComponentBox>
)

export const TimelineMultiple = () => (
  <ComponentBox data-visual-test="timeline-multiple-children" hideCode>
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
  </ComponentBox>
)

export const TimelineStates = () => (
  <ComponentBox data-visual-test="timeline-states" hideCode>
    {() => {
      return (
        <Timeline
          data={[
            {
              title: 'Completed event',
              subtitle: '10. september 2021',
              infoMessage:
                'Additional information about this step if needed.',
              state: 'completed',
            },
            {
              title: 'Current event',
              subtitle: '10. september 2021',
              infoMessage:
                'Additional information about this step if needed.',
              state: 'current',
            },
            {
              title: 'Upcoming event',
              subtitle: '10. september 2021',
              infoMessage:
                'Additional information about this step if needed.',
              state: 'upcoming',
            },
          ]}
        />
      )
    }}
  </ComponentBox>
)

export const TimelineIcons = () => (
  <ComponentBox
    data-visual-test="timeline-icons"
    scope={{ Confetti, Card, AccountCard }}
    hideCode
  >
    {() => {
      return (
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
    }}
  </ComponentBox>
)

export const TimelineSkeleton = () => (
  <ComponentBox data-visual-test="timeline-skeleton" hideCode>
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
  </ComponentBox>
)

export const TimelineAsChildrenSkeleton = () => (
  <ComponentBox data-visual-test="timeline-children-skeleton" hideCode>
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
  </ComponentBox>
)

export const TimelineItemSkeleton = () => (
  <ComponentBox data-visual-test="timeline-item-skeleton" hideCode>
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
  </ComponentBox>
)
