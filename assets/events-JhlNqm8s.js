import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-ppRu2ktv.js";import{n as r}from"./PropertiesTable-B8eoyvum.js";import{r as i,t as a}from"./PhoneNumberDocs-DkdRL1to.js";var o=e(t());function s(e){let t={code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,pre:`pre`,...n(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Events`}),`
`,(0,o.jsx)(t.h3,{children:`Field-specific events`}),`
`,(0,o.jsx)(r,{props:i}),`
`,(0,o.jsx)(t.h3,{children:`General events`}),`
`,(0,o.jsx)(r,{props:a}),`
`,(0,o.jsx)(t.h4,{children:`Details about general events arguments`}),`
`,(0,o.jsxs)(t.p,{children:[`The first argument value returned by the event handlers is a string in E.164 format, e.g. `,(0,o.jsx)(t.code,{children:`+479123457`}),`. If the `,(0,o.jsx)(t.code,{children:`omitCountryCodeField`}),` is set to `,(0,o.jsx)(t.code,{children:`true`}),`, then only the phone-number will be used, so the argument would be `,(0,o.jsx)(t.code,{children:`9123457`}),` without the leading country code.`]}),`
`,(0,o.jsx)(t.p,{children:`The PhoneNumber field also has an extra second parameter that includes additional information about the country code and phone number. This is an object with the following properties:`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`render(
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
`})})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(s,{...e})}):s(e)}export{c as default};