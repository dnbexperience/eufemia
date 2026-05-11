import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r,y as i}from"./index-DVm0MbGb.js";var a=e({Autoresize:()=>f,CharacterCounter:()=>u,Disabled:()=>m,FormStatus:()=>p,MaxLength:()=>_,Placeholder:()=>c,RowsCols:()=>s,Sizes:()=>g,Stretched:()=>d,Suffix:()=>h,Vertical:()=>l}),o=t(),s=()=>(0,o.jsx)(v,{children:(0,o.jsx)(n,{"data-visual-test":`textarea-default`,children:`<Textarea
  label="Default"
  rows="2"
  cols="20"
  value="Textarea value
Newline"
  spellCheck={false}
  onChange={({ value }) => {
    console.log('onChange', value)
  }}
  onFocus={() => {
    console.log('onFocus')
  }}
  onBlur={() => {
    console.log('onBlur')
  }}
/>
`})}),c=()=>(0,o.jsx)(v,{children:(0,o.jsx)(n,{children:`<Textarea label="Placeholder" placeholder="Placeholder text" />
`})}),l=()=>(0,o.jsx)(v,{children:(0,o.jsx)(n,{children:`<Textarea
  label="Vertical"
  rows="3"
  cols="33"
  value="Textarea value with more than 3 lines
Newline
Newline
Newline
Newline"
/>
`})}),u=()=>(0,o.jsx)(v,{children:(0,o.jsx)(n,{"data-visual-test":`textarea-character-counter`,children:`<Textarea
  label="Count characters"
  autoResize
  value="Textarea value
Newline"
  status="Message to the user"
  characterCounter={40}
/>
`})}),d=()=>(0,o.jsx)(v,{children:(0,o.jsx)(n,{"data-visual-test":`textarea-stretch`,children:`<Textarea
  label="Horizontal"
  stretch={true}
  rows="3"
  value="Nec litora inceptos vestibulum id interdum donec gravida."
/>
`})}),f=()=>(0,o.jsx)(v,{children:(0,o.jsx)(n,{children:`<Textarea
  label="Autogrow"
  rows={1}
  autoResize={true}
  autoResizeMaxRows={4}
  placeholder="Placeholder"
  onKeyDown={({ rows, event }) => {
    if (rows >= 4 && event.key === 'Enter') {
      event.preventDefault()
    }
  }}
/>
`})}),p=()=>(0,o.jsx)(v,{children:(0,o.jsx)(n,{"data-visual-test":`textarea-error`,children:`<Textarea
  label="Error Message"
  cols="33"
  value="Nec litora inceptos vestibulum id interdum donec gravida."
  status="Message to the user"
/>
`})}),m=()=>(0,o.jsx)(v,{children:(0,o.jsx)(n,{"data-visual-test":`textarea-disabled`,children:`<Textarea
  label="Disabled"
  disabled
  value="Nec litora inceptos vestibulum id interdum donec gravida."
/>
`})}),h=()=>(0,o.jsx)(v,{children:(0,o.jsx)(n,{children:`<Textarea
  label="Textarea with suffix"
  value="Nec litora inceptos vestibulum id interdum donec gravida."
  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
/>
`})}),g=()=>(0,o.jsx)(v,{children:(0,o.jsx)(n,{"data-visual-test":`textarea-sizes`,children:`<Flex.Stack>
  <Textarea placeholder="Small size" size="small" rows={1} />
  <Textarea placeholder="Medium size" size="medium" rows={1} />
  <Textarea placeholder="Large size" size="large" rows={1} />
</Flex.Stack>
`})}),_=()=>(0,o.jsx)(v,{children:(0,o.jsx)(n,{hideCode:!0,children:`<Form.Handler>
  <Form.Card>
    <Field.String
      label="Label"
      placeholder="Write more than 3 characters to demonstrate the limit"
      multiline
      maxLength={3}
      required
      characterCounter={{
        max: 3,
        variant: 'up',
      }}
    />
    <Form.SubmitButton text="Test" />
  </Form.Card>
</Form.Handler>
`})}),v=i.div`
  display: block;
  width: 100%;
`;function y(e){let t={a:`a`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components};return a||x(`Examples`,!1),f||x(`Examples.Autoresize`,!0),u||x(`Examples.CharacterCounter`,!0),m||x(`Examples.Disabled`,!0),p||x(`Examples.FormStatus`,!0),c||x(`Examples.Placeholder`,!0),s||x(`Examples.RowsCols`,!0),g||x(`Examples.Sizes`,!0),d||x(`Examples.Stretched`,!0),h||x(`Examples.Suffix`,!0),l||x(`Examples.Vertical`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Textarea with rows and colds`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Textarea with placeholder text`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Vertically placed label`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Stretched horizontally placed label`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Autoresize with max rows`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`Character counter`}),`
`,(0,o.jsxs)(t.p,{children:[`Internally, the `,(0,o.jsx)(t.a,{href:`/uilib/components/fragments/text-counter/`,children:`TextCounter`}),` fragment is used to display the character counter.`]}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`With FormStatus failure message`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`Sizes`}),`
`,(0,o.jsx)(g,{}),`
`,(0,o.jsx)(t.h3,{children:`Disabled textarea`}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsx)(t.h3,{children:`Textarea with a suffix`}),`
`,(0,o.jsx)(h,{})]})}function b(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(y,{...e})}):y(e)}function x(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{b as default,_ as n,a as t};