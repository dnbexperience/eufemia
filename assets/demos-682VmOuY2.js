import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({Disabled:()=>c,Inverted:()=>l,Required:()=>s}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`Required`,children:`<Form.Handler>
  <Flex.Stack>
    <Field.String label="Not required" />

    <Field.Provider required>
      <Field.String label="Required A" />
      <Field.Number label="Required B" />
    </Field.Provider>

    <Form.ButtonRow>
      <Form.SubmitButton />
    </Form.ButtonRow>
  </Flex.Stack>
</Form.Handler>
`}),c=()=>(0,o.jsx)(r,{stableName:`Disabled`,children:`<Form.Handler>
  <Flex.Stack>
    <Field.String label="Not disabled" />

    <Field.Provider disabled>
      <Flex.Stack>
        <Field.String label="Disabled" />
        <Form.ButtonRow>
          <Form.SubmitButton />
        </Form.ButtonRow>
      </Flex.Stack>
    </Field.Provider>
  </Flex.Stack>
</Form.Handler>
`}),l=()=>(0,o.jsx)(r,{stableName:`Inverted`,children:`<Form.Handler disabled>
  <Flex.Stack>
    <Field.String label="Disabled" />

    <Field.Provider disabled={false}>
      <Flex.Stack>
        <Field.String label="Not disabled" />
        <Form.ButtonRow>
          <Form.SubmitButton />
        </Form.ButtonRow>
      </Flex.Stack>
    </Field.Provider>
  </Flex.Stack>
</Form.Handler>
`});function u(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||f(`Examples`,!1),c||f(`Examples.Disabled`,!0),l||f(`Examples.Inverted`,!0),s||f(`Examples.Required`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Required`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Disabled`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Inverted`}),`
`,(0,o.jsx)(l,{})]})}function d(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};