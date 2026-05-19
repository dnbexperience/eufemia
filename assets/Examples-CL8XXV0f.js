import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-a4aOn231.js";import{bn as r}from"./index-DqqByKA2.js";var i=e(t()),a=()=>(0,i.jsx)(n,{"data-visual-test":`help-button-default`,stableName:`HelpButtonDefaultExample`,children:`<HelpButton>Text</HelpButton>
`}),o=()=>(0,i.jsx)(n,{"data-visual-test":`help-button-suffix`,stableName:`HelpButtonSuffixExample`,children:`<Input
  size={10}
  placeholder="Input ..."
  suffix={<HelpButton title="Custom title">Text</HelpButton>}
/>
`}),s=()=>(0,i.jsx)(n,{stableName:`HelpButtonFormHelpExample`,children:`<Form.Handler>
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
`}),c=()=>(0,i.jsx)(n,{"data-visual-test":`help-button-sizes`,stableName:`HelpButtonSizesExample`,children:`
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

`}),l=()=>(0,i.jsx)(n,{stableName:`HelpButtonInfoIconExample`,children:`<HelpButton icon="information" tooltip="More info">
  <Dl>
    <Dt>Term</Dt>
    <Dd>Description</Dd>
    <Dd>Description</Dd>
    <Dt>Term</Dt>
    <Dd>Description</Dd>
  </Dl>
</HelpButton>
`}),u=()=>(0,i.jsx)(n,{"data-visual-test":`help-button-inline`,stableName:`HelpButtonInsideTextExample`,children:`<span>
  Text <HelpButton>Text</HelpButton> Text
</span>
`}),d=()=>(0,i.jsx)(n,{scope:{Dialog:r},stableName:`HelpButtonRenderExample`,children:`<HelpButton
  title="Title"
  render={(children, props) => (
    <Dialog triggerAttributes={props} className="your-class">
      {children}
    </Dialog>
  )}
>
  Help text
</HelpButton>
`});export{d as a,u as i,s as n,c as o,l as r,o as s,a as t};