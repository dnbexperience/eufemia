import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{Pt as i,zr as a}from"./index-DqqByKA2.js";import{s as o}from"./Examples-CXhguzzY.js";import{T as s}from"./Examples-DfoAAWSo.js";var c=t({BasicUsage:()=>u,CompactVariant:()=>d,CompactVariantHelpButton:()=>f,Customized:()=>g,Required:()=>p,SessionStorage:()=>S,Width:()=>T,WithAsyncFileHandler:()=>v,WithAsyncOnFileClick:()=>x,WithAsyncOnFileDelete:()=>b,WithFileItemOptions:()=>C,WithFileSizeValidation:()=>w,WithHelp:()=>m,WithHelpWithoutLabelDescription:()=>h,WithIterateArray:()=>D,WithOnValidationError:()=>E,WithPath:()=>_,WithSyncFileHandler:()=>y}),l=e(n()),u=()=>(0,l.jsx)(r,{stableName:`BasicUsage`,children:`<Form.Handler>
  <Field.Upload
    label="My custom label"
    labelDescription="My description"
    onChange={(files) => console.log('onChange', files)}
  />
</Form.Handler>
`}),d=()=>(0,l.jsx)(r,{stableName:`CompactVariant`,children:`<Form.Handler>
  <Field.Upload
    variant="compact"
    label="My custom label"
    labelDescription="My description"
    onChange={(files) => console.log('onChange', files)}
  />
</Form.Handler>
`}),f=()=>(0,l.jsx)(r,{"data-visual-test":`upload-field-compact-help-button`,stableName:`CompactVariantHelpButton`,children:`<Form.Handler>
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
`}),p=()=>(0,l.jsx)(r,{stableName:`Required`,children:`<Form.Handler onSubmit={(data) => console.log('onSubmit', data)}>
  <Flex.Stack>
    <Field.Upload path="/myFiles" required />
    <Form.SubmitButton />
  </Flex.Stack>
</Form.Handler>
`}),m=()=>(0,l.jsx)(r,{"data-visual-test":`upload-field-help-button`,stableName:`WithHelp`,children:`<Field.Upload
  help={{
    open: true,
    title: 'Help title',
    content: 'Help content',
  }}
/>
`}),h=()=>(0,l.jsx)(r,{"data-visual-test":`upload-field-help-button-without-label-description`,stableName:`WithHelpWithoutLabelDescription`,children:`<Field.Upload
  labelDescription={false}
  help={{
    open: true,
    title: 'Help title',
    content: 'Help content',
  }}
/>
`}),g=()=>(0,l.jsx)(r,{"data-visual-test":`upload-field-customized`,stableName:`Customized`,children:`<Field.Upload
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
`}),_=()=>(0,l.jsx)(r,{scope:{createMockFile:s},stableName:`WithPath`,children:`<Form.Handler
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
`}),v=()=>(0,l.jsx)(r,{scope:{createRequest:o},stableName:`WithAsyncFileHandler`,noInline:!0,children:`const MyForm = () => {
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
`}),y=()=>(0,l.jsx)(r,{stableName:`WithSyncFileHandler`,noInline:!0,children:`const MyForm = () => {
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
`}),b=()=>(0,l.jsx)(r,{scope:{createRequest:o},stableName:`WithAsyncOnFileDelete`,noInline:!0,children:`async function mockAsyncFileRemoval({ fileItem }) {
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
`}),x=()=>(0,l.jsx)(r,{scope:{createRequest:o,createMockFile:s},stableName:`WithAsyncOnFileClick`,noInline:!0,children:`async function mockAsyncFileClick({ fileItem }) {
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
`});function S(){return(0,l.jsx)(r,{stableName:`SessionStorage`,children:`<Form.Handler sessionStorageId="documents">
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
`})}var C=()=>(0,l.jsx)(r,{scope:{createMockFile:s},stableName:`WithFileItemOptions`,noInline:!0,children:`const MyForm = () => {
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
`}),w=()=>(0,l.jsx)(r,{scope:{FormError:i},stableName:`WithFileSizeValidation`,noInline:!0,children:`const MAX_SIZE = 500 * 1024 // 500 KB
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
`}),T=()=>(0,l.jsx)(r,{scope:{createMockFile:s},"data-visual-test":`upload-field-width`,stableName:`Width`,children:`<Form.Handler
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
`}),E=()=>(0,l.jsx)(r,{scope:{createRequest:o},stableName:`WithOnValidationError`,noInline:!0,children:`function validationErrorHandler(invalidFiles: UploadValue): UploadValue {
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
`}),D=()=>(0,l.jsx)(r,{scope:{createRequest:o},stableName:`WithIterateArray`,noInline:!0,children:`async function mockAsyncFileUpload(
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
`});function O(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...a(),...e.components},{VisibleWhenVisualTest:n}=t;return c||A(`Examples`,!1),u||A(`Examples.BasicUsage`,!0),d||A(`Examples.CompactVariant`,!0),f||A(`Examples.CompactVariantHelpButton`,!0),g||A(`Examples.Customized`,!0),p||A(`Examples.Required`,!0),S||A(`Examples.SessionStorage`,!0),T||A(`Examples.Width`,!0),v||A(`Examples.WithAsyncFileHandler`,!0),x||A(`Examples.WithAsyncOnFileClick`,!0),b||A(`Examples.WithAsyncOnFileDelete`,!0),C||A(`Examples.WithFileItemOptions`,!0),w||A(`Examples.WithFileSizeValidation`,!0),m||A(`Examples.WithHelp`,!0),h||A(`Examples.WithHelpWithoutLabelDescription`,!0),D||A(`Examples.WithIterateArray`,!0),E||A(`Examples.WithOnValidationError`,!0),_||A(`Examples.WithPath`,!0),y||A(`Examples.WithSyncFileHandler`,!0),n||A(`VisibleWhenVisualTest`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`Demos`}),`
`,(0,l.jsxs)(t.p,{children:[`Consider taking a look at the demos for the `,(0,l.jsx)(t.a,{href:`/uilib/components/upload/demos/`,children:`Upload component`}),` as well.`]}),`
`,(0,l.jsx)(t.h3,{children:`Basic usage`}),`
`,(0,l.jsx)(u,{}),`
`,(0,l.jsxs)(t.h3,{children:[`Variant `,(0,l.jsx)(t.code,{children:`compact`})]}),`
`,(0,l.jsx)(d,{}),`
`,(0,l.jsx)(t.h3,{children:`Required`}),`
`,(0,l.jsx)(p,{}),`
`,(0,l.jsx)(t.h3,{children:`Path usage`}),`
`,(0,l.jsx)(_,{}),`
`,(0,l.jsx)(t.h3,{children:`With help`}),`
`,(0,l.jsx)(m,{}),`
`,(0,l.jsx)(t.h3,{children:`Customized`}),`
`,(0,l.jsx)(g,{}),`
`,(0,l.jsx)(t.h3,{children:`Session storage support`}),`
`,(0,l.jsxs)(t.p,{children:[`The `,(0,l.jsx)(t.code,{children:`sessionStorageId`}),` property can be used to store the files in the session storage so they persist between page reloads.`]}),`
`,(0,l.jsx)(S,{}),`
`,(0,l.jsx)(t.h3,{children:`With asynchronous file handler`}),`
`,(0,l.jsxs)(t.p,{children:[`The `,(0,l.jsx)(t.code,{children:`fileHandler`}),` property supports an asynchronous function, and can be used for handling/validating files asynchronously, like to upload files to a virus checker and display errors based on the outcome:`]}),`
`,(0,l.jsx)(v,{}),`
`,(0,l.jsx)(t.h3,{children:`With synchronous file handler`}),`
`,(0,l.jsxs)(t.p,{children:[`The `,(0,l.jsx)(t.code,{children:`fileHandler`}),` property supports a synchronous function, and can be used for handling/validating files synchronously, like to check for file names that's too long:`]}),`
`,(0,l.jsx)(y,{}),`
`,(0,l.jsxs)(t.h3,{children:[`With asynchronous `,(0,l.jsx)(t.code,{children:`onFileDelete`})]}),`
`,(0,l.jsx)(b,{}),`
`,(0,l.jsxs)(t.h3,{children:[`With asynchronous `,(0,l.jsx)(t.code,{children:`onFileClick`})]}),`
`,(0,l.jsx)(x,{}),`
`,(0,l.jsxs)(t.h3,{children:[`With `,(0,l.jsx)(t.a,{href:`/uilib/components/upload/properties/#fileitem`,children:`FileItem`}),` options`]}),`
`,(0,l.jsx)(C,{}),`
`,(0,l.jsx)(t.h3,{children:`With file size validation`}),`
`,(0,l.jsx)(w,{}),`
`,(0,l.jsx)(t.h3,{children:`With validation error handler`}),`
`,(0,l.jsxs)(t.p,{children:[`The `,(0,l.jsx)(t.code,{children:`onValidationError`}),` property can be used to handle files that fail built-in validation (file size or file type). This allows you to customize the appearance and behavior of invalid files, such as removing the download link or adding custom descriptions:`]}),`
`,(0,l.jsx)(E,{}),`
`,(0,l.jsx)(t.h3,{children:`With Iterate.Array`}),`
`,(0,l.jsx)(D,{}),`
`,(0,l.jsxs)(n,{children:[(0,l.jsx)(T,{}),(0,l.jsx)(h,{}),(0,l.jsx)(f,{})]})]})}function k(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(O,{...e})}):O(e)}function A(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{k as default};