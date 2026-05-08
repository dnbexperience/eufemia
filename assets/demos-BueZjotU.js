import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";import{Lr as r,bt as i}from"./index--zEB_f_m.js";import{s as a}from"./Examples-CDYmlz65.js";import{T as o}from"./Examples-CtNQa1qe.js";var s=e({BasicUsage:()=>l,CompactVariant:()=>u,CompactVariantHelpButton:()=>d,Customized:()=>h,Required:()=>f,SessionStorage:()=>x,Width:()=>w,WithAsyncFileHandler:()=>_,WithAsyncOnFileClick:()=>b,WithAsyncOnFileDelete:()=>y,WithFileItemOptions:()=>S,WithFileSizeValidation:()=>C,WithHelp:()=>p,WithHelpWithoutLabelDescription:()=>m,WithIterateArray:()=>E,WithOnValidationError:()=>T,WithPath:()=>g,WithSyncFileHandler:()=>v}),c=t(),l=()=>(0,c.jsx)(n,{children:`<Form.Handler>
  <Field.Upload
    label="My custom label"
    labelDescription="My description"
    onChange={(files) => console.log('onChange', files)}
  />
</Form.Handler>
`}),u=()=>(0,c.jsx)(n,{children:`<Form.Handler>
  <Field.Upload
    variant="compact"
    label="My custom label"
    labelDescription="My description"
    onChange={(files) => console.log('onChange', files)}
  />
</Form.Handler>
`}),d=()=>(0,c.jsx)(n,{"data-visual-test":`upload-field-compact-help-button`,children:`<Form.Handler>
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
`}),f=()=>(0,c.jsx)(n,{children:`<Form.Handler onSubmit={(data) => console.log('onSubmit', data)}>
  <Flex.Stack>
    <Field.Upload path="/myFiles" required />
    <Form.SubmitButton />
  </Flex.Stack>
</Form.Handler>
`}),p=()=>(0,c.jsx)(n,{"data-visual-test":`upload-field-help-button`,children:`<Field.Upload
  help={{
    open: true,
    title: 'Help title',
    content: 'Help content',
  }}
/>
`}),m=()=>(0,c.jsx)(n,{"data-visual-test":`upload-field-help-button-without-label-description`,children:`<Field.Upload
  labelDescription={false}
  help={{
    open: true,
    title: 'Help title',
    content: 'Help content',
  }}
