import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{n,t as r}from"./Dt-DpqYJ0VL.js";import{t as i}from"./Card-2G-TKpj3.js";import{t as a}from"./TermDefinition-CXnL1g9U.js";import{t as o}from"./Form-PES0Uozy.js";import{t as s}from"./Field-DrUGn0oz.js";import{Nn as c,bn as l,gr as u,xn as d}from"./index-BIrFyEEc.js";import{t as f}from"./ComponentBox-DFVIRw0w.js";var p=e(t()),m=()=>(0,p.jsx)(f,{"data-visual-test":`help-button-default`,stableName:`HelpButtonDefaultExample`,sourceImports:[`import { HelpButton, Input, Dl, Dt, Dd, Dialog, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{HelpButton:l},children:`<HelpButton>Text</HelpButton>
`}),h=()=>(0,p.jsx)(f,{"data-visual-test":`help-button-suffix`,stableName:`HelpButtonSuffixExample`,sourceImports:[`import { HelpButton, Input, Dl, Dt, Dd, Dialog, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Input:u,HelpButton:l},children:`<Input
  size={10}
  placeholder="Input ..."
  suffix={<HelpButton title="Custom title">Text</HelpButton>}
/>
`}),g=()=>(0,p.jsx)(f,{stableName:`HelpButtonFormHelpExample`,sourceImports:[`import { HelpButton, Input, Dl, Dt, Dd, Dialog, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Card:i,Field:s,TermDefinition:a},children:`<Form.Handler>
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

`}),v=()=>(0,p.jsx)(f,{stableName:`HelpButtonInfoIconExample`,sourceImports:[`import { HelpButton, Input, Dl, Dt, Dd, Dialog, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{HelpButton:l,Dl:c,Dt:r,Dd:n},children:`<HelpButton icon="information" tooltip="More info">
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
`}),b=()=>(0,p.jsx)(f,{scope:{Dialog:d},stableName:`HelpButtonRenderExample`,sourceImports:[`import { HelpButton, Input, Dl, Dt, Dd, Dialog, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{HelpButton:l,Dialog:d},children:`<HelpButton
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