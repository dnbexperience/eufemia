import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Span-Ck4-yQJH.js";import{c as i}from"./ToggleButton-D3NEk3jO.js";import{f as a}from"./Upload-_FypiXDK.js";import{t as o}from"./Form-C16rVaXm.js";import{t as s}from"./Field-B5trC2Cn.js";import{t as c}from"./Value-DvCb56Kz.js";import{W as l}from"./index-BCXtuv-b.js";import{t as u}from"./ComponentBox-B2X8809Z.js";import{s as d}from"./Examples-Dov4hVd8.js";import{T as f}from"./Examples-DxAlT73P.js";var p=e({DisplayFileAsNonClickable:()=>k,FieldUploadSelectionPath:()=>b,Inline:()=>w,Label:()=>x,LabelAndValue:()=>S,LabelAndValueOnFileClick:()=>C,ListTypes:()=>D,ListVariants:()=>T,ListVariantsOnFileClick:()=>E,OnFileClick:()=>O,Placeholder:()=>h,WithCustomFormat:()=>y,WithDownload:()=>v,WithSize:()=>_,WithValue:()=>g}),m=t(n()),h=()=>(0,m.jsx)(u,{stableName:`Placeholder`,sourceImports:[`import { Form, Value, Field } from '@dnb/eufemia/extensions/forms'`,`import { Flex, Span } from '@dnb/eufemia'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`],__buildScope:{Value:c,Upload:a},children:`<Value.Upload placeholder="No value given" />
`}),g=()=>(0,m.jsx)(u,{scope:{createMockFile:f},"data-visual-test":`upload-value-default`,stableName:`WithValue`,sourceImports:[`import { Form, Value, Field } from '@dnb/eufemia/extensions/forms'`,`import { Flex, Span } from '@dnb/eufemia'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`],__buildScope:{Value:c,Upload:a},children:`<Value.Upload
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
`}),_=()=>(0,m.jsx)(u,{hideCode:!0,scope:{createMockFile:f},"data-visual-test":`upload-value-size`,stableName:`WithSize`,sourceImports:[`import { Form, Value, Field } from '@dnb/eufemia/extensions/forms'`,`import { Flex, Span } from '@dnb/eufemia'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`],__buildScope:{Value:c,Upload:a},children:`<Value.Upload
  displaySize
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
  ]}
/>
`}),v=()=>(0,m.jsx)(u,{hideCode:!0,scope:{createMockFile:f},stableName:`WithDownload`,sourceImports:[`import { Form, Value, Field } from '@dnb/eufemia/extensions/forms'`,`import { Flex, Span } from '@dnb/eufemia'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`],__buildScope:{Value:c,Upload:a},children:`<Value.Upload
  download
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
  ]}
/>
`}),y=()=>(0,m.jsx)(u,{hideCode:!0,scope:{createMockFile:f},stableName:`WithCustomFormat`,sourceImports:[`import { Form, Value, Field } from '@dnb/eufemia/extensions/forms'`,`import { Flex, Span } from '@dnb/eufemia'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`],__buildScope:{Form:o,Value:c,Upload:a},children:`<Form.Handler
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
`}),b=()=>(0,m.jsx)(u,{hideCode:!0,scope:{createMockFile:f},stableName:`FieldUploadSelectionPath`,sourceImports:[`import { Form, Value, Field } from '@dnb/eufemia/extensions/forms'`,`import { Flex, Span } from '@dnb/eufemia'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`],__buildScope:{Form:o,Flex:i,Field:s,Upload:a,Value:c},children:`<Form.Handler
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
`}),x=()=>(0,m.jsx)(u,{stableName:`Label`,sourceImports:[`import { Form, Value, Field } from '@dnb/eufemia/extensions/forms'`,`import { Flex, Span } from '@dnb/eufemia'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`],__buildScope:{Value:c,Upload:a},children:`<Value.Upload label="Label text" showEmpty />
`}),S=()=>(0,m.jsx)(u,{hideCode:!0,scope:{createMockFile:f},"data-visual-test":`upload-value-label-and-value`,stableName:`LabelAndValue`,sourceImports:[`import { Form, Value, Field } from '@dnb/eufemia/extensions/forms'`,`import { Flex, Span } from '@dnb/eufemia'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`],__buildScope:{Value:c,Upload:a},children:`<Value.Upload
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
`}),C=()=>(0,m.jsx)(u,{hideCode:!0,scope:{createMockFile:f},"data-visual-test":`upload-value-label-and-value-on-file-click`,stableName:`LabelAndValueOnFileClick`,sourceImports:[`import { Form, Value, Field } from '@dnb/eufemia/extensions/forms'`,`import { Flex, Span } from '@dnb/eufemia'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`],__buildScope:{Value:c,Upload:a},children:`<Value.Upload
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
`}),w=()=>(0,m.jsx)(u,{hideCode:!0,scope:{createMockFile:f},"data-visual-test":`upload-value-inline`,stableName:`Inline`,sourceImports:[`import { Form, Value, Field } from '@dnb/eufemia/extensions/forms'`,`import { Flex, Span } from '@dnb/eufemia'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`],__buildScope:{Span:r,Value:c,Upload:a},children:`<Span>
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
`}),T=()=>(0,m.jsx)(u,{scope:{createMockFile:f},"data-visual-test":`upload-value-lists`,hideCode:!0,stableName:`ListVariants`,sourceImports:[`import { Form, Value, Field } from '@dnb/eufemia/extensions/forms'`,`import { Flex, Span } from '@dnb/eufemia'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`],__buildScope:{Value:c,Upload:a},children:`
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

