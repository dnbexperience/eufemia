import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Anchor-BPx9fjvj.js";import{s as i}from"./ToggleButton-DfKpi57X.js";import{V as a,g as o,j as s,l as c,ot as l,v as u,w as d}from"./forms-D54jfDKN.js";import{t as f}from"./Card-BvVSLAbs.js";import{U as p}from"./index-BsJ3GLEw.js";import{t as m}from"./ComponentBox-sLMgHvLi.js";import{s as h}from"./Examples-D-M9xtCh.js";import{T as g}from"./Examples-34J5LQpU.js";var _=e({BasicUsage:()=>y,CompactVariant:()=>b,CompactVariantHelpButton:()=>x,Customized:()=>T,Required:()=>S,SessionStorage:()=>j,Width:()=>P,WithAsyncFileHandler:()=>D,WithAsyncOnFileClick:()=>A,WithAsyncOnFileDelete:()=>k,WithFileItemOptions:()=>M,WithFileSizeValidation:()=>N,WithHelp:()=>C,WithHelpWithoutLabelDescription:()=>w,WithIterateArray:()=>I,WithOnValidationError:()=>F,WithPath:()=>E,WithSyncFileHandler:()=>O}),v=t(n()),y=()=>(0,v.jsx)(m,{stableName:`BasicUsage`,sourceImports:[`import { Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError, Iterate, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`,`import { UploadFile, UploadValue } from '@dnb/eufemia/extensions/forms/Field/Upload'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Form:d,Field:s,Upload:a},children:`<Form.Handler>
  <Field.Upload
    label="My custom label"
    labelDescription="My description"
    onChange={(files) => console.log('onChange', files)}
  />
