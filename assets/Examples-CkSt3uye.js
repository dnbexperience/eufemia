import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./Card-2G-TKpj3.js";import{t as i}from"./Form-PES0Uozy.js";import{t as a}from"./Field-DrUGn0oz.js";import{t as o}from"./Iterate-OgeEKoj_.js";import{t as s}from"./ComponentBox-DFVIRw0w.js";var c=t({Default:()=>u}),l=e(n()),u=()=>(0,l.jsx)(s,{stableName:`Default`,sourceImports:[`import { Field, Form, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Iterate:o,Form:i,Card:r,Field:a},noInline:!0,children:`const MyForm = () => {
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