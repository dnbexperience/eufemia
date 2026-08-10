import{n as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{P as r,R as i,a,c as o,s}from"./SpacingUtils-C2Ry62fw.js";import{F as c,g as l,m as u}from"./Anchor-ntifJ4U1.js";import{n as d,t as f}from"./withComponentMarkers-COR4bBOT.js";import{t as p}from"./check-BJWc8kYn.js";import{i as m,n as h,r as g,t as _}from"./pin-B2XklJ1a.js";import{n as v}from"./FormStatus-CJfQ1nLc.js";import{U as y}from"./index-D1L5wabr.js";import{t as b}from"./ComponentBox-B6YSImfw.js";var x=t(e()),S=t(n()),C=p,w=c,T=_,E=(0,x.createContext)(null),D={skeleton:!1},O=e=>{let t=(0,x.useContext)(o),n=(0,x.useContext)(E),{icon:r,iconAlt:a,title:c,subtitle:l,infoMessage:u,state:f,skeleton:p,...m}=i(e,D,t?.TimelineItem,{skeleton:t?.skeleton},n);return(0,S.jsxs)(`li`,{className:s(`dnb-timeline__item`,d(`font`,p,t),`dnb-timeline__item--${f}`),"aria-current":f===`current`?`step`:void 0,...m,children:[(0,S.jsx)(k,{state:f,title:c,icon:r,iconAlt:a,skeleton:p,translations:t.translation.TimelineItem}),(0,S.jsx)(M,{subtitle:l,infoMessage:u})]})},k=({title:e,...t})=>(0,S.jsxs)(`span`,{className:`dnb-timeline__item__label`,children:[(0,S.jsx)(A,{...t}),(0,S.jsx)(j,{title:e})]}),A=({icon:e,state:t,iconAlt:n,skeleton:r,translations:i})=>{let{altLabelCompleted:a,altLabelCurrent:o,altLabelUpcoming:s}=i,c={completed:C,current:T,upcoming:w},d={completed:a,current:o,upcoming:s},f=e||c[t],p=n||d[t];return(0,S.jsxs)(`span`,{className:`dnb-timeline__item__label__icon`,children:[(0,S.jsx)(u,{pseudoElementOnly:!0}),!r&&f&&(0,S.jsx)(l,{icon:f,alt:p,size:t===`current`?void 0:`small`})]})},j=({title:e})=>(0,S.jsx)(`span`,{className:`dnb-timeline__item__label__title`,children:e}),M=({subtitle:e,infoMessage:t})=>(0,S.jsxs)(`div`,{className:`dnb-timeline__item__content`,children:[e?Array.isArray(e)?e.map((e,t)=>(0,S.jsx)(N,{subtitle:e},t)):(0,S.jsx)(N,{subtitle:e}):null,t&&(0,S.jsx)(v,{text:t,state:`information`,className:`dnb-timeline__item__content__info`,stretch:!0})]}),N=({subtitle:e})=>(0,S.jsx)(`div`,{className:`dnb-timeline__item__content__subtitle`,children:e}),P={skeleton:!1},F=e=>{let t=(0,x.useContext)(o),n=i(e,P,t?.Timeline,{skeleton:t?.skeleton}),{className:c,skeleton:l,data:u,children:d,...f}=n;r(n,f);let p=a(n,{...f,className:s(`dnb-timeline`,`dnb-space__reset`,c)});return(0,S.jsx)(E,{value:{skeleton:l},children:(0,S.jsxs)(`ol`,{...p,children:[u?.map((e,t)=>(0,S.jsx)(O,{skeleton:l,...e},t)),d]})})};F.Item=O,f(F,{_supportsSpacingProps:!0});var I=()=>(0,S.jsx)(b,{"data-visual-test":`timeline-single-completed`,hideCode:!0,stableName:`TimelineSingleCompleted`,sourceImports:[`import { card as Card, account_card as AccountCard, confetti as Confetti } from '@dnb/eufemia/icons'`,`import Timeline from '@dnb/eufemia/components/timeline/Timeline'`],__buildScope:{Timeline:F},children:`<Timeline
  data={[
    {
      title: 'Completed event',
      state: 'completed',
    },
  ]}
/>
`}),L=()=>(0,S.jsx)(b,{"data-visual-test":`timeline-single-current`,hideCode:!0,stableName:`TimelineSingleCurrent`,sourceImports:[`import { card as Card, account_card as AccountCard, confetti as Confetti } from '@dnb/eufemia/icons'`,`import Timeline from '@dnb/eufemia/components/timeline/Timeline'`],__buildScope:{Timeline:F},children:`<Timeline
  data={[
    {
      title: 'Current event',
      state: 'current',
    },
  ]}
/>
`}),R=()=>(0,S.jsx)(b,{"data-visual-test":`timeline-single-upcoming`,hideCode:!0,stableName:`TimelineSingleUpcoming`,sourceImports:[`import { card as Card, account_card as AccountCard, confetti as Confetti } from '@dnb/eufemia/icons'`,`import Timeline from '@dnb/eufemia/components/timeline/Timeline'`],__buildScope:{Timeline:F},children:`<Timeline
  data={[
    {
      title: 'Upcoming event',
      state: 'upcoming',
    },
  ]}
/>
`}),z=()=>(0,S.jsx)(b,{"data-visual-test":`timeline-multiple`,hideCode:!0,stableName:`TimelineMultipleData`,sourceImports:[`import { card as Card, account_card as AccountCard, confetti as Confetti } from '@dnb/eufemia/icons'`,`import Timeline from '@dnb/eufemia/components/timeline/Timeline'`],__buildScope:{Timeline:F},noInline:!0,children:`render(
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
`}),B=()=>(0,S.jsx)(b,{"data-visual-test":`timeline-multiple-completed`,hideCode:!0,stableName:`TimelineMultipleCompletedData`,sourceImports:[`import { card as Card, account_card as AccountCard, confetti as Confetti } from '@dnb/eufemia/icons'`,`import Timeline from '@dnb/eufemia/components/timeline/Timeline'`],__buildScope:{Timeline:F},noInline:!0,children:`render(
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
`}),V=()=>(0,S.jsx)(b,{"data-visual-test":`timeline-multiple-upcoming`,hideCode:!0,stableName:`TimelineMultipleUpcomingData`,sourceImports:[`import { card as Card, account_card as AccountCard, confetti as Confetti } from '@dnb/eufemia/icons'`,`import Timeline from '@dnb/eufemia/components/timeline/Timeline'`],__buildScope:{Timeline:F},noInline:!0,children:`render(
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
`}),H=()=>(0,S.jsx)(b,{"data-visual-test":`timeline-multiple-current`,hideCode:!0,stableName:`TimelineMultipleCurrentData`,sourceImports:[`import { card as Card, account_card as AccountCard, confetti as Confetti } from '@dnb/eufemia/icons'`,`import Timeline from '@dnb/eufemia/components/timeline/Timeline'`],__buildScope:{Timeline:F},noInline:!0,children:`render(
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
`}),U=()=>(0,S.jsx)(b,{"data-visual-test":`timeline-multiple-children`,hideCode:!0,stableName:`TimelineMultiple`,sourceImports:[`import { card as Card, account_card as AccountCard, confetti as Confetti } from '@dnb/eufemia/icons'`,`import Timeline from '@dnb/eufemia/components/timeline/Timeline'`],__buildScope:{Timeline:F},children:`<Timeline>
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
`}),W=()=>(0,S.jsx)(b,{"data-visual-test":`timeline-states`,hideCode:!0,stableName:`TimelineStates`,sourceImports:[`import { card as Card, account_card as AccountCard, confetti as Confetti } from '@dnb/eufemia/icons'`,`import Timeline from '@dnb/eufemia/components/timeline/Timeline'`],__buildScope:{Timeline:F},noInline:!0,children:`render(
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
`}),G=()=>(0,S.jsx)(b,{"data-visual-test":`timeline-icons`,scope:{Confetti:h,Card:g,AccountCard:m},hideCode:!0,stableName:`TimelineIcons`,sourceImports:[`import { card as Card, account_card as AccountCard, confetti as Confetti } from '@dnb/eufemia/icons'`,`import Timeline from '@dnb/eufemia/components/timeline/Timeline'`],__buildScope:{Timeline:F,Card:g},noInline:!0,children:`render(
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
`}),K=()=>(0,S.jsx)(b,{"data-visual-test":`timeline-skeleton`,hideCode:!0,stableName:`TimelineSkeleton`,sourceImports:[`import { card as Card, account_card as AccountCard, confetti as Confetti } from '@dnb/eufemia/icons'`,`import Timeline from '@dnb/eufemia/components/timeline/Timeline'`],__buildScope:{Timeline:F},children:`<Timeline
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
`}),q=()=>(0,S.jsx)(b,{"data-visual-test":`timeline-children-skeleton`,hideCode:!0,stableName:`TimelineAsChildrenSkeleton`,sourceImports:[`import { card as Card, account_card as AccountCard, confetti as Confetti } from '@dnb/eufemia/icons'`,`import Timeline from '@dnb/eufemia/components/timeline/Timeline'`],__buildScope:{Timeline:F},children:`<Timeline skeleton>
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
`}),J=()=>(0,S.jsx)(b,{"data-visual-test":`timeline-item-skeleton`,hideCode:!0,stableName:`TimelineItemSkeleton`,sourceImports:[`import { card as Card, account_card as AccountCard, confetti as Confetti } from '@dnb/eufemia/icons'`,`import Timeline from '@dnb/eufemia/components/timeline/Timeline'`],__buildScope:{Timeline:F},children:`<Timeline
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
`});function Y(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,...y(),...e.components};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(t.h2,{children:`Demos`}),`
`,(0,S.jsxs)(t.h3,{children:[`Timeline with multiple `,(0,S.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),`:`]}),`
`,(0,S.jsxs)(t.p,{children:[`We can pass down a list of `,(0,S.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),` as a variable to `,(0,S.jsx)(t.code,{children:`data`}),`.`]}),`
`,(0,S.jsxs)(t.p,{children:[`It's also possible to pass down `,(0,S.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),` as `,(0,S.jsx)(t.code,{children:`children`}),`, see `,(0,S.jsx)(t.a,{href:`/uilib/components/timeline/#timeline-with-multiple-timeline-items-passed-down-as-children`,children:`example`}),`.`]}),`
`,(0,S.jsx)(z,{}),`
`,(0,S.jsxs)(t.h3,{children:[`Timeline with multiple `,(0,S.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),` passed down as children:`]}),`
`,(0,S.jsxs)(t.p,{children:[`Passing down `,(0,S.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),` as children`]}),`
`,(0,S.jsx)(U,{}),`
`,(0,S.jsxs)(t.h3,{children:[`Examples of Timelines with one `,(0,S.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline item`}),`:`]}),`
`,(0,S.jsxs)(t.h4,{children:[`Completed `,(0,S.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline item`}),`:`]}),`
`,(0,S.jsx)(I,{}),`
`,(0,S.jsxs)(t.h4,{children:[`Current `,(0,S.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline item`}),`:`]}),`
`,(0,S.jsx)(L,{}),`
`,(0,S.jsxs)(t.h4,{children:[`Upcoming `,(0,S.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline item`}),`:`]}),`
`,(0,S.jsx)(R,{}),`
`,(0,S.jsxs)(t.h3,{children:[`Setting property `,(0,S.jsx)(t.code,{children:`state`}),` of `,(0,S.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline item`}),`:`]}),`
`,(0,S.jsxs)(t.p,{children:[`Property `,(0,S.jsx)(t.code,{children:`state`}),` changes styling of icon, border, and font of the `,(0,S.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline item`})]}),`
`,(0,S.jsx)(W,{}),`
`,(0,S.jsxs)(t.h3,{children:[`Setting property `,(0,S.jsx)(t.code,{children:`icon`}),` of `,(0,S.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),`:`]}),`
`,(0,S.jsxs)(t.p,{children:[`Property `,(0,S.jsx)(t.code,{children:`icon`}),` is by default set based on the value of `,(0,S.jsx)(t.code,{children:`state`}),` property, but can be overwritten by passing a `,(0,S.jsx)(t.code,{children:`icon`}),`, see how to `,(0,S.jsx)(t.a,{href:`/uilib/components/icon#importing-icons`,children:`import icons`}),`.`]}),`
`,(0,S.jsxs)(t.p,{children:[`See default icons based on value of `,(0,S.jsx)(t.code,{children:`state`}),` property in documentation for `,(0,S.jsx)(t.code,{children:`icon`}),` property of the `,(0,S.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline item`})]}),`
`,(0,S.jsx)(G,{}),`
`,(0,S.jsx)(t.h3,{children:`Timeline skeleton:`}),`
`,(0,S.jsx)(K,{}),`
`,(0,S.jsx)(t.h3,{children:`Timeline as children skeleton:`}),`
`,(0,S.jsx)(q,{}),`
`,(0,S.jsxs)(t.h3,{children:[(0,S.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`Timeline item`}),` skeleton:`]}),`
`,(0,S.jsx)(J,{}),`
`,(0,S.jsxs)(t.h3,{children:[`Timeline with multiple completed `,(0,S.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),`:`]}),`
`,(0,S.jsx)(B,{}),`
`,(0,S.jsxs)(t.h3,{children:[`Timeline with multiple current `,(0,S.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),`:`]}),`
`,(0,S.jsx)(H,{}),`
`,(0,S.jsxs)(t.h3,{children:[`Timeline with multiple upcoming `,(0,S.jsx)(t.a,{href:`/uilib/components/timeline/properties#timelineitem-properties`,children:`timeline items`}),`:`]}),`
`,(0,S.jsx)(V,{})]})}function X(e={}){let{wrapper:t}={...y(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(Y,{...e})}):Y(e)}export{X as default};