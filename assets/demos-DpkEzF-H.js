import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{n as t,r as n,t as r}from"./confetti-C4pINmcX.js";import{t as i}from"./ComponentBox-geTEYZ7b.js";import{Rr as a}from"./index-CMgyXmp3.js";var o=e(),s=()=>(0,o.jsx)(i,{"data-visual-test":`timeline-single-completed`,hideCode:!0,children:`<Timeline
  data={[
    {
      title: 'Completed event',
      state: 'completed',
    },
  ]}
/>
`}),c=()=>(0,o.jsx)(i,{"data-visual-test":`timeline-single-current`,hideCode:!0,children:`<Timeline
  data={[
    {
      title: 'Current event',
      state: 'current',
    },
  ]}
/>
`}),l=()=>(0,o.jsx)(i,{"data-visual-test":`timeline-single-upcoming`,hideCode:!0,children:`<Timeline
  data={[
    {
      title: 'Upcoming event',
      state: 'upcoming',
    },
  ]}
/>
`}),u=()=>(0,o.jsx)(i,{"data-visual-test":`timeline-multiple`,hideCode:!0,noInline:!0,children:`render(
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
`}),d=()=>(0,o.jsx)(i,{"data-visual-test":`timeline-multiple-completed`,hideCode:!0,noInline:!0,children:`render(
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
`}),f=()=>(0,o.jsx)(i,{"data-visual-test":`timeline-multiple-upcoming`,hideCode:!0,noInline:!0,children:`render(
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
`}),p=()=>(0,o.jsx)(i,{"data-visual-test":`timeline-multiple-current`,hideCode:!0,noInline:!0,children:`render(
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
`}),m=()=>(0,o.jsx)(i,{"data-visual-test":`timeline-multiple-children`,hideCode:!0,children:`<Timeline>
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
`}),h=()=>(0,o.jsx)(i,{"data-visual-test":`timeline-states`,hideCode:!0,noInline:!0,children:`render(
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
`}),g=()=>(0,o.jsx)(i,{"data-visual-test":`timeline-icons`,scope:{Confetti:r,Card:t,AccountCard:n},hideCode:!0,noInline:!0,children:`render(
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
`}),_=()=>(0,o.jsx)(i,{"data-visual-test":`timeline-skeleton`,hideCode:!0,children:`<Timeline
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
`}),v=()=>(0,o.jsx)(i,{"data-visual-test":`timeline-children-skeleton`,hideCode:!0,children:`<Timeline skeleton>
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
`}),y=()=>(0,o.jsx)(i,{"data-visual-test":`timeline-item-skeleton`,hideCode:!0,children:`<Timeline
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
`});function b(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,...a(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsxs)(t.h3,{children:[`Timeline with multiple `,(0,o.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),`:`]}),`
`,(0,o.jsxs)(t.p,{children:[`We can pass down a list of `,(0,o.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),` as a variable to `,(0,o.jsx)(t.code,{children:`data`}),`.`]}),`
`,(0,o.jsxs)(t.p,{children:[`It's also possible to pass down `,(0,o.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),` as `,(0,o.jsx)(t.code,{children:`children`}),`, see `,(0,o.jsx)(t.a,{href:`/uilib/components/timeline/#timeline-with-multiple-timeline-items-passed-down-as-children`,children:`example`}),`.`]}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsxs)(t.h3,{children:[`Timeline with multiple `,(0,o.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),` passed down as children:`]}),`
`,(0,o.jsxs)(t.p,{children:[`Passing down `,(0,o.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),` as children`]}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsxs)(t.h3,{children:[`Examples of Timelines with one `,(0,o.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline item`}),`:`]}),`
`,(0,o.jsxs)(t.h4,{children:[`Completed `,(0,o.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline item`}),`:`]}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsxs)(t.h4,{children:[`Current `,(0,o.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline item`}),`:`]}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsxs)(t.h4,{children:[`Upcoming `,(0,o.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline item`}),`:`]}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsxs)(t.h3,{children:[`Setting property `,(0,o.jsx)(t.code,{children:`state`}),` of `,(0,o.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline item`}),`:`]}),`
`,(0,o.jsxs)(t.p,{children:[`Property `,(0,o.jsx)(t.code,{children:`state`}),` changes styling of icon, border, and font of the `,(0,o.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline item`})]}),`
`,(0,o.jsx)(h,{}),`
`,(0,o.jsxs)(t.h3,{children:[`Setting property `,(0,o.jsx)(t.code,{children:`icon`}),` of `,(0,o.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),`:`]}),`
`,(0,o.jsxs)(t.p,{children:[`Property `,(0,o.jsx)(t.code,{children:`icon`}),` is by default set based on the value of `,(0,o.jsx)(t.code,{children:`state`}),` property, but can be overwritten by passing a `,(0,o.jsx)(t.code,{children:`icon`}),`, see how to `,(0,o.jsx)(t.a,{href:`/uilib/components/icon#importing-icons`,children:`import icons`}),`.`]}),`
`,(0,o.jsxs)(t.p,{children:[`See default icons based on value of `,(0,o.jsx)(t.code,{children:`state`}),` property in documentation for `,(0,o.jsx)(t.code,{children:`icon`}),` property of the `,(0,o.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline item`})]}),`
`,(0,o.jsx)(g,{}),`
`,(0,o.jsx)(t.h3,{children:`Timeline skeleton:`}),`
`,(0,o.jsx)(_,{}),`
`,(0,o.jsx)(t.h3,{children:`Timeline as children skeleton:`}),`
`,(0,o.jsx)(v,{}),`
`,(0,o.jsxs)(t.h3,{children:[(0,o.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`Timeline item`}),` skeleton:`]}),`
`,(0,o.jsx)(y,{}),`
`,(0,o.jsxs)(t.h3,{children:[`Timeline with multiple completed `,(0,o.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),`:`]}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsxs)(t.h3,{children:[`Timeline with multiple current `,(0,o.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),`:`]}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsxs)(t.h3,{children:[`Timeline with multiple upcoming `,(0,o.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),`:`]}),`
`,(0,o.jsx)(f,{})]})}function x(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(b,{...e})}):b(e)}export{x as default};