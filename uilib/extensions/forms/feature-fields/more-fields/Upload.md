---
title: 'Field.Upload'
description: '`Field.Upload` is a wrapper for the Upload component to make it easier to use inside a form.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.312Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.Upload

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
  </Form.Handler>
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
  </Form.Handler>
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
  </Form.Handler>
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
  </Form.Handler>
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
  </Form.Handler>
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
  />
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
  />
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
  </Form.Handler>
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
  />
)
```

### With asynchronous `onFileClick`

```tsx
async function mockAsyncFileClick({ fileItem }) {
  const request = createRequest()
  console.log(
    `making API request to fetch the url of the file: ${fileItem.file.name}`
  )
  await request(2000) // Simulate a request
  window.open(
    `https://eufemia.dnb.no/images/avatars/${fileItem.file.name}`,
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
  </Form.Handler>
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
  </Form.Handler>
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
  />
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
  </Form.Handler>
)
```

## Properties

### Field-specific properties

```json
{
  "props": {
    "fileHandler": {
      "doc": "File handler function that takes newly added files (`newFiles: UploadValue`) as a parameter and returns the processed files. The function can either be synchronous or asynchronous. It returns a promise (`Promise<UploadValue>`) containing the processed files when asynchronous.",
      "type": "function",
      "status": "optional"
    },
    "id": {
      "doc": "Unique id used together with the `useUpload` hook to manage the files. Needed when wanting to connect with the `useUpload` hook.",
      "type": ["string", "Function", "Object", "React.Context"],
      "status": "optional"
    },
    "children": {
      "doc": "Content to display below the `title` and `text`. Can be used to add custom content.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "variant": {
      "doc": "Defines the appearance. Use one of these: `normal` or `compact`. Defaults to `normal`.",
      "type": ["normal", "compact"],
      "status": "optional"
    },
    "acceptedFileTypes": {
      "doc": "List of accepted file types. Either as string or [AcceptedFileType](/uilib/components/upload/properties/#acceptedfiletype). When providing a list of [AcceptedFileType](/uilib/components/upload/properties/#acceptedfiletype), the accepted file types will be presented in a table(see [example](/uilib/components/upload/demos/#upload-with-file-max-size-based-on-file-type)).",
      "type": ["Array<string>", "Array<AcceptedFileType>"],
      "status": "required"
    },
    "filesAmountLimit": {
      "doc": "Defines the amount of files the user can select and upload. Defaults to `100`.",
      "type": "number",
      "status": "optional"
    },
    "fileMaxSize": {
      "doc": "Defines the max file size of each file in MB. Use either `0` or `false` to disable. Defaults to 5 MB.",
      "type": ["number", "false"],
      "status": "optional"
    },
    "download": {
      "doc": "Causes the browser to treat all listed files as downloadable instead of opening them in a new browser tab or window. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "allowDuplicates": {
      "doc": "Allows uploading of duplicate files. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "disableDragAndDrop": {
      "doc": "Disables file drag and drop, by removing the drop zone. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "buttonProps": {
      "doc": "Define any valid Eufemia [Button properties](/uilib/components/button/properties) or HTML attribute inside an object, to customize the upload button behavior and appearance.",
      "type": "ButtonProps",
      "status": "optional"
    },
    "skeleton": {
      "doc": "Skeleton should be applied when loading content.",
      "type": "boolean",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

### General properties

```json
{
  "props": {
    "value": {
      "doc": "Source data value for the field. Will take precedence over the path value given in the data context.",
      "type": ["Array<{ file, id }>"],
      "status": "optional"
    },
    "defaultValue": {
      "doc": "Default source data value for the field. Will not take precedence over the path value given in the data context.",
      "type": ["Array<{ file, id }>"],
      "status": "optional"
    },
    "path": {
      "doc": "JSON Pointer for where the data for the field is located in the source dataset (when using Form.Handler or DataContext). The `path` will also be set as the `name` attribute for the [string](/uilib/extensions/forms/base-fields/String/)-field.",
      "type": "string",
      "status": "optional"
    },
    "info": {
      "doc": "Info message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",
      "type": ["React.Node", "Array<React.Node>", "function"],
      "status": "optional"
    },
    "warning": {
      "doc": "Warning message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",
      "type": ["React.Node", "Array<React.Node>", "function"],
      "status": "optional"
    },
    "error": {
      "doc": "Error message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",
      "type": [
        "Error",
        "FormError",
        "Array<Error | FormError>",
        "function"
      ],
      "status": "optional"
    },
    "disabled": {
      "doc": "Set `true` to show the field but without the possibility of changing the value.",
      "type": "boolean",
      "status": "optional"
    },
    "emptyValue": {
      "doc": "The value to use (in `onChange` events etc) when emptying the field. Makes it possible for instance to provide `undefined` instead of an empty string when clearing the content of a text input.",
      "type": ["Array<{ file, id }>", "undefined"],
      "status": "optional"
    },
    "required": {
      "doc": "When set to `true`, the field will give an error if the value fails the required validation. When set to `false`, the field will not be required, but will add a \"(optional)\" suffix to the label.",
      "type": "boolean",
      "status": "optional"
    },
    "labelSuffix": {
      "doc": "Will append an additional text to the label, like \"(optional)\". When using `inheritLabel`, the suffix will not be inherited. NB: The visual appearance of the `labelSuffix` may change in the future.",
      "type": "React.Node",
      "status": "optional"
    },
    "schema": {
      "doc": "Custom JSON Schema for validating the value.",
      "type": "object",
      "status": "optional"
    },
    "validateInitially": {
      "doc": "Set to `true` to show validation based errors initially (from given value-prop or source data) before the user interacts with the field.",
      "type": "boolean",
      "status": "optional"
    },
    "validateUnchanged": {
      "doc": "Set to `true` to show validation based errors when the field is touched (like focusing a field and blurring) without having changed the value. Since the user did not introduce a new error, this will apply when the value was initially invalid based on validation.",
      "type": "boolean",
      "status": "optional"
    },
    "validateContinuously": {
      "doc": "Set to `true` to show validation based errors continuously while writing, not just when blurring the field.",
      "type": "boolean",
      "status": "optional"
    },
    "errorMessages": {
      "doc": "Custom error messages for each type of error, overriding default messages. The messages can be a React.ReactNode or a string.",
      "type": "object",
      "status": "optional"
    },
    "onChangeValidator": {
      "doc": "Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered on every change done by the user. The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",
      "type": "function",
      "status": "optional"
    },
    "onBlurValidator": {
      "doc": "Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",
      "type": "function",
      "status": "optional"
    },
    "transformIn": {
      "doc": "Transforms the `value` before its displayed in the field (e.g. input).",
      "type": "function",
      "status": "optional"
    },
    "transformOut": {
      "doc": "Transforms the value before it gets forwarded to the form data object (context) or returned as the `onChange` value parameter. The first parameter is the internal value. Some fields do support a second parameter, like the SelectCountry, where the country object is given.",
      "type": "function",
      "status": "optional"
    },
    "label": {
      "doc": "Label text displayed above the field. Most fields already have a default label, so check the field translations for an existing label entry. Only set `label` when you need to override the default.",
      "type": "string",
      "status": "optional"
    },
    "labelDescription": {
      "doc": "A more discreet text displayed beside the label (i.e for \"(optional)\").",
      "type": "string",
      "status": "optional"
    },
    "labelDescriptionInline": {
      "doc": "If true, the `labelDescription` will be displayed on the same line as the label.",
      "type": "boolean",
      "status": "optional"
    },
    "labelSrOnly": {
      "doc": "Use `true` to make the label only readable by screen readers.",
      "type": "boolean",
      "status": "optional"
    },
    "labelSize": {
      "doc": "Define the font-size of the label based on the [font-size](/uilib/typography/font-size/) table.",
      "type": ["medium", "large"],
      "status": "optional"
    },
    "help": {
      "doc": "Provide help content for the field using `title` and `content` as a string or React.Node. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, set `outset` to `false` to display the help text inline (inset) instead of the default outset behavior, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).",
      "type": "object",
      "status": "optional"
    },
    "hideHelpButton": {
      "doc": "Set `true` when you render the inline help button outside the label (e.g. inside a checkbox suffix) so FieldBlock skips drawing the default label help button.",
      "type": "boolean",
      "status": "optional"
    },
    "layout": {
      "doc": "Layout for the label and input. Can be `horizontal` or `vertical`.",
      "type": "string",
      "status": "optional"
    },
    "layoutOptions": {
      "doc": "Use this to set additional options for the `horizontal` layout. E.g. `{ width: \"medium\" }`. You can also use a custom width `{number}rem`. Instead of a width, you can use a min/max width. E.g. `{ minWidth: \"6rem\", maxWidth: \"12rem\" }`.",
      "type": "object",
      "status": "optional"
    },
    "width": {
      "doc": "Will set the width for the whole block. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",
      "type": ["string", "false"],
      "status": "optional"
    },
    "contentWidth": {
      "doc": "Will set the width for its contents. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",
      "type": ["string", "false"],
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  },
  "valueType": ["Array<{ file, id }>"],
  "omit": [
    "layout",
    "layoutOptions",
    "onBlurValidator",
    "onChangeValidator",
    "contentWidth",
    "labelSize",
    "labelDescriptionInline",
    "labelSrOnly",
    "labelSize"
  ]
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "Upload.buttonText": {
      "nb-NO": "Velg filer",
      "en-GB": "Choose files",
      "sv-SE": "Välj filer",
      "da-DK": "Vælg filer"
    },
    "Upload.buttonTextSingular": {
      "nb-NO": "Velg fil",
      "en-GB": "Choose file",
      "sv-SE": "Välj fil",
      "da-DK": "Vælg fil"
    },
    "Upload.deleteButton": {
      "nb-NO": "Slett",
      "en-GB": "Delete",
      "sv-SE": "Radera",
      "da-DK": "Slet"
    },
    "Upload.errorAmountLimit": {
      "nb-NO": "Det er begrenset hvor mange filer du kan laste opp (%amount).",
      "en-GB": "There is a limit to how many files you can upload (%amount).",
      "sv-SE": "Det är begränsat hur många filer du kan ladda upp (%amount).",
      "da-DK": "Der er en grænse for, hvor mange filer du kan uploade (%amount)."
    },
    "Upload.errorInvalidFiles": {
      "nb-NO": "Fjern alle filer som har feil.",
      "en-GB": "Remove all files with errors.",
      "sv-SE": "Ta bort alla filer som innehåller fel.",
      "da-DK": "Fjern alle filer, der indeholder fejl."
    },
    "Upload.errorLargeFile": {
      "nb-NO": "Filen du prøver å laste opp er for stor, den maksimale støttede størrelsen er %size MB.",
      "en-GB": "The file you are trying to upload is too big, the maximum size supported is %size MB.",
      "sv-SE": "Filen du försöker ladda upp är för stor, den maximalt tillåtna storleken är %size MB.",
      "da-DK": "Filen du prøver at uploade er for stor, den maksimale understøttede størrelse er %size MB."
    },
    "Upload.errorRequired": {
      "nb-NO": "Du må laste opp minst en fil.",
      "en-GB": "You must upload a file.",
      "sv-SE": "Du måste ladda upp minst en fil.",
      "da-DK": "Du skal uploade mindst én fil."
    },
    "Upload.errorUnsupportedFile": {
      "nb-NO": "Filen du prøver å laste opp er ikke støttet.",
      "en-GB": "The file you are trying to upload is not supported.",
      "sv-SE": "Filen du försöker ladda upp stöds inte.",
      "da-DK": "Filen du prøver at uploade er ikke understøttet."
    },
    "Upload.fileAmountDescription": {
      "nb-NO": "Maks antall filer:",
      "en-GB": "Max. number of files:",
      "sv-SE": "Max antal filer:",
      "da-DK": "Maks antal filer:"
    },
    "Upload.fileListAriaLabel": {
      "nb-NO": "opplastede filer",
      "en-GB": "uploaded files",
      "sv-SE": "uppladdade filer",
      "da-DK": "uploadede filer"
    },
    "Upload.fileSizeContent": {
      "nb-NO": "%size MB",
      "en-GB": "%size MB",
      "sv-SE": "%size MB",
      "da-DK": "%size MB"
    },
    "Upload.fileSizeDescription": {
      "nb-NO": "Maks filstørrelse:",
      "en-GB": "Max. file size:",
      "sv-SE": "Max filstorlek:",
      "da-DK": "Maks filstørrelse:"
    },
    "Upload.fileTypeDescription": {
      "nb-NO": "Tillatte filformater:",
      "en-GB": "Allowed formats:",
      "sv-SE": "Tillåtna filformat:",
      "da-DK": "Tilladte filformater:"
    },
    "Upload.fileTypeTableCaption": {
      "nb-NO": "Tillatte filformater og maks filstørrelse",
      "en-GB": "Allowed formats and max. file size",
      "sv-SE": "Tillåtna filformat och max filstorlek",
      "da-DK": "Tilladte filformater og maks filstørrelse"
    },
    "Upload.loadingText": {
      "nb-NO": "Laster",
      "en-GB": "Loading",
      "sv-SE": "Laddar",
      "da-DK": "Indlæser"
    },
    "Upload.text": {
      "nb-NO": "Dra og slipp eller velg hvilke filer du vil laste opp.",
      "en-GB": "Drag & drop your files or choose files to upload.",
      "sv-SE": "Dra och släpp eller välj vilka filer du vill ladda upp.",
      "da-DK": "Træk og slip eller vælg hvilke filer du vil uploade."
    },
    "Upload.textSingular": {
      "nb-NO": "Dra og slipp eller velg hvilken fil du vil laste opp.",
      "en-GB": "Drag & drop your file or choose which file to upload.",
      "sv-SE": "Dra och släpp eller välj vilken fil du vill ladda upp.",
      "da-DK": "Træk og slip eller vælg hvilken fil du vil uploade."
    },
    "Upload.title": {
      "nb-NO": "Last opp dokumenter",
      "en-GB": "Upload documents",
      "sv-SE": "Ladda upp dokument",
      "da-DK": "Upload dokumenter"
    }
  }
}
```

## Events

```json
{
  "props": {
    "onChange": {
      "doc": "Will be called on `files` changes made by the user. Access the files with `{ files }` (containing each a `fileItem`).",
      "type": "function",
      "status": "optional"
    },
    "onFileDelete": {
      "doc": "Will be called once a file gets deleted by the user. Access the deleted file with `{ fileItem }`.",
      "type": "function",
      "status": "optional"
    },
    "onFileClick": {
      "doc": "Will be called once a file gets clicked on by the user. Access the clicked file with `{ fileItem }`. When providing this prop, the file will be rendered as a button instead of an anchor or plain text.",
      "type": "function",
      "status": "optional"
    }
  }
}
```
