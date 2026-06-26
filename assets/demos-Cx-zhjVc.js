import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{j as r,w as i}from"./forms-CFi5-4x5.js";import{t as a}from"./P-CtWu9WHu.js";import{t as o}from"./H2-DeJy7uXP.js";import{r as s,t as c}from"./Card-Db-Q1D3Y.js";import{t as l}from"./TermDefinition-DM4qK_HD.js";import{U as u}from"./index-kfZVC31v.js";import{t as d}from"./ComponentBox-qLaLt9T0.js";var f=e({TermDefinitionBasic:()=>m,TermDefinitionHelp:()=>g,TermDefinitionLabel:()=>_,TermDefinitionLead:()=>h}),p=t(n());function m(){return(0,p.jsx)(d,{"data-visual-test":`term-definition-basic`,background:`plain`,hideCode:!0,stableName:`TermDefinitionBasic`,sourceImports:[`import { H2, Lead, P, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{P:a,TermDefinition:l},children:`<P>
  A text with{' '}
  <TermDefinition content="Unusual words are words that are not commonly used or that many people might not know the meaning of.">
    unusual words (yeah)
  </TermDefinition>{' '}
  lorem ipsum dolor sit amet, consectetur adipiscing elit.
</P>
`})}function h(){return(0,p.jsx)(d,{"data-visual-test":`term-definition-typography`,background:`plain`,stableName:`TermDefinitionLead`,sourceImports:[`import { H2, Lead, P, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Lead:s,TermDefinition:l,H2:o},children:`
<Lead>
  As a lead with{' '}
  <TermDefinition content="Unusual words are words that are not commonly used or that many people might not know the meaning of.">
    unusual words (yeah)
  </TermDefinition>
  .
</Lead>
<H2 top={false}>
  As a heading with{' '}
  <TermDefinition content="Unusual words are words that are not commonly used or that many people might not know the meaning of.">
    unusual words (yeah)
  </TermDefinition>
  .
</H2>

`})}function g(){return(0,p.jsx)(d,{stableName:`TermDefinitionHelp`,sourceImports:[`import { H2, Lead, P, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Card:c,Field:r,TermDefinition:l},children:`<Form.Handler>
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
    <Field.Boolean
      variant="radio"
      label="Consent"
      help={{
        title: 'Data processing help',
        content: (
          <>
            I consent to{' '}
            <TermDefinition content="Data processing refers to any operation performed on personal data, such as collection, storage, use, or disclosure.">
              data processing
            </TermDefinition>
          </>
        ),
      }}
    />
  </Form.Card>
</Form.Handler>
`})}function _(){return(0,p.jsx)(d,{stableName:`TermDefinitionLabel`,sourceImports:[`import { H2, Lead, P, TermDefinition } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Card:c,Field:r,TermDefinition:l},children:`<Form.Handler>
  <Form.Card>
    <Form.SubHeading>My form</Form.SubHeading>
    <Field.Email
      label={
        <>
          Enter your{' '}
          <TermDefinition content="Email is a method of exchanging messages between people using electronic devices.">
            email
          </TermDefinition>{' '}
          address
        </>
      }
    />
    <Field.Boolean
      variant="checkbox"
      label={
        <>
          I consent to{' '}
          <TermDefinition content="Data processing refers to any operation performed on personal data, such as collection, storage, use, or disclosure.">
            data processing
          </TermDefinition>
        </>
      }
    />
  </Form.Card>
</Form.Handler>
`})}function v(e){let t={h2:`h2`,h3:`h3`,...u(),...e.components},{VisibleWhenVisualTest:n}=t;return f||b(`Examples`,!1),m||b(`Examples.TermDefinitionBasic`,!0),g||b(`Examples.TermDefinitionHelp`,!0),_||b(`Examples.TermDefinitionLabel`,!0),h||b(`Examples.TermDefinitionLead`,!0),n||b(`VisibleWhenVisualTest`,!0),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(t.h2,{children:`Demos`}),`
`,(0,p.jsx)(t.h3,{children:`Basic`}),`
`,(0,p.jsx)(m,{}),`
`,(0,p.jsx)(t.h3,{children:`In help text`}),`
`,(0,p.jsx)(g,{}),`
`,(0,p.jsx)(t.h3,{children:`In label`}),`
`,(0,p.jsx)(_,{}),`
`,(0,p.jsx)(n,{children:(0,p.jsx)(h,{})})]})}function y(e={}){let{wrapper:t}={...u(),...e.components};return t?(0,p.jsx)(t,{...e,children:(0,p.jsx)(v,{...e})}):v(e)}function b(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};