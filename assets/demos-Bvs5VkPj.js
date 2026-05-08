import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";import{F as r,Lr as i}from"./index--zEB_f_m.js";var a=e({IteratePath:()=>c,Path:()=>s}),o=t(),s=()=>(0,o.jsx)(n,{scope:{DataContext:r},children:`<Form.Handler
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
`}),c=()=>(0,o.jsx)(n,{scope:{DataContext:r},children:`<Form.Handler
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
`});function l(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||d(`Examples`,!1),c||d(`Examples.IteratePath`,!0),s||d(`Examples.Path`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`At path`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Iterate path`}),`
`,(0,o.jsx)(c,{})]})}function u(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};