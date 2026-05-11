import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import{n}from"./PropertiesTable-C9mjC5N9.js";import{r,t as i}from"./DateOfBirthDocs-BytfL0yP.js";var a=e();function o(e){let o={code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,pre:`pre`,...t(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(o.h2,{children:`Events`}),`
`,(0,a.jsx)(o.h3,{children:`Field-specific events`}),`
`,(0,a.jsx)(n,{props:r}),`
`,(0,a.jsx)(o.h3,{children:`General events`}),`
`,(0,a.jsx)(n,{props:i}),`
`,(0,a.jsx)(o.h4,{children:`Details about general events arguments`}),`
`,(0,a.jsxs)(o.p,{children:[`The first argument value returned by the event handlers is a string where the day, month, and year is separated by a `,(0,a.jsx)(o.code,{children:`/`}),`, e.g. `,(0,a.jsx)(o.code,{children:`24/01/2024`}),`.`]}),`
`,(0,a.jsx)(o.p,{children:`The DateOfBirth field also has an extra second parameter that includes additional information about the day, month, and year. This is an object with the following properties:`}),`
`,(0,a.jsx)(o.pre,{children:(0,a.jsx)(o.code,{className:`language-tsx`,children:`render(
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
`})})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}export{s as default};