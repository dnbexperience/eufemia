import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{Ft as n,It as r,Pt as i,j as a,w as o}from"./forms-CsJzlVUF.js";import{F as s}from"./Autocomplete-CcXvXMYE.js";import{c,s as l}from"./Table-D3iIoHmL.js";import{t as u}from"./Card-DP9KYSzC.js";import{t as d}from"./TermDefinition-DLu3nhXF.js";import{t as f}from"./ComponentBox-q_23Ylzi.js";var p=e(t()),m=()=>(0,p.jsx)(f,{"data-visual-test":`help-button-default`,stableName:`HelpButtonDefaultExample`,sourceImports:[`import { HelpButton, Input, Dl, Dt, Dd, Dialog, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{HelpButton:l},children:`<HelpButton>Text</HelpButton>
`}),h=()=>(0,p.jsx)(f,{"data-visual-test":`help-button-suffix`,stableName:`HelpButtonSuffixExample`,sourceImports:[`import { HelpButton, Input, Dl, Dt, Dd, Dialog, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Input:s,HelpButton:l},children:`<Input
  size={10}
  placeholder="Input ..."
  suffix={<HelpButton title="Custom title">Text</HelpButton>}
/>
`}),g=()=>(0,p.jsx)(f,{stableName:`HelpButtonFormHelpExample`,sourceImports:[`import { HelpButton, Input, Dl, Dt, Dd, Dialog, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Card:u,Field:a,TermDefinition:d},children:`<Form.Handler>
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
`}),_=()=>(0,p.jsx)(f,{"data-visual-test":`help-button-sizes`,stableName:`HelpButtonSizesExample`,sourceImports:[`import { HelpButton, Input, Dl, Dt, Dd, Dialog, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{HelpButton:l},children:`
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

`}),v=()=>(0,p.jsx)(f,{stableName:`HelpButtonInfoIconExample`,sourceImports:[`import { HelpButton, Input, Dl, Dt, Dd, Dialog, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{HelpButton:l,Dl:n,Dt:i,Dd:r},children:`<HelpButton icon="information" tooltip="More info">
  <Dl>
    <Dt>Term</Dt>
    <Dd>Description</Dd>
    <Dd>Description</Dd>
    <Dt>Term</Dt>
    <Dd>Description</Dd>
  </Dl>
</HelpButton>
`}),y=()=>(0,p.jsx)(f,{"data-visual-test":`help-button-inline`,stableName:`HelpButtonInsideTextExample`,sourceImports:[`import { HelpButton, Input, Dl, Dt, Dd, Dialog, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{HelpButton:l},children:`<span>
  Text <HelpButton>Text</HelpButton> Text
</span>
`}),b=()=>(0,p.jsx)(f,{scope:{Dialog:c},stableName:`HelpButtonRenderExample`,sourceImports:[`import { HelpButton, Input, Dl, Dt, Dd, Dialog, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{HelpButton:l,Dialog:c},children:`<HelpButton
  title="Title"
  render={(children, props) => (
    <Dialog triggerProps={props} className="your-class">
      {children}
    </Dialog>
  )}
>
  Help text
</HelpButton>
`});export{b as a,y as i,g as n,_ as o,v as r,h as s,m as t};