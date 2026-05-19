import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";var i=t({Default:()=>o}),a=e(n()),o=()=>(0,a.jsx)(r,{stableName:`Default`,noInline:!0,children:`const MyForm = () => {
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
`});export{i as n,o as t};