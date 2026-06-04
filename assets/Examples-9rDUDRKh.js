import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{lt as r}from"./SpacingUtils-BLnSccCA.js";import{t as i}from"./Button-CMFzxkr4.js";import{t as a}from"./FormLabel-DGaBW_Yl.js";import{c as o}from"./ToggleButton-BtQrsiHY.js";import{t as s}from"./Card--_AKADDp.js";import{a as c}from"./Selection-BFV7H91n.js";import{t as l}from"./Form-913YPZs6.js";import{t as u}from"./Field-CbVmykdw.js";import{t as d}from"./ComponentBox-CE7bpcJy.js";var f=e({AsyncChangeBehavior:()=>g,AsyncSubmitBehavior:()=>h,Default:()=>m,WithinALabel:()=>y,WithinOtherComponents:()=>v,createRequest:()=>_}),p=t(n()),m=()=>(0,p.jsx)(d,{stableName:`Default`,sourceImports:[`import { Button, Flex, FormLabel } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { debounceAsync } from '@dnb/eufemia/shared/helpers/debounce'`],__buildScope:{Form:l},children:`<Form.SubmitIndicator state="pending" />
`}),h=()=>(0,p.jsx)(d,{scope:{createRequest:_,debounceAsync:r},stableName:`AsyncSubmitBehavior`,sourceImports:[`import { Button, Flex, FormLabel } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { debounceAsync } from '@dnb/eufemia/shared/helpers/debounce'`],__buildScope:{Form:l,Card:s,Field:u,Button:i},noInline:!0,children:`const delay = debounceAsync(async function () {
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
`}),g=()=>(0,p.jsx)(d,{scope:{createRequest:_,debounceAsync:r},stableName:`AsyncChangeBehavior`,sourceImports:[`import { Button, Flex, FormLabel } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { debounceAsync } from '@dnb/eufemia/shared/helpers/debounce'`],__buildScope:{Form:l,Card:s,Field:u,FieldBlock:c,Button:i},noInline:!0,children:`const delay = debounceAsync(async function () {
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
`}),_=()=>{let e,t,n=n=>new Promise(r=>{t=r,e=setTimeout(()=>{r({hasError:!1})},n)});return n.cancel=()=>{t?.({hasError:!0}),clearTimeout(e),e=null},n},v=()=>(0,p.jsx)(d,{stableName:`WithinOtherComponents`,sourceImports:[`import { Button, Flex, FormLabel } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { debounceAsync } from '@dnb/eufemia/shared/helpers/debounce'`],__buildScope:{Form:l,Flex:o,Button:i,FormLabel:a},children:`<Form.Handler>
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
`}),y=()=>(0,p.jsx)(d,{"data-visual-test":`submit-indicator-with-label`,stableName:`WithinALabel`,sourceImports:[`import { Button, Flex, FormLabel } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { debounceAsync } from '@dnb/eufemia/shared/helpers/debounce'`],__buildScope:{Form:l},children:`<Form.Handler>
  <Form.SubmitIndicator state="pending" showLabel />
</Form.Handler>
`});export{y as a,f as i,h as n,v as o,m as r,_ as s,g as t};