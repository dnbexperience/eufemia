import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({Default:()=>s,Interactive:()=>c}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`Default`,children:`<Form.Handler
  data={{
    myList: ['foo', 'bar'],
  }}
>
  <Iterate.Count path="/myList" />
</Form.Handler>
`}),c=()=>(0,o.jsx)(r,{stableName:`Interactive`,noInline:!0,children:`const MyForm = () => {
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
`});function l(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||d(`Examples`,!1),s||d(`Examples.Default`,!0),c||d(`Examples.Interactive`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Default`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Interactive`}),`
`,(0,o.jsx)(c,{})]})}function u(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};