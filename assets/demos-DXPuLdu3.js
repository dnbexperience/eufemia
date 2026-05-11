import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r,o as i,y as a}from"./index-DVm0MbGb.js";var o=e({DateAndTime:()=>_,DateFormatInline:()=>f,DateStyles:()=>u,DurationFormatting:()=>h,DurationWithStyles:()=>g,HideCurrentYear:()=>d,RelativeTime:()=>p,RelativeTimeWithStyles:()=>m,SupportedFormats:()=>l}),s=t(),c=a.div`
  p > .dnb-date-format {
    display: block;
    width: fit-content;
  }
`,l=()=>(0,s.jsx)(c,{children:(0,s.jsx)(n,{children:`<P>
  <DateFormat>2025-08-01</DateFormat>
  <DateFormat>01.08.2025</DateFormat>
  <DateFormat>01/08/2025</DateFormat>
  <DateFormat value={new Date('2025-08-01')} />
</P>
`})}),u=()=>(0,s.jsx)(c,{children:(0,s.jsx)(n,{"data-visual-test":`date-format-date-styles`,children:`<P>
  <DateFormat dateStyle="full">2025-08-01</DateFormat>
  <DateFormat dateStyle="long">2025-08-01</DateFormat>
  <DateFormat dateStyle="medium">2025-08-01</DateFormat>
  <DateFormat dateStyle="short">2025-08-01</DateFormat>
</P>
`})}),d=()=>(0,s.jsx)(c,{children:(0,s.jsx)(n,{noInline:!0,children:`const currentYear = new Date().getFullYear()
const dateInCurrentYear = \`\${currentYear}-02-04\`
const dateInOtherYear = \`\${currentYear - 1}-02-04\`
render(
  <P>
    <DateFormat
      value={dateInCurrentYear}
      dateStyle="medium"
      hideCurrentYear
    />
    <DateFormat
      value={dateInOtherYear}
      dateStyle="medium"
      hideCurrentYear
    />
    <Hr />
    <DateFormat
      value={dateInCurrentYear}
      dateStyle="long"
      hideCurrentYear
    />
    <DateFormat value={dateInOtherYear} dateStyle="long" hideCurrentYear />
  </P>
)
`})}),f=()=>(0,s.jsx)(n,{"data-visual-test":`date-format-date-inline`,children:`<P>
  Payment due <DateFormat>2025-08-01</DateFormat>. Please make sure you
  have sufficient funds available.
</P>
`}),p=()=>(0,s.jsx)(c,{children:(0,s.jsx)(n,{children:`<P>
  <DateFormat
    value={new Date(new Date().getTime() - 30 * 1000)}
    relativeTime
  />
  <DateFormat
    value={new Date(new Date().getTime() - 2 * 60 * 1000)}
    relativeTime
  />
  <DateFormat
    value={new Date(new Date().getTime() - 24 * 60 * 60 * 1000)}
    relativeTime
  />
</P>
`})}),m=()=>{let e=new Date;return(0,s.jsx)(c,{children:(0,s.jsx)(n,{scope:{pastDates:[new Date(e.getTime()-30*1e3),new Date(e.getTime()-120*1e3),new Date(e.getTime()-10800*1e3),new Date(e.getTime()-2880*60*1e3),new Date(e.getTime()-10080*60*1e3)],futureDates:[new Date(e.getTime()+45*1e3),new Date(e.getTime()+300*1e3),new Date(e.getTime()+7200*1e3),new Date(e.getTime()+4320*60*1e3),new Date(e.getTime()+336*60*60*1e3)]},hideCode:!0,children:`
<H4>Short:</H4>
{pastDates.map((date, index) => (
  <P key={index}>
    <DateFormat value={date} relativeTime relativeTimeStyle="short" />
    {index < pastDates.length - 1 && <br />}
  </P>
))}
<H4>Medium:</H4>
{pastDates.map((date, index) => (
  <P key={index}>
    <DateFormat value={date} relativeTime relativeTimeStyle="medium" />
    {index < pastDates.length - 1 && <br />}
  </P>
))}
<H4>Long (default):</H4>
{pastDates.map((date, index) => (
  <P key={index}>
    <DateFormat value={date} relativeTime relativeTimeStyle="long" />
    {index < pastDates.length - 1 && <br />}
  </P>
))}
<H4>Future dates with long style:</H4>
{futureDates.map((date, index) => (
  <P key={index}>
    <DateFormat value={date} relativeTime relativeTimeStyle="long" />
    {index < futureDates.length - 1 && <br />}
  </P>
))}
<H4>Different locales with short style:</H4>
<P>
  <DateFormat
    value={pastDates[2]}
    relativeTime
    relativeTimeStyle="short"
    locale="de-DE"
  />
  <DateFormat
    value={futureDates[2]}
    relativeTime
    relativeTimeStyle="short"
    locale="sv-SE"
  />
</P>

`})})},h=()=>(0,s.jsx)(c,{children:(0,s.jsx)(n,{children:`
<H4>Short durations:</H4>
<P>
  <DateFormat value="PT1H" />
  <DateFormat value="PT2H30M" />
  <DateFormat value="PT45M" />
</P>
<H4>Longer durations:</H4>
<P>
  <DateFormat value="P1D" />
  <DateFormat value="P1DT2H30M" />
  <DateFormat value="P1W" />
  <DateFormat value="P1M" />
  <DateFormat value="P1Y" />
</P>
<H4>Different locales:</H4>
<P>
  <DateFormat value="PT2H30M" locale="en-US" />
  <DateFormat value="PT2H30M" locale="nb-NO" />
  <DateFormat value="PT2H30M" locale="de-DE" />
</P>

`})}),g=()=>(0,s.jsx)(c,{children:(0,s.jsx)(n,{children:`
<H4>Short:</H4>
<P>
  <DateFormat value="PT2H30M" dateStyle="short" />
  <DateFormat value="P1DT2H30M" dateStyle="short" />
</P>
<H4>Medium:</H4>
<P>
  <DateFormat value="PT2H30M" dateStyle="medium" />
  <DateFormat value="P1DT2H30M" dateStyle="medium" />
</P>
<H4>Long (default):</H4>
<P>
  <DateFormat value="PT2H30M" dateStyle="long" />
  <DateFormat value="P1DT2H30M" dateStyle="long" />
</P>
<H4>Different locales with short style:</H4>
<P>
  <DateFormat value="PT2H30M" dateStyle="short" locale="en-US" />
  <DateFormat value="PT2H30M" dateStyle="short" locale="nb-NO" />
  <DateFormat value="PT2H30M" dateStyle="short" locale="de-DE" />
</P>

`})}),_=()=>(0,s.jsx)(n,{children:`<P>
  Updated at{' '}
  <DateFormat
    value={new Date('2026-01-13T11:55:00')}
    dateStyle="medium"
    timeStyle="short"
    dateTimeSeparator=" – "
  />
</P>
`});function v(e){let t={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,ul:`ul`,...r(),...e.components};return o||b(`Examples`,!1),_||b(`Examples.DateAndTime`,!0),f||b(`Examples.DateFormatInline`,!0),u||b(`Examples.DateStyles`,!0),h||b(`Examples.DurationFormatting`,!0),g||b(`Examples.DurationWithStyles`,!0),d||b(`Examples.HideCurrentYear`,!0),p||b(`Examples.RelativeTime`,!0),m||b(`Examples.RelativeTimeWithStyles`,!0),l||b(`Examples.SupportedFormats`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(i,{bottom:!0,label:`Locale used in the demos:`,listUSLocale:!0}),`
`,(0,s.jsx)(t.h3,{children:`Date styles`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`Hide year when in current year`}),`
`,(0,s.jsxs)(t.p,{children:[`Use `,(0,s.jsx)(t.code,{children:`hideCurrentYear`}),` to hide the year when the date is in the
current year. Works with any `,(0,s.jsx)(t.code,{children:`dateStyle`}),`.`]}),`
`,(0,s.jsxs)(t.p,{children:[`Use `,(0,s.jsx)(t.code,{children:`hideYear`}),` to always hide the year from the formatted date,`]}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`Inline`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`Date value formats`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`Date and time`}),`
`,(0,s.jsxs)(t.p,{children:[`Use the `,(0,s.jsx)(t.code,{children:`timeStyle`}),` property to include a time value alongside the date. Add
`,(0,s.jsx)(t.code,{children:`dateTimeSeparator`}),` if you need a custom separator.`]}),`
`,(0,s.jsx)(_,{}),`
`,(0,s.jsx)(t.h3,{children:`Relative time`}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(t.h3,{children:`Relative time with different styles`}),`
`,(0,s.jsxs)(t.p,{children:[`Use `,(0,s.jsx)(t.code,{children:`relativeTimeStyle`}),` to control the relative time formatting without affecting `,(0,s.jsx)(t.code,{children:`dateStyle`}),`.`]}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`Duration formatting`}),`
`,(0,s.jsx)(t.p,{children:`The DateFormat component automatically detects and formats ISO
8601 duration strings. No additional properties are needed.`}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`PT1H`}),` = 1 hour (P = period, T = time, 1H = 1 hour)`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`PT2H30M`}),` = 2 hours 30 minutes`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`P1D`}),` = 1 day (P = period, 1D = 1 day)`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`P1DT2H30M`}),` = 1 day 2 hours 30 minutes`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`P1W`}),` = 1 week,`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`P1M`}),` = 1 month`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`P1Y`}),` = 1 year`]}),`
`]}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsx)(t.h3,{children:`Duration with different styles`}),`
`,(0,s.jsxs)(t.p,{children:[`The `,(0,s.jsx)(t.code,{children:`dateStyle`}),` property affects how durations are formatted using the browser's built-in `,(0,s.jsx)(t.code,{children:`Intl.DurationFormat`}),` API.`]}),`
`,(0,s.jsx)(g,{})]})}function y(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(v,{...e})}):v(e)}function b(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};