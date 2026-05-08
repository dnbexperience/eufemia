import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{Lr as r}from"./index-2AO2Cu5K.js";var i=e({Default:()=>o,Interactive:()=>s}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Form.Handler
  data={{
    myList: ['foo', 'bar'],
  }}
>
  <Iterate.Count path="/myList" />
</Form.Handler>
`}),s=()=>(0,a.jsx)(n,{noInline:!0,children:`const MyForm = () => {
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
`});function c(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||u(`Examples`,!1),o||u(`Examples.Default`,!0),s||u(`Examples.Interactive`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Default`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Interactive`}),`
`,(0,a.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as default};