`}),E=()=>(0,m.jsx)(u,{scope:{createMockFile:f},"data-visual-test":`upload-value-lists-on-file-click`,hideCode:!0,stableName:`ListVariantsOnFileClick`,sourceImports:[`import { Form, Value, Field } from '@dnb/eufemia/extensions/forms'`,`import { Flex, Span } from '@dnb/eufemia'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`],__buildScope:{Value:c,Upload:a},children:`
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

`}),D=()=>(0,m.jsx)(u,{scope:{createMockFile:f},hideCode:!0,stableName:`ListTypes`,sourceImports:[`import { Form, Value, Field } from '@dnb/eufemia/extensions/forms'`,`import { Flex, Span } from '@dnb/eufemia'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`],__buildScope:{Value:c,Upload:a},children:`
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

`}),O=()=>(0,m.jsx)(u,{scope:{createMockFile:f,createRequest:d},stableName:`OnFileClick`,sourceImports:[`import { Form, Value, Field } from '@dnb/eufemia/extensions/forms'`,`import { Flex, Span } from '@dnb/eufemia'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`],__buildScope:{Value:c,Upload:a},children:`<Value.Upload
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
`}),k=()=>(0,m.jsx)(u,{hideCode:!0,scope:{createMockFile:f},"data-visual-test":`upload-value-display-file-as-non-clickable`,stableName:`DisplayFileAsNonClickable`,sourceImports:[`import { Form, Value, Field } from '@dnb/eufemia/extensions/forms'`,`import { Flex, Span } from '@dnb/eufemia'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`],__buildScope:{Value:c,Upload:a},children:`<Value.Upload
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
`});function A(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...l(),...e.components},{VisibleWhenVisualTest:n}=t;return p||M(`Examples`,!1),k||M(`Examples.DisplayFileAsNonClickable`,!0),b||M(`Examples.FieldUploadSelectionPath`,!0),w||M(`Examples.Inline`,!0),x||M(`Examples.Label`,!0),S||M(`Examples.LabelAndValue`,!0),C||M(`Examples.LabelAndValueOnFileClick`,!0),D||M(`Examples.ListTypes`,!0),T||M(`Examples.ListVariants`,!0),E||M(`Examples.ListVariantsOnFileClick`,!0),O||M(`Examples.OnFileClick`,!0),h||M(`Examples.Placeholder`,!0),y||M(`Examples.WithCustomFormat`,!0),v||M(`Examples.WithDownload`,!0),_||M(`Examples.WithSize`,!0),g||M(`Examples.WithValue`,!0),n||M(`VisibleWhenVisualTest`,!0),(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(t.h2,{children:`Demos`}),`
`,(0,m.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,m.jsx)(h,{}),`
`,(0,m.jsx)(t.h3,{children:`Value`}),`
`,(0,m.jsx)(g,{}),`
`,(0,m.jsxs)(t.h3,{children:[`With `,(0,m.jsx)(t.code,{children:`displaySize`}),` property`]}),`
`,(0,m.jsx)(_,{}),`
`,(0,m.jsxs)(t.h3,{children:[`With `,(0,m.jsx)(t.code,{children:`download`}),` property`]}),`
`,(0,m.jsx)(v,{}),`
`,(0,m.jsx)(t.h3,{children:`Custom format`}),`
`,(0,m.jsx)(y,{}),`
`,(0,m.jsx)(t.h3,{children:`Label`}),`
`,(0,m.jsx)(x,{}),`
`,(0,m.jsx)(t.h3,{children:`Label and value`}),`
`,(0,m.jsx)(S,{}),`
`,(0,m.jsx)(t.h3,{children:`Inline`}),`
`,(0,m.jsx)(w,{}),`
`,(0,m.jsx)(t.h3,{children:`List variants`}),`
`,(0,m.jsx)(T,{}),`
`,(0,m.jsx)(t.h3,{children:`List types`}),`
`,(0,m.jsx)(D,{}),`
`,(0,m.jsx)(t.h3,{children:`Field.Upload path`}),`
`,(0,m.jsx)(b,{}),`
`,(0,m.jsxs)(t.h3,{children:[`Using `,(0,m.jsx)(t.code,{children:`onFileClick`})]}),`
`,(0,m.jsx)(O,{}),`
`,(0,m.jsx)(t.h3,{children:`Display files as non-clickable`}),`
`,(0,m.jsxs)(t.p,{children:[`When file size is 0 or not given (`,(0,m.jsx)(t.code,{children:`new File([], name, { type })`}),`), the file is displayed as a span instead of an anchor. However, when `,(0,m.jsx)(t.code,{children:`onFileClick`}),` is given, the file will be clickable as a button.`]}),`
`,(0,m.jsx)(k,{}),`
`,(0,m.jsxs)(n,{children:[(0,m.jsx)(C,{}),(0,m.jsx)(E,{})]})]})}function j(e={}){let{wrapper:t}={...l(),...e.components};return t?(0,m.jsx)(t,{...e,children:(0,m.jsx)(A,{...e})}):A(e)}function M(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{j as default};