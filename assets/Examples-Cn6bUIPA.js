import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-DPdYTeDv.js";import{xn as n}from"./index--zEB_f_m.js";var r=e(),i=()=>(0,r.jsx)(t,{"data-visual-test":`help-button-default`,children:`<HelpButton>Text</HelpButton>
`}),a=()=>(0,r.jsx)(t,{"data-visual-test":`help-button-suffix`,children:`<Input
  size={10}
  placeholder="Input ..."
  suffix={<HelpButton title="Custom title">Text</HelpButton>}
/>
`}),o=()=>(0,r.jsx)(t,{children:`<Form.Handler>
  <Form.Card>
    <Form.SubHeading>My form</Form.SubHeading>
    <Field.Email
      help={{
        title: 'Email help',
        content: (
          <>
            Enter your{' '}
            <TermDefinition content="Email is a method of exchanging messages between people using electronic devices.">
              email
            </TermDefinition>{' '}
            address
          </>
        ),
      }}
    />
  </Form.Card>
</Form.Handler>
`}),s=()=>(0,r.jsx)(t,{"data-visual-test":`help-button-sizes`,children:`
<HelpButton title="Custom title">Text</HelpButton>
<HelpButton
  size="small"
  left
  onClick={() => {
    console.log('onClick')
  }}
>
  Text
</HelpButton>

`}),c=()=>(0,r.jsx)(t,{children:`<HelpButton icon="information" tooltip="More info">
  <Dl>
    <Dt>Term</Dt>
    <Dd>Description</Dd>
    <Dd>Description</Dd>
    <Dt>Term</Dt>
    <Dd>Description</Dd>
  </Dl>
</HelpButton>
`}),l=()=>(0,r.jsx)(t,{"data-visual-test":`help-button-inline`,children:`<span>
  Text <HelpButton>Text</HelpButton> Text
</span>
`}),u=()=>(0,r.jsx)(t,{scope:{Dialog:n},children:`<HelpButton
  title="Title"
  render={(children, props) => (
    <Dialog triggerAttributes={props} className="your-class">
      {children}
    </Dialog>
  )}
>
  Help text
</HelpButton>
`});export{u as a,l as i,o as n,s as o,c as r,a as s,i as t};