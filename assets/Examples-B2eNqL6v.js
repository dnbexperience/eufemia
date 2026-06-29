import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{g as r,j as i,w as a}from"./forms-D54jfDKN.js";import{t as o}from"./Card-BvVSLAbs.js";import{t as s}from"./ComponentBox-sLMgHvLi.js";var c=e({Default:()=>u}),l=t(n()),u=()=>(0,l.jsx)(s,{stableName:`Default`,sourceImports:[`import { Field, Form, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Iterate:r,Form:a,Card:o,Field:i},noInline:!0,children:`const MyForm = () => {
  const { count } = Iterate.useCount('myForm')
  return (
    <Form.Handler
      defaultData={{
        myList: ['Item 1'],
      }}
      id="myForm"
    >
      <Form.Card>
        <Iterate.Array
          path="/myList"
          placeholder={<>Empty list</>}
          animate
        >
          <Iterate.AnimatedContainer title="Title {itemNo}">
            <Field.String label="Label" itemPath="/" />

            <Iterate.Toolbar>
              <Iterate.RemoveButton />
            </Iterate.Toolbar>
          </Iterate.AnimatedContainer>
        </Iterate.Array>

        <Iterate.PushButton
          path="/myList"
          pushValue={\`Item \${String(count('/myList') + 1)}\`}
          text="Add new item"
        />
      </Form.Card>
    </Form.Handler>
  )
}
render(<MyForm />)
`});export{c as n,u as t};