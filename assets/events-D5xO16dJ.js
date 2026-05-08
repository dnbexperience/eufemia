import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import{n}from"./PropertiesTable-NQTsOnC6.js";import{r,t as i}from"./PhoneNumberDocs-CNREmo6h.js";var a=e();function o(e){let o={code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,pre:`pre`,...t(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(o.h2,{children:`Events`}),`
`,(0,a.jsx)(o.h3,{children:`Field-specific events`}),`
`,(0,a.jsx)(n,{props:r}),`
`,(0,a.jsx)(o.h3,{children:`General events`}),`
`,(0,a.jsx)(n,{props:i}),`
`,(0,a.jsx)(o.h4,{children:`Details about general events arguments`}),`
`,(0,a.jsxs)(o.p,{children:[`The first argument value returned by the event handlers is a string in E.164 format, e.g. `,(0,a.jsx)(o.code,{children:`+479123457`}),`. If the `,(0,a.jsx)(o.code,{children:`omitCountryCodeField`}),` is set to `,(0,a.jsx)(o.code,{children:`true`}),`, then only the phone-number will be used, so the argument would be `,(0,a.jsx)(o.code,{children:`9123457`}),` without the leading country code.`]}),`
`,(0,a.jsx)(o.p,{children:`The PhoneNumber field also has an extra second parameter that includes additional information about the country code and phone number. This is an object with the following properties:`}),`
`,(0,a.jsx)(o.pre,{children:(0,a.jsx)(o.code,{className:`language-tsx`,children:`render(
  <Field.PhoneNumber
    onChange={(
      value: string | undefined, // e.g. "+4712345678"
      additionalArgs?: {
        phoneNumber: string | undefined // e.g. "12345678"
        countryCode: string // e.g. "+47"
        iso: string // e.g. "NO"
      }
    ) => {}}
  />
)
`})})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}export{s as default};