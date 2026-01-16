---
title: 'Upload'
description: '`Field.Upload` is a wrapper for the Upload component to make it easier to use inside a form.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/feature-fields/more-fields/Upload/metadata.json
---

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Upload />)
```

## Description

`Field.Upload` is a wrapper for the [Upload](/uilib/components/upload/) component to make it easier to use inside a form.

There is a corresponding [Value.Upload](/uilib/extensions/forms/Value/Upload) component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/Upload)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/more-fields/Upload)

## The data and file format

The returned data is an array of objects containing a file object, a unique ID, etc. The [file item object](/uilib/components/upload/properties/#fileitem) contains the file itself and some additional properties like a unique ID.

```tsx
{
  id: '1234',
  file: {
    name: 'file1.jpg',
    size: 1234,
    type: 'image/jpeg',
  },
  // optional properties
  exists: true,
  isLoading: true,
  errorMessage: 'error message',
  description: 'description',
  removeDeleteButton: true,
}
```

This data format will be returned by the `onChange` and the `onSubmit` event handlers.

## Validation

The `required` property will validate if there are valid files present. If there are files with an error, the validation will fail.

If there are invalid files, the `onSubmit` event will not be called and a validation error will be shown.

The `onChange` event handler will return an array with [file item objects](/uilib/components/upload/properties/#fileitem) containing the file object and some additional properties – regardless of the validity of the file.

For error handling of invalid files, you can refer to the [Upload](/uilib/components/upload/) component for more details.

Here is [an example](/uilib/extensions/forms/feature-fields/more-fields/Upload/#with-file-size-validation) of how to use the `fileHandler` property to validate file sizes.

## About the `value` and `path` property

The `path` property represents an array with an object described above:

```tsx
render(
  <Form.Handler defaultData={{ myFiles: files }}>
    <Field.Upload path="/myFiles" />
  </Form.Handler>,
)
```

The `value` property represents an array with an object described above:

```tsx
render(<Field.Upload value={files} />)
```

## About the `fileHandler` property

The `fileHandler` is a handler function that supports both an asynchronous and synchronous function. It takes newly added files as a parameter and returns processed files (a promise when asynchronous).
The component will automatically handle asynchronous loading states during the upload process. This feature is useful for tasks like uploading files to a virus checker, which returns a new file ID if the file passes the check. To indicate a failed upload, set the `errorMessage` on the specific [file item object](/uilib/components/upload/properties/#fileitem) with the desired message to display next to the file in the upload list.

```js
async function virusCheck(newFiles) {
  const promises = newFiles.map(async (file) => {
    const formData = new FormData()
    formData.append('file', file.file, file.file.name)

    return await fetch('/', { method: 'POST', body: formData })
      .then((response) => {
        if (response.ok) return response.json()
        throw new Error('Unable to upload this file')
      })
      .then((data) => {
        return {
          ...file,
          id: data.server_generated_id,
        }
      })
      .catch((error) => {
        return {
          ...file,
          errorMessage: error.message,
        }
      })
  })

  return await Promise.all(promises)
}
```

### TransformIn and TransformOut

You can use the `transformIn` and `transformOut` properties to transform the data from the internal format to the external format and vice versa.

```tsx
import { Form, Field, Tools } from '@dnb/eufemia/extensions/forms'
import type {
  UploadValue,
  UploadFileNative,
} from '@dnb/eufemia/extensions/forms/Field/Upload'

// Our external format
type DocumentMetadata = {
  id: string
  fileName: string
}

const defaultValue = [
  {
    id: '1234',
    fileName: 'myFile.pdf',
  },
] satisfies DocumentMetadata[] as unknown as UploadValue

const filesCache = new Map<string, File>()

// To the Field (from e.g. defaultValue)
const transformIn = (external?: DocumentMetadata[]) => {
  return (
    external?.map(({ id, fileName }) => {
      const file: File =
        filesCache.get(id) ||
        new File([], fileName, { type: 'images/png' })

      return { id, file }
    }) || []
  )
}

// From the Field (internal value) to the data context or event parameter
const transformOut = (internal?: UploadValue) => {
  return (
    internal?.map(({ id, file }) => {
      if (!filesCache.has(id)) {
        filesCache.set(id, file)
      }

      return { id, fileName: file.name }
    }) || []
  )
}

function MyForm() {
  return (
    <Form.Handler>
      <Field.Upload
        path="/documents"
        transformIn={transformIn}
        transformOut={transformOut}
        defaultValue={defaultValue}
      />

      <Tools.Log />
    </Form.Handler>
  )
}
```

### TransformIn considerations

The properties of the [file item object](/uilib/components/upload/properties/#fileitem) is used internally to visually customize the file when displayed. For instance when displaying a spinner when `isLoading: true`.
It does also exist some internal logic based on these values, so be careful when changing these through [transformers](/uilib/extensions/forms/getting-started/#transforming-data), like `transformIn`, as changing or overriding these properties could have unexpected results.
If doing so, it's recommended to pass along the rest of the [file item object](/uilib/components/upload/properties/#fileitem) using the spread operator (...fileItemObj) or so, as it can contain properties needed internally that one is not aware of, or updated values since last file was uploaded, or even future new internal properties that does not exist yet.

```tsx
<Form.Handler>
  <Field.Upload
    path="/documents"
    transformIn={(value) => {
      return (value || []).map((fileItemObj) => ({
        ...fileItemObj,
        errorMessage: 'error message',
      }))
    }}
  />
