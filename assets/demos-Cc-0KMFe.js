import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-geTEYZ7b.js";import{Rr as i,a}from"./index-CMgyXmp3.js";var o=e({Autoresize:()=>p,CharacterCounter:()=>d,Disabled:()=>h,FormStatus:()=>m,MaxLength:()=>v,Placeholder:()=>l,RowsCols:()=>c,Sizes:()=>_,Stretched:()=>f,Suffix:()=>g,Vertical:()=>u});t();var s=n(),c=()=>(0,s.jsx)(y,{children:(0,s.jsx)(r,{"data-visual-test":`textarea-default`,children:`<Textarea
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
`})}),l=()=>(0,s.jsx)(y,{children:(0,s.jsx)(r,{children:`<Textarea label="Placeholder" placeholder="Placeholder text" />
`})}),u=()=>(0,s.jsx)(y,{children:(0,s.jsx)(r,{children:`<Textarea
  label="Vertical"
  rows="3"
  cols="33"
  value="Textarea value with more than 3 lines
Newline
Newline
Newline
Newline"
/>
`})}),d=()=>(0,s.jsx)(y,{children:(0,s.jsx)(r,{"data-visual-test":`textarea-character-counter`,children:`<Textarea
  label="Count characters"
  autoResize
  value="Textarea value
Newline"
  status="Message to the user"
  characterCounter={40}
/>
`})}),f=()=>(0,s.jsx)(y,{children:(0,s.jsx)(r,{"data-visual-test":`textarea-stretch`,children:`<Textarea
  label="Horizontal"
  stretch={true}
  rows="3"
  value="Nec litora inceptos vestibulum id interdum donec gravida."
/>
`})}),p=()=>(0,s.jsx)(y,{children:(0,s.jsx)(r,{children:`<Textarea
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
`})}),m=()=>(0,s.jsx)(y,{children:(0,s.jsx)(r,{"data-visual-test":`textarea-error`,children:`<Textarea
  label="Error Message"
  cols="33"
  value="Nec litora inceptos vestibulum id interdum donec gravida."
  status="Message to the user"
/>
`})}),h=()=>(0,s.jsx)(y,{children:(0,s.jsx)(r,{"data-visual-test":`textarea-disabled`,children:`<Textarea
  label="Disabled"
  disabled
  value="Nec litora inceptos vestibulum id interdum donec gravida."
/>
`})}),g=()=>(0,s.jsx)(y,{children:(0,s.jsx)(r,{children:`<Textarea
  label="Textarea with suffix"
  value="Nec litora inceptos vestibulum id interdum donec gravida."
  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
/>
`})}),_=()=>(0,s.jsx)(y,{children:(0,s.jsx)(r,{"data-visual-test":`textarea-sizes`,children:`<Flex.Stack>
  <Textarea placeholder="Small size" size="small" rows={1} />
  <Textarea placeholder="Medium size" size="medium" rows={1} />
  <Textarea placeholder="Large size" size="large" rows={1} />
</Flex.Stack>
`})}),v=()=>(0,s.jsx)(y,{children:(0,s.jsx)(r,{hideCode:!0,children:`<Form.Handler>
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
`})}),y=a.div`
  display: block;
  width: 100%;
`;function b(e){let t={a:`a`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return o||S(`Examples`,!1),p||S(`Examples.Autoresize`,!0),d||S(`Examples.CharacterCounter`,!0),h||S(`Examples.Disabled`,!0),m||S(`Examples.FormStatus`,!0),l||S(`Examples.Placeholder`,!0),c||S(`Examples.RowsCols`,!0),_||S(`Examples.Sizes`,!0),f||S(`Examples.Stretched`,!0),g||S(`Examples.Suffix`,!0),u||S(`Examples.Vertical`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Textarea with rows and colds`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Textarea with placeholder text`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`Vertically placed label`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`Stretched horizontally placed label`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`Autoresize with max rows`}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(t.h3,{children:`Character counter`}),`
`,(0,s.jsxs)(t.p,{children:[`Internally, the `,(0,s.jsx)(t.a,{href:`/uilib/components/fragments/text-counter/`,children:`TextCounter`}),` fragment is used to display the character counter.`]}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`With FormStatus failure message`}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`Sizes`}),`
`,(0,s.jsx)(_,{}),`
`,(0,s.jsx)(t.h3,{children:`Disabled textarea`}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsx)(t.h3,{children:`Textarea with a suffix`}),`
`,(0,s.jsx)(g,{})]})}function x(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(b,{...e})}):b(e)}function S(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default,v as n,o as t};