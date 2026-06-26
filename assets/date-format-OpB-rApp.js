import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-kfZVC31v.js";import r from"./demos-CZ0DXM45.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components},{RelatedComponents:r}=t;return r||s(`RelatedComponents`,!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { DateFormat } from '@dnb/eufemia'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsx)(t.p,{children:`A ready-to-use DNB date formatter. Use it wherever you want to format dates.`}),`
`,(0,i.jsx)(t.p,{children:`Good reasons to use this component:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`Makes the date formatting uniform for all DNB applications.`}),`
`,(0,i.jsx)(t.li,{children:`Makes dates accessible to screen readers.`}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[`For a quick overview of all supported date and number formats per locale, see `,(0,i.jsx)(t.a,{href:`/uilib/usage/best-practices/for-formatting/`,children:`Best Practices for number formatting`}),`.`]}),`
`,(0,i.jsx)(t.p,{children:`Good to know:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`You can render a date in `,(0,i.jsx)(t.strong,{children:`different formats`}),`, depending on the locale.`]}),`
`,(0,i.jsxs)(t.li,{children:[`The component supports `,(0,i.jsx)(t.strong,{children:`relative time`}),`, such as "2 hours ago", "in 3 days", etc.`]}),`
`,(0,i.jsxs)(t.li,{children:[`The component supports different `,(0,i.jsx)(t.strong,{children:`date styles`}),`, such as `,(0,i.jsx)(t.code,{children:`short`}),`, `,(0,i.jsx)(t.code,{children:`medium`}),`, `,(0,i.jsx)(t.code,{children:`long`}),`, and `,(0,i.jsx)(t.code,{children:`full`}),`.`]}),`
`,(0,i.jsxs)(t.li,{children:[`You can include `,(0,i.jsx)(t.strong,{children:`time`}),` by using the `,(0,i.jsx)(t.code,{children:`timeStyle`}),` property.`]}),`
`,(0,i.jsxs)(t.li,{children:[`Use `,(0,i.jsx)(t.code,{children:`relativeTimeStyle`}),` to control the style used for relative time.`]}),`
`,(0,i.jsxs)(t.li,{children:[`The component will automatically detect and format `,(0,i.jsx)(t.strong,{children:`ISO 8601 duration`}),` strings.`]}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/date-format`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/date-format`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Under the hood`}),`
`,(0,i.jsxs)(t.p,{children:[`The component uses `,(0,i.jsx)(t.code,{children:`Intl.DateTimeFormat`}),` browser API and `,(0,i.jsx)(t.code,{children:`Date.toLocaleDateString`}),` as a fallback, to format dates based on locale.`]}),`
`,(0,i.jsxs)(t.p,{children:[`See `,(0,i.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument`,children:`Intl.DateTimeFormat locale documentation`}),` for accepted string formats.`]}),`
`,(0,i.jsxs)(t.p,{children:[`The `,(0,i.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/time`,children:`time element`}),` is used to ensure that the date is readable for screen readers.`]}),`
`,(0,i.jsx)(t.h3,{children:`Supported date value formats`}),`
`,(0,i.jsx)(t.p,{children:`The following formats are supported as date values for conversion:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:`yyyy-MM-dd`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:`dd.MM.yyyy`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:`dd/MM/yyyy`})}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`Date`}),` object`]}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Relative time reference`}),`
`,(0,i.jsxs)(t.p,{children:[`When using `,(0,i.jsx)(t.code,{children:`relativeTime`}),`, you can provide a `,(0,i.jsx)(t.code,{children:`now`}),` property (as a function) to define the reference point for relative time calculations. This is useful for testing or when you need a specific reference time. If not provided, the current time is used.`]}),`
`,(0,i.jsxs)(t.h3,{children:[(0,i.jsx)(t.code,{children:`formatDate`}),` helper function`]}),`
`,(0,i.jsx)(t.p,{children:`If you really need a formatted date string without rendering the component, you can import the utility directly:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-ts`,children:`import { formatDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'
formatDate('2023-01-01', {
  locale: 'en-GB',
  dateStyle: 'long',
})
`})}),`
`,(0,i.jsxs)(t.h3,{children:[(0,i.jsx)(t.code,{children:`getOsloDate`}),` helper`]}),`
`,(0,i.jsxs)(t.p,{children:[`When you need a UTC Date object with midnight that always reflects the current day in `,(0,i.jsx)(t.code,{children:`Europe/Oslo`}),`, pull in the helper directly:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-ts`,children:`import { getOsloDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'
getOsloDate() // -> e.g. Date object representing "2025-11-24T00:00:00.000Z" regardless of the runtime timezone
`})}),`
`,(0,i.jsxs)(t.p,{children:[`This is helpful when you are comparing "today" against backend data or applying Oslo-specific highlighting in the `,(0,i.jsx)(t.a,{href:`/uilib/components/date-picker/`,children:`DatePicker`}),`.`]}),`
`,(0,i.jsx)(t.h4,{children:`Parameters`}),`
`,(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:`Name`}),(0,i.jsx)(t.th,{children:`Type`}),(0,i.jsx)(t.th,{children:`Default`}),(0,i.jsx)(t.th,{children:`Description`})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:`locale`})}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:`AnyLocale`})}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:`'nb-NO'`})}),(0,i.jsx)(t.td,{children:`The locale to use for formatting.`})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:`options`})}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:`Intl.DateTimeFormatOptions`})}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:`{ dateStyle: 'short' }`})}),(0,i.jsxs)(t.td,{children:[`The format options following the `,(0,i.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat`,children:`Intl.DateTimeFormat`}),` API.`]})]})]})]}),`
`,(0,i.jsx)(r,{})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function c(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}export{l as default};