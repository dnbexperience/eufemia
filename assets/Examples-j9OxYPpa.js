import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";var r=e({AsynchronousExternalBlurValidator:()=>w,AsynchronousExternalChangeValidator:()=>S,Capitalize:()=>d,Clear:()=>m,Disabled:()=>h,HorizontalLayout:()=>l,Icons:()=>p,LabelAndDescription:()=>s,LabelAndValue:()=>o,MaximumLengthWithTextCounter:()=>M,MultipleEmpty:()=>T,MultipleLabelAndValue:()=>O,MultipleOneRow:()=>E,MultiplePlaceholder:()=>D,MultipleWithHelp:()=>k,OnInput:()=>j,Placeholder:()=>a,SynchronousExternalBlurValidator:()=>C,SynchronousExternalChangeValidator:()=>x,TransformInAndOut:()=>A,ValidateMaximumLengthCustomError:()=>y,ValidateMinimumLength:()=>v,ValidatePattern:()=>b,ValidateRequired:()=>_,Widths:()=>f,WithHelp:()=>u,WithMultipleError:()=>g,WithStatus:()=>c}),i=t(),a=()=>(0,i.jsx)(n,{children:`<Field.String
  label="Label text"
  placeholder="Enter a text..."
  onChange={(value) => console.log('onChange', value)}
/>
`}),o=()=>(0,i.jsx)(n,{children:`<Field.String
  label="Label text"
  defaultValue="foo"
  onChange={(value) => console.log('onChange', value)}
/>
`}),s=()=>(0,i.jsx)(n,{"data-visual-test":`string-label-description`,children:`<Form.Card>
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
`}),c=()=>(0,i.jsx)(n,{"data-visual-test":`string-status`,children:`<Form.Card>
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
`}),l=()=>(0,i.jsx)(n,{"data-visual-test":`string-horizontal-layout`,children:`<Form.Card>
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
`}),u=()=>(0,i.jsx)(n,{children:`<Field.String
  label="Label text"
  defaultValue="foo"
  help={{
    title: 'Help is available',
    content:
      'Take the time to help other people without expecting a reward or gratitude is definitely important in living an optimistic life.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,i.jsx)(n,{children:`<Field.String
  label="Label text"
  defaultValue="foo bar"
  capitalize
  onChange={(value) => console.log('onChange', value)}
/>
`}),f=()=>(0,i.jsx)(n,{hideCode:!0,"data-visual-test":`string-widths`,children:`<Flex.Stack>
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
`}),p=()=>(0,i.jsx)(n,{children:`<Form.Card>
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
`}),m=()=>(0,i.jsx)(n,{children:`<Field.String
  defaultValue="foo"
  onChange={(value) => console.log('onChange', value)}
  clear
/>
`}),h=()=>(0,i.jsx)(n,{children:`<Field.String
  defaultValue="foo"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),g=()=>(0,i.jsx)(n,{"data-visual-test":`multiple-errors`,children:`<Field.String
  label="Multiple errors"
  defaultValue="foo"
  pattern="bar"
  minLength={4}
  validateInitially
/>
`}),_=()=>(0,i.jsx)(n,{children:`<Field.String
  defaultValue="foo"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
/>
`}),v=()=>(0,i.jsx)(n,{children:`<Field.String
  defaultValue="foo"
  label="Label text (minimum 8 characters)"
  onChange={(value) => console.log('onChange', value)}
  minLength={8}
/>
`}),y=()=>(0,i.jsx)(n,{children:`<Field.String
  defaultValue="foo"
  label="Label text (maximum 8 characters)"
  onChange={(value) => console.log('onChange', value)}
  maxLength={8}
  errorMessages={{
    maxLength: "You can't write THAT long.. Max 8 chars!",
  }}
/>
`}),b=()=>(0,i.jsx)(n,{children:`<Field.String
  defaultValue="foo"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  pattern="^foo123"
/>
`}),x=()=>(0,i.jsx)(n,{children:`<Field.String
  defaultValue="foo"
  label="Label text (minimum 4 characters)"
  onChangeValidator={(value) =>
    value.length < 4 ? Error('At least 4 characters') : undefined
  }
  onChange={(value) => console.log('onChange', value)}
/>
`}),S=()=>(0,i.jsx)(n,{children:`<Field.String
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
`}),C=()=>(0,i.jsx)(n,{children:`<Field.String
  defaultValue="foo"
  label="Label text (minimum 4 characters)"
  onBlurValidator={(value) =>
    value.length < 4 ? Error('At least 4 characters') : undefined
  }
  onChange={(value) => console.log('onChange', value)}
/>
`}),w=()=>(0,i.jsx)(n,{children:`<Field.String
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
`}),T=()=>(0,i.jsx)(n,{children:`<Field.String
  onChange={(value) => console.log('onChange', value)}
  multiline
/>
`}),E=()=>(0,i.jsx)(n,{children:`<Field.String
  label="Label text"
  placeholder="Enter your text"
  multiline
  rows={1}
  characterCounter={40}
/>
`}),D=()=>(0,i.jsx)(n,{children:`<Field.String
  placeholder="Enter text here"
  onChange={(value) => console.log('onChange', value)}
  multiline
/>
`}),O=()=>(0,i.jsx)(n,{children:`<Field.String
  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in tempus odio, nec interdum orci. Integer vehicula ipsum et risus finibus, vitae commodo ex luctus. Nam viverra sollicitudin dictum. Vivamus maximus dignissim lorem, vitae viverra erat dapibus a."
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  multiline
/>
`}),k=()=>(0,i.jsx)(n,{children:`<Field.String
  label="Label text"
  help={{
    title: 'Help is available',
    content: 'There is more happiness in giving than in receiving.',
  }}
  multiline
  onChange={(value) => console.log('onChange', value)}
/>
`});function A(){return(0,i.jsx)(n,{noInline:!0,children:`// From the Field (internal value) to the data context or event parameter
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
`})}var j=()=>(0,i.jsx)(n,{noInline:!0,children:`const forbiddenRegex = /\\d/
const onInput = (event: FormEvent<HTMLInputElement>) => {
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
`}),M=()=>(0,i.jsx)(n,{noInline:!0,children:`const MyFieldStringWithTextCounter = () => {
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
`});export{v as C,u as D,f as E,g as O,y as S,_ as T,j as _,h as a,x as b,p as c,M as d,T as f,k as g,D as h,m as i,c as k,s as l,E as m,S as n,r as o,O as p,d as r,l as s,w as t,o as u,a as v,b as w,A as x,C as y};