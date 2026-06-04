import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./P-avM674pJ.js";import{t as i}from"./H4-DSlSyGZM.js";import{t as a}from"./Hr-Bm2_i4ho.js";import{t as o}from"./DateFormat-CeK-00NB.js";import{W as s,m as c,o as l}from"./index-D7e1avVt.js";import{t as u}from"./ComponentBox-CE7bpcJy.js";var d=e({DateAndTime:()=>S,DateFormatInline:()=>_,DateStyles:()=>h,DurationFormatting:()=>b,DurationWithStyles:()=>x,HideCurrentYear:()=>g,RelativeTime:()=>v,RelativeTimeWithStyles:()=>y,SupportedFormats:()=>m}),f=t(n()),p=c.div`
  p > .dnb-date-format {
    display: block;
    width: fit-content;
  }
`,m=()=>(0,f.jsx)(p,{children:(0,f.jsx)(u,{stableName:`SupportedFormats`,sourceImports:[`import styled from '@emotion/styled'`,`import { DateFormat, H4, Hr, P } from '@dnb/eufemia'`],__buildScope:{P:r,DateFormat:o},children:`<P>
  <DateFormat>2025-08-01</DateFormat>
  <DateFormat>01.08.2025</DateFormat>
  <DateFormat>01/08/2025</DateFormat>
  <DateFormat value={new Date('2025-08-01')} />
</P>
`})}),h=()=>(0,f.jsx)(p,{children:(0,f.jsx)(u,{"data-visual-test":`date-format-date-styles`,stableName:`DateStyles`,sourceImports:[`import styled from '@emotion/styled'`,`import { DateFormat, H4, Hr, P } from '@dnb/eufemia'`],__buildScope:{P:r,DateFormat:o},children:`<P>
  <DateFormat dateStyle="full">2025-08-01</DateFormat>
  <DateFormat dateStyle="long">2025-08-01</DateFormat>
  <DateFormat dateStyle="medium">2025-08-01</DateFormat>
  <DateFormat dateStyle="short">2025-08-01</DateFormat>
