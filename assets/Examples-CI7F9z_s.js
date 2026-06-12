import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{$ as r}from"./Anchor-BqZ7Pm7_.js";import{c as i}from"./ToggleButton-T4E3Coih.js";import{t as a}from"./Card-Dsou21Li.js";import{_ as o}from"./Upload-Cric0eoE.js";import{t as s}from"./Form-B9l6EvGx.js";import{t as c}from"./Field-DHicZJEj.js";import{t as l}from"./Value-whMgauSk.js";import{t as u}from"./Tools-DabwYqKy.js";import{t as d}from"./ComponentBox-Cb1rLw_D.js";var f=e({AsynchronousExternalBlurValidator:()=>N,AsynchronousExternalChangeValidator:()=>j,Capitalize:()=>b,Clear:()=>C,Disabled:()=>w,HorizontalLayout:()=>v,Icons:()=>S,LabelAndDescription:()=>g,LabelAndValue:()=>h,MaximumLengthWithTextCounter:()=>V,MultipleEmpty:()=>P,MultipleLabelAndValue:()=>L,MultipleOneRow:()=>F,MultiplePlaceholder:()=>I,MultipleWithHelp:()=>R,OnInput:()=>B,Placeholder:()=>m,SynchronousExternalBlurValidator:()=>M,SynchronousExternalChangeValidator:()=>A,TransformInAndOut:()=>z,ValidateMaximumLengthCustomError:()=>O,ValidateMinimumLength:()=>D,ValidatePattern:()=>k,ValidateRequired:()=>E,Widths:()=>x,WithHelp:()=>y,WithMultipleError:()=>T,WithStatus:()=>_}),p=t(n()),m=()=>(0,p.jsx)(d,{stableName:`Placeholder`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Field:c},children:`<Field.String
  label="Label text"
  placeholder="Enter a text..."
  onChange={(value) => console.log('onChange', value)}
/>
`}),h=()=>(0,p.jsx)(d,{stableName:`LabelAndValue`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Field:c},children:`<Field.String
  label="Label text"
  defaultValue="foo"
  onChange={(value) => console.log('onChange', value)}
/>
`}),g=()=>(0,p.jsx)(d,{"data-visual-test":`string-label-description`,stableName:`LabelAndDescription`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Form:s,Card:a,Field:c},children:`<Form.Card>
  <Field.String
    label="Label text"
    labelDescription="Description text on the next line"
    placeholder="Enter a text..."
  />
  <Field.String
    label="Label text"
    labelDescription="Description text on the same line"
    labelDescriptionInline
    placeholder="Enter a text..."
  />
</Form.Card>
`}),_=()=>(0,p.jsx)(d,{"data-visual-test":`string-status`,stableName:`WithStatus`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Form:s,Card:a,Field:c},children:`<Form.Card>
  <Field.String
    label="Label text"
    defaultValue="foo"
    warning="Short warning."
    required
  />
  <Field.String
    label="Label text"
    placeholder="Enter a text..."
    info="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et."
    required
  />
  <Field.String
    label="Label text"
    defaultValue="foo"
    width="small"
    warning="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et. Velit incididunt exercitation est magna ex irure dolore nisi eiusmod ea exercitation."
  />
  <Field.String
    label="Label text"
    error={[new Error('Error message A'), new Error('Error message B')]}
    warning={['Warning message A', 'Warning message B']}
    info={['Info message A', 'Info message B']}
  />
</Form.Card>
`}),v=()=>(0,p.jsx)(d,{"data-visual-test":`string-horizontal-layout`,stableName:`HorizontalLayout`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Form:s,Card:a,Field:c,Provider:r},children:`<Form.Card>
  <Field.Provider
    layout="horizontal"
    layoutOptions={{
      width: 'medium', // can be a rem value
    }}
    placeholder="Enter a text..."
    required
  >
    <Field.String label="Label text" warning="Short warning." />
    <Field.String
      label="Label with a long text that will wrap"
      placeholder="Enter a text..."
      size="medium"
      info="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et."
    />
    <Field.String
      label="Label with a long text that will wrap"
      placeholder="Enter a text..."
      size="large"
      width="stretch"
    />
  </Field.Provider>
</Form.Card>
`}),y=()=>(0,p.jsx)(d,{stableName:`WithHelp`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Field:c},children:`<Field.String
  label="Label text"
  defaultValue="foo"
  help={{
    title: 'Help is available',
    content:
      'Take the time to help other people without expecting a reward or gratitude is definitely important in living an optimistic life.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),b=()=>(0,p.jsx)(d,{stableName:`Capitalize`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Field:c},children:`<Field.String
  label="Label text"
  defaultValue="foo bar"
  capitalize
  onChange={(value) => console.log('onChange', value)}
/>
`}),x=()=>(0,p.jsx)(d,{hideCode:!0,"data-visual-test":`string-widths`,stableName:`Widths`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Flex:i,Field:c},children:`<Flex.Stack>
  <Field.String
    label="Default width (property omitted)"
    defaultValue="foo"
  />
  <Field.String label="Small" defaultValue="foo" width="small" />
  <Field.String label="Medium" defaultValue="foo" width="medium" />
  <Field.String label="Large" defaultValue="foo" width="large" />
  <Field.String label="Custom" defaultValue="foo" width="8rem" />
  <Field.String label="Stretch" defaultValue="foo" width="stretch" />

  <Field.String
    label="Default width (property omitted)"
    defaultValue="foo"
    multiline
  />
  <Field.String label="Small" defaultValue="foo" width="small" multiline />
  <Field.String
    label="Medium"
    defaultValue="foo"
    width="medium"
    multiline
  />
  <Field.String label="Large" defaultValue="foo" width="large" multiline />
  <Field.String label="Custom" defaultValue="foo" width="8rem" multiline />
  <Field.String
    label="Stretch"
    defaultValue="foo"
    width="stretch"
    multiline
  />
</Flex.Stack>
`}),S=()=>(0,p.jsx)(d,{stableName:`Icons`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Form:s,Card:a,Field:c},children:`<Form.Card>
  <Field.String
    label="Icon left"
    defaultValue="foo"
    leftIcon="check"
    onChange={(value) => console.log('onChange', value)}
  />
  <Field.String
    label="Icon right"
    defaultValue="foo"
    rightIcon="loupe"
    onChange={(value) => console.log('onChange', value)}
  />
</Form.Card>
`}),C=()=>(0,p.jsx)(d,{stableName:`Clear`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Field:c},children:`<Field.String
  defaultValue="foo"
  onChange={(value) => console.log('onChange', value)}
  clear
/>
`}),w=()=>(0,p.jsx)(d,{stableName:`Disabled`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Field:c},children:`<Field.String
  defaultValue="foo"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),T=()=>(0,p.jsx)(d,{"data-visual-test":`multiple-errors`,stableName:`WithMultipleError`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Field:c},children:`<Field.String
  label="Multiple errors"
  defaultValue="foo"
  pattern="bar"
  minLength={4}
  validateInitially
/>
`}),E=()=>(0,p.jsx)(d,{stableName:`ValidateRequired`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Field:c},children:`<Field.String
  defaultValue="foo"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
/>
`}),D=()=>(0,p.jsx)(d,{stableName:`ValidateMinimumLength`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Field:c},children:`<Field.String
  defaultValue="foo"
  label="Label text (minimum 8 characters)"
  onChange={(value) => console.log('onChange', value)}
  minLength={8}
/>
`}),O=()=>(0,p.jsx)(d,{stableName:`ValidateMaximumLengthCustomError`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Field:c},children:`<Field.String
  defaultValue="foo"
  label="Label text (maximum 8 characters)"
  onChange={(value) => console.log('onChange', value)}
  maxLength={8}
  errorMessages={{
    maxLength: "You can't write THAT long.. Max 8 chars!",
  }}
/>
`}),k=()=>(0,p.jsx)(d,{stableName:`ValidatePattern`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Field:c},children:`<Field.String
  defaultValue="foo"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  pattern="^foo123"
/>
`}),A=()=>(0,p.jsx)(d,{stableName:`SynchronousExternalChangeValidator`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Field:c},children:`<Field.String
  defaultValue="foo"
  label="Label text (minimum 4 characters)"
  onChangeValidator={(value) =>
    value.length < 4 ? Error('At least 4 characters') : undefined
  }
  onChange={(value) => console.log('onChange', value)}
/>
`}),j=()=>(0,p.jsx)(d,{stableName:`AsynchronousExternalChangeValidator`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Field:c},children:`<Field.String
  defaultValue="foo"
  label="Label text (minimum 4 characters)"
  onChangeValidator={(value) =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(
            value.length < 5 ? Error('At least 5 characters') : undefined
          ),
        1500
      )
    )
  }
  onChange={(value) => console.log('onChange', value)}
/>
`}),M=()=>(0,p.jsx)(d,{stableName:`SynchronousExternalBlurValidator`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Field:c},children:`<Field.String
  defaultValue="foo"
  label="Label text (minimum 4 characters)"
  onBlurValidator={(value) =>
    value.length < 4 ? Error('At least 4 characters') : undefined
  }
  onChange={(value) => console.log('onChange', value)}
/>
`}),N=()=>(0,p.jsx)(d,{stableName:`AsynchronousExternalBlurValidator`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Field:c},children:`<Field.String
  defaultValue="foo"
  label="Label text (minimum 4 characters)"
  onBlurValidator={(value) =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(
            value.length < 5 ? Error('At least 5 characters') : undefined
          ),
        1500
      )
    )
  }
  onChange={(value) => console.log('onChange', value)}
/>
`}),P=()=>(0,p.jsx)(d,{stableName:`MultipleEmpty`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Field:c},children:`<Field.String
  onChange={(value) => console.log('onChange', value)}
  multiline
/>
`}),F=()=>(0,p.jsx)(d,{stableName:`MultipleOneRow`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Field:c},children:`<Field.String
  label="Label text"
  placeholder="Enter your text"
  multiline
  rows={1}
  characterCounter={40}
/>
`}),I=()=>(0,p.jsx)(d,{stableName:`MultiplePlaceholder`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Field:c},children:`<Field.String
  placeholder="Enter text here"
  onChange={(value) => console.log('onChange', value)}
  multiline
/>
`}),L=()=>(0,p.jsx)(d,{stableName:`MultipleLabelAndValue`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Field:c},children:`<Field.String
  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in tempus odio, nec interdum orci. Integer vehicula ipsum et risus finibus, vitae commodo ex luctus. Nam viverra sollicitudin dictum. Vivamus maximus dignissim lorem, vitae viverra erat dapibus a."
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  multiline
/>
`}),R=()=>(0,p.jsx)(d,{stableName:`MultipleWithHelp`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Field:c},children:`<Field.String
  label="Label text"
  help={{
    title: 'Help is available',
    content: 'There is more happiness in giving than in receiving.',
  }}
  multiline
  onChange={(value) => console.log('onChange', value)}
/>
`});function z(){return(0,p.jsx)(d,{stableName:`TransformInAndOut`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Form:s,Card:a,Field:c,Value:l,Tools:u},noInline:!0,children:`// From the Field (internal value) to the data context or event parameter
const transformOut = (value) => {
  return {
    value,
    foo: 'bar',
  }
}

// To the Field (from e.g. defaultValue)
const transformIn = (data) => {
  if (typeof data === 'string') {
    return data
  }
  return data?.value
}
const MyForm = () => {
  return (
    <Form.Handler onSubmit={console.log}>
      <Form.Card>
        <Field.String
          label="String field"
          path="/myValue"
          transformIn={transformIn}
          transformOut={transformOut}
          defaultValue="Default value"
        />

        <Value.String
          label="String value"
          path="/myValue"
          transformIn={transformIn}
          placeholder="(placeholder)"
          showEmpty
        />

        <Form.SubHeading>Data Context</Form.SubHeading>
        <Tools.Log />
      </Form.Card>
      <Form.SubmitButton />
    </Form.Handler>
  )
}
render(<MyForm />)
`})}var B=()=>(0,p.jsx)(d,{stableName:`OnInput`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Form:s,Card:a,Field:c},noInline:!0,children:`const forbiddenRegex = /\\d/
const onInput = (event: FormEvent<HTMLInputElement>) => {
  const inputEl = event.currentTarget
  const oldVal = inputEl.dataset.oldVal || ''
  const addedLength = inputEl.value.length - oldVal.length
  const caretStart = inputEl.selectionStart
  const selectionStart = parseFloat(inputEl.dataset.selectionStart)
  const selectionEnd = parseFloat(inputEl.dataset.selectionEnd)
  let inserted: string
  if (selectionStart !== selectionEnd) {
    inserted = inputEl.value.substring(selectionStart, selectionEnd)
  } else {
    inserted = inputEl.value.substring(
      caretStart - addedLength,
      caretStart
    )
  }
  if (forbiddenRegex.test(inserted)) {
    inputEl.value = oldVal
    const { selectionStart, selectionEnd } = inputEl.dataset
    if (selectionStart !== selectionEnd) {
      inputEl.setSelectionRange(
        parseFloat(selectionStart),
        parseFloat(selectionEnd)
      )
    } else {
      inputEl.setSelectionRange(
        caretStart - addedLength,
        caretStart - addedLength
      )
    }
  }
  inputEl.dataset.oldVal = inputEl.value
}
const onFocus = (event: FormEvent<HTMLInputElement>) => {
  const inputEl = event.currentTarget
  if (typeof inputEl.dataset.oldVal === 'undefined') {
    inputEl.dataset.oldVal = inputEl.value
  }
}
const onSelect = (event: FormEvent<HTMLInputElement>) => {
  const inputEl = event.currentTarget
  inputEl.dataset.selectionStart = String(inputEl.selectionStart)
  inputEl.dataset.selectionEnd = String(inputEl.selectionEnd)
}
render(
  <Form.Handler onSubmit={console.log} onChange={console.log}>
    <Form.Card>
      <Field.String
        path="/myValue"
        label="You can't type numbers here"
        value="Existing value: 123"
        htmlAttributes={{
          onFocus,
          onInput,
          onSelect,
        }}
        autoComplete="off"
        required
      />
    </Form.Card>

    <Form.SubmitButton />
  </Form.Handler>
)
`}),V=()=>(0,p.jsx)(d,{stableName:`MaximumLengthWithTextCounter`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { TextCounter } from '@dnb/eufemia/fragments'`,`import { useState, FormEvent } from 'react'`],__buildScope:{Flex:i,Field:c,TextCounter:o},noInline:!0,children:`const MyFieldStringWithTextCounter = () => {
  const [text, setText] = useState('')
  return (
    <Flex.Vertical gap="x-small">
      <Field.String
        label="Label text (maximum 8 characters)"
        maxLength={8}
        onChange={setText}
      />
      <TextCounter variant="down" text={text} max={8} />
    </Flex.Vertical>
  )
}
render(<MyFieldStringWithTextCounter />)
`});export{D as C,y as D,x as E,T as O,O as S,E as T,B as _,w as a,A as b,S as c,V as d,P as f,R as g,I as h,C as i,_ as k,g as l,F as m,j as n,f as o,L as p,b as r,v as s,N as t,h as u,m as v,k as w,z as x,M as y};