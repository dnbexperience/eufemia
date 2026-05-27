import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./Card-M3YCnXL2.js";import{t as i}from"./Form-CCz-rEVh.js";import{t as a}from"./Field-B1tS3XXm.js";import{E as o,Ia as s,un as c,wr as l,yr as u}from"./index-mmuoVhax.js";import{t as d}from"./ComponentBox-XDAvsf_r.js";var f=t({AsyncChangeBehavior:()=>g,AsyncSubmitBehavior:()=>h,Default:()=>m,WithinALabel:()=>y,WithinOtherComponents:()=>v,createRequest:()=>_}),p=e(n()),m=()=>(0,p.jsx)(d,{stableName:`Default`,sourceImports:[`import { Button, Flex, FormLabel } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { debounceAsync } from '@dnb/eufemia/shared/helpers/debounce'`],__buildScope:{Form:i},children:`<Form.SubmitIndicator state="pending" />
`}),h=()=>(0,p.jsx)(d,{scope:{createRequest:_,debounceAsync:s},stableName:`AsyncSubmitBehavior`,sourceImports:[`import { Button, Flex, FormLabel } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { debounceAsync } from '@dnb/eufemia/shared/helpers/debounce'`],__buildScope:{Form:i,Card:r,Field:a,Button:l},noInline:!0,children:`const delay = debounceAsync(async function () {
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
`}),g=()=>(0,p.jsx)(d,{scope:{createRequest:_,debounceAsync:s},stableName:`AsyncChangeBehavior`,sourceImports:[`import { Button, Flex, FormLabel } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { debounceAsync } from '@dnb/eufemia/shared/helpers/debounce'`],__buildScope:{Form:i,Card:r,Field:a,FieldBlock:o,Button:l},noInline:!0,children:`const delay = debounceAsync(async function () {
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
`}),_=()=>{let e,t,n=n=>new Promise(r=>{t=r,e=setTimeout(()=>{r({hasError:!1})},n)});return n.cancel=()=>{t?.({hasError:!0}),clearTimeout(e),e=null},n},v=()=>(0,p.jsx)(d,{stableName:`WithinOtherComponents`,sourceImports:[`import { Button, Flex, FormLabel } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { debounceAsync } from '@dnb/eufemia/shared/helpers/debounce'`],__buildScope:{Form:i,Flex:c,Button:l,FormLabel:u},children:`<Form.Handler>
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
`}),y=()=>(0,p.jsx)(d,{"data-visual-test":`submit-indicator-with-label`,stableName:`WithinALabel`,sourceImports:[`import { Button, Flex, FormLabel } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { debounceAsync } from '@dnb/eufemia/shared/helpers/debounce'`],__buildScope:{Form:i},children:`<Form.Handler>
  <Form.SubmitIndicator state="pending" showLabel />
</Form.Handler>
`});export{y as a,f as i,h as n,v as o,m as r,_ as s,g as t};