</Form.Handler>
`}),b=()=>(0,v.jsx)(m,{stableName:`CompactVariant`,sourceImports:[`import { Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError, Iterate, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`,`import { UploadFile, UploadValue } from '@dnb/eufemia/extensions/forms/Field/Upload'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Form:d,Field:s,Upload:a},children:`<Form.Handler>
  <Field.Upload
    variant="compact"
    label="My custom label"
    labelDescription="My description"
    onChange={(files) => console.log('onChange', files)}
  />
</Form.Handler>
`}),x=()=>(0,v.jsx)(m,{"data-visual-test":`upload-field-compact-help-button`,stableName:`CompactVariantHelpButton`,sourceImports:[`import { Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError, Iterate, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`,`import { UploadFile, UploadValue } from '@dnb/eufemia/extensions/forms/Field/Upload'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Form:d,Field:s,Upload:a,Anchor:r},children:`<Form.Handler>
  <Field.Upload
    help={{
      open: true,
      title: 'Hva betyr lånebeløp?',
      content: (
        <>
          Dette er hvor mye du har tenkt å låne{' '}
          <Anchor href="#test">totalt</Anchor>.
        </>
      ),
    }}
    variant="compact"
    label="My custom label"
    labelDescription="My description"
    onChange={(files) => console.log('onChange', files)}
  />
</Form.Handler>
`}),S=()=>(0,v.jsx)(m,{stableName:`Required`,sourceImports:[`import { Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError, Iterate, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`,`import { UploadFile, UploadValue } from '@dnb/eufemia/extensions/forms/Field/Upload'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Form:d,Flex:i,Field:s,Upload:a},children:`<Form.Handler onSubmit={(data) => console.log('onSubmit', data)}>
  <Flex.Stack>
    <Field.Upload path="/myFiles" required />
    <Form.SubmitButton />
  </Flex.Stack>
</Form.Handler>
`}),C=()=>(0,v.jsx)(m,{"data-visual-test":`upload-field-help-button`,stableName:`WithHelp`,sourceImports:[`import { Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError, Iterate, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`,`import { UploadFile, UploadValue } from '@dnb/eufemia/extensions/forms/Field/Upload'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Field:s,Upload:a},children:`<Field.Upload
  help={{
    open: true,
    title: 'Help title',
    content: 'Help content',
  }}
/>
`}),w=()=>(0,v.jsx)(m,{"data-visual-test":`upload-field-help-button-without-label-description`,stableName:`WithHelpWithoutLabelDescription`,sourceImports:[`import { Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError, Iterate, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`,`import { UploadFile, UploadValue } from '@dnb/eufemia/extensions/forms/Field/Upload'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Field:s,Upload:a},children:`<Field.Upload
  labelDescription={false}
  help={{
    open: true,
    title: 'Help title',
    content: 'Help content',
  }}
/>
`}),T=()=>(0,v.jsx)(m,{"data-visual-test":`upload-field-customized`,stableName:`Customized`,sourceImports:[`import { Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError, Iterate, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`,`import { UploadFile, UploadValue } from '@dnb/eufemia/extensions/forms/Field/Upload'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Field:s,Upload:a},children:`<Field.Upload
  title="My custom title"
  text="My text with a help button"
  width="large"
  help={{
    title: 'Help title',
    content: 'Help content',
    open: true,
  }}
  warning="Warning message"
  acceptedFileTypes={['pdf']}
  filesAmountLimit={1}
  fileMaxSize={1}
/>
`}),E=()=>(0,v.jsx)(m,{scope:{createMockFile:g},stableName:`WithPath`,sourceImports:[`import { Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError, Iterate, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`,`import { UploadFile, UploadValue } from '@dnb/eufemia/extensions/forms/Field/Upload'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Form:d,Field:s,Upload:a},children:`<Form.Handler
  onChange={(data) => console.log('onChange', data)}
  data={{
    myFiles: [
      {
        file: createMockFile('fileName-1.png', 100, 'image/png'),
      },
    ],
  }}
>
  <Field.Upload path="/myFiles" />
</Form.Handler>
`}),D=()=>(0,v.jsx)(m,{scope:{createRequest:h},stableName:`WithAsyncFileHandler`,sourceImports:[`import { Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError, Iterate, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`,`import { UploadFile, UploadValue } from '@dnb/eufemia/extensions/forms/Field/Upload'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Form:d,Flex:i,Field:s,Upload:a,Tools:c},noInline:!0,children:`const MyForm = () => {
  return (
    <Form.Handler onSubmit={async (form) => console.log(form)}>
      <Flex.Stack>
        <Field.Upload
          path="/attachments"
          labelDescription="Upload multiple files at once to see the upload error message. This demo has been set up so that every other file in a batch will fail."
          fileHandler={mockAsyncFileUpload}
          required
        />
        <Form.SubmitButton />
        <Tools.Log />
      </Flex.Stack>
    </Form.Handler>
  )
}
async function mockAsyncFileUpload(
  newFiles: UploadValue
): Promise<UploadValue> {
  const updatedFiles: UploadValue = []
  for (const [index, file] of Object.entries(newFiles)) {
    const formData = new FormData()
    formData.append('file', file.file, file.file.name)
    const request = createRequest()
    await request(Math.floor(Math.random() * 2000) + 1000) // Simulate a request

    try {
      const mockResponse = {
        ok: (parseFloat(index) + 2) % 2 === 0,
        // Every other request will fail
        json: async () => ({
          serverGeneratedId: file.file.name + '_' + crypto.randomUUID(),
        }),
      }
      if (!mockResponse.ok) {
        throw new Error('Unable to upload this file')
      }
      const data = await mockResponse.json()
      updatedFiles.push({
        ...file,
        id: data.serverGeneratedId,
      })
    } catch (error) {
      updatedFiles.push({
        ...file,
        errorMessage: error.message,
        removeLink: true,
      })
    }
  }
  return updatedFiles
}
render(<MyForm />)
`}),O=()=>(0,v.jsx)(m,{stableName:`WithSyncFileHandler`,sourceImports:[`import { Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError, Iterate, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`,`import { UploadFile, UploadValue } from '@dnb/eufemia/extensions/forms/Field/Upload'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Form:d,Flex:i,Field:s,Upload:a,Tools:c},noInline:!0,children:`const MyForm = () => {
  return (
    <Form.Handler onSubmit={async (form) => console.log(form)}>
      <Flex.Stack>
        <Field.Upload
          path="/myattachments"
          fileHandler={mockSyncFileUpload}
          required
        />
        <Form.SubmitButton />
        <Tools.Log />
      </Flex.Stack>
    </Form.Handler>
  )
}
function mockSyncFileUpload(newFiles: UploadValue) {
  return newFiles.map((file) => {
    if (file.file.name.length > 5) {
      file.errorMessage = 'File name is too long'
    }
    return file
  })
}
render(<MyForm />)
`}),k=()=>(0,v.jsx)(m,{scope:{createRequest:h},stableName:`WithAsyncOnFileDelete`,sourceImports:[`import { Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError, Iterate, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`,`import { UploadFile, UploadValue } from '@dnb/eufemia/extensions/forms/Field/Upload'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Field:s,Upload:a},noInline:!0,children:`async function mockAsyncFileRemoval({ fileItem }) {
  const request = createRequest()
  console.log(\`making API request to remove: \${fileItem.file.name}\`)
  await request(3000) // Simulate a request
  const mockResponse = {
    successfulRemoval: Math.random() < 0.5, // Randomly fails to remove the file
  }

  if (!mockResponse.successfulRemoval) {
    throw new Error('Unable to remove this file')
  }
}
render(
  <Field.Upload
    onFileDelete={mockAsyncFileRemoval}
    acceptedFileTypes={['jpg', 'png']}
  />
)
`}),A=()=>(0,v.jsx)(m,{scope:{createRequest:h,createMockFile:g},stableName:`WithAsyncOnFileClick`,sourceImports:[`import { Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError, Iterate, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`,`import { UploadFile, UploadValue } from '@dnb/eufemia/extensions/forms/Field/Upload'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Form:d,Field:s,Upload:a},noInline:!0,children:`async function mockAsyncFileClick({ fileItem }) {
  const request = createRequest()
  console.log(
    \`making API request to fetch the url of the file: \${fileItem.file.name}\`
  )
  await request(2000) // Simulate a request
  window.open(
    \`https://eufemia.dnb.no/images/avatars/\${fileItem.file.name}\`,
    '_blank'
  )
}
render(
  <Form.Handler
    data={{
      myFiles: [
        {
          file: createMockFile('1501870.jpg', 100, 'image/png'),
          id: '1',
        },
      ],
    }}
  >
    <Field.Upload path="/myFiles" onFileClick={mockAsyncFileClick} />
  </Form.Handler>
)
`});function j(){return(0,v.jsx)(m,{stableName:`SessionStorage`,sourceImports:[`import { Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError, Iterate, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`,`import { UploadFile, UploadValue } from '@dnb/eufemia/extensions/forms/Field/Upload'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Form:d,Flex:i,Card:f,Field:s,Upload:a,Value:u,Tools:c},children:`<Form.Handler sessionStorageId="documents">
  <Flex.Stack>
    <Form.Card>
      <Field.Upload path="/documents" />
      <Value.Upload
        path="/documents"
        label="Uploaded files"
        placeholder="No files uploaded."
        variant="ol"
        showEmpty
      />
    </Form.Card>

    <Form.SubmitButton />
    <Tools.Log />
  </Flex.Stack>
</Form.Handler>
`})}var M=()=>(0,v.jsx)(m,{scope:{createMockFile:g},stableName:`WithFileItemOptions`,sourceImports:[`import { Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError, Iterate, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`,`import { UploadFile, UploadValue } from '@dnb/eufemia/extensions/forms/Field/Upload'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Form:d,Field:s,Upload:a},noInline:!0,children:`const MyForm = () => {
  return (
    <Form.Handler
      data={{
        myFiles: [
          {
            file: createMockFile('fileName-1.png', 100, 'image/png'),
            id: '1',
            description: 'My description',
            errorMessage: 'My error message',
            removeDeleteButton: true,
            removeLink: true,
          },
        ],
      }}
    >
      <Field.Upload path="/myFiles" fileHandler={fileHandler} required />
    </Form.Handler>
  )
}
function fileHandler(newFiles: UploadValue) {
  return newFiles.map((file) => {
    file.errorMessage = 'File has a problem'
    file.description = 'File description'
    file.removeDeleteButton = true
    return file
  })
}
render(<MyForm />)
`}),N=()=>(0,v.jsx)(m,{scope:{FormError:l},stableName:`WithFileSizeValidation`,sourceImports:[`import { Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError, Iterate, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`,`import { UploadFile, UploadValue } from '@dnb/eufemia/extensions/forms/Field/Upload'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Form:d,Field:s,Upload:a,Card:f},noInline:!0,children:`const MAX_SIZE = 500 * 1024 // 500 KB
const MIN_SIZE = 50 * 1024 // 50 KB

const myTranslation = {
  'nb-NO': {
    errorFileTooSmall: 'Filen er for liten.',
    errorFileTooLarge: 'Filen er for stor.',
  },
  'en-GB': {
    errorFileTooSmall: 'File is too small.',
    errorFileTooLarge: 'File is too large.',
  },
}
function MyField() {
  const tr = Form.useTranslation()
  const fileHandler = (newFiles: UploadValue) => {
    return newFiles.map((item) => {
      console.log('item:', item)
      if (item.file.size < MIN_SIZE) {
        item.errorMessage = tr['errorFileTooSmall']
      }
      if (item.file.size > MAX_SIZE) {
        item.errorMessage = tr['errorFileTooLarge']
      }
      return item
    })
  }
  return (
    <Field.Upload
      label="Label"
      labelDescription="This is a Field"
      path="/myField"
      acceptedFileTypes={['PNG']}
      fileMaxSize={false}
      fileHandler={fileHandler}
    />
  )
}
render(
  <Form.Handler
    translations={myTranslation}
    onSubmit={(data) => console.log('onSubmit', data)}
  >
    <Form.Card>
      <MyField />
    </Form.Card>

    <Form.SubmitButton />
  </Form.Handler>
)
`}),P=()=>(0,v.jsx)(m,{scope:{createMockFile:g},"data-visual-test":`upload-field-width`,stableName:`Width`,sourceImports:[`import { Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError, Iterate, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`,`import { UploadFile, UploadValue } from '@dnb/eufemia/extensions/forms/Field/Upload'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Form:d,Card:f,Field:s,Upload:a},children:`<Form.Handler
  data={{
    myFiles: [
      {
        file: createMockFile('fileName-1.png', 100, 'image/png'),
      },
    ],
  }}
>
  <Form.Card>
    <Field.String width="stretch" />
    <Field.Upload path="/myFiles" label="default" />
    <Field.Upload path="/myFiles" width="large" label="large" />
    <Field.Upload path="/myFiles" width="stretch" label="stretch" />
  </Form.Card>
</Form.Handler>
`}),F=()=>(0,v.jsx)(m,{scope:{createRequest:h},stableName:`WithOnValidationError`,sourceImports:[`import { Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError, Iterate, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`,`import { UploadFile, UploadValue } from '@dnb/eufemia/extensions/forms/Field/Upload'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Form:d,Flex:i,Field:s,Upload:a,Tools:c},noInline:!0,children:`function validationErrorHandler(invalidFiles: UploadValue): UploadValue {
  return invalidFiles.map((file) => ({
    ...file,
    removeLink: true,
    description: 'This file cannot be uploaded due to validation failure',
  }))
}
async function fileHandler(validFiles: UploadValue): Promise<UploadValue> {
  const updatedFiles: UploadValue = []
  for (const file of validFiles) {
    const request = createRequest()
    await request(2000) // Simulate upload

    updatedFiles.push({
      ...file,
      id: \`server_\${crypto.randomUUID()}\`,
    })
  }
  return updatedFiles
}
async function onFileDelete({ fileItem }) {
  const request = createRequest()
  console.log('Deleting file:', fileItem.file.name)
  await request(1000) // Simulate delete
}
render(
  <Form.Handler onSubmit={(data) => console.log('onSubmit', data)}>
    <Flex.Stack>
      <Field.Upload
        path="/myFiles"
        fileMaxSize={1}
        acceptedFileTypes={['jpg', 'pdf', 'png']}
        label="Upload documents"
        labelDescription="Try uploading files larger than 1 MB or unsupported file types (e.g., .docx) to see validation error handling."
        onValidationError={validationErrorHandler}
        fileHandler={fileHandler}
        onFileDelete={onFileDelete}
      />
      <Form.SubmitButton />
      <Tools.Log />
    </Flex.Stack>
  </Form.Handler>
)
`}),I=()=>(0,v.jsx)(m,{scope:{createRequest:h},stableName:`WithIterateArray`,sourceImports:[`import { Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError, Iterate, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'`,`import { UploadFile, UploadValue } from '@dnb/eufemia/extensions/forms/Field/Upload'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Form:d,Iterate:o,Field:s,Upload:a,Tools:c},noInline:!0,children:`async function mockAsyncFileUpload(
  newFiles: UploadFile[]
): Promise<UploadFile[]> {
  const updatedFiles: UploadFile[] = []
  for (const [, file] of Object.entries(newFiles)) {
    const formData = new FormData()
    formData.append('file', file.file, file.file.name)
    const request = createRequest()
    await request(8000) // Simulate a request

    try {
      const mockResponse = {
        ok: true,
        json: async () => ({
          serverGeneratedId: file.file.name + '_' + crypto.randomUUID(),
        }),
      }
      const data = await mockResponse.json()
      updatedFiles.push({
        ...file,
        id: data.serverGeneratedId,
      })
    } catch (error) {
      updatedFiles.push({
        ...file,
        errorMessage: error.message,
      })
    }
  }
  return updatedFiles
}
async function mockAsyncOnFileClick({ fileItem }) {
  const request = createRequest()
  console.log(
    'making API request to fetch the url of the file: ' +
      fileItem.file.name
  )
  await request(3000) // Simulate a request
  window.open(
    'https://eufemia.dnb.no/images/avatars/1501870.jpg',
    '_blank'
  )
}
async function mockAsyncFileRemoval({ fileItem }) {
  const request = createRequest()
  console.log('Making API request to remove: ' + fileItem.file.name)
  await request(3000) // Simulate a request
}
render(
  <Form.Handler
    onSubmit={(data) => {
      console.log('submitted data:', data)
    }}
    defaultData={{
      listOfFiles: [
        {
          files: undefined,
        },
        {
          files: undefined,
        },
      ],
    }}
  >
    <Iterate.Array path="/listOfFiles">
      <Field.Upload
        itemPath="/files"
        label="Required field with async fileHandler"
        onFileDelete={mockAsyncFileRemoval}
        onFileClick={mockAsyncOnFileClick}
        // @ts-expect-error -- strictFunctionTypes
        fileHandler={mockAsyncFileUpload}
        required
        onChange={(e) => {
          console.log('onChange', e)
        }}
      />
    </Iterate.Array>
    <Form.SubmitButton />
    <Tools.Log />
  </Form.Handler>
)
`});function L(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...p(),...e.components},{VisibleWhenVisualTest:n}=t;return _||z(`Examples`,!1),y||z(`Examples.BasicUsage`,!0),b||z(`Examples.CompactVariant`,!0),x||z(`Examples.CompactVariantHelpButton`,!0),T||z(`Examples.Customized`,!0),S||z(`Examples.Required`,!0),j||z(`Examples.SessionStorage`,!0),P||z(`Examples.Width`,!0),D||z(`Examples.WithAsyncFileHandler`,!0),A||z(`Examples.WithAsyncOnFileClick`,!0),k||z(`Examples.WithAsyncOnFileDelete`,!0),M||z(`Examples.WithFileItemOptions`,!0),N||z(`Examples.WithFileSizeValidation`,!0),C||z(`Examples.WithHelp`,!0),w||z(`Examples.WithHelpWithoutLabelDescription`,!0),I||z(`Examples.WithIterateArray`,!0),F||z(`Examples.WithOnValidationError`,!0),E||z(`Examples.WithPath`,!0),O||z(`Examples.WithSyncFileHandler`,!0),n||z(`VisibleWhenVisualTest`,!0),(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(t.h2,{children:`Demos`}),`
`,(0,v.jsxs)(t.p,{children:[`Consider taking a look at the demos for the `,(0,v.jsx)(t.a,{href:`/uilib/components/upload/demos/`,children:`Upload component`}),` as well.`]}),`
`,(0,v.jsx)(t.h3,{children:`Basic usage`}),`
`,(0,v.jsx)(y,{}),`
`,(0,v.jsxs)(t.h3,{children:[`Variant `,(0,v.jsx)(t.code,{children:`compact`})]}),`
`,(0,v.jsx)(b,{}),`
`,(0,v.jsx)(t.h3,{children:`Required`}),`
`,(0,v.jsx)(S,{}),`
`,(0,v.jsx)(t.h3,{children:`Path usage`}),`
`,(0,v.jsx)(E,{}),`
`,(0,v.jsx)(t.h3,{children:`With help`}),`
`,(0,v.jsx)(C,{}),`
`,(0,v.jsx)(t.h3,{children:`Customized`}),`
`,(0,v.jsx)(T,{}),`
`,(0,v.jsx)(t.h3,{children:`Session storage support`}),`
`,(0,v.jsxs)(t.p,{children:[`The `,(0,v.jsx)(t.code,{children:`sessionStorageId`}),` property can be used to store the files in the session storage so they persist between page reloads.`]}),`
`,(0,v.jsx)(j,{}),`
`,(0,v.jsx)(t.h3,{children:`With asynchronous file handler`}),`
`,(0,v.jsxs)(t.p,{children:[`The `,(0,v.jsx)(t.code,{children:`fileHandler`}),` property supports an asynchronous function, and can be used for handling/validating files asynchronously, like to upload files to a virus checker and display errors based on the outcome:`]}),`
`,(0,v.jsx)(D,{}),`
`,(0,v.jsx)(t.h3,{children:`With synchronous file handler`}),`
`,(0,v.jsxs)(t.p,{children:[`The `,(0,v.jsx)(t.code,{children:`fileHandler`}),` property supports a synchronous function, and can be used for handling/validating files synchronously, like to check for file names that's too long:`]}),`
`,(0,v.jsx)(O,{}),`
`,(0,v.jsxs)(t.h3,{children:[`With asynchronous `,(0,v.jsx)(t.code,{children:`onFileDelete`})]}),`
`,(0,v.jsx)(k,{}),`
`,(0,v.jsxs)(t.h3,{children:[`With asynchronous `,(0,v.jsx)(t.code,{children:`onFileClick`})]}),`
`,(0,v.jsx)(A,{}),`
`,(0,v.jsxs)(t.h3,{children:[`With `,(0,v.jsx)(t.a,{href:`/uilib/components/upload/properties/#fileitem`,children:`FileItem`}),` options`]}),`
`,(0,v.jsx)(M,{}),`
`,(0,v.jsx)(t.h3,{children:`With file size validation`}),`
`,(0,v.jsx)(N,{}),`
`,(0,v.jsx)(t.h3,{children:`With validation error handler`}),`
`,(0,v.jsxs)(t.p,{children:[`The `,(0,v.jsx)(t.code,{children:`onValidationError`}),` property can be used to handle files that fail built-in validation (file size or file type). This allows you to customize the appearance and behavior of invalid files, such as removing the download link or adding custom descriptions:`]}),`
`,(0,v.jsx)(F,{}),`
`,(0,v.jsx)(t.h3,{children:`With Iterate.Array`}),`
`,(0,v.jsx)(I,{}),`
`,(0,v.jsxs)(n,{children:[(0,v.jsx)(P,{}),(0,v.jsx)(w,{}),(0,v.jsx)(x,{})]})]})}function R(e={}){let{wrapper:t}={...p(),...e.components};return t?(0,v.jsx)(t,{...e,children:(0,v.jsx)(L,{...e})}):L(e)}function z(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{R as default};