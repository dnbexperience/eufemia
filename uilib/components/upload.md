---
title: 'Upload'
description: 'The Upload component should be used in scenarios where the user has to upload files. Files can be uploaded by clicking button. You also have the opportunity to add descriptive texts below the title where you could put max file size, allowed file formats etc.'
metadata: https://eufemia.dnb.no/uilib/components/upload/metadata.json
---

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
      }),
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
  />,
)
```

### Upload `compact` variant

```tsx
render(
  <Upload
    variant="compact"
    acceptedFileTypes={['jpg', 'png']}
    onChange={({ files }) => console.log('onChange', files)}
  />,
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
          false,
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
            }),
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
            }),
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
  />,
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
  />,
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
  <Upload title={false} text={false} acceptedFileTypes={['jpg', 'png']} />,
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
  />,
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
          'image/png',
        ),
        id: '2',
      },
    ])
  }, [setFiles])
  async function mockAsyncFileFetching({ fileItem }) {
    const request = createRequest()
    console.log(
      'making API request to fetch the url of the file:',
      fileItem.file.name,
    )
    await request(2000) // Simulate a request
    window.open(
      `https://eufemia.dnb.no/images/avatars/${fileItem.file.name}`,
      '_blank',
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
          'image/png',
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
          'image/png',
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
          }),
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
          'image/png',
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
          }),
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
          'image/png',
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
  />,
)
```

```tsx
const Component = () => {
  const { setInternalFiles, setFiles } = Upload.useUpload(
    'upload-files-amount-message',
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
    'upload-files-amount-limit',
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
  />,
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
  />,
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
          'image/png',
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
