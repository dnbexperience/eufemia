import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{Aa as i}from"./index-DqqByKA2.js";var a=t({AsyncChangeBehavior:()=>l,AsyncSubmitBehavior:()=>c,Default:()=>s,WithinALabel:()=>f,WithinOtherComponents:()=>d,createRequest:()=>u}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`Default`,children:`<Form.SubmitIndicator state="pending" />
`}),c=()=>(0,o.jsx)(r,{scope:{createRequest:u,debounceAsync:i},stableName:`AsyncSubmitBehavior`,noInline:!0,children:`const delay = debounceAsync(async function () {
  try {
    const request = createRequest()
    await request(1000) // Simulate a request
  } catch (error) {
    return error
  }
})
render(
  <Form.Handler onSubmit={delay}>
    <Form.Card>
      <Field.String path="/myField" label="Short label" />
      <Form.ButtonRow>
        <Form.SubmitButton />
        <Button variant="tertiary">Cancel</Button>
      </Form.ButtonRow>
    </Form.Card>
  </Form.Handler>
)
`}),l=()=>(0,o.jsx)(r,{scope:{createRequest:u,debounceAsync:i},stableName:`AsyncChangeBehavior`,noInline:!0,children:`const delay = debounceAsync(async function () {
  try {
    const request = createRequest()
    await request(1000) // Simulate a request
  } catch (error) {
    return error
  }
})
render(
  <Form.Handler onSubmit={delay} onChange={delay}>
    <Form.Card>
      <Field.String
        path="/myField1"
        label="Label (with async validation)"
        placeholder="Write something ..."
        onChangeValidator={delay}
      />
      <FieldBlock width="medium">
        <Field.String
          path="/myField2"
          width="stretch"
          label="This is a long label"
        />
      </FieldBlock>
      <Form.ButtonRow>
        <Form.SubmitButton />
        <Button variant="tertiary">Cancel</Button>
      </Form.ButtonRow>
    </Form.Card>
  </Form.Handler>
)
`}),u=()=>{let e,t,n=n=>new Promise(r=>{t=r,e=setTimeout(()=>{r({hasError:!1})},n)});return n.cancel=()=>{t?.({hasError:!0}),clearTimeout(e),e=null},n},d=()=>(0,o.jsx)(r,{stableName:`WithinOtherComponents`,children:`<Form.Handler>
  <Flex.Horizontal align="center">
    <Form.SubmitButton showIndicator />
    <Button variant="secondary" icon="chevron_right">
      Secondary
      <Form.SubmitIndicator state="pending" />
    </Button>
    <Button variant="tertiary">
      Tertiary
      <Form.SubmitIndicator state="pending" />
    </Button>
    <FormLabel>
      Label
      <Form.SubmitIndicator state="pending" />
    </FormLabel>
  </Flex.Horizontal>
</Form.Handler>
`}),f=()=>(0,o.jsx)(r,{"data-visual-test":`submit-indicator-with-label`,stableName:`WithinALabel`,children:`<Form.Handler>
  <Form.SubmitIndicator state="pending" showLabel />
</Form.Handler>
`});export{f as a,a as i,c as n,d as o,s as r,u as s,l as t};