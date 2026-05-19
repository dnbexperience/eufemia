import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{n,r,t as i}from"./confetti-CjKjwcCm.js";import{t as a}from"./ComponentBox-a4aOn231.js";import{zr as o}from"./index-DqqByKA2.js";var s=e(t()),c=()=>(0,s.jsx)(a,{"data-visual-test":`timeline-single-completed`,hideCode:!0,stableName:`TimelineSingleCompleted`,children:`<Timeline
  data={[
    {
      title: 'Completed event',
      state: 'completed',
    },
  ]}
/>
`}),l=()=>(0,s.jsx)(a,{"data-visual-test":`timeline-single-current`,hideCode:!0,stableName:`TimelineSingleCurrent`,children:`<Timeline
  data={[
    {
      title: 'Current event',
      state: 'current',
    },
  ]}
/>
`}),u=()=>(0,s.jsx)(a,{"data-visual-test":`timeline-single-upcoming`,hideCode:!0,stableName:`TimelineSingleUpcoming`,children:`<Timeline
  data={[
    {
      title: 'Upcoming event',
      state: 'upcoming',
    },
  ]}
/>
`}),d=()=>(0,s.jsx)(a,{"data-visual-test":`timeline-multiple`,hideCode:!0,stableName:`TimelineMultipleData`,noInline:!0,children:`render(
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
`}),f=()=>(0,s.jsx)(a,{"data-visual-test":`timeline-multiple-completed`,hideCode:!0,stableName:`TimelineMultipleCompletedData`,noInline:!0,children:`render(
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
`}),p=()=>(0,s.jsx)(a,{"data-visual-test":`timeline-multiple-upcoming`,hideCode:!0,stableName:`TimelineMultipleUpcomingData`,noInline:!0,children:`render(
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
`}),m=()=>(0,s.jsx)(a,{"data-visual-test":`timeline-multiple-current`,hideCode:!0,stableName:`TimelineMultipleCurrentData`,noInline:!0,children:`render(
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
`}),h=()=>(0,s.jsx)(a,{"data-visual-test":`timeline-multiple-children`,hideCode:!0,stableName:`TimelineMultiple`,children:`<Timeline>
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
`}),g=()=>(0,s.jsx)(a,{"data-visual-test":`timeline-states`,hideCode:!0,stableName:`TimelineStates`,noInline:!0,children:`render(
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
`}),_=()=>(0,s.jsx)(a,{"data-visual-test":`timeline-icons`,scope:{Confetti:i,Card:n,AccountCard:r},hideCode:!0,stableName:`TimelineIcons`,noInline:!0,children:`render(
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
`}),v=()=>(0,s.jsx)(a,{"data-visual-test":`timeline-skeleton`,hideCode:!0,stableName:`TimelineSkeleton`,children:`<Timeline
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
`}),y=()=>(0,s.jsx)(a,{"data-visual-test":`timeline-children-skeleton`,hideCode:!0,stableName:`TimelineAsChildrenSkeleton`,children:`<Timeline skeleton>
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
`}),b=()=>(0,s.jsx)(a,{"data-visual-test":`timeline-item-skeleton`,hideCode:!0,stableName:`TimelineItemSkeleton`,children:`<Timeline
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
`});function x(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,...o(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsxs)(t.h3,{children:[`Timeline with multiple `,(0,s.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),`:`]}),`
`,(0,s.jsxs)(t.p,{children:[`We can pass down a list of `,(0,s.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),` as a variable to `,(0,s.jsx)(t.code,{children:`data`}),`.`]}),`
`,(0,s.jsxs)(t.p,{children:[`It's also possible to pass down `,(0,s.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),` as `,(0,s.jsx)(t.code,{children:`children`}),`, see `,(0,s.jsx)(t.a,{href:`/uilib/components/timeline/#timeline-with-multiple-timeline-items-passed-down-as-children`,children:`example`}),`.`]}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsxs)(t.h3,{children:[`Timeline with multiple `,(0,s.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),` passed down as children:`]}),`
`,(0,s.jsxs)(t.p,{children:[`Passing down `,(0,s.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),` as children`]}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsxs)(t.h3,{children:[`Examples of Timelines with one `,(0,s.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline item`}),`:`]}),`
`,(0,s.jsxs)(t.h4,{children:[`Completed `,(0,s.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline item`}),`:`]}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsxs)(t.h4,{children:[`Current `,(0,s.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline item`}),`:`]}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsxs)(t.h4,{children:[`Upcoming `,(0,s.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline item`}),`:`]}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsxs)(t.h3,{children:[`Setting property `,(0,s.jsx)(t.code,{children:`state`}),` of `,(0,s.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline item`}),`:`]}),`
`,(0,s.jsxs)(t.p,{children:[`Property `,(0,s.jsx)(t.code,{children:`state`}),` changes styling of icon, border, and font of the `,(0,s.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline item`})]}),`
`,(0,s.jsx)(g,{}),`
`,(0,s.jsxs)(t.h3,{children:[`Setting property `,(0,s.jsx)(t.code,{children:`icon`}),` of `,(0,s.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),`:`]}),`
`,(0,s.jsxs)(t.p,{children:[`Property `,(0,s.jsx)(t.code,{children:`icon`}),` is by default set based on the value of `,(0,s.jsx)(t.code,{children:`state`}),` property, but can be overwritten by passing a `,(0,s.jsx)(t.code,{children:`icon`}),`, see how to `,(0,s.jsx)(t.a,{href:`/uilib/components/icon#importing-icons`,children:`import icons`}),`.`]}),`
`,(0,s.jsxs)(t.p,{children:[`See default icons based on value of `,(0,s.jsx)(t.code,{children:`state`}),` property in documentation for `,(0,s.jsx)(t.code,{children:`icon`}),` property of the `,(0,s.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline item`})]}),`
`,(0,s.jsx)(_,{}),`
`,(0,s.jsx)(t.h3,{children:`Timeline skeleton:`}),`
`,(0,s.jsx)(v,{}),`
`,(0,s.jsx)(t.h3,{children:`Timeline as children skeleton:`}),`
`,(0,s.jsx)(y,{}),`
`,(0,s.jsxs)(t.h3,{children:[(0,s.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`Timeline item`}),` skeleton:`]}),`
`,(0,s.jsx)(b,{}),`
`,(0,s.jsxs)(t.h3,{children:[`Timeline with multiple completed `,(0,s.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),`:`]}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsxs)(t.h3,{children:[`Timeline with multiple current `,(0,s.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),`:`]}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsxs)(t.h3,{children:[`Timeline with multiple upcoming `,(0,s.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),`:`]}),`
`,(0,s.jsx)(p,{})]})}function S(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(x,{...e})}):x(e)}export{S as default};