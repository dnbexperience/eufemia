import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({TermDefinitionBasic:()=>s,TermDefinitionHelp:()=>l,TermDefinitionLabel:()=>u,TermDefinitionLead:()=>c}),o=e(n());function s(){return(0,o.jsx)(r,{"data-visual-test":`term-definition-basic`,background:`plain`,hideCode:!0,stableName:`TermDefinitionBasic`,children:`<P>
  A text with{' '}
  <TermDefinition content="Unusual words are words that are not commonly used or that many people might not know the meaning of.">
    unusual words (yeah)
  </TermDefinition>{' '}
  lorem ipsum dolor sit amet, consectetur adipiscing elit.
</P>
`})}function c(){return(0,o.jsx)(r,{"data-visual-test":`term-definition-typography`,background:`plain`,stableName:`TermDefinitionLead`,children:`
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

`})}function l(){return(0,o.jsx)(r,{stableName:`TermDefinitionHelp`,children:`<Form.Handler>
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
`})}function u(){return(0,o.jsx)(r,{stableName:`TermDefinitionLabel`,children:`<Form.Handler>
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
`})}function d(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components},{VisibleWhenVisualTest:n}=t;return a||p(`Examples`,!1),s||p(`Examples.TermDefinitionBasic`,!0),l||p(`Examples.TermDefinitionHelp`,!0),u||p(`Examples.TermDefinitionLabel`,!0),c||p(`Examples.TermDefinitionLead`,!0),n||p(`VisibleWhenVisualTest`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Basic`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`In help text`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`In label`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(n,{children:(0,o.jsx)(c,{})})]})}function f(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}function p(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as default};