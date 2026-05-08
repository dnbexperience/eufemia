import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{Lr as r}from"./index-2AO2Cu5K.js";import{s as i}from"./Examples-GWYUMrzR.js";import{T as a}from"./Examples-CnbIijwl.js";var o=e({DisplayFileAsNonClickable:()=>S,FieldUploadSelectionPath:()=>p,Inline:()=>_,Label:()=>m,LabelAndValue:()=>h,LabelAndValueOnFileClick:()=>g,ListTypes:()=>b,ListVariants:()=>v,ListVariantsOnFileClick:()=>y,OnFileClick:()=>x,Placeholder:()=>c,WithCustomFormat:()=>f,WithDownload:()=>d,WithSize:()=>u,WithValue:()=>l}),s=t(),c=()=>(0,s.jsx)(n,{children:`<Value.Upload placeholder="No value given" />
`}),l=()=>(0,s.jsx)(n,{scope:{createMockFile:a},"data-visual-test":`upload-value-default`,children:`<Value.Upload
  inline
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      id: '2',
    },
  ]}
/>
`}),u=()=>(0,s.jsx)(n,{hideCode:!0,scope:{createMockFile:a},"data-visual-test":`upload-value-size`,children:`<Value.Upload
  displaySize
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
  ]}
/>
`}),d=()=>(0,s.jsx)(n,{hideCode:!0,scope:{createMockFile:a},children:`<Value.Upload
  download
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
  ]}
/>
`}),f=()=>(0,s.jsx)(n,{hideCode:!0,scope:{createMockFile:a},children:`<Form.Handler
  locale="en-GB"
  data={{
    myPath: [
      {
        file: createMockFile('fileName-1.png', 1000000, 'image/png'),
        exists: false,
        id: '1',
      },
      {
        file: createMockFile('fileName-2.png', 2000000, 'image/png'),
        exists: false,
        id: '2',
      },
    ],
  }}
>
  <Value.Upload
    inline
    path="/myPath"
    format={{
      type: 'disjunction',
    }}
  />
</Form.Handler>
`}),p=()=>(0,s.jsx)(n,{hideCode:!0,scope:{createMockFile:a},children:`<Form.Handler
  data={{
    myPath: [
      {
        file: createMockFile('fileName-1.png', 1000000, 'image/png'),
        exists: false,
        id: '1',
      },
      {
        file: createMockFile('fileName-2.png', 3000000, 'image/png'),
        exists: false,
        id: '2',
      },
      {
        file: createMockFile('fileName-3.png', 3000000, 'image/png'),
        exists: false,
        id: '3',
      },
    ],
  }}
>
  <Flex.Stack>
    <Field.Upload label="My selections" path="/myPath" />
    <Value.Upload
      inheritLabel
      path="/myPath"
      variant="ul"
      listType="unstyled"
    />
  </Flex.Stack>
</Form.Handler>
`}),m=()=>(0,s.jsx)(n,{children:`<Value.Upload label="Label text" showEmpty />
`}),h=()=>(0,s.jsx)(n,{hideCode:!0,scope:{createMockFile:a},"data-visual-test":`upload-value-label-and-value`,children:`<Value.Upload
  label="Label text"
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      id: '2',
    },
  ]}
/>
`}),g=()=>(0,s.jsx)(n,{hideCode:!0,scope:{createMockFile:a},"data-visual-test":`upload-value-label-and-value-on-file-click`,children:`<Value.Upload
  onFileClick={() => {
    console.log('Clicked on file')
  }}
  label="Label text"
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      isLoading: true,
      id: '2',
    },
  ]}
/>
`}),_=()=>(0,s.jsx)(n,{hideCode:!0,scope:{createMockFile:a},"data-visual-test":`upload-value-inline`,children:`<Span>
  This is before the component{' '}
  <Value.Upload
    value={[
      {
        file: createMockFile('fileName-1.png', 1000000, 'image/png'),
        exists: false,
        id: '1',
      },
      {
        file: createMockFile('fileName-2.png', 2000000, 'image/png'),
        exists: false,
        id: '2',
      },
    ]}
    inline
  />{' '}
  This is after the component
</Span>
`}),v=()=>(0,s.jsx)(n,{scope:{createMockFile:a},"data-visual-test":`upload-value-lists`,hideCode:!0,children:`
<Value.Upload
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      id: '2',
    },
    {
      file: createMockFile('fileName-3.png', 3000000, 'image/png'),
      exists: false,
      id: '3',
    },
  ]}
  label="Ordered List"
  variant="ol"
/>
<Value.Upload
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      id: '2',
    },
    {
      file: createMockFile('fileName-3.png', 3000000, 'image/png'),
      exists: false,
      id: '3',
    },
  ]}
  label="Unordered List"
  variant="ul"
/>

`}),y=()=>(0,s.jsx)(n,{scope:{createMockFile:a},"data-visual-test":`upload-value-lists-on-file-click`,hideCode:!0,children:`
<Value.Upload
  onFileClick={() => {
    console.log('Clicked on file')
  }}
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      isLoading: true,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      id: '2',
    },
    {
      file: createMockFile('fileName-3.png', 3000000, 'image/png'),
      exists: false,
      id: '3',
    },
  ]}
  label="Ordered List"
  variant="ol"
/>
<Value.Upload
  onFileClick={() => {
    console.log('Clicked on file')
  }}
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      id: '2',
      isLoading: true,
    },
    {
      file: createMockFile('fileName-3.png', 3000000, 'image/png'),
      exists: false,
      id: '3',
      isLoading: true,
    },
  ]}
  label="Unordered List"
  variant="ul"
/>

`}),b=()=>(0,s.jsx)(n,{scope:{createMockFile:a},hideCode:!0,children:`
<Value.Upload
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      id: '2',
    },
    {
      file: createMockFile('fileName-3.png', 3000000, 'image/png'),
      exists: false,
      id: '3',
    },
  ]}
  label="Ordered List a"
  variant="ol"
  listType="a"
/>
<Value.Upload
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      id: '2',
    },
    {
      file: createMockFile('fileName-3.png', 3000000, 'image/png'),
      exists: false,
      id: '3',
    },
  ]}
  label="Ordered List A"
  variant="ol"
  listType="A"
/>
<Value.Upload
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      id: '2',
    },
    {
      file: createMockFile('fileName-3.png', 3000000, 'image/png'),
      exists: false,
      id: '3',
    },
  ]}
  label="Ordered List i"
  variant="ol"
  listType="i"
/>
<Value.Upload
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      id: '2',
    },
    {
      file: createMockFile('fileName-3.png', 3000000, 'image/png'),
      exists: false,
      id: '3',
    },
  ]}
  label="Ordered List I"
  variant="ol"
  listType="I"
/>
<Value.Upload
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      id: '2',
    },
    {
      file: createMockFile('fileName-3.png', 3000000, 'image/png'),
      exists: false,
      id: '3',
    },
  ]}
  label="Unordered List square"
  variant="ul"
  listType="square"
/>
<Value.Upload
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      id: '2',
    },
    {
      file: createMockFile('fileName-3.png', 3000000, 'image/png'),
      exists: false,
      id: '3',
    },
  ]}
  label="Unordered List circle"
  variant="ul"
  listType="circle"
/>

`}),x=()=>(0,s.jsx)(n,{scope:{createMockFile:a,createRequest:i},children:`<Value.Upload
  label="Label text"
  value={[
    {
      file: createMockFile('35217511.jpg', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('1501870.jpg', 2000000, 'image/png'),
      exists: false,
      id: '2',
    },
  ]}
  onFileClick={async ({ fileItem }) => {
    const request = createRequest()
    console.log(
      \`making API request to fetch the url of the file: \${fileItem.file.name}\`
    )
    await request(2000) // Simulate a request
    window.open(
      \`https://eufemia.dnb.no/images/avatars/\${fileItem.file.name}\`,
      '_blank'
    )
  }}
/>
`}),S=()=>(0,s.jsx)(n,{hideCode:!0,scope:{createMockFile:a},"data-visual-test":`upload-value-display-file-as-non-clickable`,children:`<Value.Upload
  label="Label text"
  value={[
    {
      file: createMockFile('35217511.jpg', 0, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('1501870.jpg', undefined, 'image/png'),
      exists: false,
      id: '2',
    },
  ]}
/>
`});function C(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components},{VisibleWhenVisualTest:n}=t;return o||T(`Examples`,!1),S||T(`Examples.DisplayFileAsNonClickable`,!0),p||T(`Examples.FieldUploadSelectionPath`,!0),_||T(`Examples.Inline`,!0),m||T(`Examples.Label`,!0),h||T(`Examples.LabelAndValue`,!0),g||T(`Examples.LabelAndValueOnFileClick`,!0),b||T(`Examples.ListTypes`,!0),v||T(`Examples.ListVariants`,!0),y||T(`Examples.ListVariantsOnFileClick`,!0),x||T(`Examples.OnFileClick`,!0),c||T(`Examples.Placeholder`,!0),f||T(`Examples.WithCustomFormat`,!0),d||T(`Examples.WithDownload`,!0),u||T(`Examples.WithSize`,!0),l||T(`Examples.WithValue`,!0),n||T(`VisibleWhenVisualTest`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Value`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsxs)(t.h3,{children:[`With `,(0,s.jsx)(t.code,{children:`displaySize`}),` property`]}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsxs)(t.h3,{children:[`With `,(0,s.jsx)(t.code,{children:`download`}),` property`]}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`Custom format`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`Label`}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`Label and value`}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsx)(t.h3,{children:`Inline`}),`
`,(0,s.jsx)(_,{}),`
`,(0,s.jsx)(t.h3,{children:`List variants`}),`
`,(0,s.jsx)(v,{}),`
`,(0,s.jsx)(t.h3,{children:`List types`}),`
`,(0,s.jsx)(b,{}),`
`,(0,s.jsx)(t.h3,{children:`Field.Upload path`}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsxs)(t.h3,{children:[`Using `,(0,s.jsx)(t.code,{children:`onFileClick`})]}),`
`,(0,s.jsx)(x,{}),`
`,(0,s.jsx)(t.h3,{children:`Display files as non-clickable`}),`
`,(0,s.jsxs)(t.p,{children:[`When file size is 0 or not given (`,(0,s.jsx)(t.code,{children:`new File([], name, { type })`}),`), the file is displayed as a span instead of an anchor. However, when `,(0,s.jsx)(t.code,{children:`onFileClick`}),` is given, the file will be clickable as a button.`]}),`
`,(0,s.jsx)(S,{}),`
`,(0,s.jsxs)(n,{children:[(0,s.jsx)(g,{}),(0,s.jsx)(y,{})]})]})}function w(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(C,{...e})}):C(e)}function T(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{w as default};