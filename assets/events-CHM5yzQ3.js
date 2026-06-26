import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-kfZVC31v.js";import{n as r}from"./PropertiesTable-BIB66Y92.js";import{r as i,t as a}from"./DateOfBirthDocs-BDSzDqWe.js";var o=e(t());function s(e){let t={code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,pre:`pre`,...n(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Events`}),`
`,(0,o.jsx)(t.h3,{children:`Field-specific events`}),`
`,(0,o.jsx)(r,{props:i}),`
`,(0,o.jsx)(t.h3,{children:`General events`}),`
`,(0,o.jsx)(r,{props:a}),`
`,(0,o.jsx)(t.h4,{children:`Details about general events arguments`}),`
`,(0,o.jsxs)(t.p,{children:[`The first argument value returned by the event handlers is a string where the day, month, and year is separated by a `,(0,o.jsx)(t.code,{children:`/`}),`, e.g. `,(0,o.jsx)(t.code,{children:`24/01/2024`}),`.`]}),`
`,(0,o.jsx)(t.p,{children:`The DateOfBirth field also has an extra second parameter that includes additional information about the day, month, and year. This is an object with the following properties:`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`render(
  <Field.DateOfBirth
    onChange={(
      value: string | undefined, // e.g. "24/01/2024"
      additionalArgs?: {
        day: string | undefined // e.g. "24"
        month: string // e.g. "01"
        year: string // e.g. "2024"
      }
    ) => {}}
  />
)
`})})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(s,{...e})}):s(e)}export{c as default};