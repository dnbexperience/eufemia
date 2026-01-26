---
title: 'Upload'
description: 'The Upload component should be used in scenarios where the user has to upload files. Files can be uploaded by clicking button. You also have the opportunity to add descriptive texts below the title where you could put max file size, allowed file formats etc.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.598Z
checksum: 635cb11b451f4904eb69f12f651c3ccff8e75bee1895005031d7bb39b9f8a50c
---

# Upload

## Import

```tsx
import { Upload } from '@dnb/eufemia'
```

## Description

The Upload component should be used in scenarios where the user has to upload any kind of files.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=23118-25104)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/upload)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/upload)

## How to use the Upload component

- Files selected by the user should be uploaded immediately to a temporary location.
- The user should be able to remove files during the session.
- The Upload component connects to the [GlobalStatus](/uilib/components/global-status) and displays file error messages there.
- Validation messages from the backend should be displayed for each file via the `useUpload` hook. See the [example](/uilib/components/upload/#upload-error-message) below.
- The `useUpload` hook can be placed in any location in your application, and does not need to be where the `Upload` component is used.

```jsx
function YourComponent() {
  const myUploadId = 'unique-id' // or a function, object or React Context reference
  const { files, setFiles } = Upload.useUpload(myUploadId)

  React.useEffect(() => {
    setFiles(
      files.map((fileItem) => {
        if (fileItem.file.name === fileNameFromBackend) {
          fileItem.errorMessage = 'Your message from the backend'
        }
        return fileItem
      })
    )
  }, [fileNameFromBackend])

  return <Upload id={myUploadId} />
}
```

## `useUpload` hook

Exposes the following functionality:

- `files`: The given files of the Upload component.
- `setFiles`: A function to set the files of the Upload component.
- `clearFiles`: A function to clear the files of the Upload component. It can be useful when you want to programmatically clear the files of the Upload component at a given time.

## Variant compact

The `compact` variant displays less information than the `normal` variant and aims to display only what's necessary for the user to upload a file:

- Upload button
- List of uploaded files
- `title` as label (can be removed by providing the value `false`)
- `text` as sublabel (can be removed by providing the value `false`)

It does not display information about:

- `filesAmountLimit`
- `fileMaxSize`
- `acceptedFileTypes`

## JPG vs JPEG

When `jpg` is defined (most commonly used), the component will also accept `jpeg` files.

## Backend integration

The backend receiving the files is decoupled and can be any existing or new system.

## Limit the amount of files

By default, the Upload component accepts multiple files. You can use the property `filesAmountLimit={1}` to make the component accept only one file.

## Page-wide drop support

Once the Upload component mounts, it also adds support for dropping files to the entire browser body.

**NB:** When you have several mounted components, only the first Upload component will receive the dropped files.

## The `download` property

Each file item is displayed as a clickable link with its original file name, which opens the file source in a new browser tab.

In some situations, it's more suitable to have each link download the file instead of opening it in a new browser tab. To achieve this, set the `download={true}` property on the Upload component.

## Prevents uploading duplicate files

By default, the Upload component prevents uploading duplicate files. It determines if a file is a duplicate if the file's `name`, `size` (if existing), and `lastModified` (if existing) values are equal. You can use the property `allowDuplicates={true}` to allow duplicate files.

## Demos

### Upload (default)

```tsx
render(
  <Upload
    acceptedFileTypes={['jpg', 'png']}
    onChange={({ files }) => console.log('onChange', files)}
  />
)
```

### Upload `compact` variant

```tsx
render(
  <Upload
    variant="compact"
    acceptedFileTypes={['jpg', 'png']}
    onChange={({ files }) => console.log('onChange', files)}
  />
)
```

### `useUpload` React Hook

By using the `Upload.useUpload` you can remove or add files or the status displayed in the component.

You can also use the file blob in combination with the [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/File_API) API.

```tsx
const Component = () => {
  const myUploadId = 'unique-id' // or a function, object or React Context reference.
  const { files, setFiles } = Upload.useUpload(myUploadId) // id is needed when wanting to connect with the useUpload hook.

  return (
    <>
      <Upload acceptedFileTypes={['jpg', 'png']} id={myUploadId} />

      <Button
        top="small"
        disabled={files.length < 1}
        onClick={() => setFiles([])}
      >
        Remove selected files
      </Button>

      <Preview files={files} />
    </>
  )
  function Preview({ files }) {
    const [images, setImages] = React.useState([])
    React.useEffect(() => {
      files.map(({ file }) => {
        let reader = new FileReader()
        reader.addEventListener(
          'load',
          (event) => {
            images.push({
              blob: event.target,
              file,
            })
            setImages([...images])
            reader = null
          },
          false
        )
        reader.readAsDataURL(file)
      })
    }, [files])
    return (
      <Section aria-label="List of chosen images">
        {images.map((img, i) => (
          <Img
            top
            key={i}
            src={img.blob.result}
            alt={img.file.name}
            height={100}
          />
        ))}
      </Section>
    )
  }
}
render(<Component />)
```

### Upload single file/fixed amount of files

```tsx
const Component = () => {
  const { files, setFiles } = Upload.useUpload('upload-single-file')
  if (files.length) {
    console.log('files', files, setFiles)
  }
  return (
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      id="upload-single-file"
      filesAmountLimit={1}
    />
  )
}
render(<Component />)
```

### Upload loading state

When uploading the file you can set the loading state of the request using the `Upload.useUpload` hook and passing `isLoading` to the file that is being uploaded.

```tsx
const Component = () => {
  const { files, setFiles } = Upload.useUpload('upload-is-loading')
  React.useEffect(() => {
    setFiles([
      {
        file: createMockFile('fileName.png', 123, 'image/png'),
        isLoading: true,
      },
    ])
  }, [])
  return (
    <>
      <Upload acceptedFileTypes={['jpg', 'png']} id="upload-is-loading" />
      <ToggleButton
        top="small"
        disabled={files.length < 1}
        on_change={({ checked }) =>
          setFiles(
            files.map((fileItem) => {
              return {
                ...fileItem,
                isLoading: checked,
              }
            })
          )
        }
      >
        Files is loading toggle
      </ToggleButton>
    </>
  )
}
render(<Component />)
```

### Upload error message

The only file verification the Upload component does is for the file size and the file type. These errors are handled by the HTML element `input` so they are not selectable. If you want any other error messages you can use the `Upload.useUpload` hook the same way as with the loading state.

```tsx
const Component = () => {
  const { files, setFiles } = Upload.useUpload('upload-error-message')
  return (
    <>
      <Upload
        acceptedFileTypes={['jpg', 'png']}
        id="upload-error-message"
      />
      <ToggleButton
        top="small"
        disabled={files.length < 1}
        on_change={({ checked }) => {
          setFiles(
            files.map((fileItem) => {
              return {
                ...fileItem,
                errorMessage: checked ? 'custom error message' : null,
              }
            })
          )
        }}
      >
        Toggle error message
      </ToggleButton>
    </>
  )
}
render(<Component />)
```

### Upload specific accepted file formats

You can pass the file formats as a string array. This will restrict which files that can be selected.

```tsx
const Component = () => {
  const { files, setFiles } = Upload.useUpload('upload-accepted-formats')
  if (files.length) {
    console.log('files', files, setFiles)
  }
  return (
    <Upload
      acceptedFileTypes={['png', 'jpg', 'pdf']}
      id="upload-accepted-formats"
    />
  )
}
render(<Component />)
```

### Upload with prefilled error

```tsx
const Component = () => {
  const { files, setFiles } = Upload.useUpload('file-list')
  if (files.length) {
    console.log('files', files)
  }
  React.useEffect(() => {
    setFiles([
      {
        file: createMockFile('fileName.png', 123, 'image/png'),
        errorMessage: 'This is no real file!',
      },
    ])
  }, [setFiles])
  return <Upload acceptedFileTypes={['jpg', 'png']} id="file-list" />
}
render(<Component />)
```

### Upload with file max size based on file type

The table of accepted file types is sorted descending by `maxFileSize`. Multiple `fileType` for the same `maxFileSize` is sorted alphabetically ascending by `fileType`.

```tsx
render(
  <Upload
    fileMaxSize={99}
    acceptedFileTypes={[
      {
        fileType: 'jpg',
        fileMaxSize: 1,
      },
      {
        fileType: 'doc',
        fileMaxSize: 1,
      },
      {
        fileType: 'svg',
        fileMaxSize: 1,
      },
      {
        fileType: 'gif',
        fileMaxSize: 1,
      },
      {
        fileType: 'doc',
        fileMaxSize: 4,
      },
      {
        fileType: 'docx',
        fileMaxSize: 4,
      },
      {
        fileType: 'tiff',
        fileMaxSize: 5,
      },
      {
        fileType: 'tif',
        fileMaxSize: 5,
      },
      {
        fileType: 'html',
        fileMaxSize: 6,
      },
      {
        fileType: 'htm',
        fileMaxSize: 6,
      },
      {
        fileType: 'xls',
        fileMaxSize: 7,
      },
      {
        fileType: 'xlsx',
        fileMaxSize: 7,
      },
      {
        fileType: 'odt',
      },
      {
        fileType: 'pdf',
      },
      {
        fileType: 'text',
        fileMaxSize: false,
      },
      {
        fileType: 'txt',
        fileMaxSize: 0,
      },
      {
        fileType: 'zip',
        fileMaxSize: 99,
      },
    ]}
  />
)
```

To disable `maxFileSize` Use either `0` or `false`. If `maxFileSize` is not provided, it defaults to the value of [Uploads](/uilib/components/upload/properties/#properties) `fileMaxSize` which defaults to 5 MB.

<VisibleWhenNotVisualTest>
  
```tsx
render(
  <Upload
    acceptedFileTypes={[
      {
        fileType: 'jpg',
        fileMaxSize: 0,
      },
      {
        fileType: 'doc',
        fileMaxSize: false,
      },
      {
        fileType: 'svg',
      },
    ]}
  />
)
```

</VisibleWhenNotVisualTest>

### Upload without file max size

You can disable the file max size, which will deactivate all file size verifications in the Upload component.
This can also be used to manually implement more complex file max size verifications.

```tsx
render(<Upload acceptedFileTypes={['jpg', 'pdf']} fileMaxSize={false} />)
```

### Upload without title and text

```tsx
render(
  <Upload title={false} text={false} acceptedFileTypes={['jpg', 'png']} />
)
```

### Upload with async `onFileDelete`

```tsx
async function mockAsyncFileRemoval({ fileItem }) {
  const request = createRequest()
  console.log('making API request to remove:', fileItem.file.name)
  await request(3000) // Simulate a request
  const mockResponse = {
    successful_removal: Math.random() < 0.5, // Randomly fails to remove the file
  }
  if (!mockResponse.successful_removal) {
    throw new Error('Unable to remove this file')
  }
}
render(
  <Upload
    onFileDelete={mockAsyncFileRemoval}
    acceptedFileTypes={['jpg', 'png']}
  />
)
```

### Upload with `onFileClick`

```tsx
const Component = () => {
  const { setFiles } = Upload.useUpload('upload-on-file-click')
  React.useEffect(() => {
    setFiles([
      {
        file: createMockFile('1501870.jpg', 123, 'image/png'),
        id: '1',
      },
      {
        file: createMockFile(
          'file-name-that-is-very-long-and-has-letters.png',
          123,
          'image/png'
        ),
        id: '2',
      },
    ])
  }, [setFiles])
  async function mockAsyncFileFetching({ fileItem }) {
    const request = createRequest()
    console.log(
      'making API request to fetch the url of the file:',
      fileItem.file.name
    )
    await request(2000) // Simulate a request
    window.open(
      `https://eufemia.dnb.no/images/avatars/${fileItem.file.name}`,
      '_blank'
    )
  }
  return (
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      id="upload-on-file-click"
      onFileClick={mockAsyncFileFetching}
    />
  )
}
render(<Component />)
```

### Upload programatically clearing files using `clearFiles `

```tsx
const Component = () => {
  const { setFiles, clearFiles } = Upload.useUpload('upload-clear-files')
  React.useEffect(() => {
    setFiles([
      {
        file: createMockFile('1501870.jpg', 123, 'image/png'),
        id: '1',
      },
      {
        file: createMockFile(
          'file-name-that-is-very-long-and-has-letters.png',
          123,
          'image/png'
        ),
        id: '2',
      },
    ])
  }, [setFiles])
  return (
    <>
      <Upload acceptedFileTypes={['jpg', 'png']} id="upload-clear-files" />
      <Button top="small" onClick={() => clearFiles()}>
        Clear files
      </Button>
    </>
  )
}
render(<Component />)
```

### Upload with file description

```tsx
const Component = () => {
  const { setFiles } = Upload.useUpload('upload-description')
  React.useEffect(() => {
    setFiles([
      {
        file: createMockFile('1501870.jpg', 0, 'image/png'),
        id: '1',
        description: 'This is my description',
      },
      {
        file: createMockFile(
          'file-name-that-is-very-long-and-has-letters.png',
          0,
          'image/png'
        ),
        id: '2',
      },
      {
        file: createMockFile('123.jpg', 0, 'image/png'),
        id: '3',
        description: 'This is my description',
      },
      {
        file: createMockFile('321.jpg', 0, 'image/png'),
        id: '4',
      },
    ])
  }, [setFiles])
  return (
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      id="upload-description"
      onChange={({ files }) =>
        setFiles(
          files.map((fileItem) => {
            return {
              ...fileItem,
              description: 'This is my description',
            }
          })
        )
      }
    />
  )
}
render(<Component />)
```

### Upload with file without delete button

```tsx
const Component = () => {
  const { setFiles } = Upload.useUpload('upload-remove-delete-button')
  React.useEffect(() => {
    setFiles([
      {
        file: createMockFile('1501870.jpg', 0, 'image/png'),
        id: '1',
      },
      {
        file: createMockFile(
          'file-name-that-is-very-very-very-very-very-very-very-verylong-to-display-that-when-remove-button-is-hidden-file-name-will-take-full-width.png',
          0,
          'image/png'
        ),
        description:
          'Description that is very very very very very very very very long to display that when delete button is removed, file description will take full width.',
        removeDeleteButton: true,
      },
      {
        file: createMockFile('123.jpg', 0, 'image/png'),
        id: '3',
      },
      {
        file: createMockFile('321.jpg', 0, 'image/png'),
        id: '4',
        deleteButtonProps: {
          tooltip: 'Button tooltip',
        },
      },
    ])
  }, [setFiles])
  return (
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      id="upload-remove-delete-button"
      onChange={({ files }) =>
        setFiles(
          files.map((fileItem) => {
            return {
              ...fileItem,
              deleteButtonProps: {
                tooltip: `Do you want to remove ${fileItem.file.name} file?`,
              },
            }
          })
        )
      }
    />
  )
}
render(<Component />)
```

```tsx
const Component = () => {
  const { setFiles } = Upload.useUpload('upload-file-size-empty')
  React.useEffect(() => {
    setFiles([
      {
        file: createMockFile('1501870.jpg', 0, 'image/png'),
        id: '1',
      },
      {
        file: createMockFile(
          'file-name-that-is-very-long-and-has-letters.png',
          0,
          'image/png'
        ),
        id: '2',
      },
    ])
  }, [setFiles])
  return (
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      id="upload-file-size-empty"
    />
  )
}
render(<Component />)
```

```tsx
render(
  <Upload
    disableDragAndDrop
    acceptedFileTypes={['jpg', 'png']}
    onChange={({ files }) => console.log('onChange', files)}
  />
)
```

```tsx
const Component = () => {
  const { setInternalFiles, setFiles } = Upload.useUpload(
    'upload-files-amount-message'
  )
  React.useEffect(() => {
    setFiles([
      {
        file: createMockFile('fileName1.png', 123, 'image/png'),
      },
      {
        file: createMockFile('fileName2.png', 321, 'image/png'),
      },
    ])
    setInternalFiles([
      {
        file: createMockFile('fileName1.png', 123, 'image/png'),
        id: '1',
        exists: false,
      },
      {
        file: createMockFile('fileName2.png', 321, 'image/png'),
        id: '2',
        exists: false,
      },
    ])
  }, [])
  return (
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      id="upload-files-amount-message"
      filesAmountLimit={1}
    />
  )
}
render(<Component />)
```

```tsx
const Component = () => {
  const { setInternalFiles, setFiles } = Upload.useUpload(
    'upload-files-amount-limit'
  )
  React.useEffect(() => {
    setFiles([
      {
        file: createMockFile('fileName1.png', 123, 'image/png'),
      },
      {
        file: createMockFile('fileName2.png', 321, 'image/png'),
      },
    ])
    setInternalFiles([
      {
        file: createMockFile('fileName1.png', 123, 'image/png'),
        id: '1',
        exists: false,
      },
      {
        file: createMockFile('fileName2.png', 321, 'image/png'),
        id: '2',
        exists: false,
      },
    ])
  }, [])
  return (
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      id="upload-files-amount-limit"
      filesAmountLimit={2}
    />
  )
}
render(<Component />)
```

```tsx
render(
  <Upload
    acceptedFileTypes={['jpg', 'png']}
    disabled
    onChange={({ files }) => console.log('onChange', files)}
  />
)
```

```tsx
render(
  <Upload
    variant="compact"
    acceptedFileTypes={['jpg', 'png']}
    title={false}
    text={false}
    onChange={({ files }) => console.log('onChange', files)}
  />
)
```

```tsx
const Component = () => {
  const { setFiles } = Upload.useUpload('upload-compact-variant-files')
  React.useEffect(() => {
    setFiles([
      {
        file: createMockFile('1501870.jpg', 0, 'image/png'),
        id: '1',
      },
      {
        file: createMockFile(
          'file-name-that-is-very-long-and-has-letters.png',
          0,
          'image/png'
        ),
        id: '2',
      },
      {
        file: createMockFile('123.jpg', 0, 'image/png'),
        id: '3',
      },
      {
        file: createMockFile('321.jpg', 0, 'image/png'),
        id: '4',
      },
    ])
  }, [setFiles])
  return (
    <Upload
      variant="compact"
      acceptedFileTypes={['jpg', 'png']}
      id="upload-compact-variant-files"
    />
  )
}
render(<Component />)
```

## Properties

```json
{
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
  "title": {
    "doc": "Custom text property. Replaces the default title. Can be disabled using `false`.",
    "type": "string",
    "status": "optional"
  },
  "text": {
    "doc": "Custom text property. Replaces the default text. Can be disabled using `false`.",
    "type": "string",
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
```

## FileItem

The file item object is representing the files of the Upload component.

```json
{
  "file": {
    "doc": "The file object. This is the same object as the one returned by the `File` API.",
    "type": "File",
    "status": "required"
  },
  "id": {
    "doc": "Unique ID for the file item. This ID is generated by the component and is not user-defined.",
    "type": "string",
    "status": "required"
  },
  "exists": {
    "doc": "Indicates if the file item already exists in the list of files. This is useful for distinguishing between new and existing files.",
    "type": "boolean",
    "status": "optional"
  },
  "isLoading": {
    "doc": "Indicates if the file item is currently being loaded. This is useful for showing a loading state while the file is being processed.",
    "type": "boolean",
    "status": "optional"
  },
  "errorMessage": {
    "doc": "Provide an error message to be displayed. This is useful for indicating issues with the file upload process.",
    "type": "React.ReactNode",
    "status": "optional"
  },
  "description": {
    "doc": "Provide a description to be displayed. This is useful for providing additional information about the file.",
    "type": "React.ReactNode",
    "status": "optional"
  },
  "removeDeleteButton": {
    "doc": "Set to `true` to remove the delete button from the file item. This is useful for preventing users from deleting files.",
    "type": "boolean",
    "status": "optional"
  },
  "deleteButtonProps": {
    "doc": "Define any valid Eufemia [Button properties](/uilib/components/button/properties) or HTML attribute inside an object.",
    "type": "ButtonProps",
    "status": "optional"
  }
}
```

## AcceptedFileType

The accepted file type object is used to define file max size for specific file types.

When providing a list of AcceptedFileType to [Uploads](/uilib/components/upload/properties/#properties) `acceptedFileTypes`, the accepted file types will be presented in a table. Here is an [example](/uilib/components/upload/demos/#upload-with-file-max-size-based-on-file-type).

The table is sorted descending by `maxFileSize`. Multiple `fileType` for the same `maxFileSize` is sorted alphabetically ascending by `fileType`.

```json
{
  "fileType": {
    "doc": "The name of the accepted file type.",
    "type": "string",
    "status": "required"
  },
  "fileMaxSize": {
    "doc": "Defines the max file size of the given file type in MB. Use either `0` or `false` to disable. If not provided, it defaults to the value of [Uploads](/uilib/components/upload/properties/#properties) `fileMaxSize` which defaults to 5 MB.",
    "type": ["number", "false"],
    "status": "optional"
  }
}
```

## Translations

All translation keys listed in the translations table below, can be used as a component property (like `title` or `text`).

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
      "en-GB": "Remove all files that have errors.",
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
```

Read more about `fileItem` in the properties docs section [FileItem](/uilib/components/upload/properties/#fileitem).
