import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{s as r}from"./ToggleButton-DfKpi57X.js";import{g as i,v as a,w as o}from"./forms-D54jfDKN.js";import{U as s}from"./index-BsJ3GLEw.js";import{t as c}from"./ComponentBox-sLMgHvLi.js";var l=e({Default:()=>d,Interactive:()=>f}),u=t(n()),d=()=>(0,u.jsx)(c,{stableName:`Default`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Form, Iterate, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Iterate:i},children:`<Form.Handler
  data={{
    myList: ['foo', 'bar'],
  }}
>
  <Iterate.Count path="/myList" />
</Form.Handler>
`}),f=()=>(0,u.jsx)(c,{stableName:`Interactive`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Form, Iterate, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Iterate:i,Form:o,Flex:r,Value:a},noInline:!0,children:`const MyForm = () => {
  const { count } = Iterate.useCount('myForm')
  return (
    <Form.Handler
      id="myForm"
      data={{
        myList: [1, 2],
      }}
    >
      <output>
        Total: <Iterate.Count path="/myList" />
      </output>

      <Iterate.Array path="/myList">
        <Iterate.AnimatedContainer gap={false}>
          <Flex.Horizontal align="center">
            <strong>
              <Value.Number itemPath="/" />
            </strong>
            <Iterate.RemoveButton />
          </Flex.Horizontal>
        </Iterate.AnimatedContainer>
      </Iterate.Array>
      <Iterate.PushButton
        path="/myList"
        pushValue={() => {
          return (
            Iterate.count({
              id: 'myForm',
              path: '/myList',
            }) + 1
          )
        }}
        top
      >
        Add item nr. {count('/myList') + 1}
      </Iterate.PushButton>
    </Form.Handler>
  )
}
render(<MyForm />)
`});function p(e){let t={h2:`h2`,h3:`h3`,...s(),...e.components};return l||h(`Examples`,!1),d||h(`Examples.Default`,!0),f||h(`Examples.Interactive`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Default`}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsx)(t.h3,{children:`Interactive`}),`
`,(0,u.jsx)(f,{})]})}function m(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};