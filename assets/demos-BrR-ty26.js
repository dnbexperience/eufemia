import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r}from"./index-DVm0MbGb.js";var i=e({TermDefinitionBasic:()=>o,TermDefinitionHelp:()=>c,TermDefinitionLabel:()=>l,TermDefinitionLead:()=>s}),a=t();function o(){return(0,a.jsx)(n,{"data-visual-test":`term-definition-basic`,background:`plain`,hideCode:!0,children:`<P>
  A text with{' '}
  <TermDefinition content="Unusual words are words that are not commonly used or that many people might not know the meaning of.">
    unusual words (yeah)
  </TermDefinition>{' '}
  lorem ipsum dolor sit amet, consectetur adipiscing elit.
</P>
`})}function s(){return(0,a.jsx)(n,{"data-visual-test":`term-definition-typography`,background:`plain`,children:`
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

`})}function c(){return(0,a.jsx)(n,{children:`<Form.Handler>
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
`})}function l(){return(0,a.jsx)(n,{children:`<Form.Handler>
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
`})}function u(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components},{VisibleWhenVisualTest:n}=t;return i||f(`Examples`,!1),o||f(`Examples.TermDefinitionBasic`,!0),c||f(`Examples.TermDefinitionHelp`,!0),l||f(`Examples.TermDefinitionLabel`,!0),s||f(`Examples.TermDefinitionLead`,!0),n||f(`VisibleWhenVisualTest`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Basic`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`In help text`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`In label`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(n,{children:(0,a.jsx)(s,{})})]})}function d(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};