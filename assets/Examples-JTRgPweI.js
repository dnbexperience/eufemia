import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{M as n}from"./Autocomplete-6fC_p2_U.js";import{n as r,t as i}from"./Dt-tMuLm_4d.js";import{n as a,t as o}from"./HelpButton-B8IG5rB3.js";import{t as s}from"./Card-Dsou21Li.js";import{t as c}from"./TermDefinition-CItByeJc.js";import{t as l}from"./Form-B9l6EvGx.js";import{t as u}from"./Field-DHicZJEj.js";import{V as d}from"./index-CsG353ar.js";import{t as f}from"./ComponentBox-Cb1rLw_D.js";var p=e(t()),m=()=>(0,p.jsx)(f,{"data-visual-test":`help-button-default`,stableName:`HelpButtonDefaultExample`,sourceImports:[`import { HelpButton, Input, Dl, Dt, Dd, Dialog, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{HelpButton:o},children:`<HelpButton>Text</HelpButton>
`}),h=()=>(0,p.jsx)(f,{"data-visual-test":`help-button-suffix`,stableName:`HelpButtonSuffixExample`,sourceImports:[`import { HelpButton, Input, Dl, Dt, Dd, Dialog, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Input:n,HelpButton:o},children:`<Input
  size={10}
  placeholder="Input ..."
  suffix={<HelpButton title="Custom title">Text</HelpButton>}
/>
`}),g=()=>(0,p.jsx)(f,{stableName:`HelpButtonFormHelpExample`,sourceImports:[`import { HelpButton, Input, Dl, Dt, Dd, Dialog, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:l,Card:s,Field:u,TermDefinition:c},children:`<Form.Handler>
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
`}),_=()=>(0,p.jsx)(f,{"data-visual-test":`help-button-sizes`,stableName:`HelpButtonSizesExample`,sourceImports:[`import { HelpButton, Input, Dl, Dt, Dd, Dialog, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{HelpButton:o},children:`
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

`}),v=()=>(0,p.jsx)(f,{stableName:`HelpButtonInfoIconExample`,sourceImports:[`import { HelpButton, Input, Dl, Dt, Dd, Dialog, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{HelpButton:o,Dl:d,Dt:i,Dd:r},children:`<HelpButton icon="information" tooltip="More info">
  <Dl>
    <Dt>Term</Dt>
    <Dd>Description</Dd>
    <Dd>Description</Dd>
    <Dt>Term</Dt>
    <Dd>Description</Dd>
  </Dl>
</HelpButton>
`}),y=()=>(0,p.jsx)(f,{"data-visual-test":`help-button-inline`,stableName:`HelpButtonInsideTextExample`,sourceImports:[`import { HelpButton, Input, Dl, Dt, Dd, Dialog, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{HelpButton:o},children:`<span>
  Text <HelpButton>Text</HelpButton> Text
</span>
`}),b=()=>(0,p.jsx)(f,{scope:{Dialog:a},stableName:`HelpButtonRenderExample`,sourceImports:[`import { HelpButton, Input, Dl, Dt, Dd, Dialog, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{HelpButton:o,Dialog:a},children:`<HelpButton
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