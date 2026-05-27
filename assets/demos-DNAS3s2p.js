import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./Form-PES0Uozy.js";import{t as i}from"./Field-DrUGn0oz.js";import{t as a}from"./Value-BOhdc4cL.js";import{J as o,Rr as s}from"./index-BIrFyEEc.js";import{t as c}from"./ComponentBox-DFVIRw0w.js";var l=t({IteratePath:()=>f,Path:()=>d}),u=e(n()),d=()=>(0,u.jsx)(c,{scope:{DataContext:o},stableName:`Path`,sourceImports:[`import { Form, Field, Value, DataContext } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:r,DataContext:o,Field:i},children:`<Form.Handler
  data={{
    foo: {
      one: 1,
      two: 2,
    },
    bar: 'Bar',
  }}
>
  <DataContext.At path="/foo">
    <Field.Number path="/one" label="One" />
    <Field.Number path="/two" label="Two" />
  </DataContext.At>
</Form.Handler>
`}),f=()=>(0,u.jsx)(c,{scope:{DataContext:o},stableName:`IteratePath`,sourceImports:[`import { Form, Field, Value, DataContext } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:r,DataContext:o,Value:a,Field:i},children:`<Form.Handler
  data={{
    list: [
      {
        title: 'Object 1',
      },
      {
        title: 'Object 2',
      },
    ],
    bar: 'Bar',
  }}
  onChange={(data) => console.log('onChange', data)}
  onPathChange={(path, value) => console.log('onPathChange', path, value)}
>
  <DataContext.At path="/list" iterate>
    <Value.String path="/title" label="Title" />
    <Field.String path="/title" label="Title" />
  </DataContext.At>
</Form.Handler>
`});function p(e){let t={h2:`h2`,h3:`h3`,...s(),...e.components};return l||h(`Examples`,!1),f||h(`Examples.IteratePath`,!0),d||h(`Examples.Path`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`At path`}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsx)(t.h3,{children:`Iterate path`}),`
`,(0,u.jsx)(f,{})]})}function m(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};