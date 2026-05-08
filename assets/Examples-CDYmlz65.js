import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";import{Oa as r}from"./index--zEB_f_m.js";var i=e({AsyncChangeBehavior:()=>c,AsyncSubmitBehavior:()=>s,Default:()=>o,WithinALabel:()=>d,WithinOtherComponents:()=>u,createRequest:()=>l}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Form.SubmitIndicator state="pending" />
`}),s=()=>(0,a.jsx)(n,{scope:{createRequest:l,debounceAsync:r},noInline:!0,children:`const delay = debounceAsync(async function () {
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
`}),c=()=>(0,a.jsx)(n,{scope:{createRequest:l,debounceAsync:r},noInline:!0,children:`const delay = debounceAsync(async function () {
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
`}),l=()=>{let e,t,n=n=>new Promise(r=>{t=r,e=setTimeout(()=>{r({hasError:!1})},n)});return n.cancel=()=>{t?.({hasError:!0}),clearTimeout(e),e=null},n},u=()=>(0,a.jsx)(n,{children:`<Form.Handler>
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
`}),d=()=>(0,a.jsx)(n,{"data-visual-test":`submit-indicator-with-label`,children:`<Form.Handler>
  <Form.SubmitIndicator state="pending" showLabel />
</Form.Handler>
`});export{d as a,i,s as n,u as o,o as r,l as s,c as t};