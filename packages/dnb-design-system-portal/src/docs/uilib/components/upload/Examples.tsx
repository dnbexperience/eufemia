/**
 * UI lib Component Example
 *
 */

import {
  Button,
  Img,
  Section,
  ToggleButton,
  Upload,
} from '@dnb/eufemia/src'
import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { createRequest } from '../../extensions/forms/Form/SubmitIndicator/Examples'

export function createMockFile(name: string, size: number, type: string) {
  if (typeof window === 'undefined' || !window?.File) {
    return undefined
  }
  const file = new File([], name, { type })
  Object.defineProperty(file, 'size', {
    get() {
      return size
    },
  })
  return file
}

export const UploadPrefilledFileList = () => (
  <ComponentBox
    data-visual-test="upload-file-list"
    scope={{ createMockFile }}
  >
    {() => {
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

      return <Component />
    }}
  </ComponentBox>
)

export const UploadBasic = () => (
  <ComponentBox data-visual-test="upload-basic">
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      onChange={({ files }) => console.log('onChange', files)}
    />
  </ComponentBox>
)

export const UploadBasicCompactVariant = () => (
  <ComponentBox data-visual-test="upload-basic-compact-variant">
    <Upload
      variant="compact"
      acceptedFileTypes={['jpg', 'png']}
      onChange={({ files }) => console.log('onChange', files)}
    />
  </ComponentBox>
)

export const UploadCompactVariantWithoutLabels = () => (
  <ComponentBox data-visual-test="upload-basic-compact-variant-without-labels">
    <Upload
      variant="compact"
      acceptedFileTypes={['jpg', 'png']}
      title={false}
      text={false}
      onChange={({ files }) => console.log('onChange', files)}
    />
  </ComponentBox>
)

export const UploadDisabled = () => (
  <ComponentBox data-visual-test="upload-disabled">
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      disabled
      onChange={({ files }) => console.log('onChange', files)}
    />
  </ComponentBox>
)

export const UploadSingleFile = () => (
  <ComponentBox>
    {() => {
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

      return <Component />
    }}
  </ComponentBox>
)

