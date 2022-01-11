/**
 * UI lib Component Example
 *
 */

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import {
  card as Card,
  account_card as AccountCard,
  confetti as Confetti,
} from '@dnb/eufemia/src/icons'

export const TimelineSingleCompleted = () => (
  <ComponentBox data-visual-test="timeline-single-completed" hideCode>
    {() => /* jsx */ `
  <Timeline 
    data={[
      {
        name: "Completed event",
        state: "completed"
      }
    ]}
  />
`}
  </ComponentBox>
)

export const TimelineSingleCurrent = () => (
  <ComponentBox data-visual-test="timeline-single-current" hideCode>
    {() => /* jsx */ `
  <Timeline 
    data={[
      {
        name: "Current event",
        state: "current"
      }
    ]}
  />
`}
  </ComponentBox>
)

export const TimelineSingleUpcoming = () => (
  <ComponentBox data-visual-test="timeline-single-upcoming" hideCode>
    {() => /* jsx */ `
  <Timeline 
    data={[
      {
        name: "Upcoming event",
        state: "upcoming"
      }
    ]}
  />
`}
  </ComponentBox>
)

export const TimelineMultipleData = () => (
  <ComponentBox
    noFragments={false}
    data-visual-test="timeline-multiple"
    hideCode
  >
    {() => /* jsx */ `
() => {
  const events = [
    {
      name: "Completed event",
      date: "10. september 2021", 
      state: "completed"
    },
    {
      name: "Current event",
      infoMessage: "Additional information about this step if needed.",
      state: "current", 
    },
    {
      name: "Upcoming event",
      state: "upcoming", 
    },
  ];
  
  return (
    <Timeline data={events}/>
  )
}
`}
  </ComponentBox>
)

export const TimelineMultipleCompletedData = () => (
  <ComponentBox
    noFragments={false}
    data-visual-test="timeline-multiple-completed"
    hideCode
  >
    {() => /* jsx */ `
() => {
  const events = [
    {
      name: "Completed event#1",
      infoMessage: "Additional information about this step if needed.",
      date: "10. september 2021", 
      state: "completed"
    },
    {
      name: "Completed event#2",
      infoMessage: "Additional information about this step if needed.",
      state: "completed"
    },
    {
      name: "Completed event#3",
      date: "10. september 2021", 
      state: "completed"
    },
  ];
  
  return (
    <Timeline data={events}/>
  )
}
`}
  </ComponentBox>
)

export const TimelineMultipleUpcomingData = () => (
  <ComponentBox
    noFragments={false}
    data-visual-test="timeline-multiple-upcoming"
    hideCode
  >
    {() => /* jsx */ `
() => {
  const events = [
    {
      name: "Upcoming event#1",
      infoMessage: "Additional information about this step if needed.",
      date: "10. september 2021", 
      state: "upcoming"
    },
    {
      name: "Upcoming event#2",
      infoMessage: "Additional information about this step if needed.",
      state: "upcoming"
    },
    {
      name: "Upcoming event#3",
      date: "10. september 2021", 
      state: "upcoming"
    },
  ];
  
  return (
    <Timeline data={events}/>
  )
}
`}
  </ComponentBox>
)

export const TimelineMultipleCurrentData = () => (
  <ComponentBox
    noFragments={false}
    data-visual-test="timeline-multiple-current"
    hideCode
  >
    {() => /* jsx */ `
() => {
  const events = [
    {
      name: "Current event#1",
      infoMessage: "Additional information about this step if needed.",
      date: "10. september 2021", 
      state: "current"
    },
    {
      name: "Current event#2",
      infoMessage: "Additional information about this step if needed.",
      state: "current"
    },
    {
      name: "Current event#3",
      date: "10. september 2021", 
      state: "current"
    },
  ];
  
  return (
    <Timeline data={events}/>
  )
}
`}
  </ComponentBox>
)

export const TimelineMultiple = () => (
  <ComponentBox data-visual-test="timeline-multiple-children" hideCode>
    {() => /* jsx */ `
<Timeline>
  <Timeline.Item 
    name="Completed event" 
    date="10. september 2021" 
    state="completed"
  />
  <Timeline.Item 
    name="Current event" 
    infoMessage="Additional information about this step if needed." 
    state="current"
  />
  <Timeline.Item 
    name="Upcoming event" 
    state="upcoming"
  />
</Timeline>
`}
  </ComponentBox>
)

export const TimelineStates = () => (
  <ComponentBox
    noFragments={false}
    data-visual-test="timeline-states"
    hideCode
  >
    {() => /* jsx */ `
() => {
  const events = [
    {
      name: "Completed event",
      date: "10. september 2021", 
      infoMessage: "Additional information about this step if needed.",
      state: "completed"
    },
    {
      name: "Current event",
      date: "10. september 2021", 
      infoMessage: "Additional information about this step if needed.",
      state: "current"
    },
    {
      name: "Upcoming event",
      date: "10. september 2021", 
      infoMessage: "Additional information about this step if needed.",
      state: "upcoming"
    },
  ];
  
  return (
    <Timeline data={events}/>
  )
}
`}
  </ComponentBox>
)

export const TimelineIcons = () => (
  <ComponentBox
    noFragments={false}
    data-visual-test="timeline-icons"
    scope={{ Confetti, Card, AccountCard }}
    hideCode
  >
    {() => /* jsx */ `
() => {
  const events = [
    {
      name: "Completed event",
      state: "completed",
      icon: Confetti, 
      iconAlt: "Celebration"
    },
    {
      name: "Current event",
      state: "current",
      icon: Card,
      iconAlt: "Bank card"
    },
    {
      name: "Upcoming event",
      state: "upcoming",
      icon: AccountCard,
      iconAlt: "Money bag & card"
    },
  ];
  
  return (
    <Timeline data={events}/>
  )
}
`}
  </ComponentBox>
)

export const TimelineSkeleton = () => (
  <ComponentBox data-visual-test="timeline-skeleton" hideCode>
    {() => /* jsx */ `
  <Timeline
    skeleton
    data={[
      {
        name: "Upcoming",
        date: "10. september 2021", 
        state: "upcoming"
      }, 
      {
        name: "Current",
        date: "11. september 2021", 
        state: "current"
      }, 
      {
        name: "Completed",
        date: "12. september 2021", 
        state: "completed"
      },      
    ]}
  />
`}
  </ComponentBox>
)

export const TimelineItemSkeleton = () => (
  <ComponentBox data-visual-test="timeline-item-skeleton" hideCode>
    {() => /* jsx */ `
  <Timeline
    data={[
      {
        name: "Completed event#1",
        date: "10. september 2021", 
        state: "completed", 
        skeleton: true
      }, 
      {
        name: "Completed event#2",
        date: "11. september 2021", 
        infoMessage: "Additional information about this step if needed.",
        state: "completed",
      }
    ]}
  />
`}
  </ComponentBox>
)
