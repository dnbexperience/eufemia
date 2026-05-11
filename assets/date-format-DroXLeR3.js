import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import n from"./demos-DXPuLdu3.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { DateFormat } from '@dnb/eufemia'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsx)(n.p,{children:`A ready to use DNB date formatter. Use it wherever you want to format dates.`}),`
`,(0,r.jsx)(n.p,{children:`Good reasons to use this component:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:`Makes the date formatting uniform for all DNB applications.`}),`
`,(0,r.jsx)(n.li,{children:`Makes dates accessible to screen readers.`}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`For a quick overview of all supported date and number formats per locale, see `,(0,r.jsx)(n.a,{href:`/uilib/usage/best-practices/for-formatting/`,children:`Best Practices for number formatting`}),`.`]}),`
`,(0,r.jsx)(n.p,{children:`Good to know:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`You can render a date in `,(0,r.jsx)(n.strong,{children:`different formats`}),`, depending on the locale.`]}),`
`,(0,r.jsxs)(n.li,{children:[`The component supports `,(0,r.jsx)(n.strong,{children:`relative time`}),`, such as "2 hours ago", "in 3 days", etc.`]}),`
`,(0,r.jsxs)(n.li,{children:[`The component supports different `,(0,r.jsx)(n.strong,{children:`date styles`}),`, such as `,(0,r.jsx)(n.code,{children:`short`}),`, `,(0,r.jsx)(n.code,{children:`medium`}),`, `,(0,r.jsx)(n.code,{children:`long`}),`, and `,(0,r.jsx)(n.code,{children:`full`}),`.`]}),`
`,(0,r.jsxs)(n.li,{children:[`You can include `,(0,r.jsx)(n.strong,{children:`time`}),` by using the `,(0,r.jsx)(n.code,{children:`timeStyle`}),` property.`]}),`
`,(0,r.jsxs)(n.li,{children:[`Use `,(0,r.jsx)(n.code,{children:`relativeTimeStyle`}),` to control the style used for relative time.`]}),`
`,(0,r.jsxs)(n.li,{children:[`The component will automatically detect and format `,(0,r.jsx)(n.strong,{children:`ISO 8601 duration`}),` strings.`]}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/date-format`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/date-format`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`Under the hood`}),`
`,(0,r.jsxs)(n.p,{children:[`The component uses `,(0,r.jsx)(n.code,{children:`Intl.DateTimeFormat`}),` browser API and `,(0,r.jsx)(n.code,{children:`Date.toLocaleDateString`}),` as a fallback, to format dates based on locale.`]}),`
`,(0,r.jsxs)(n.p,{children:[`See `,(0,r.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument`,children:`Intl.DateTimeFormat locale documentation`}),` for accepted string formats.`]}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/time`,children:`time element`}),` is used to ensure that the date is readable for screen readers.`]}),`
`,(0,r.jsx)(n.h3,{children:`Supported date value formats`}),`
`,(0,r.jsx)(n.p,{children:`The following formats are supported as date values for conversion:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:`yyyy-MM-dd`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:`dd.MM.yyyy`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:`dd/MM/yyyy`})}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`Date`}),` object`]}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`Relative time reference`}),`
`,(0,r.jsxs)(n.p,{children:[`When using `,(0,r.jsx)(n.code,{children:`relativeTime`}),`, you can provide a `,(0,r.jsx)(n.code,{children:`now`}),` property (as a function) to define the reference point for relative time calculations. This is useful for testing or when you need a specific reference time. If not provided, the current time is used.`]}),`
`,(0,r.jsxs)(n.h3,{children:[(0,r.jsx)(n.code,{children:`formatDate`}),` helper function`]}),`
`,(0,r.jsx)(n.p,{children:`If you really need a formatted date string without rendering the component, you can import the utility directly:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-ts`,children:`import { formatDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'
formatDate('2023-01-01', {
  locale: 'en-GB',
  dateStyle: 'long',
})
`})}),`
`,(0,r.jsxs)(n.h3,{children:[(0,r.jsx)(n.code,{children:`getOsloDate`}),` helper`]}),`
`,(0,r.jsxs)(n.p,{children:[`When you need a UTC Date object with midnight that always reflects the current day in `,(0,r.jsx)(n.code,{children:`Europe/Oslo`}),`, pull in the helper directly:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-ts`,children:`import { getOsloDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'
getOsloDate() // -> e.g. Date object representing "2025-11-24T00:00:00.000Z" regardless of the runtime timezone
`})}),`
`,(0,r.jsxs)(n.p,{children:[`This is helpful when you are comparing "today" against backend data or applying Oslo-specific highlighting in the `,(0,r.jsx)(n.a,{href:`/uilib/components/date-picker/`,children:`DatePicker`}),`.`]}),`
`,(0,r.jsx)(n.h4,{children:`Parameters`}),`
`,(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:`Name`}),(0,r.jsx)(n.th,{children:`Type`}),(0,r.jsx)(n.th,{children:`Default`}),(0,r.jsx)(n.th,{children:`Description`})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:`locale`})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:`AnyLocale`})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:`'nb-NO'`})}),(0,r.jsx)(n.td,{children:`The locale to use for formatting.`})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:`options`})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:`Intl.DateTimeFormatOptions`})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:`{ dateStyle: 'short' }`})}),(0,r.jsxs)(n.td,{children:[`The format options following the `,(0,r.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat`,children:`Intl.DateTimeFormat`}),` API.`]})]})]})]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};