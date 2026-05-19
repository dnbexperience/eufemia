import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";import{s as a}from"./Examples-CXhguzzY.js";import{T as o}from"./Examples-DfoAAWSo.js";var s=t({DisplayFileAsNonClickable:()=>C,FieldUploadSelectionPath:()=>m,Inline:()=>v,Label:()=>h,LabelAndValue:()=>g,LabelAndValueOnFileClick:()=>_,ListTypes:()=>x,ListVariants:()=>y,ListVariantsOnFileClick:()=>b,OnFileClick:()=>S,Placeholder:()=>l,WithCustomFormat:()=>p,WithDownload:()=>f,WithSize:()=>d,WithValue:()=>u}),c=e(n()),l=()=>(0,c.jsx)(r,{stableName:`Placeholder`,children:`<Value.Upload placeholder="No value given" />
`}),u=()=>(0,c.jsx)(r,{scope:{createMockFile:o},"data-visual-test":`upload-value-default`,stableName:`WithValue`,children:`<Value.Upload
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
`}),d=()=>(0,c.jsx)(r,{hideCode:!0,scope:{createMockFile:o},"data-visual-test":`upload-value-size`,stableName:`WithSize`,children:`<Value.Upload
  displaySize
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
  ]}
/>
`}),f=()=>(0,c.jsx)(r,{hideCode:!0,scope:{createMockFile:o},stableName:`WithDownload`,children:`<Value.Upload
  download
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
  ]}
/>
`}),p=()=>(0,c.jsx)(r,{hideCode:!0,scope:{createMockFile:o},stableName:`WithCustomFormat`,children:`<Form.Handler
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
`}),m=()=>(0,c.jsx)(r,{hideCode:!0,scope:{createMockFile:o},stableName:`FieldUploadSelectionPath`,children:`<Form.Handler
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
`}),h=()=>(0,c.jsx)(r,{stableName:`Label`,children:`<Value.Upload label="Label text" showEmpty />
`}),g=()=>(0,c.jsx)(r,{hideCode:!0,scope:{createMockFile:o},"data-visual-test":`upload-value-label-and-value`,stableName:`LabelAndValue`,children:`<Value.Upload
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
`}),_=()=>(0,c.jsx)(r,{hideCode:!0,scope:{createMockFile:o},"data-visual-test":`upload-value-label-and-value-on-file-click`,stableName:`LabelAndValueOnFileClick`,children:`<Value.Upload
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
`}),v=()=>(0,c.jsx)(r,{hideCode:!0,scope:{createMockFile:o},"data-visual-test":`upload-value-inline`,stableName:`Inline`,children:`<Span>
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
`}),y=()=>(0,c.jsx)(r,{scope:{createMockFile:o},"data-visual-test":`upload-value-lists`,hideCode:!0,stableName:`ListVariants`,children:`
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

`}),b=()=>(0,c.jsx)(r,{scope:{createMockFile:o},"data-visual-test":`upload-value-lists-on-file-click`,hideCode:!0,stableName:`ListVariantsOnFileClick`,children:`
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

`}),x=()=>(0,c.jsx)(r,{scope:{createMockFile:o},hideCode:!0,stableName:`ListTypes`,children:`
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

`}),S=()=>(0,c.jsx)(r,{scope:{createMockFile:o,createRequest:a},stableName:`OnFileClick`,children:`<Value.Upload
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
`}),C=()=>(0,c.jsx)(r,{hideCode:!0,scope:{createMockFile:o},"data-visual-test":`upload-value-display-file-as-non-clickable`,stableName:`DisplayFileAsNonClickable`,children:`<Value.Upload
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
`});function w(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components},{VisibleWhenVisualTest:n}=t;return s||E(`Examples`,!1),C||E(`Examples.DisplayFileAsNonClickable`,!0),m||E(`Examples.FieldUploadSelectionPath`,!0),v||E(`Examples.Inline`,!0),h||E(`Examples.Label`,!0),g||E(`Examples.LabelAndValue`,!0),_||E(`Examples.LabelAndValueOnFileClick`,!0),x||E(`Examples.ListTypes`,!0),y||E(`Examples.ListVariants`,!0),b||E(`Examples.ListVariantsOnFileClick`,!0),S||E(`Examples.OnFileClick`,!0),l||E(`Examples.Placeholder`,!0),p||E(`Examples.WithCustomFormat`,!0),f||E(`Examples.WithDownload`,!0),d||E(`Examples.WithSize`,!0),u||E(`Examples.WithValue`,!0),n||E(`VisibleWhenVisualTest`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsx)(t.h3,{children:`Value`}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsxs)(t.h3,{children:[`With `,(0,c.jsx)(t.code,{children:`displaySize`}),` property`]}),`
`,(0,c.jsx)(d,{}),`
`,(0,c.jsxs)(t.h3,{children:[`With `,(0,c.jsx)(t.code,{children:`download`}),` property`]}),`
`,(0,c.jsx)(f,{}),`
`,(0,c.jsx)(t.h3,{children:`Custom format`}),`
`,(0,c.jsx)(p,{}),`
`,(0,c.jsx)(t.h3,{children:`Label`}),`
`,(0,c.jsx)(h,{}),`
`,(0,c.jsx)(t.h3,{children:`Label and value`}),`
`,(0,c.jsx)(g,{}),`
`,(0,c.jsx)(t.h3,{children:`Inline`}),`
`,(0,c.jsx)(v,{}),`
`,(0,c.jsx)(t.h3,{children:`List variants`}),`
`,(0,c.jsx)(y,{}),`
`,(0,c.jsx)(t.h3,{children:`List types`}),`
`,(0,c.jsx)(x,{}),`
`,(0,c.jsx)(t.h3,{children:`Field.Upload path`}),`
`,(0,c.jsx)(m,{}),`
`,(0,c.jsxs)(t.h3,{children:[`Using `,(0,c.jsx)(t.code,{children:`onFileClick`})]}),`
`,(0,c.jsx)(S,{}),`
`,(0,c.jsx)(t.h3,{children:`Display files as non-clickable`}),`
`,(0,c.jsxs)(t.p,{children:[`When file size is 0 or not given (`,(0,c.jsx)(t.code,{children:`new File([], name, { type })`}),`), the file is displayed as a span instead of an anchor. However, when `,(0,c.jsx)(t.code,{children:`onFileClick`}),` is given, the file will be clickable as a button.`]}),`
`,(0,c.jsx)(C,{}),`
`,(0,c.jsxs)(n,{children:[(0,c.jsx)(_,{}),(0,c.jsx)(b,{})]})]})}function T(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(w,{...e})}):w(e)}function E(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{T as default};