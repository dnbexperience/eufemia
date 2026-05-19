import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{J as i,zr as a}from"./index-DqqByKA2.js";var o=t({IteratePath:()=>l,Path:()=>c}),s=e(n()),c=()=>(0,s.jsx)(r,{scope:{DataContext:i},stableName:`Path`,children:`<Form.Handler
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
`}),l=()=>(0,s.jsx)(r,{scope:{DataContext:i},stableName:`IteratePath`,children:`<Form.Handler
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
`});function u(e){let t={h2:`h2`,h3:`h3`,...a(),...e.components};return o||f(`Examples`,!1),l||f(`Examples.IteratePath`,!0),c||f(`Examples.Path`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`At path`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Iterate path`}),`
`,(0,s.jsx)(l,{})]})}function d(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};