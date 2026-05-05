import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-geTEYZ7b.js";var i=e({AsynchronousExternalBlurValidator:()=>T,AsynchronousExternalChangeValidator:()=>C,Capitalize:()=>f,Clear:()=>h,Disabled:()=>g,HorizontalLayout:()=>u,Icons:()=>m,LabelAndDescription:()=>c,LabelAndValue:()=>s,MaximumLengthWithTextCounter:()=>N,MultipleEmpty:()=>E,MultipleLabelAndValue:()=>k,MultipleOneRow:()=>D,MultiplePlaceholder:()=>O,MultipleWithHelp:()=>A,OnInput:()=>M,Placeholder:()=>o,SynchronousExternalBlurValidator:()=>w,SynchronousExternalChangeValidator:()=>S,TransformInAndOut:()=>j,ValidateMaximumLengthCustomError:()=>b,ValidateMinimumLength:()=>y,ValidatePattern:()=>x,ValidateRequired:()=>v,Widths:()=>p,WithHelp:()=>d,WithMultipleError:()=>_,WithStatus:()=>l});t();var a=n(),o=()=>(0,a.jsx)(r,{children:`<Field.String
  label="Label text"
  placeholder="Enter a text..."
  onChange={(value) => console.log('onChange', value)}
/>
`}),s=()=>(0,a.jsx)(r,{children:`<Field.String
  label="Label text"
  defaultValue="foo"
  onChange={(value) => console.log('onChange', value)}
/>
`}),c=()=>(0,a.jsx)(r,{"data-visual-test":`string-label-description`,children:`<Form.Card>
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
`}),l=()=>(0,a.jsx)(r,{"data-visual-test":`string-status`,children:`<Form.Card>
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
`}),u=()=>(0,a.jsx)(r,{"data-visual-test":`string-horizontal-layout`,children:`<Form.Card>
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
`}),d=()=>(0,a.jsx)(r,{children:`<Field.String
  label="Label text"
  defaultValue="foo"
  help={{
    title: 'Help is available',
    content:
      'Take the time to help other people without expecting a reward or gratitude is definitely important in living an optimistic life.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),f=()=>(0,a.jsx)(r,{children:`<Field.String
  label="Label text"
  defaultValue="foo bar"
  capitalize
  onChange={(value) => console.log('onChange', value)}
/>
`}),p=()=>(0,a.jsx)(r,{hideCode:!0,"data-visual-test":`string-widths`,children:`<Flex.Stack>
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
`}),m=()=>(0,a.jsx)(r,{children:`<Form.Card>
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
`}),h=()=>(0,a.jsx)(r,{children:`<Field.String
  defaultValue="foo"
  onChange={(value) => console.log('onChange', value)}
  clear
/>
`}),g=()=>(0,a.jsx)(r,{children:`<Field.String
  defaultValue="foo"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),_=()=>(0,a.jsx)(r,{"data-visual-test":`multiple-errors`,children:`<Field.String
  label="Multiple errors"
  defaultValue="foo"
  pattern="bar"
  minLength={4}
  validateInitially
/>
`}),v=()=>(0,a.jsx)(r,{children:`<Field.String
  defaultValue="foo"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
/>
`}),y=()=>(0,a.jsx)(r,{children:`<Field.String
  defaultValue="foo"
  label="Label text (minimum 8 characters)"
  onChange={(value) => console.log('onChange', value)}
  minLength={8}
/>
`}),b=()=>(0,a.jsx)(r,{children:`<Field.String
  defaultValue="foo"
  label="Label text (maximum 8 characters)"
  onChange={(value) => console.log('onChange', value)}
  maxLength={8}
  errorMessages={{
    maxLength: "You can't write THAT long.. Max 8 chars!",
  }}
/>
`}),x=()=>(0,a.jsx)(r,{children:`<Field.String
  defaultValue="foo"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  pattern="^foo123"
/>
`}),S=()=>(0,a.jsx)(r,{children:`<Field.String
  defaultValue="foo"
  label="Label text (minimum 4 characters)"
  onChangeValidator={(value) =>
    value.length < 4 ? Error('At least 4 characters') : undefined
  }
  onChange={(value) => console.log('onChange', value)}
/>
`}),C=()=>(0,a.jsx)(r,{children:`<Field.String
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
`}),w=()=>(0,a.jsx)(r,{children:`<Field.String
  defaultValue="foo"
  label="Label text (minimum 4 characters)"
  onBlurValidator={(value) =>
    value.length < 4 ? Error('At least 4 characters') : undefined
  }
  onChange={(value) => console.log('onChange', value)}
/>
`}),T=()=>(0,a.jsx)(r,{children:`<Field.String
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
`}),E=()=>(0,a.jsx)(r,{children:`<Field.String
  onChange={(value) => console.log('onChange', value)}
  multiline
/>
`}),D=()=>(0,a.jsx)(r,{children:`<Field.String
  label="Label text"
  placeholder="Enter your text"
  multiline
  rows={1}
  characterCounter={40}
/>
`}),O=()=>(0,a.jsx)(r,{children:`<Field.String
  placeholder="Enter text here"
  onChange={(value) => console.log('onChange', value)}
  multiline
/>
`}),k=()=>(0,a.jsx)(r,{children:`<Field.String
  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in tempus odio, nec interdum orci. Integer vehicula ipsum et risus finibus, vitae commodo ex luctus. Nam viverra sollicitudin dictum. Vivamus maximus dignissim lorem, vitae viverra erat dapibus a."
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  multiline
/>
`}),A=()=>(0,a.jsx)(r,{children:`<Field.String
  label="Label text"
  help={{
    title: 'Help is available',
    content: 'There is more happiness in giving than in receiving.',
  }}
  multiline
  onChange={(value) => console.log('onChange', value)}
/>
`});function j(){return(0,a.jsx)(r,{noInline:!0,children:`// From the Field (internal value) to the data context or event parameter
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
`})}var M=()=>(0,a.jsx)(r,{noInline:!0,children:`const forbiddenRegex = /\\d/
const onInput = (event: React.FormEvent<HTMLInputElement>) => {
  const inputEl = event.currentTarget
  const oldVal = inputEl.dataset.oldVal || ''
  const addedLength = inputEl.value.length - oldVal.length
  const caretStart = inputEl.selectionStart
  const selectionStart = parseFloat(inputEl.dataset.selectionStart)
  const selectionEnd = parseFloat(inputEl.dataset.selectionEnd)
  let inserted = ''
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
const onFocus = (event: React.FormEvent<HTMLInputElement>) => {
  const inputEl = event.currentTarget
  if (typeof inputEl.dataset.oldVal === 'undefined') {
    inputEl.dataset.oldVal = inputEl.value
  }
}
const onSelect = (event: React.FormEvent<HTMLInputElement>) => {
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
`}),N=()=>(0,a.jsx)(r,{noInline:!0,children:`const MyFieldStringWithTextCounter = () => {
  const [text, setText] = React.useState('')
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
`});export{y as C,d as D,p as E,_ as O,b as S,v as T,M as _,g as a,S as b,m as c,N as d,E as f,A as g,O as h,h as i,l as k,c as l,D as m,C as n,i as o,k as p,f as r,u as s,T as t,s as u,o as v,x as w,j as x,w as y};