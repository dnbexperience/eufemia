import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r}from"./index-CMgyXmp3.js";var i=e({Disabled:()=>s,Inverted:()=>c,Required:()=>o}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Form.Handler>
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
`}),s=()=>(0,a.jsx)(n,{children:`<Form.Handler>
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
`}),c=()=>(0,a.jsx)(n,{children:`<Form.Handler disabled>
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
`});function l(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||d(`Examples`,!1),s||d(`Examples.Disabled`,!0),c||d(`Examples.Inverted`,!0),o||d(`Examples.Required`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Required`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Disabled`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Inverted`}),`
`,(0,a.jsx)(c,{})]})}function u(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};