import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{a as r,t as i}from"./HelpButton-B8IG5rB3.js";import{c as a}from"./ToggleButton-T4E3Coih.js";import{t as o}from"./Card-Dsou21Li.js";import{g as s}from"./Upload-Cric0eoE.js";import{t as c}from"./Form-B9l6EvGx.js";import{t as l}from"./Field-DHicZJEj.js";import{K as u,m as d}from"./index-CsG353ar.js";import{t as f}from"./ComponentBox-Cb1rLw_D.js";var p=e({Autoresize:()=>b,CharacterCounter:()=>v,Disabled:()=>S,FormStatus:()=>x,MaxLength:()=>T,Placeholder:()=>g,RowsCols:()=>h,Sizes:()=>w,Stretched:()=>y,Suffix:()=>C,Vertical:()=>_}),m=t(n()),h=()=>(0,m.jsx)(E,{children:(0,m.jsx)(f,{"data-visual-test":`textarea-default`,stableName:`RowsCols`,sourceImports:[`import styled from '@emotion/styled'`,`import { Textarea, HelpButton, Flex } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Textarea:s},children:`<Textarea
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
`})}),g=()=>(0,m.jsx)(E,{children:(0,m.jsx)(f,{stableName:`Placeholder`,sourceImports:[`import styled from '@emotion/styled'`,`import { Textarea, HelpButton, Flex } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Textarea:s},children:`<Textarea label="Placeholder" placeholder="Placeholder text" />
`})}),_=()=>(0,m.jsx)(E,{children:(0,m.jsx)(f,{stableName:`Vertical`,sourceImports:[`import styled from '@emotion/styled'`,`import { Textarea, HelpButton, Flex } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Textarea:s},children:`<Textarea
  label="Vertical"
  rows="3"
  cols="33"
  value="Textarea value with more than 3 lines
Newline
Newline
Newline
Newline"
/>
`})}),v=()=>(0,m.jsx)(E,{children:(0,m.jsx)(f,{"data-visual-test":`textarea-character-counter`,stableName:`CharacterCounter`,sourceImports:[`import styled from '@emotion/styled'`,`import { Textarea, HelpButton, Flex } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Textarea:s},children:`<Textarea
  label="Count characters"
  autoResize
  value="Textarea value
Newline"
  status="Message to the user"
  characterCounter={40}
/>
`})}),y=()=>(0,m.jsx)(E,{children:(0,m.jsx)(f,{"data-visual-test":`textarea-stretch`,stableName:`Stretched`,sourceImports:[`import styled from '@emotion/styled'`,`import { Textarea, HelpButton, Flex } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Textarea:s},children:`<Textarea
  label="Horizontal"
  stretch={true}
  rows="3"
  value="Nec litora inceptos vestibulum id interdum donec gravida."
/>
`})}),b=()=>(0,m.jsx)(E,{children:(0,m.jsx)(f,{stableName:`Autoresize`,sourceImports:[`import styled from '@emotion/styled'`,`import { Textarea, HelpButton, Flex } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Textarea:s},children:`<Textarea
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
`})}),x=()=>(0,m.jsx)(E,{children:(0,m.jsx)(f,{"data-visual-test":`textarea-error`,stableName:`FormStatus`,sourceImports:[`import styled from '@emotion/styled'`,`import { Textarea, HelpButton, Flex } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Textarea:s},children:`<Textarea
  label="Error Message"
  cols="33"
  value="Nec litora inceptos vestibulum id interdum donec gravida."
  status="Message to the user"
/>
`})}),S=()=>(0,m.jsx)(E,{children:(0,m.jsx)(f,{"data-visual-test":`textarea-disabled`,stableName:`Disabled`,sourceImports:[`import styled from '@emotion/styled'`,`import { Textarea, HelpButton, Flex } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Textarea:s},children:`<Textarea
  label="Disabled"
  disabled
  value="Nec litora inceptos vestibulum id interdum donec gravida."
/>
`})}),C=()=>(0,m.jsx)(E,{children:(0,m.jsx)(f,{stableName:`Suffix`,sourceImports:[`import styled from '@emotion/styled'`,`import { Textarea, HelpButton, Flex } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Textarea:s,HelpButton:i,Modal:r},children:`<Textarea
  label="Textarea with suffix"
  value="Nec litora inceptos vestibulum id interdum donec gravida."
  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
/>
`})}),w=()=>(0,m.jsx)(E,{children:(0,m.jsx)(f,{"data-visual-test":`textarea-sizes`,stableName:`Sizes`,sourceImports:[`import styled from '@emotion/styled'`,`import { Textarea, HelpButton, Flex } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:a,Textarea:s},children:`<Flex.Stack>
  <Textarea placeholder="Small size" size="small" rows={1} />
  <Textarea placeholder="Medium size" size="medium" rows={1} />
  <Textarea placeholder="Large size" size="large" rows={1} />
</Flex.Stack>
`})}),T=()=>(0,m.jsx)(E,{children:(0,m.jsx)(f,{hideCode:!0,stableName:`MaxLength`,sourceImports:[`import styled from '@emotion/styled'`,`import { Textarea, HelpButton, Flex } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:c,Card:o,Field:l},children:`<Form.Handler>
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
`})}),E=d.div`
  display: block;
  width: 100%;
`;function D(e){let t={a:`a`,h2:`h2`,h3:`h3`,p:`p`,...u(),...e.components};return p||k(`Examples`,!1),b||k(`Examples.Autoresize`,!0),v||k(`Examples.CharacterCounter`,!0),S||k(`Examples.Disabled`,!0),x||k(`Examples.FormStatus`,!0),g||k(`Examples.Placeholder`,!0),h||k(`Examples.RowsCols`,!0),w||k(`Examples.Sizes`,!0),y||k(`Examples.Stretched`,!0),C||k(`Examples.Suffix`,!0),_||k(`Examples.Vertical`,!0),(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(t.h2,{children:`Demos`}),`
`,(0,m.jsx)(t.h3,{children:`Textarea with rows and colds`}),`
`,(0,m.jsx)(h,{}),`
`,(0,m.jsx)(t.h3,{children:`Textarea with placeholder text`}),`
`,(0,m.jsx)(g,{}),`
`,(0,m.jsx)(t.h3,{children:`Vertically placed label`}),`
`,(0,m.jsx)(_,{}),`
`,(0,m.jsx)(t.h3,{children:`Stretched horizontally placed label`}),`
`,(0,m.jsx)(y,{}),`
`,(0,m.jsx)(t.h3,{children:`Autoresize with max rows`}),`
`,(0,m.jsx)(b,{}),`
`,(0,m.jsx)(t.h3,{children:`Character counter`}),`
`,(0,m.jsxs)(t.p,{children:[`Internally, the `,(0,m.jsx)(t.a,{href:`/uilib/components/fragments/text-counter/`,children:`TextCounter`}),` fragment is used to display the character counter.`]}),`
`,(0,m.jsx)(v,{}),`
`,(0,m.jsx)(t.h3,{children:`With FormStatus failure message`}),`
`,(0,m.jsx)(x,{}),`
`,(0,m.jsx)(t.h3,{children:`Sizes`}),`
`,(0,m.jsx)(w,{}),`
`,(0,m.jsx)(t.h3,{children:`Disabled textarea`}),`
`,(0,m.jsx)(S,{}),`
`,(0,m.jsx)(t.h3,{children:`Textarea with a suffix`}),`
`,(0,m.jsx)(C,{})]})}function O(e={}){let{wrapper:t}={...u(),...e.components};return t?(0,m.jsx)(t,{...e,children:(0,m.jsx)(D,{...e})}):D(e)}function k(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{O as default,T as n,p as t};