</Form.Handler>
```

### Persist files in session storage

The `sessionStorageId` property can be used to store the files in the session storage so they persist between page reloads.

But the persisted files only render the file name, and not the file itself. The file blob will be lost during the serialization process.

## Demos

Consider taking a look at the demos for the [Upload component](/uilib/components/upload/demos/) as well.

### Basic usage

```tsx
render(
  <Form.Handler>
    <Field.Upload
      label="My custom label"
      labelDescription="My description"
      onChange={(files) => console.log('onChange', files)}
    />
  </Form.Handler>,
)
```

### Variant `compact`

```tsx
render(
  <Form.Handler>
    <Field.Upload
      variant="compact"
      label="My custom label"
      labelDescription="My description"
      onChange={(files) => console.log('onChange', files)}
    />
  </Form.Handler>,
)
```

### Required

```tsx
render(
  <Form.Handler onSubmit={(data) => console.log('onSubmit', data)}>
    <Flex.Stack>
      <Field.Upload path="/myFiles" required />
      <Form.SubmitButton />
    </Flex.Stack>
  </Form.Handler>,
)
```

### Path usage

```tsx
render(
  <Form.Handler
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
  </Form.Handler>,
)
```

### With help

```tsx
render(
  <Field.Upload
    help={{
      open: true,
      title: 'Help title',
      content: 'Help content',
    }}
  />,
)
```

### Customized

```tsx
render(
  <Field.Upload
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
  />,
)
```

### Session storage support

The `sessionStorageId` property can be used to store the files in the session storage so they persist between page reloads.

```tsx
render(
  <Form.Handler sessionStorageId="documents">
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
  </Form.Handler>,
)
```

### With asynchronous file handler

The `fileHandler` property supports an asynchronous function, and can be used for handling/validating files asynchronously, like to upload files to a virus checker and display errors based on the outcome:

```tsx
const MyForm = () => {
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
  newFiles: UploadValue,
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
          server_generated_id: file.file.name + '_' + crypto.randomUUID(),
        }),
      }
      if (!mockResponse.ok) {
        throw new Error('Unable to upload this file')
      }
      const data = await mockResponse.json()
      updatedFiles.push({
        ...file,
        id: data.server_generated_id,
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
render(<MyForm />)
```

### With synchronous file handler

The `fileHandler` property supports a synchronous function, and can be used for handling/validating files synchronously, like to check for file names that's too long:

```tsx
const MyForm = () => {
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
```

### With asynchronous `onFileDelete`

```tsx
async function mockAsyncFileRemoval({ fileItem }) {
  const request = createRequest()
  console.log(`making API request to remove: ${fileItem.file.name}`)
  await request(3000) // Simulate a request
  const mockResponse = {
    successful_removal: Math.random() < 0.5, // Randomly fails to remove the file
  }
  if (!mockResponse.successful_removal) {
    throw new Error('Unable to remove this file')
  }
}
render(
  <Field.Upload
    onFileDelete={mockAsyncFileRemoval}
    acceptedFileTypes={['jpg', 'png']}
  />,
)
```

### With asynchronous `onFileClick`

```tsx
async function mockAsyncFileClick({ fileItem }) {
  const request = createRequest()
  console.log(
    `making API request to fetch the url of the file: ${fileItem.file.name}`,
  )
  await request(2000) // Simulate a request
  window.open(
    `https://eufemia.dnb.no/images/avatars/${fileItem.file.name}`,
    '_blank',
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
  </Form.Handler>,
)
```

### With [FileItem](/uilib/components/upload/properties/#fileitem) options

```tsx
const MyForm = () => {
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
          },
        ],
      }}
    >
      <Field.Upload
        path="/myFiles"
        fileHandler={mockFileHandler}
        required
      />
    </Form.Handler>
  )
}
function mockFileHandler(newFiles: UploadValue) {
  return newFiles.map((file) => {
    file.errorMessage = 'File has a problem'
    file.description = 'File description'
    file.removeDeleteButton = true
    return file
  })
}
render(<MyForm />)
```

### With file size validation

```tsx
const MAX_SIZE = 500 * 1024 // 500 KB
// 500 KB
const MIN_SIZE = 50 * 1024 // 50 KB
// 50 KB

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
  </Form.Handler>,
)
```

```tsx
render(
  <Form.Handler
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
  </Form.Handler>,
)
```

```tsx
render(
  <Field.Upload
    labelDescription={false}
    help={{
      open: true,
      title: 'Help title',
      content: 'Help content',
    }}
  />,
)
```

```tsx
render(
  <Form.Handler>
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
  </Form.Handler>,
)
```