export const UploadFilesAmountMessage = () => (
  <ComponentBox
    scope={{ createMockFile }}
    data-visual-test="upload-files-amount-message"
  >
    {() => {
      const Component = () => {
        const { setInternalFiles, setFiles } = Upload.useUpload(
          'upload-files-amount-message'
        )

        React.useEffect(() => {
          setFiles([
            { file: createMockFile('fileName1.png', 123, 'image/png') },
            { file: createMockFile('fileName2.png', 321, 'image/png') },
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

      return <Component />
    }}
  </ComponentBox>
)

export const UploadFilesAmountLimit = () => (
  <ComponentBox
    scope={{ createMockFile }}
    data-visual-test="upload-files-amount-limit"
  >
    {() => {
      const Component = () => {
        const { setInternalFiles, setFiles } = Upload.useUpload(
          'upload-files-amount-limit'
        )

        React.useEffect(() => {
          setFiles([
            { file: createMockFile('fileName1.png', 123, 'image/png') },
            { file: createMockFile('fileName2.png', 321, 'image/png') },
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

      return <Component />
    }}
  </ComponentBox>
)

export const UploadRemoveFile = () => (
  <ComponentBox>
    {() => {
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
                  images.push({ blob: event.target, file })
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

      return <Component />
    }}
  </ComponentBox>
)

export const UploadIsLoading = () => (
  <ComponentBox
    data-visual-test="upload-is-loading"
    scope={{ createMockFile }}
  >
    {() => {
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
            <Upload
              acceptedFileTypes={['jpg', 'png']}
              id="upload-is-loading"
            />
            <ToggleButton
              top="small"
              disabled={files.length < 1}
              onChange={({ checked }) =>
                setFiles(
                  files.map((fileItem) => {
                    return { ...fileItem, isLoading: checked }
                  })
                )
              }
            >
              Files is loading toggle
            </ToggleButton>
          </>
        )
      }

      return <Component />
    }}
  </ComponentBox>
)

export const UploadErrorMessage = () => (
  <ComponentBox data-visual-test="upload-error-message">
    {() => {
      const Component = () => {
        const { files, setFiles } = Upload.useUpload(
          'upload-error-message'
        )

        return (
          <>
            <Upload
              acceptedFileTypes={['jpg', 'png']}
              id="upload-error-message"
            />
            <ToggleButton
              top="small"
              disabled={files.length < 1}
              onChange={({ checked }) => {
                setFiles(
                  files.map((fileItem) => {
                    return {
                      ...fileItem,
                      errorMessage: checked
                        ? 'custom error message'
                        : null,
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

      return <Component />
    }}
  </ComponentBox>
)

export const UploadAcceptedFormats = () => (
  <ComponentBox>
    {() => {
      const Component = () => {
        const { files, setFiles } = Upload.useUpload(
          'upload-accepted-formats'
        )

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

      return <Component />
    }}
  </ComponentBox>
)

export const UploadFileMaxSizeBasedOnFileType = () => (
  <ComponentBox
    data-visual-test="upload-file-max-size-based-on-file-format"
    hideCode
  >
    <Upload
      fileMaxSize={99}
      acceptedFileTypes={[
        { fileType: 'jpg', fileMaxSize: 1 },
        { fileType: 'doc', fileMaxSize: 1 },
        { fileType: 'svg', fileMaxSize: 1 },
        { fileType: 'gif', fileMaxSize: 1 },
        { fileType: 'doc', fileMaxSize: 4 },
        { fileType: 'docx', fileMaxSize: 4 },
        { fileType: 'tiff', fileMaxSize: 5 },
        { fileType: 'tif', fileMaxSize: 5 },
        { fileType: 'html', fileMaxSize: 6 },
        { fileType: 'htm', fileMaxSize: 6 },
        { fileType: 'xls', fileMaxSize: 7 },
        { fileType: 'xlsx', fileMaxSize: 7 },
        { fileType: 'odt' },
        { fileType: 'pdf' },
        { fileType: 'text', fileMaxSize: false },
        { fileType: 'txt', fileMaxSize: 0 },
        { fileType: 'zip', fileMaxSize: 99 },
      ]}
    />
  </ComponentBox>
)

export const UploadFileMaxSizeBasedOnFileTypeDisabled = () => (
  <ComponentBox>
    <Upload
      acceptedFileTypes={[
        { fileType: 'jpg', fileMaxSize: 0 },
        { fileType: 'doc', fileMaxSize: false },
        { fileType: 'svg' },
      ]}
    />
  </ComponentBox>
)

export const UploadDisabledFileMaxSize = () => (
  <ComponentBox data-visual-test="upload-disabled-file-max-size">
    <Upload acceptedFileTypes={['jpg', 'pdf']} fileMaxSize={false} />
  </ComponentBox>
)

export const UploadNoTitleNoText = () => (
  <ComponentBox data-visual-test="upload-no-title-no-text">
    <Upload
      title={false}
      text={false}
      acceptedFileTypes={['jpg', 'png']}
    />
  </ComponentBox>
)

export const UploadOnFileDeleteAsync = () => (
  <ComponentBox scope={{ createRequest }}>
    {() => {
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

      return (
        <Upload
          onFileDelete={mockAsyncFileRemoval}
          acceptedFileTypes={['jpg', 'png']}
        />
      )
    }}
  </ComponentBox>
)

export const UploadOnFileClick = () => (
  <ComponentBox
    scope={{ createMockFile, createRequest }}
    data-visual-test="upload-on-file-click"
  >
    {() => {
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

      return <Component />
    }}
  </ComponentBox>
)

export const UploadClearFiles = () => (
  <ComponentBox scope={{ createMockFile, createRequest }}>
    {() => {
      const Component = () => {
        const { setFiles, clearFiles } = Upload.useUpload(
          'upload-clear-files'
        )

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
            <Upload
              acceptedFileTypes={['jpg', 'png']}
              id="upload-clear-files"
            />
            <Button top="small" onClick={() => clearFiles()}>
              Clear files
            </Button>
          </>
        )
      }

      return <Component />
    }}
  </ComponentBox>
)

export const UploadFileEmptySize = () => (
  <ComponentBox
    scope={{ createMockFile, createRequest }}
    data-visual-test="upload-file-empty-size"
  >
    {() => {
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

      return <Component />
    }}
  </ComponentBox>
)

export const UploadDisabledDragAndDrop = () => (
  <ComponentBox data-visual-test="upload-disabled-drag-and-drop">
    <Upload
      disableDragAndDrop
      acceptedFileTypes={['jpg', 'png']}
      onChange={({ files }) => console.log('onChange', files)}
    />
  </ComponentBox>
)

export const UploadDescription = () => (
  <ComponentBox
    scope={{ createMockFile, createRequest }}
    data-visual-test="upload-description"
  >
    {() => {
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

      return <Component />
    }}
  </ComponentBox>
)

export const UploadRemoveDeleteButton = () => (
  <ComponentBox
    scope={{ createMockFile, createRequest }}
    data-visual-test="upload-remove-delete-button"
  >
    {() => {
      const Component = () => {
        const { setFiles } = Upload.useUpload(
          'upload-remove-delete-button'
        )

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
              deleteButtonProps: { tooltip: 'Button tooltip' },
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

      return <Component />
    }}
  </ComponentBox>
)

export const UploadCompactVariantFiles = () => (
  <ComponentBox
    scope={{ createMockFile, createRequest }}
    data-visual-test="upload-compact-variant-files-list"
  >
    {() => {
      const Component = () => {
        const { setFiles } = Upload.useUpload(
          'upload-compact-variant-files'
        )

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

      return <Component />
    }}
  </ComponentBox>
)