</P>
`})}),g=()=>(0,f.jsx)(p,{children:(0,f.jsx)(u,{stableName:`HideCurrentYear`,sourceImports:[`import styled from '@emotion/styled'`,`import { DateFormat, H4, Hr, P } from '@dnb/eufemia'`],__buildScope:{P:r,DateFormat:o,Hr:a},noInline:!0,children:`const currentYear = new Date().getFullYear()
const dateInCurrentYear = \`\${currentYear}-02-04\`
const dateInOtherYear = \`\${currentYear - 1}-02-04\`
render(
  <>
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
    </P>
    <Hr />
    <P>
      <DateFormat
        value={dateInCurrentYear}
        dateStyle="long"
        hideCurrentYear
      />
      <DateFormat
        value={dateInOtherYear}
        dateStyle="long"
        hideCurrentYear
      />
    </P>
  </>
)
`})}),_=()=>(0,f.jsx)(u,{"data-visual-test":`date-format-date-inline`,stableName:`DateFormatInline`,sourceImports:[`import styled from '@emotion/styled'`,`import { DateFormat, H4, Hr, P } from '@dnb/eufemia'`],__buildScope:{P:r,DateFormat:o},children:`<P>
  Payment due <DateFormat>2025-08-01</DateFormat>. Please make sure you
  have sufficient funds available.
</P>
`}),v=()=>(0,f.jsx)(p,{children:(0,f.jsx)(u,{stableName:`RelativeTime`,sourceImports:[`import styled from '@emotion/styled'`,`import { DateFormat, H4, Hr, P } from '@dnb/eufemia'`],__buildScope:{P:r,DateFormat:o},noInline:!0,children:`const referenceDate = new Date('2025-06-01T12:00:00')
render(
  <P>
    <DateFormat
      value={new Date('2025-06-01T11:59:30')}
      relativeTime
      relativeTimeReference={() => referenceDate}
    />
    <DateFormat
      value={new Date('2025-06-01T11:58:00')}
      relativeTime
      relativeTimeReference={() => referenceDate}
    />
    <DateFormat
      value={new Date('2025-05-31T12:00:00')}
      relativeTime
      relativeTimeReference={() => referenceDate}
    />
  </P>
)
`})}),y=()=>(0,f.jsx)(p,{children:(0,f.jsx)(u,{scope:{pastDates:[new Date(`2025-06-01T11:59:30`),new Date(`2025-06-01T11:58:00`),new Date(`2025-06-01T09:00:00`),new Date(`2025-05-30T12:00:00`),new Date(`2025-05-25T12:00:00`)],futureDates:[new Date(`2025-06-01T12:00:45`),new Date(`2025-06-01T12:05:00`),new Date(`2025-06-01T14:00:00`),new Date(`2025-06-04T12:00:00`),new Date(`2025-06-15T12:00:00`)],referenceDate:new Date(`2025-06-01T12:00:00`)},hideCode:!0,stableName:`RelativeTimeWithStyles`,sourceImports:[`import styled from '@emotion/styled'`,`import { DateFormat, H4, Hr, P } from '@dnb/eufemia'`],__buildScope:{H4:i,P:r,DateFormat:o},children:`
<H4>Short:</H4>
{pastDates.map((date, index) => (
  <P key={index}>
    <DateFormat
      value={date}
      relativeTime
      relativeTimeStyle="short"
      relativeTimeReference={() => referenceDate}
    />
    {index < pastDates.length - 1 && <br />}
  </P>
))}
<H4>Medium:</H4>
{pastDates.map((date, index) => (
  <P key={index}>
    <DateFormat
      value={date}
      relativeTime
      relativeTimeStyle="medium"
      relativeTimeReference={() => referenceDate}
    />
    {index < pastDates.length - 1 && <br />}
  </P>
))}
<H4>Long (default):</H4>
{pastDates.map((date, index) => (
  <P key={index}>
    <DateFormat
      value={date}
      relativeTime
      relativeTimeStyle="long"
      relativeTimeReference={() => referenceDate}
    />
    {index < pastDates.length - 1 && <br />}
  </P>
))}
<H4>Future dates with long style:</H4>
{futureDates.map((date, index) => (
  <P key={index}>
    <DateFormat
      value={date}
      relativeTime
      relativeTimeStyle="long"
      relativeTimeReference={() => referenceDate}
    />
    {index < futureDates.length - 1 && <br />}
  </P>
))}
<H4>Different locales with short style:</H4>
<P>
  <DateFormat
    value={pastDates[2]}
    relativeTime
    relativeTimeStyle="short"
    relativeTimeReference={() => referenceDate}
    locale="de-DE"
  />
  <DateFormat
    value={futureDates[2]}
    relativeTime
    relativeTimeStyle="short"
    relativeTimeReference={() => referenceDate}
    locale="sv-SE"
  />
</P>

`})}),b=()=>(0,f.jsx)(p,{children:(0,f.jsx)(u,{stableName:`DurationFormatting`,sourceImports:[`import styled from '@emotion/styled'`,`import { DateFormat, H4, Hr, P } from '@dnb/eufemia'`],__buildScope:{H4:i,P:r,DateFormat:o},children:`
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

`})}),x=()=>(0,f.jsx)(p,{children:(0,f.jsx)(u,{stableName:`DurationWithStyles`,sourceImports:[`import styled from '@emotion/styled'`,`import { DateFormat, H4, Hr, P } from '@dnb/eufemia'`],__buildScope:{H4:i,P:r,DateFormat:o},children:`
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

`})}),S=()=>(0,f.jsx)(u,{stableName:`DateAndTime`,sourceImports:[`import styled from '@emotion/styled'`,`import { DateFormat, H4, Hr, P } from '@dnb/eufemia'`],__buildScope:{P:r,DateFormat:o},children:`<P>
  Updated at{' '}
  <DateFormat
    value={new Date('2026-01-13T11:55:00')}
    dateStyle="medium"
    timeStyle="short"
    dateTimeSeparator=" – "
  />
</P>
`});function C(e){let t={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,ul:`ul`,...s(),...e.components};return d||T(`Examples`,!1),S||T(`Examples.DateAndTime`,!0),_||T(`Examples.DateFormatInline`,!0),h||T(`Examples.DateStyles`,!0),b||T(`Examples.DurationFormatting`,!0),x||T(`Examples.DurationWithStyles`,!0),g||T(`Examples.HideCurrentYear`,!0),v||T(`Examples.RelativeTime`,!0),y||T(`Examples.RelativeTimeWithStyles`,!0),m||T(`Examples.SupportedFormats`,!0),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(t.h2,{children:`Demos`}),`
`,(0,f.jsx)(l,{bottom:!0,label:`Locale used in the demos:`,listUSLocale:!0}),`
`,(0,f.jsx)(t.h3,{children:`Date styles`}),`
`,(0,f.jsx)(h,{}),`
`,(0,f.jsx)(t.h3,{children:`Hide year when in current year`}),`
`,(0,f.jsxs)(t.p,{children:[`Use `,(0,f.jsx)(t.code,{children:`hideCurrentYear`}),` to hide the year when the date is in the
current year. Works with any `,(0,f.jsx)(t.code,{children:`dateStyle`}),`.`]}),`
`,(0,f.jsxs)(t.p,{children:[`Use `,(0,f.jsx)(t.code,{children:`hideYear`}),` to always hide the year from the formatted date,`]}),`
`,(0,f.jsx)(g,{}),`
`,(0,f.jsx)(t.h3,{children:`Inline`}),`
`,(0,f.jsx)(_,{}),`
`,(0,f.jsx)(t.h3,{children:`Date value formats`}),`
`,(0,f.jsx)(m,{}),`
`,(0,f.jsx)(t.h3,{children:`Date and time`}),`
`,(0,f.jsxs)(t.p,{children:[`Use the `,(0,f.jsx)(t.code,{children:`timeStyle`}),` property to include a time value alongside the date. Add
`,(0,f.jsx)(t.code,{children:`dateTimeSeparator`}),` if you need a custom separator.`]}),`
`,(0,f.jsx)(S,{}),`
`,(0,f.jsx)(t.h3,{children:`Relative time`}),`
`,(0,f.jsx)(v,{}),`
`,(0,f.jsx)(t.h3,{children:`Relative time with different styles`}),`
`,(0,f.jsxs)(t.p,{children:[`Use `,(0,f.jsx)(t.code,{children:`relativeTimeStyle`}),` to control the relative time formatting without affecting `,(0,f.jsx)(t.code,{children:`dateStyle`}),`.`]}),`
`,(0,f.jsx)(y,{}),`
`,(0,f.jsx)(t.h3,{children:`Duration formatting`}),`
`,(0,f.jsx)(t.p,{children:`The DateFormat component automatically detects and formats ISO
8601 duration strings. No additional properties are needed.`}),`
`,(0,f.jsxs)(t.ul,{children:[`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.code,{children:`PT1H`}),` = 1 hour (P = period, T = time, 1H = 1 hour)`]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.code,{children:`PT2H30M`}),` = 2 hours 30 minutes`]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.code,{children:`P1D`}),` = 1 day (P = period, 1D = 1 day)`]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.code,{children:`P1DT2H30M`}),` = 1 day 2 hours 30 minutes`]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.code,{children:`P1W`}),` = 1 week,`]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.code,{children:`P1M`}),` = 1 month`]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.code,{children:`P1Y`}),` = 1 year`]}),`
`]}),`
`,(0,f.jsx)(b,{}),`
`,(0,f.jsx)(t.h3,{children:`Duration with different styles`}),`
`,(0,f.jsxs)(t.p,{children:[`The `,(0,f.jsx)(t.code,{children:`dateStyle`}),` property affects how durations are formatted using the browser's built-in `,(0,f.jsx)(t.code,{children:`Intl.DurationFormat`}),` API.`]}),`
`,(0,f.jsx)(x,{})]})}function w(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(C,{...e})}):C(e)}function T(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{w as default};