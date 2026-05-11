import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";var r=e({Default:()=>a}),i=t(),a=()=>(0,i.jsx)(n,{noInline:!0,children:`const MyForm = () => {
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
`});export{r as n,a as t};