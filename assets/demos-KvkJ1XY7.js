import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./P-avM674pJ.js";import{c as i}from"./ToggleButton-BtQrsiHY.js";import{t as a}from"./Form-913YPZs6.js";import{t as o}from"./Field-CbVmykdw.js";import{t as s}from"./Value-C2hl5_67.js";import{W as c}from"./index-D7e1avVt.js";import{t as l}from"./ComponentBox-CE7bpcJy.js";var u=e({FieldMultiSelectionPath:()=>g,Inline:()=>m,ListVariants:()=>h,WithDataPath:()=>_,WithDataProp:()=>p,WithValue:()=>f}),d=t(n()),f=()=>(0,d.jsx)(l,{stableName:`WithValue`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:s},children:`<Value.MultiSelection value={['Oslo', 'Stockholm', 'Copenhagen']} />
`}),p=()=>(0,d.jsx)(l,{stableName:`WithDataProp`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:s},noInline:!0,children:`const cities = [
  {
    value: 'oslo',
    title: 'Oslo',
  },
  {
    value: 'stockholm',
    title: 'Stockholm',
  },
  {
    value: 'copenhagen',
    title: 'Copenhagen',
  },
]
render(
  <Value.MultiSelection value={['oslo', 'copenhagen']} data={cities} />
)
`}),m=()=>(0,d.jsx)(l,{stableName:`Inline`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{P:r,Value:s},children:`<P>
  This is before the component{' '}
  <Value.MultiSelection
    value={['Oslo', 'Stockholm', 'Copenhagen']}
    inline
  />{' '}
  This is after the component
</P>
`}),h=()=>(0,d.jsx)(l,{stableName:`ListVariants`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:s},children:`<Value.SummaryList>
  <Value.MultiSelection
    value={['Oslo', 'Stockholm', 'Copenhagen']}
    label="Ordered List"
    variant="ol"
  />
  <Value.MultiSelection
    value={['Oslo', 'Stockholm', 'Copenhagen']}
    label="Unordered List"
    variant="ul"
  />
</Value.SummaryList>
`}),g=()=>(0,d.jsx)(l,{stableName:`FieldMultiSelectionPath`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Flex:i,Value:s,Field:o},noInline:!0,children:`const cities = [
  {
    value: 'oslo',
    title: 'Oslo',
  },
  {
    value: 'stockholm',
    title: 'Stockholm',
  },
  {
    value: 'copenhagen',
    title: 'Copenhagen',
  },
  {
    value: 'helsinki',
    title: 'Helsinki',
  },
  {
    value: 'reykjavik',
    title: 'Reykjavik',
  },
]
render(
  <Form.Handler>
    <Flex.Stack>
      <Value.MultiSelection
        inheritLabel
        path="/myPath"
        placeholder="No cities selected"
      />

      <Field.MultiSelection
        label="Select cities"
        path="/myPath"
        data={cities}
      />
    </Flex.Stack>
  </Form.Handler>
)
`}),_=()=>(0,d.jsx)(l,{stableName:`WithDataPath`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Value:s},children:`<Form.Handler
  data={{
    myItems: [
      {
        value: 'oslo',
        title: 'Oslo',
      },
      {
        value: 'stockholm',
        title: 'Stockholm',
      },
      {
        value: 'copenhagen',
        title: 'Copenhagen',
      },
    ],
    myPath: ['oslo', 'copenhagen'],
  }}
>
  <Value.MultiSelection
    label="Selected cities"
    path="/myPath"
    dataPath="/myItems"
  />
</Form.Handler>
`});function v(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...c(),...e.components};return u||b(`Examples`,!1),g||b(`Examples.FieldMultiSelectionPath`,!0),m||b(`Examples.Inline`,!0),h||b(`Examples.ListVariants`,!0),_||b(`Examples.WithDataPath`,!0),p||b(`Examples.WithDataProp`,!0),f||b(`Examples.WithValue`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsx)(t.h3,{children:`Value`}),`
`,(0,d.jsx)(f,{}),`
`,(0,d.jsx)(t.h3,{children:`Field.MultiSelection with path`}),`
`,(0,d.jsxs)(t.p,{children:[`When using the same `,(0,d.jsx)(t.code,{children:`path`}),` as on a `,(0,d.jsx)(t.code,{children:`Field.MultiSelection`}),`, titles are resolved automatically via field internals.`]}),`
`,(0,d.jsx)(g,{}),`
`,(0,d.jsx)(t.h3,{children:`With data prop`}),`
`,(0,d.jsxs)(t.p,{children:[`Resolve values to titles using the `,(0,d.jsx)(t.code,{children:`data`}),` prop.`]}),`
`,(0,d.jsx)(p,{}),`
`,(0,d.jsx)(t.h3,{children:`With dataPath`}),`
`,(0,d.jsxs)(t.p,{children:[`Use `,(0,d.jsx)(t.code,{children:`dataPath`}),` to resolve titles from the data context without rendering a `,(0,d.jsx)(t.code,{children:`Field.MultiSelection`}),`.`]}),`
`,(0,d.jsx)(_,{}),`
`,(0,d.jsx)(t.h3,{children:`Inline`}),`
`,(0,d.jsx)(m,{}),`
`,(0,d.jsx)(t.h3,{children:`List variants`}),`
`,(0,d.jsx)(h,{})]})}function y(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(v,{...e})}):v(e)}function b(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};