/>
`}),h=()=>(0,c.jsx)(n,{"data-visual-test":`upload-field-customized`,children:`<Field.Upload
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
`}),g=()=>(0,c.jsx)(n,{scope:{createMockFile:o},children:`<Form.Handler
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
`}),_=()=>(0,c.jsx)(n,{scope:{createRequest:a},noInline:!0,children:`const MyForm = () => {
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
`}),v=()=>(0,c.jsx)(n,{noInline:!0,children:`const MyForm = () => {
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
`}),y=()=>(0,c.jsx)(n,{scope:{createRequest:a},noInline:!0,children:`async function mockAsyncFileRemoval({ fileItem }) {
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
`}),b=()=>(0,c.jsx)(n,{scope:{createRequest:a,createMockFile:o},noInline:!0,children:`async function mockAsyncFileClick({ fileItem }) {
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
`});function x(){return(0,c.jsx)(n,{children:`<Form.Handler sessionStorageId="documents">
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
`})}var S=()=>(0,c.jsx)(n,{scope:{createMockFile:o},noInline:!0,children:`const MyForm = () => {
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
`}),C=()=>(0,c.jsx)(n,{scope:{FormError:i},noInline:!0,children:`const MAX_SIZE = 500 * 1024 // 500 KB
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
`}),w=()=>(0,c.jsx)(n,{scope:{createMockFile:o},"data-visual-test":`upload-field-width`,children:`<Form.Handler
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
`}),T=()=>(0,c.jsx)(n,{scope:{createRequest:a},noInline:!0,children:`function validationErrorHandler(invalidFiles: UploadValue): UploadValue {
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
`}),E=()=>(0,c.jsx)(n,{scope:{createRequest:a},noInline:!0,children:`async function mockAsyncFileUpload(
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
`});function D(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components},{VisibleWhenVisualTest:n}=t;return s||k(`Examples`,!1),l||k(`Examples.BasicUsage`,!0),u||k(`Examples.CompactVariant`,!0),d||k(`Examples.CompactVariantHelpButton`,!0),h||k(`Examples.Customized`,!0),f||k(`Examples.Required`,!0),x||k(`Examples.SessionStorage`,!0),w||k(`Examples.Width`,!0),_||k(`Examples.WithAsyncFileHandler`,!0),b||k(`Examples.WithAsyncOnFileClick`,!0),y||k(`Examples.WithAsyncOnFileDelete`,!0),S||k(`Examples.WithFileItemOptions`,!0),C||k(`Examples.WithFileSizeValidation`,!0),p||k(`Examples.WithHelp`,!0),m||k(`Examples.WithHelpWithoutLabelDescription`,!0),E||k(`Examples.WithIterateArray`,!0),T||k(`Examples.WithOnValidationError`,!0),g||k(`Examples.WithPath`,!0),v||k(`Examples.WithSyncFileHandler`,!0),n||k(`VisibleWhenVisualTest`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsxs)(t.p,{children:[`Consider taking a look at the demos for the `,(0,c.jsx)(t.a,{href:`/uilib/components/upload/demos/`,children:`Upload component`}),` as well.`]}),`
`,(0,c.jsx)(t.h3,{children:`Basic usage`}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsxs)(t.h3,{children:[`Variant `,(0,c.jsx)(t.code,{children:`compact`})]}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsx)(t.h3,{children:`Required`}),`
`,(0,c.jsx)(f,{}),`
`,(0,c.jsx)(t.h3,{children:`Path usage`}),`
`,(0,c.jsx)(g,{}),`
`,(0,c.jsx)(t.h3,{children:`With help`}),`
`,(0,c.jsx)(p,{}),`
`,(0,c.jsx)(t.h3,{children:`Customized`}),`
`,(0,c.jsx)(h,{}),`
`,(0,c.jsx)(t.h3,{children:`Session storage support`}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`sessionStorageId`}),` property can be used to store the files in the session storage so they persist between page reloads.`]}),`
`,(0,c.jsx)(x,{}),`
`,(0,c.jsx)(t.h3,{children:`With asynchronous file handler`}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`fileHandler`}),` property supports an asynchronous function, and can be used for handling/validating files asynchronously, like to upload files to a virus checker and display errors based on the outcome:`]}),`
`,(0,c.jsx)(_,{}),`
`,(0,c.jsx)(t.h3,{children:`With synchronous file handler`}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`fileHandler`}),` property supports a synchronous function, and can be used for handling/validating files synchronously, like to check for file names that's too long:`]}),`
`,(0,c.jsx)(v,{}),`
`,(0,c.jsxs)(t.h3,{children:[`With asynchronous `,(0,c.jsx)(t.code,{children:`onFileDelete`})]}),`
`,(0,c.jsx)(y,{}),`
`,(0,c.jsxs)(t.h3,{children:[`With asynchronous `,(0,c.jsx)(t.code,{children:`onFileClick`})]}),`
`,(0,c.jsx)(b,{}),`
`,(0,c.jsxs)(t.h3,{children:[`With `,(0,c.jsx)(t.a,{href:`/uilib/components/upload/properties/#fileitem`,children:`FileItem`}),` options`]}),`
`,(0,c.jsx)(S,{}),`
`,(0,c.jsx)(t.h3,{children:`With file size validation`}),`
`,(0,c.jsx)(C,{}),`
`,(0,c.jsx)(t.h3,{children:`With validation error handler`}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`onValidationError`}),` property can be used to handle files that fail built-in validation (file size or file type). This allows you to customize the appearance and behavior of invalid files, such as removing the download link or adding custom descriptions:`]}),`
`,(0,c.jsx)(T,{}),`
`,(0,c.jsx)(t.h3,{children:`With Iterate.Array`}),`
`,(0,c.jsx)(E,{}),`
`,(0,c.jsxs)(n,{children:[(0,c.jsx)(w,{}),(0,c.jsx)(m,{}),(0,c.jsx)(d,{})]})]})}function O(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(D,{...e})}):D(e)}function k(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{O as default};